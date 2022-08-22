import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

certificateRouter.post(
  "/certificate/create",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const newCertificate = {
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
      };

      const certificate = await certificateService.addCertificate({
        newCertificate,
      });

      if (certificate.errorMessage) {
        throw new Error(certificate.errorMessage);
      }

      res.status(200).send(certificate);
    } catch (errer) {
      next(errer);
    }
  }
);

certificateRouter.get(
  "/certificatelist/:userId",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.params)) {
        throw new Error("유저 아이디가 없습니다.");
      }

      const userId = req.params.userId;

      const certificate = await certificateService.getCertificateList({
        userId,
      });

      if (certificate.errorMessage) {
        throw new Error(certificate.errorMessage);
      }

      res.status(200).send(certificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.get(
  "/certificate/:id",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.params)) {
        throw new Error("자격증 아이디를 입력해주세요.");
      }

      const certificateId = req.params.id;

      const certificate = await certificateService.getCertificate({
        certificateId,
      });

      if (certificate.errorMessage) {
        throw new Error(certificate.errorMessage);
      }

      res.status(200).send(certificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.put(
  "/certificate/:id",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.params) || is.emptyObject(req.body)) {
        throw new Error(
          "자격증 업데이트에 실패했습니다. certificateID 혹은 Body의 데이터를 확인해주세요."
        );
      }

      const certificateId = req.params.id;

      const { title, description, date } = req.body ?? null;
      const toUpdate = { title, description, date };

      const updatedCertificate = await certificateService.updateCertificate({
        certificateId,
        toUpdate,
      });

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }

      res.status(200).send(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete(
  "/certificate/:id",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.params)) {
        throw new Error("자격증 아이디를 확인해주세요.");
      }

      const certificateId = req.params.id;

      const certificate = await certificateService.deleteCertificate({
        certificateId,
      });

      if (certificate.errorMessage) {
        throw new Error(certificate.errorMessage);
      }

      res.status(200).send(certificate);
    } catch (error) {
      next(error);
    }
  }
);

export { certificateRouter };
