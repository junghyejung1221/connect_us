import { Post, User, Comment } from "../db";
import { v4 as uuidv4 } from "uuid";

class postService {
  static addPost = async ({ newPost }) => {
    const id = uuidv4();
    newPost.id = id;

    const user = await User.findById({ userId: newPost.userId });
    newPost.userName = user.name;
    newPost.userType = user.type;
    newPost.userImageLink = user.imageLink;

    const createNewPostResult = await Post.create({ newPost });
    createNewPostResult.errorMessage = null;

    return createNewPostResult;
  };

  static getPosts = async ({ page, perPage }) => {
    const getPostsResult = await Post.findAll({ page, perPage });

    if (!getPostsResult) {
      const errorMessage = "포스트들을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getPostsResult;
  };

  static getPopularPosts = async ({ type, count }) => {
    let getPostsResult;

    if (type === "user") {
      getPostsResult = await Post.findPopularUserPosts({ count });
    } else if (type === "company") {
      getPostsResult = await Post.findPopularCompanyPosts({ count });
    } else if (type === "all") {
      getPostsResult = await Post.findPopularPosts({ count });
    }

    if (!getPostsResult) {
      const errorMessage = "포스트들을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getPostsResult;
  };

  static getPostsByUserId = async ({ getPosts }) => {
    const getPostsResult = await Post.findAllToUser({ getPosts });

    if (!getPostsResult) {
      const errorMessage = "해당 유저의 포스트들을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getPostsResult;
  };

  static getPostById = async ({ id }) => {
    const getPostResult = await Post.findById({ id });

    if (!getPostResult) {
      const errorMessage = "특정 포스트를 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getPostResult;
  };

  // static getFollwingPostsByUserId = async ({ userId }) => {
  //   const user = await User.findById({ userId });

  //   const followingUserId = user.followings.map((i) => i.following.id);
  //   followingUserId.push(userId);

  //   const getPostsResult = await Post.findByFollowingUserId({
  //     followingUserId,
  //   });

  //   if (!getPostsResult) {
  //     const errorMessage = "포스트를 불러오는 데 실패했습니다.";
  //     return { errorMessage };
  //   }

  //   return getPostsResult;
  // };

  static getFollwingPostsByUserId = async ({ getPosts }) => {
    const { userId, page, perPage } = getPosts;
    const user = await User.findById({ userId });
    let followingUserId;

    if (!user.followings) {
      followingUserId = [];
    } else {
      followingUserId = user.followings.map((i) => i.following.id);
    }
    followingUserId.push(userId);

    const getPostsResult = await Post.findByFollowingUserId({
      followingUserId,
      page,
      perPage,
    });

    if (!getPostsResult) {
      const errorMessage = "포스트를 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getPostsResult;
  };

  static updatePost = async ({ id, toUpdate }) => {
    const postInfo = await Post.findById({ id });

    if (!postInfo) {
      const errorMessage = "해당 id를 가진 포스트를 찾을 수 없습니다.";
      return { errorMessage };
    }

    const updatedPost = await Post.update({ id, toUpdate });

    return updatedPost;
  };

  static deletePost = async ({ id }) => {
    const deletedPost = await Post.delete({ id });
    const deletedPostComment = await Comment.deleteByPostId({ postId: id });

    if (!deletedPost || !deletedPostComment) {
      const errorMessage = "게시글 삭제에 실패했습니다.";
      return { errorMessage };
    }

    return { deletedPost, deletedPostComment };
  };

  static addLike = async ({ id, toUpdate }) => {
    const post = await Post.findById({ id });

    if (!post) {
      const errorMessage = "특정 포스트를 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    const updatedPost = await Post.addLike({ id, toUpdate });

    return updatedPost;
  };

  static deleteLike = async ({ id, toUpdate }) => {
    const post = await Post.findById({ id });

    if (!post) {
      const errorMessage = "특정 포스트를 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    const updatedPost = await Post.deleteLike({ id, toUpdate });

    return updatedPost;
  };
}

export { postService };
