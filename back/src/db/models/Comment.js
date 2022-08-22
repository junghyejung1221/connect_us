import { CommentModel } from "../schemas/comment";

class Comment {
  static create = async ({ newComment }) => {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  };

  static findById = async ({ id }) => {
    const CommentInfo = await CommentModel.findOne({ _id: id }).lean();
    return CommentInfo;
  };

  static update = async ({ id, toUpdate }) => {
    const filter = { _id: id };
    const option = { returnOriginal: false };
    const updatedComment = await CommentModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedComment;
  };

  static deleteByPostId = async ({ postId }) => {
    const result = await CommentModel.deleteMany({ postId });
    return result;
  };
}

export { Comment };
