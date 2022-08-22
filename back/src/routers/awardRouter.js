import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.post("/award/create", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const newAward = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
    };

    const award = await awardService.addAward({ newAward });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.get(
  "/awardlist/:userId",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.params)) {
        throw new Error("유저 아이디가 없습니다.");
      }

      const userId = req.params.userId;

      const award = await awardService.getAwardList({ userId });

      if (award.errorMessage) {
        throw new Error(award.errorMessage);
      }

      res.status(200).send(award);
    } catch (error) {
      next(error);
    }
  }
);
awardRouter.get("/award/:id", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.params)) {
      throw new Error("award id가 없습니다. 다시 확인해주세요.");
    }

    const awardId = req.params.id;

    const award = await awardService.getAward({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/award/:id", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.params) || is.emptyObject(req.body)) {
      throw new Error(
        "awardID 혹은 Body안의 정보가 없습니다. 다시 확인해주세요."
      );
    }

    const awardId = req.params.id;

    const { title, description, date } = req.body ?? null;
    const toUpdate = { title, description, date };

    const updatedAward = await awardService.updateAward({ awardId, toUpdate });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).send(updatedAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/award/:id", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.params)) {
      throw new Error("award id가 없습니다. 다시 확인해주세요.");
    }
    const awardId = req.params.id;

    const award = await awardService.deleteAward({ awardId });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
