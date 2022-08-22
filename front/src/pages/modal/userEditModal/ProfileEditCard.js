import { useState } from "react";
import styled from "styled-components";
import * as Api from "api";

const DEFAULT_IMAGE =
  "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png";

const ProfileEditCard = ({ user, setUser }) => {
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState(user.name);
  const [introduction, setIntroduction] = useState(user.introduction);

  const handleSubmitContent = async () => {
    try {
      const res = await Api.put(`users/${user.id}`, {
        name,
        introduction,
      });
      setUser(res.data);
      setIsProfileEdit(false);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleProfileImageChange = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("image", img);
    try {
      setIsUploading(true);

      const res = await Api.postImage(`user/${user.id}/profileImage`, formData);
      console.log(res.data);
      setIsUploading(false);

      setUser(res.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const deleteProfileImage = async () => {
    const splitted = user.imageLink.split("/");
    const fileName = splitted[splitted.length - 1];

    try {
      await Api.post("user/deleteImage", {
        fileName,
      });
      const res = await Api.put(`users/${user.id}`, {
        imageLink: DEFAULT_IMAGE,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileContainer>
      <ProfileImageContainer>
        <img src={user.imageLink} alt="profile_image" />
        <label htmlFor="profile">
          <div>{isUploading ? "업로드 중.." : "이미지 업로드"}</div>
        </label>
        <input
          type="file"
          id="profile"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleProfileImageChange}
        />
        <button onClick={deleteProfileImage}>이미지 삭제</button>
      </ProfileImageContainer>
      <ProfileContentContainer>
        {isProfileEdit ? (
          <ProfileEditForm>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="나를 나타내는 한 줄 소개를 작성해주세요."
            />
            <div>
              <button onClick={handleSubmitContent}>저장</button>
            </div>
          </ProfileEditForm>
        ) : (
          <>
            <h3>{user.name}</h3>
            <p>{user.introduction}</p>
            <button onClick={() => setIsProfileEdit(true)}>수정</button>
          </>
        )}
      </ProfileContentContainer>
    </ProfileContainer>
  );
};

export default ProfileEditCard;

const ProfileContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ProfileImageContainer = styled.div`
  width: 20%;
  text-align: center;
  margin-right: 20px;
  > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  > label {
    width: 100%;
    position: absoulte;
  }
  > button,
  > label > div {
    width: 100%;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 1%;
    cursor: pointer;
    background: #efefef;
  }
`;

const ProfileContentContainer = styled.div`
  width: 70%;
  > button {
    border: none;
    background: transparent;
    text-decoration: underline;
    color: #ff758e;
  }
  > button:hover {
    color: #feb8b8;
  }
`;

const ProfileEditForm = styled.div`
  > input:nth-child(1) {
    height: 45px;
    font-size: 20px;
  }
  > div {
    text-align: right;
    > button {
      border-radius: 10px;
      padding: 1% 3%;
      border: none;
      background: #ff758e;
      color: #fff;
    }
  }
`;
