import styled from "styled-components";

const DeleteModal = ({ isComment, setIsModalOpen, handleDelete }) => {
  return (
    <Container>
      <Section>
        <Content>
          <h4>{isComment ? "댓글 " : "게시글 "}삭제</h4>
          <p>{isComment ? "댓글" : "게시글"}을 정말로 삭제하시겠습니까?</p>
        </Content>
        <Buttons>
          <button
            onClick={handleDelete}
            style={{ background: "#FF758F", color: "#fff" }}
          >
            확인
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ color: "#ff758f" }}
          >
            취소
          </button>
        </Buttons>
      </Section>
    </Container>
  );
};

export default DeleteModal;

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
