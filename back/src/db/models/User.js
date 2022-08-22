import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email })
      .populate({ path: "followings.following" })
      .populate({ path: "followers.follower" })
      .lean();
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ id: userId })
      .populate({ path: "followings.following" })
      .populate({ path: "followers.follower" })
      .lean();

    if (!user.imageLink) {
      user.imageLink =
        "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png";
    }
    if (!user.introduction) {
      user.introduction = "";
    }

    return user;
  }

  static async findByName({ name }) {
    const users = await UserModel.find({ name: { $regex: name } }).limit(20);
    return users;
  }

  static async findByKeyword({ keyword }) {
    const usersFilteredByBasic = await UserModel.find({
      $or: [
        { name: { $regex: keyword } },
        { introduction: { $regex: keyword } },
      ],
    }).limit(10);
    const usersFilteredByKeywords = await UserModel.find({
      $or: [
        { keywords: { $elemMatch: { job: { $regex: keyword } } } },
        { keywords: { $elemMatch: { jobDetail: { $regex: keyword } } } },
        { keywords: { $elemMatch: { workPlace: { $regex: keyword } } } },
        { keywords: { $elemMatch: { career: { $regex: keyword } } } },
        { keywords: { $elemMatch: { education: { $regex: keyword } } } },
        { keywords: { $elemMatch: { employ: { $regex: keyword } } } },
      ],
    }).limit(10);
    const users = [...usersFilteredByBasic, ...usersFilteredByKeywords];

    return [...new Set(users.map(JSON.stringify))].map(JSON.parse);
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async updateSocialData({ userId, toUpdate }) {
    const filter = { id: userId };
    const update = {
      $set: {
        socialData: toUpdate,
      },
    };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async addFollowing({ userId, followingOid }) {
    const filter = { id: userId };
    const update = {
      $push: { followings: { following: followingOid } },
    };
    const option = { upsert: true, returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedUser;
  }

  static async addFollower({ followingId, userOid }) {
    const filter = { id: followingId };
    const update = {
      $push: { followers: { follower: userOid } },
    };
    const option = { upsert: true, returnOriginal: false };

    const updatedFollower = UserModel.findOneAndUpdate(filter, update, option);

    return updatedFollower;
  }

  static async deleteFollowing({ userId, followingOid }) {
    const filter = { id: userId };
    const update = {
      $pull: { followings: { following: followingOid } },
    };
    const option = { upsert: true, returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedUser;
  }

  static async deleteFollower({ followingId, userOid }) {
    const filter = { id: followingId };
    const update = {
      $pull: { followers: { follower: userOid } },
    };
    const option = { upsert: true, returnOriginal: false };

    const updatedFollower = UserModel.findOneAndUpdate(filter, update, option);

    return updatedFollower;
  }
}

export { User };
