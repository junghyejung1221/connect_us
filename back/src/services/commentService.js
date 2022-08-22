import { Comment, Post, User } from "../db";
import { v4 as uuidv4 } from "uuid";

class commentService {
  static async createComment({ postId, userId, text }) {
    const post = await Post.findById({
      id: postId,
    });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!post) {
      const error = new Error("해당 id와 일치하는 리뷰가 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById({ userId });

    const newComment = {
      postId,
      userId,
      userName: user.name,
      text,
    };

    // db에 저장
    const createdNewComment = await Comment.create({ newComment });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    // 리뷰 정보에 댓글 정보 업데이트
    await Post.addComment({
      id: postId,
      commentId: createdNewComment._id,
    });

    return createdNewComment;
  }

  static async updateComment({ id, toUpdate }) {
    let CommentInfo = await Comment.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!CommentInfo) {
      const error = new Error("해당 id를 가진 댓글 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const updatedComment = await Comment.update({
      id,
      toUpdate,
    });
    return updatedComment;
  }

  static async deleteComment({ id }) {
    let CommentInfo = await Comment.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!CommentInfo) {
      const error = new Error("해당 id를 가진 댓글 데이터를 찾을 수 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    const deleted = await Post.deleteComment({
      id: CommentInfo.postId,
      commentId: CommentInfo._id,
    });

    return deleted;
  }
}

export { commentService };
