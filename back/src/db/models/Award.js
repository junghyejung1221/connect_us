import { AwardModel } from "../schemas/award";

class Award {
  static create = async ({ newAward }) => {
    const checkAlreadyExist = await AwardModel.findOne({
      title: newAward.title,
    });
    if (checkAlreadyExist) {
      return checkAlreadyExist;
    }
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  };

  static delete = async ({ id }) => {
    const deleteAwardResult = await AwardModel.deleteOne({ id });

    return deleteAwardResult;
  };

  static findAllToUser = async ({ userId }) => {
    const awards = await AwardModel.find({
      userId,
    });

    return awards;
  };

  static findOne = async ({ id }) => {
    const award = await AwardModel.findOne({
      id,
    });
    return award;
  };

  static update = async ({ awardId, toUpdate }) => {
    const filter = {
      id: awardId,
    };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );

    return updatedAward;
  };
}

export { Award };
