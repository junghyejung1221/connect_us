import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DEFAULT_PROFILE_IMG =
  "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultImage.png";

const FollowingModal = ({ setIsModalOpen, tabName, followers, followings }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(tabName);
  return (
    <Container>
      <Section>
        <CloseButton onClick={() => setIsModalOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
        <Content>
          <TabContainer>
            <Tab
              onClick={() => setTab("following")}
              borderBottom={tab === "following"}
            >
              <span>팔로잉</span>
            </Tab>
            <Tab
              onClick={() => setTab("follower")}
              borderBottom={tab === "follower"}
            >
              <span>팔로워</span>
            </Tab>
          </TabContainer>
          {tab === "following" && (
            <FollowingContainer>
              {followings.map((f) => (
                <div key={f.following.id}>
                  <img
                    src={f.following?.imageLink ?? DEFAULT_PROFILE_IMG}
                    alt="profile"
                  />
                  <span onClick={() => navigate(`/myPage/${f.following.id}`)}>
                    {f.following.name}
                  </span>
                </div>
              ))}
              {followings.length === 0 && <p>팔로잉 목록이 없습니다.</p>}
            </FollowingContainer>
          )}
          {tab === "follower" && (
            <FollowingContainer>
              {followers.map((f) => (
                <div key={f.follower.id}>
                  <img
                    src={f.follower?.imageLink ?? DEFAULT_PROFILE_IMG}
                    alt="profile"
                  />
                  <span onClick={() => navigate(`/myPage/${f.follower.id}`)}>
                    {f.following.name}
                  </span>
                </div>
              ))}
              {followers.length === 0 && <p>팔로워 목록이 없습니다.</p>}
            </FollowingContainer>
          )}
        </Content>
      </Section>
    </Container>
  );
};

export default FollowingModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(100, 100, 100, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  position: relative;
  padding: 15px 20px 15px 30px;
  width: 800px;
  height: 600px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  z-index: 6;
`;

const Content = styled.div`
  position: relative;
  overflow-y: hidden;
`;

const TabContainer = styled.div`
  position: absolute;
  z-index: 5;
  width: 90%;
  display: flex;
`;
const Tab = styled.div`
  cursor: pointer;
  width: 10%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ;
  border-bottom: ${(props) => props.borderBottom};
  span {
    pointer-events: none;
  }
  ${(props) =>
    props.borderBottom &&
    css`
      border-bottom: 2px solid #000;
      span {
        font-weight: bold;
      }
    `}
`;

const FollowingContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 70px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  > div {
    margin-bottom: 20px;
    > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
    > span:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
