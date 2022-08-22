import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { UserStateContext } from "../../components/ContextProvider";
import Header from "../../components/Header";
import LoadingSpinner from "components/LoadingSpinner";
import PostComment from "./PostComments";
import DeleteModal from "pages/modal/DeleteModal";
import { formatDate } from "./postModule";
import * as Api from "api";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const PostPage = () => {
  const { user } = useContext(UserStateContext);
  const navigate = useNavigate();

  const params = useParams();
  const { postId } = params;

  const [id, setId] = useState(user?.id || "");
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPost = async () => {
    setLoading(true);
    const res = await Api.get(`post/${postId}`);
    setPost(res.data);
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await Api.delete(`post/${post.id}`);
      setIsModalOpen(false);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      setId(user.id);
    }
    getPost();
  }, [user]);

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      </Container>
    );
  }

  console.log(post);
  return (
    <Container>
      <Header />
      <Post>
        <h1>{post.title}</h1>
        <PostInfo>
          <WriterInfo>
            <p>{post.userName}</p>
            <span>{formatDate(post.createdAt || "")}</span>
          </WriterInfo>
          {id === post.userId && (
            <WriterAuth>
              <button
                onClick={() => navigate("/post/write", { state: { post } })}
              >
                수정
              </button>
              <button onClick={() => setIsModalOpen(true)}>삭제</button>
            </WriterAuth>
          )}
        </PostInfo>
        <Description>{post.description}</Description>
        <Content>
          <Viewer
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            initialValue={post.content}
          />
        </Content>
      </Post>
      <WriterProfile>
        <ProfileImage onClick={() => navigate(`/myPage/${post.userId}`)} />
        <h3 onClick={() => navigate(`/myPage/${post.userId}`)}>
          {post.userName}
        </h3>
      </WriterProfile>
      <PostComment
        comments={post.comments || []}
        likes={post.likes || []}
        postId={post.id}
        userId={id}
        setPost={setPost}
      />
      {isModalOpen && (
        <DeleteModal
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
        />
      )}
    </Container>
  );
};

export default PostPage;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
`;

const Post = styled.div`
  margin-top: 100px;
  box-sizing: border-box;
  padding: 0 200px;
  > h1 {
    font-weight: bold;
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WriterInfo = styled.div`
  > p {
    display: inline-block;
    margin-right: 15px;
    font-weight: bold;
  }
  > span {
    color: #4d555b;
  }
`;

const WriterAuth = styled.div`
  > button {
    cursor: pointer;
    color: #969696;
    background: transparent;
    border: none;
  }
  > button:hover {
    color: #000;
  }
`;

const Content = styled.div`
  margin-top: 50px;
`;

const Description = styled.div`
  border: none;
  background: #f8f9fa;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
`;

const WriterProfile = styled.div`
  margin-top: 50px;
  padding: 0 200px;
  box-sizing: border-box;
  display: flex;
  > h3 {
    cursor: pointer;
    align-self: center;
    margin-left: 30px;
  }
  > h3:hover {
    text-decoration: underline;
  }
`;

const ProfileImage = styled.div`
  background-color: #c4c4c4;
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;
