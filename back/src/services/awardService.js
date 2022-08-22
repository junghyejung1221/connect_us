import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class awardService {
  static addAward = async ({ newAward }) => {
    const id = uuidv4();
    newAward.id = id;

    const createNewAwardResult = await Award.create({ newAward });

    createNewAwardResult.errorMessage = null;

    return createNewAwardResult;
  };

  static getAwardList = async ({ userId }) => {
    const getAwardsResult = await Award.findAllToUser({ userId });

    if (!getAwardsResult) {
      const errorMessage = "여러개의 수상 이력을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getAwardsResult;
  };

  static getAward = async ({ awardId }) => {
    const getAwardResult = await Award.findOne({ id: awardId });

    if (!getAwardResult) {
      const errorMessage = "특정 수상 이력을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getAwardResult;
  };

  static deleteAward = async ({ awardId }) => {
    const deleteAwardResult = await Award.delete({ id: awardId });

    if (!deleteAwardResult) {
      const errorMessage = "수상 이력 삭제에 실패했습니다.";
      return { errorMessage };
    }

    return deleteAwardResult;
  };

  static updateAward = async ({ awardId, toUpdate }) => {
    const updateAwardResult = await Award.update({ awardId, toUpdate });

    if (!updateAwardResult) {
      const errorMessage = "수상 이력을 수정하는 데 실패했습니다.";
      return { errorMessage };
    }

    return updateAwardResult;
  };
}

export { awardService };
