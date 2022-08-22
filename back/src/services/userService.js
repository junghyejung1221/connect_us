import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { UserModel } from "../db/schemas/user";

class userAuthService {
  //회원가입 시 사용하는 함수
  static async addUser({ type, name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, type, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async addCompanyUser({
    type,
    name,
    email,
    password,
    registerNumber,
    ownerName,
  }) {
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = {
      id,
      type,
      name,
      email,
      password: hashedPassword,
      registerNumber,
      ownerName,
    };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  //로그인 시 사용하는 함수
  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const keywords = user.keywords;
    const followers = user.followers;
    const followings = user.followings;
    const type = user.type;
    const introduction = user.introduction;
    const imageLink = user.imageLink;

    const loginUser = {
      token,
      id,
      email,
      name,
      keywords,
      followers,
      followings,
      type,
      introduction,
      imageLink,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async setUser({ userId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.introduction) {
      const fieldToUpdate = "introduction";
      const newValue = toUpdate.introduction;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.imageLink) {
      const fieldToUpdate = "imageLink";
      const newValue = toUpdate.imageLink;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }
    return user;
  }

  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  static async setKeywords({ userId, toUpdate }) {
    const updatedKeywords = await UserModel.findOneAndUpdate(
      { id: userId },
      {
        $set: {
          keywords: toUpdate,
        },
      },
      { returnOriginal: false }
    );
    return updatedKeywords;
  }

  static async setPassowrd({ userId, password, newPassword }) {
    const user = await User.findById({ userId });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const fieldToUpdate = "password";
    const newValue = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.update({ userId, fieldToUpdate, newValue });

    if (!updatedUser) {
      const errorMessage = "비밀번호 업데이트에 실패했습니다.";
      return { errorMessage };
    }

    return updatedUser;
  }

  static async setSocials({ userId, toUpdate }) {
    const updatedSocials = await User.updateSocialData({ userId, toUpdate });
    return updatedSocials;
  }

  static async setFollow({ userId, followingId }) {
    const user = await User.findById({ userId });
    const userOid = user._id;

    const following = await User.findById({ userId: followingId });
    const followingOid = following._id;

    const updatedUser = await User.addFollowing({ userId, followingOid });
    const updatedFollowing = await User.addFollower({ followingId, userOid });

    return { updatedUser, updatedFollowing };
  }

  static async deleteFollow({ userId, followingId }) {
    const user = await User.findById({ userId });
    const userOid = user._id;

    const following = await User.findById({ userId: followingId });
    const followingOid = following._id;

    const updatedUser = await User.deleteFollowing({ userId, followingOid });
    const updatedFollowing = await User.deleteFollower({
      followingId,
      userOid,
    });

    return { updatedUser, updatedFollowing };
  }
}

export { userAuthService };
