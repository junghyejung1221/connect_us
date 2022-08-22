import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { postService } from "../services/postService";
import { previewImgUpload } from "../utils/s3";

const postRouter = Router();

postRouter.post("/post/create", login_required, async (req, res, next) => {
  try {
    if (
      is.emptyObject(req.body) ||
      !req.body.userId ||
      !req.body.title ||
      !req.body.content ||
      !req.body.description
    ) {
      throw new Error(
        "데이터 생성에 필요한 정보가 없습니다. Body안의 데이터를 확인해주세요."
      );
    }
    const newPost = {
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
    };

    const post = await postService.addPost({ newPost });

    if (post.errorMessage) {
      throw new Error(post.errorMessage);
    }

    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/postlist", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.query)) {
      throw new Error("페이지네이션을 위한 쿼리를 확인해주세요.");
    }

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 8;

    const postlist = await postService.getPosts({ page, perPage });

    if (postlist.errorMessage) {
      throw new Error(postlist.errorMessage);
    }
    res.status(200).send(postlist);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/postlist/:userId", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.query)) {
      throw new Error("페이지네이션을 위한 쿼리를 확인해주세요.");
    }

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 3;

    const getPosts = {
      userId: req.params.userId,
      page: page,
      perPage: perPage,
    };

    const post = await postService.getPostsByUserId({ getPosts });

    if (post.errorMessage) {
      throw new Error(post.errorMessage);
    }

    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/posts/following", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.query)) {
      throw new Error("페이지네이션을 위한 쿼리를 확인해주세요.");
    }

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 3;
    const userId = req.currentUserId;

    const getPosts = {
      userId,
      page: page,
      perPage: perPage,
    };

    const followingPosts = await postService.getFollwingPostsByUserId({
      getPosts,
    });

    if (followingPosts.errorMessage) {
      throw new Error(post.errorMessage);
    }
    res.status(200).send(followingPosts);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/posts/popular", login_required, async (req, res, next) => {
  try {
    const count = Number(req.query.count) || 5;
    const type = "all";

    const postlist = await postService.getPopularPosts({ type, count });

    if (postlist.errorMessage) {
      throw new Error(postlist.errorMessage);
    }
    res.status(200).send(postlist);
  } catch (error) {
    next(error);
  }
});

postRouter.get(
  "/posts/popular/user",
  login_required,
  async (req, res, next) => {
    try {
      const count = Number(req.query.count) || 5;
      const type = "user";

      const postlist = await postService.getPopularPosts({ type, count });

      if (postlist.errorMessage) {
        throw new Error(postlist.errorMessage);
      }
      res.status(200).send(postlist);
    } catch (error) {
      next(error);
    }
  }
);

postRouter.get(
  "/posts/popular/company",
  login_required,
  async (req, res, next) => {
    try {
      const count = Number(req.query.count) || 5;
      const type = "company";

      const postlist = await postService.getPopularPosts({ type, count });

      if (postlist.errorMessage) {
        throw new Error(postlist.errorMessage);
      }
      res.status(200).send(postlist);
    } catch (error) {
      next(error);
    }
  }
);

postRouter.get("/post/:postId", login_required, async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await postService.getPostById({ id: postId });

    if (post.errorMessage) {
      throw new Error(post.errorMessage);
    }

    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
});

postRouter.put("/post/:postId", login_required, async (req, res, next) => {
  try {
    const id = req.params.postId;
    const toUpdate = { content: req.body.content };

    const updatedPost = await postService.updatePost({
      id,
      toUpdate,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

postRouter.post(
  "/post/:postId/preview",
  login_required,
  previewImgUpload.single("image"),
  async (req, res, next) => {
    try {
      const id = req.params.postId;
      const previewImageLink = req.file?.location ?? null;

      const toUpdate = {
        previewImageLink,
      };

      const updatedPost = await postService.updatePost({
        id,
        toUpdate,
      });

      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

postRouter.delete("/post/:postId", login_required, async (req, res, next) => {
  try {
    const id = req.params.postId;

    // 해당 리뷰 아이디로 리뷰 정보를 db에서 찾아 삭제함.
    const result = await postService.deletePost({ id });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

postRouter.put("/posts/like", login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const id = req.body.postId;
    const toUpdate = {
      userId,
    };
    const updatedPost = await postService.addLike({ id, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    next(error);
  }
});

postRouter.put("/posts/dislike", login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const id = req.body.postId;
    const toUpdate = {
      userId,
    };
    const updatedPost = await postService.deleteLike({ id, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    next(error);
  }
});

export { postRouter };
