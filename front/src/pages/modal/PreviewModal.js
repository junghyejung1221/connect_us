import styled from "styled-components";
import { useState } from "react";
import * as Api from "api";
import { useNavigate } from "react-router-dom";

const DEFAULT_POST_IMG =
  "https://connectusbucket.s3.ap-northeast-2.amazonaws.com/defaultPostImg.jpeg";

const PreviewModal = ({ setIsModalOpen, handleContentSubmit }) => {
  const navigate = useNavigate();
  const [pickedImg, setPickedImg] = useState({
    preview: "",
    data: "",
  });
  const [isPicked, setIsPicked] = useState(false);
  const handleImageChange = async (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setPickedImg(img);
    setIsPicked(true);
  };
  const handleCurImageDelete = () => {
    const img = {
      preview: "",
      data: "",
    };
    setPickedImg(img);
    setIsPicked(false);
  };

  const handleSubmit = async () => {
    try {
      const postId = await handleContentSubmit();
      const formData = new FormData();
      formData.append("image", pickedImg.data);
      await Api.postImage(`post/${postId}/preview`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Section>
        <div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h4>포스트 미리보기</h4>
          </div>
          {isPicked && (
            <PickedButtons>
              <label htmlFor="reupload">
                <div>재업로드</div>
              </label>
              <input
                type="file"
                id="reupload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <button onClick={handleCurImageDelete}>제거</button>
            </PickedButtons>
          )}
          <ImagePicker>
            <img
              src={isPicked ? pickedImg.preview : DEFAULT_POST_IMG}
              alt="preview_img"
            />
            {!isPicked && (
              <>
                <label htmlFor="upload">
                  <div>이미지 업로드</div>
                </label>
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </>
            )}
          </ImagePicker>
          <p>
            이미지를 업로드하지 않으면 상단의 기본 이미지가 미리보기로
            지정됩니다
          </p>
        </div>
        <ButtonWrapper>
          <button
            onClick={handleSubmit}
            style={{ background: "#FF758F", color: "#fff" }}
          >
            출간하기
          </button>
        </ButtonWrapper>
      </Section>
    </Container>
  );
};

export default PreviewModal;

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
  width: 550px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PickedButtons = styled.div`
  text-align: right;
  margin-right: 13%;
  > button,
  > label > div {
    background: transparent;
    margin-right: 3px;
    border: none;
    text-decoration: underline;
    color: #554994;
    font-weight: bold;
    cursor: pointer;
  }
  > button:hover,
  > label > div:hover {
    color: #8777e5;
  }
`;

const ImagePicker = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 20px;
  > img {
    width: 350px;
    height: 250px;
    object-fit: cover;
  }
  > label > div {
    position: absolute;
    right: 191px;
    bottom: 105px;
    background: #000;
    border: none;
    border-radius: 5px;
    color: #ff758f;
    padding: 2%;
    font-weight: bold;
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  text-align: right;
  > button {
    border-radius: 5px;
    width: 100px;
    height: 40px;
    border: none;
    font-weight: bold;
    background: #ff758f;
    color: #fff;
  }
`;
