import { PostModel } from "../schemas/post";

class Post {
  static create = async ({ newPost }) => {
    const checkAlreadyExist = await PostModel.findOne({
      id: newPost.id,
    });
    if (checkAlreadyExist) {
      return checkAlreadyExist;
    }

    const createdNewPost = await PostModel.create(newPost);
    return createdNewPost;
  };

  static findAll = async ({ page, perPage }) => {
    const totalDocuments = await PostModel.countDocuments({});
    const totalPage = Math.ceil(totalDocuments / perPage);
    const posts = await PostModel.find({})
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return { totalPage, posts };
  };

  static findPopularPosts = async ({ count }) => {
    const posts = await PostModel.aggregate([
      {
        $addFields: { likes_count: { $size: { $ifNull: ["$likes", []] } } },
      },
      {
        $sort: { likes_count: -1 },
      },
      {
        $limit: count,
      },
    ]);

    return posts;
  };

  static findPopularUserPosts = async ({ count }) => {
    const posts = await PostModel.aggregate([
      {
        $match: {
          userType: "user",
        },
      },
      {
        $addFields: { likes_count: { $size: { $ifNull: ["$likes", []] } } },
      },
      {
        $match: { likes_count: { $gte: 1 } },
      },
      {
        $sort: { likes_count: -1 },
      },
      {
        $limit: count,
      },
    ]);

    return posts;
  };

  static findPopularCompanyPosts = async ({ count }) => {
    const posts = await PostModel.aggregate([
      {
        $match: {
          userType: "company",
        },
      },
      {
        $addFields: { likes_count: { $size: { $ifNull: ["$likes", []] } } },
      },
      {
        $sort: { likes_count: -1 },
      },
      // {
      //   $limit: count,
      // },
    ]);

    return posts;
  };

  static findAllToUser = async ({ getPosts }) => {
    const { userId, page, perPage } = getPosts;
    const totalDocuments = await PostModel.countDocuments({ userId });
    const posts = await PostModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return { total: totalDocuments, posts };
  };

  static findById = async ({ id }) => {
    const post = await PostModel.findOne({ id }).populate("comments").lean();
    return post;
  };

  static findByFollowingUserId = async ({ followingUserId, page, perPage }) => {
    const totalDocuments = await PostModel.countDocuments({
      userId: { $in: followingUserId },
    });
    const totalPage = Math.ceil(totalDocuments / perPage);
    const posts = await PostModel.find({
      userId: { $in: followingUserId },
    })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    return { totalPage, posts };
  };

  static findByUserName = async ({ getResults }) => {
    const { name, page, perPage } = getResults;
    const totalDocuments = await PostModel.countDocuments({
      userName: { $regex: name },
    });
    const totalPage = Math.ceil(totalDocuments / perPage);
    const posts = await PostModel.find({ userName: { $regex: name } })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return { totalPage, len: totalDocuments, posts };
  };

  static findByTitle = async ({ getResults }) => {
    const { title, page, perPage } = getResults;
    const totalDocuments = await PostModel.countDocuments({
      title: { $regex: title },
    });
    const totalPage = Math.ceil(totalDocuments / perPage);
    const posts = await PostModel.find({ title: { $regex: title } })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return { totalPage, len: totalDocuments, posts };
  };

  static findByContent = async ({ getResults }) => {
    const { content, page, perPage } = getResults;
    const totalDocuments = await PostModel.countDocuments({
      $or: [
        { content: { $regex: content } },
        { description: { $regex: content } },
      ],
    });
    const totalPage = Math.ceil(totalDocuments / perPage);
    const posts = await PostModel.find({
      $or: [
        { content: { $regex: content } },
        { description: { $regex: content } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return { totalPage, len: totalDocuments, posts };
  };

  static findByKeyword = async ({ getResults }) => {
    const { keyword, page, perPage } = getResults;
    const totalDocuments = await PostModel.countDocuments({
      $or: [
        { content: { $regex: keyword } },
        { description: { $regex: keyword } },
        { title: { $regex: keyword } },
        { userName: { $regex: keyword } },
      ],
    });
    const totalPage = Math.ceil(totalDocuments / perPage);
    const posts = await PostModel.find({
      $or: [
        { content: { $regex: keyword } },
        { description: { $regex: keyword } },
        { title: { $regex: keyword } },
        { userName: { $regex: keyword } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return { totalPage, len: totalDocuments, posts };
  };

  static update = async ({ id, toUpdate }) => {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );

    return updatedPost;
  };

  static delete = async ({ id }) => {
    const result = await PostModel.deleteOne({ id });
    const isDataDeleted = result.deletedCount === 1;
    return isDataDeleted;
  };

  static addComment = async ({ id, commentId }) => {
    const filter = { id };
    const update = { $push: { comments: commentId } };
    const option = { returnOriginal: false };

    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedPost;
  };

  static deleteComment = async ({ id, commentId }) => {
    const filter = { id };
    const update = { $pull: { comments: commentId } };
    const option = { returnOriginal: false };

    const updatedReview = await PostModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedReview;
  };

  static addLike = async ({ id, toUpdate }) => {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      {
        $push: {
          likes: toUpdate,
        },
      },
      option
    );
    return updatedPost;
  };

  static deleteLike = async ({ id, toUpdate }) => {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      {
        $pull: {
          likes: toUpdate,
        },
      },
      option
    );
    return updatedPost;
  };
}

export { Post };
