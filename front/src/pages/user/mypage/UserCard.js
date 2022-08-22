import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";
import UserEditModal from "pages/modal/userEditModal/UserEditModal";
import FollowingModal from "pages/modal/FollowingModal";

const UserCard = ({ userId, owner }) => {
  const {
    imageLink,
    introduction,
    keywords,
    id,
    name,
    followers,
    followings,
    email,
  } = owner;
  const navigate = useNavigate();

  const isEditable = userId === id;
  const keywordsArr =
    keywords && keywords.length !== 0 ? Object.values(keywords[0]) : [];
  keywordsArr.splice(keywordsArr.length - 1, 1);
  const initalFollowState =
    followers && followers.findIndex((i) => i.follower?.id === userId) !== -1
      ? true
      : false;

  //팔로우 중인지 아닌지 확인하는 state
  const [isFollow, setIsFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [tab, setTab] = useState("");

  useEffect(() => {
    setIsFollow(initalFollowState);
    setFollowerCount(followers?.length || 0);
  }, [initalFollowState, followers]);

  const handleClickFollow = async () => {
    if (isFollow) {
      const res = await Api.put("user/unfollow", {
        userId,
        followingId: id,
      });
      const { following } = res.data;
      setFollowerCount(following.followers.length);
    } else {
      const res = await Api.put("user/follow", {
        userId,
        followingId: id,
      });
      const { following } = res.data;
      setFollowerCount(following.followers.length);
    }
    setIsFollow((prev) => !prev);
  };

  const handleClickFollowingTab = (tab) => {
    setTab(tab);
    setIsFollowingModalOpen(true);
  };

  return (
    <>
      <Container>
        <UserInfo>
          <UserImage src={imageLink} />
          <UserContent>
            <UserContentTitle>
              <h3>{name}님</h3>
              {!isEditable && (
                <button onClick={handleClickFollow}>
                  {isFollow ? "언팔로우" : "팔로우"}
                </button>
              )}
            </UserContentTitle>
            <p>{introduction}</p>
          </UserContent>
        </UserInfo>
        <Follows>
          <FollowsTitle>
            <p onClick={() => handleClickFollowingTab("following")}>팔로우</p>
            <p onClick={() => handleClickFollowingTab("follower")}>팔로워</p>
          </FollowsTitle>
          <FollowsContent>
            <p>{followings ? followings.length : 0}</p>
            <p>{followerCount}</p>
          </FollowsContent>
        </Follows>
        <ExtraInfo>
          <p>이메일</p>
          <input type="text" value={email || ""} disabled />
          {keywordsArr.length !== 0 && (
            <>
              <p>관심 키워드</p>
              <div style={{ whiteSpace: "pre-line" }}>
                {keywordsArr.map((k, idx) => (
                  <Keyword key={idx}>{k}</Keyword>
                ))}
              </div>
            </>
          )}
          {isEditable && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={() => setIsModalOpen(true)}>
                개인정보 수정
              </button>
            </div>
          )}
        </ExtraInfo>
        {isEditable && keywordsArr.length === 0 && (
          <RegisterKeyword>
            <button onClick={() => navigate("/keyword")}>
              관심 키워드 등록하기
            </button>
            <p>등록된 관심 키워드를 바탕으로 맞춤 기업을 추천해드립니다</p>
          </RegisterKeyword>
        )}
      </Container>
      {isEditable && isModalOpen && (
        <UserEditModal user={owner} setIsModalOpen={setIsModalOpen} />
      )}
      {isFollowingModalOpen && (
        <FollowingModal
          setIsModalOpen={setIsFollowingModalOpen}
          tabName={tab}
          followers={followers}
          followings={followings}
        />
      )}
    </>
  );
};

export default UserCard;

const Container = styled.div`
  width: 25%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const UserContent = styled.div`
  align-self: center;
  margin: 0;
  padding: 0 20px;
  > p {
    margin: 0;
  }
`;

const UserContentTitle = styled.div`
  display: flex;
  align-items: center;
  > h3 {
    font-size: 25px;
    font-weight: bold;
    margin: 0;
  }
  > button {
    height: 23px;
    font-size: 12px;
    background: #ff758f;
    border-radius: 5px;
    color: #fff;
    border: none;
    margin-left: 10px;
  }
`;
const UserImage = styled.img`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

const Follows = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 100%;
  padding: 3%;
  margin-top: 5%;
`;

const FollowsTitle = styled.div`
  text-align: center;
  > p {
    font-weight: bold;
    color: #ff758f;
    display: inline;
    margin: 0 10%;
    cursor: pointer;
  }
  > p:hover {
    text-decoration: underline;
  }
`;

const FollowsContent = styled.div`
  text-align: center;
  > p {
    font-size: 30px;
    font-weight: bold;
    display: inline-block;
    margin: 0 15%;
  }
`;

const ExtraInfo = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 100%;
  padding: 8%;
  margin-top: 5%;
  > p {
    font-size: 10px;
    margin: 2% 0;
  }
  > input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #000;
    margin-bottom: 8%;
  }
  > div > button {
    background: #fff;
    font-weight: bold;
    padding: 3% 10%;
    color: #ff758e;
    border-radius: 10px;
    border: 2px solid #ff758e;
  }
  > div > button:hover {
    background: #ff758e;
    color: #fff;
  }
`;

const RegisterKeyword = styled.div`
  text-align: center;
  margin-top: 5%;
  > button {
    font-size: 20px;
    font-weight: bold;
    padding: 3% 20%;
    border-radius: 10px;
    border: none;
    background: #ff758f;
    color: #fff;
  }
  > p {
    font-size: 13px;
    margin-top: 1%;
    color: #063dff;
  }
`;

const Keyword = styled.span`
  display: inline-block;
  background: #ffb8b8;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
  padding: 2% 5%;
  margin: 0 3% 3% 0;
`;
