import Header from "components/Header";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import styled from "styled-components";

import * as Api from "api";

const EditPostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = location.state;

  const editorRef = useRef(null);

  const [markdown, setMarkdown] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);

  const handleSubmit = async () => {
    try {
      await Api.put(`post/${post.id}`, {
        content: markdown,
      });
      navigate(`/post/${post.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeEditor = () => {
    if (editorRef.current) {
      setMarkdown(editorRef.current.getInstance().getMarkdown());
    }
  };

  const onUploadImage = async (blob, callback) => {
    const formData = new FormData();
    formData.append("image", blob);
    const res = await Api.postImage("uploadImage", formData);
    callback(res.data, "alt text");
    return false;
  };

  return (
    <Container>
      <Header />
      <PostHeader>
        <PostInputTitle
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <PostInputDescription
          placeholder="당신의 포스트를 짧게 소개해주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </PostHeader>
      <Editor
        initialValue={markdown}
        previewStyle="vertical"
        height="800px"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={onChangeEditor}
        ref={editorRef}
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
      />
      <MarginDiv></MarginDiv>
      <ButtonContainer>
        <ReturnButton onClick={() => navigate(`/post/${post.id}`)}>
          돌아가기
        </ReturnButton>
        <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default EditPostPage;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const PostHeader = styled.div`
  margin-top: 80px;
`;

const PostInputTitle = styled.input`
  width: 100%;
  height: 100px;
  font-size: 50px;
  border: none;
`;

const PostInputDescription = styled.textarea`
  display: block;
  width: 100%;
  height: 100px;
  font-size: 20px;
  border: none;
`;

const MarginDiv = styled.div`
  height: 100px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0px;
  display: flex;
  justify-content: right;
  background: #fff;
  height: 80px;
  width: 100%;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  align-items: center;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 4px;
  width: 100px;
  height: 50px;
  background: #ff758f;
  color: #fff;
  margin-right: 20px;
`;

const ReturnButton = styled.button`
  border: none;
  border-radius: 4px;
  width: 100px;
  height: 50px;
  color: #ff758f;
  background: transparent;
`;
