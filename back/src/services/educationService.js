import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  static addEducation = async ({
    userId,
    school,
    major,
    position,
    admission,
    graduate,
  }) => {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = {
      id,
      userId,
      school,
      major,
      position,
      admission,
      graduate,
    };

    // db에 저장
    await Education.create({ newEducation });

    const educationList = await Education.findByUserId({ userId });
    return educationList;
  };

  static getEducation = async ({ educationId }) => {
    // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    const education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  };

  static getEducationList = async ({ userId }) => {
    // education db에서 해당 유저의 학력 리스트를 가져옴
    const educations = await Education.findByUserId({ userId });
    return educations;
  };

  static setEducation = async ({ educationId, toUpdate }) => {
    // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    let education = await Education.findById({ educationId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const updatedEducation = await Education.update({ educationId, toUpdate });
    return updatedEducation;
  };

  static deleteEducation = async ({ educationId }) => {
    // education db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    const isDataDeleted = await Education.deleteById({ educationId });
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  };
}

export { educationService };
