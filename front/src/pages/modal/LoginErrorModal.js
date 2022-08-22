import styled from "styled-components";

const LoginErrorModal = ({ setIsModalOpen, errorMessage }) => {
  return (
    <Container>
      <Section>
        <Content>
          <h4>로그인에 실패했습니다. </h4>
          <p>{errorMessage}</p>
        </Content>
        <ButtonWrapper>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ background: "#FF758F", color: "#fff" }}
          >
            확인
          </button>
        </ButtonWrapper>
      </Section>
    </Container>
  );
};

export default LoginErrorModal;

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

const ButtonWrapper = styled.div`
  text-align: center;
  > button {
    border-radius: 10px;
    width: 150px;
    height: 50px;
    border: none;
    font-weight: bold;
    background: "#FF758F";
    color: "#fff";
  }
`;
