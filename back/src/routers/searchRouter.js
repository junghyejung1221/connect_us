import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { searchService } from "../services/searchService";

const searchRouter = Router();
searchRouter.use(login_required);

searchRouter.get("/search/all", async function (req, res, next) {
  try {
    if (is.emptyObject(req.query)) {
      throw new Error("페이지네이션을 위한 쿼리를 확인해주세요.");
    }
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const keyword = req.query.keyword;
    const getResults = {
      keyword,
      page,
      perPage,
    };

    const result = await searchService.getResultsByKeyword({ getResults });

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

searchRouter.get("/search/user", async function (req, res, next) {
  try {
    if (is.emptyObject(req.query)) {
      throw new Error("페이지네이션을 위한 쿼리를 확인해주세요.");
    }
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword;
    const getResults = {
      name: keyword,
      page,
      perPage,
    };

    const result = await searchService.getResultsByName({ getResults });

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

searchRouter.get("/search/title", async function (req, res, next) {
  try {
    if (is.emptyObject(req.query)) {
      throw new Error("페이지네이션을 위한 쿼리를 확인해주세요.");
    }
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword;
    const getResults = {
      title: keyword,
      page,
      perPage,
    };

    const result = await searchService.getResultsByTitle({ getResults });

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

searchRouter.get("/search/content", async function (req, res, next) {
  try {
    if (is.emptyObject(req.query)) {
      throw new Error("페이지네이션을 위한 쿼리를 확인해주세요.");
    }
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword;
    const getResults = {
      content: keyword,
      page,
      perPage,
    };

    const result = await searchService.getResultsByContent({ getResults });

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

export { searchRouter };
