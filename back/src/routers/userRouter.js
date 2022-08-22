import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { userImgUpload, deleteImg } from "../utils/s3";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const type = req.body.type;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let newUser;
    if (type === "user") {
      // 위 데이터를 유저 db에 추가하기
      newUser = await userAuthService.addUser({
        type,
        name,
        email,
        password,
      });
    } else {
      const registerNumber = req.body.registerNumber;
      const ownerName = req.body.ownerName;

      newUser = await userAuthService.addCompanyUser({
        type,
        name,
        email,
        password,
        registerNumber,
        ownerName,
      });
    }

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  "/user/:userId/profileImage",
  login_required,
  userImgUpload.single("image"),
  async function (req, res, next) {
    try {
      const userId = req.params.userId;

      if (userId !== req.currentUserId) {
        throw new Error("다른 소유자의 프로필 사진을 변경할 권한이 없습니다.");
      }

      const toUpdate = { imageLink: req.file.location };
      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }
      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  "/user/deleteImage",
  login_required,
  async function (req, res, next) {
    try {
      const fileName = req.body.fileName;
      deleteImg("users", fileName);
      res.status(200).send("delete success!");
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/user/follow",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.body.userId;
      const followingId = req.body.followingId;

      const { updatedUser, updatedFollowing } = await userAuthService.setFollow(
        {
          userId,
          followingId,
        }
      );

      res.status(200).send({ user: updatedUser, following: updatedFollowing });
    } catch (err) {
      next(err);
    }
  }
);

userAuthRouter.put(
  "/user/unfollow",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.body.userId;
      const followingId = req.body.followingId;

      const { updatedUser, updatedFollowing } =
        await userAuthService.deleteFollow({
          userId,
          followingId,
        });

      res.status(200).send({ user: updatedUser, following: updatedFollowing });
    } catch (err) {
      next(err);
    }
  }
);

userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const userId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const introduction = req.body.introduction ?? null;
      const imageLink = req.body.imageLink ?? null;

      const toUpdate = { name, email, introduction, imageLink };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:id/password",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const password = req.body.password;
      const newPassword = req.body.newPassword;

      const updatedUser = await userAuthService.setPassowrd({
        userId,
        password,
        newPassword,
      });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }
      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  "/users/keywords",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.body.id;

      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      const job = req.body.job;
      const jobDetail = req.body.jobDetail;
      const workPlace = req.body.workPlace;
      const career = req.body.career;
      const education = req.body.education;
      const employ = req.body.employ;

      const toUpdate = {
        job,
        jobDetail,
        workPlace,
        career,
        education,
        employ,
      };

      const updatedKeywordUser = await userAuthService.setKeywords({
        userId,
        toUpdate,
      });

      res.status(200).send(updatedKeywordUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  "/users/social",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      const github = req.body.github ?? "";
      const behance = req.body.behance ?? "";
      const twitter = req.body.twitter ?? "";
      const facebook = req.body.facebook ?? "";
      const linkedIn = req.body.linkedIn ?? "";
      const homepage = req.body.homepage ?? "";
      const blog = req.body.blog ?? "";

      const toUpdate = {
        github,
        behance,
        twitter,
        facebook,
        linkedIn,
        homepage,
        blog,
      };

      const updatedKeywordUser = await userAuthService.setSocials({
        userId,
        toUpdate,
      });

      res.status(200).send(updatedKeywordUser);
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
