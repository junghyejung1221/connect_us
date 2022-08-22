import { useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import * as Api from "api";
import DeleteModal from "pages/modal/DeleteModal";
import PostCommentCard from "./PostCommentCard";
import LikeButton from "./LikeButton";

const PostComments = ({ comments, likes, postId, userId, setPost }) => {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curCommentId, setCurCommentId] = useState("");
  const [isCommentShow, setIsCommentShow] = useState(false);

  const handleDelete = async () => {
    try {
      await Api.delete(`comment/${curCommentId}`);
      const res = await Api.get(`post/${postId}`);
      setPost(res.data);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteClick = (commentId) => {
    setIsModalOpen(true);
    setCurCommentId(commentId);
  };

  const handleSubmit = async () => {
    try {
      await Api.post("comment/create", {
        postId,
        text,
      });
      const res = await Api.get(`post/${postId}`);
      setPost(res.data);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CommentContainer>
        <Buttons>
          <LikeButton likes={likes} userId={userId} postId={postId} />
          <Button
            variant="outline-dark"
            onClick={() => setIsCommentShow((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faCommentDots} />
            {` 댓글 ${comments.length} `}
            {isCommentShow ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </Button>
        </Buttons>
        {isCommentShow && (
          <>
            <Comments>
              {comments.map((comment) => (
                <PostCommentCard
                  comment={comment}
                  deleteClick={deleteClick}
                  setPost={setPost}
                  postId={postId}
                />
              ))}
            </Comments>
            <textarea
              placeholder="댓글을 작성하세요"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <CommentButtonWrapper>
              <button onClick={handleSubmit}>댓글 작성</button>
            </CommentButtonWrapper>
          </>
        )}
      </CommentContainer>
      {isModalOpen && (
        <DeleteModal
          isComment
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default PostComments;

const CommentContainer = styled.div`
  padding: 0 200px;
  box-sizing: border-box;
  margin: 50px 0;
  > textarea {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 10px;
  }
`;

const CommentButtonWrapper = styled.div`
  text-align: right;
  > button {
    border: none;
    border-radius: 5px;
    background-color: #ff758f;
    box-sizing: border-box;
    padding: 5px 10px;
    color: #fff;
    margin-top: 10px;
    margin-left: 5px;
  }
`;

const Comments = styled.div`
  margin: 30px 0;
`;

const Buttons = styled.div`
  display: flex;
  > button {
    margin-right: 10px;
  }
`;
