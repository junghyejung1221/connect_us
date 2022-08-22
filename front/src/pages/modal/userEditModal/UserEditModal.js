import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PasswordEditCard from "./PasswordEditCard";
import ProfileCard from "./ProfileEditCard";
import SocialDataEditCard from "./SocialDataEditCard";

const UserEditModal = ({ setIsModalOpen, user }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user);

  const handleClose = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <Container>
      <Section>
        <Title>
          <h4>나의 정보 수정</h4>
        </Title>
        <CloseButton onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
        <Content>
          <ProfileCard user={userData} setUser={setUserData} />
          <PasswordEditCard userId={userData.id} setUser={setUserData} />
          <ContentEditCard>
            <h3>키워드 수정</h3>
            <button onClick={() => navigate("/keyword")}>수정</button>
          </ContentEditCard>
          <SocialDataEditCard user={userData} setUser={setUserData} />
          <ContentEditCard>
            <h3>회원 탈퇴</h3>
            <div>
              <button>회원탈퇴</button>
              <p>탈퇴 시 사용자 정보는 복구되지 않습니다.</p>
            </div>
          </ContentEditCard>
        </Content>
      </Section>
    </Container>
  );
};

export default UserEditModal;

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
  padding: 30px;
  width: 700px;
  height: 600px;
  background-color: white;
  border-radius: 5px;
  overflow-y: hidden;
`;

const Title = styled.div`
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

const Content = styled.div`
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 90%;
  input {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    padding: 1%;
  }
`;

const ContentEditCard = styled.div`
  margin-top: 5%;
  display: flex;
  margin-left: 3%;
  > h3 {
    width: 20%;
    font-size: 20px;
    margin-right: 22px;
    margin-bottom: 0;
  }
  > button {
    border: none;
    background: transparent;
    text-decoration: underline;
    color: #ff758e;
  }
  > button:hover {
    color: #feb8b8;
  }
  > div {
    button {
      border-radius: 5px;
      padding: 1% 3%;
      border: none;
      background: #ff3f3f;
      color: #fff;
    }
    p {
      margin-top: 5px;
      color: #7b7b7b;
      font-size: 13px;
    }
  }
`;
