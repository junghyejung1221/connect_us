import styled from "styled-components";
import { useState } from "react";
import * as Api from "api";

const PasswordEditCard = ({ userId, setUser }) => {
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [curPassword, setCurPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPw, setConfirmedPw] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await Api.put(`users/${userId}/password`, {
        password: curPassword,
        newPassword: password,
      });
      setUser(res.data);
      setIsEditPassword(false);
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <ContentEditCard>
      <h3>비밀번호 수정</h3>
      {!isEditPassword ? (
        <button onClick={() => setIsEditPassword(true)}>수정</button>
      ) : (
        <EditForm>
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={curPassword}
            onChange={(e) => setCurPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="신규 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmedPw}
            onChange={(e) => setConfirmedPw(e.target.value)}
          />
          <div>
            <button onClick={handleSubmit}>저장</button>
          </div>
        </EditForm>
      )}
    </ContentEditCard>
  );
};

export default PasswordEditCard;

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
`;

const EditForm = styled.div`
  width: 70%;
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
