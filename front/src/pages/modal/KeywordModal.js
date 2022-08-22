import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const KeywordModal = ({ setIsModalOpen, type }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Section>
        <Content>
          <h4>나의 키워드를 저장하러 가시겠습니까?</h4>
          <p>
            {`키워드를 입력하면, ${
              type === "company" ? "구인자" : "기업"
            }을 추천 받으실 수 있습니다`}
            .
          </p>
        </Content>
        <Buttons>
          <button
            onClick={() => navigate("/keyword")}
            style={{ background: "#FF758F", color: "#fff" }}
          >
            키워드 입력하기
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ color: "#ff758f" }}
          >
            닫기
          </button>
        </Buttons>
      </Section>
    </Container>
  );
};

export default KeywordModal;

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
  padding: 30px;
  width: 500px;
  height: 250px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  > button {
    border-radius: 10px;
    width: 150px;
    height: 50px;
    border: none;
    font-weight: bold;
  }
`;
