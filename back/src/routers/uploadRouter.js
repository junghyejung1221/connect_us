import { Router } from "express";
import { login_required } from "../middlewares/login_required";

const { postImgUpload } = require("../utils/s3");

const uploadRouter = Router();

uploadRouter.post(
  "/uploadImage",
  login_required,
  postImgUpload.single("image"),
  async function (req, res, next) {
    try {
      console.log(req.file);
      const saveFilePath = req.file?.location ?? null; // 업로드된 파일의 경로 (index.html 기준)

      res.status(201).send(saveFilePath);
    } catch (error) {
      next(error);
    }
  }
);

export { uploadRouter };
