import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { commentService } from "../services/commentService";

const commentRouter = Router();

commentRouter.post(
  "/comment/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        const error = new Error(
          "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요"
        );
        error.statusCode = 400;
        throw error;
      }

      const userId = req.currentUserId; // 현재 로그인된 사용자 id를 추출함.
      const { postId, text } = req.body;

      // 위 데이터를 db에 추가함.
      const createdNewComment = await commentService.createComment({
        postId,
        userId,
        text,
      });

      res.status(201).json(createdNewComment);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.put(
  "/comment/:commentId",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.commentId;
      const toUpdate = { text: req.body.text };

      // 해당 댓글 아이디로 댓글 정보를 db에서 찾아 업데이트함.
      const updatedComment = await commentService.updateComment({
        id,
        toUpdate,
      });

      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.delete(
  "/comment/:commentId",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.commentId;

      // 해당 댓글 아이디로 댓글 정보를 db에서 찾아 삭제함.
      const result = await commentService.deleteComment({ id });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { commentRouter };
