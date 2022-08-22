import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();
educationRouter.use(login_required);

educationRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { userId, school, major, position, admission, graduate } = req.body;

    // 위 데이터를 education db에 추가하기
    const EducationList = await educationService.addEducation({
      userId,
      school,
      major,
      position,
      admission,
      graduate,
    });

    res.status(201).json(EducationList);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 data 찾기
    const education = await educationService.getEducation({ educationId });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/educations/:id", async function (req, res, next) {
  try {
    // URI로부터 data id를 추출함.
    const educationId = req.params.id;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { school, major, position, admission, graduate } = req.body ?? null;
    const toUpdate = { school, major, position, admission, graduate };

    // 위 추출된 정보를 이용하여 db의 데이터 수정함
    const updatedEducation = await educationService.setEducation({
      educationId,
      toUpdate,
    });

    if (updatedEducation.errorMessage) {
      throw new Error(updatedEducation.errorMessage);
    }

    res.status(200).json(updatedEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educationlist/:userId", async function (req, res, next) {
  try {
    // 특정 사용자의 전체 학력 목록을 얻음
    const userId = req.params.userId;

    const educationList = await educationService.getEducationList({ userId });

    res.status(200).send(educationList);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await educationService.deleteEducation({ educationId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { educationRouter };
