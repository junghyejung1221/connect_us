import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <img
        src={`${process.env.PUBLIC_URL}/not_found_img.svg`}
        alt="not_found"
      />
      <p>찾을 수 없는 페이지입니다.</p>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    width: 50%;
    height: 50%;
  }
  > p {
    margin-top: 3%;
  }
  > button {
    border: 3px solid #000;
    font-size: 20px;
    padding: 0.5% 1%;
    background: transparent;
  }
  > button:hover {
    background: #000;
    color: #fff;
  }
`;
