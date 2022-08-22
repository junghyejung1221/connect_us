import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";

const PostCommentCard = ({ comment, deleteClick, setPost, postId }) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleEdit = async (commentId) => {
    try {
      await Api.put(`comment/${commentId}`, {
        text,
      });
      const res = await Api.get(`post/${postId}`);
      setPost(res.data);
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Comment key={comment._id}>
      <CommentTitle>
        <h3 onClick={() => navigate(`/myPage/${comment.userId}`)}>
          {comment.userName}
        </h3>
        {!isEdit && (
          <Buttons>
            <button onClick={() => setIsEdit(true)}>수정</button>
            <button onClick={() => deleteClick(comment._id)}>삭제</button>
          </Buttons>
        )}
      </CommentTitle>
      {isEdit ? (
        <>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <CommentButtonWrapper>
            <button
              style={{
                background: "#fff",
                color: "#ff758f",
              }}
              onClick={() => setIsEdit(false)}
            >
              취소
            </button>
            <button onClick={() => handleEdit(comment._id)}>댓글 수정</button>
          </CommentButtonWrapper>
        </>
      ) : (
        <p>{comment.text}</p>
      )}
    </Comment>
  );
};
export default PostCommentCard;

const Comment = styled.div`
  border-bottom: 1px solid #e0e0e0;
  padding-top: 2%;
  &:last-child {
    border-bottom: none;
  }
  > p {
    margin-top: 10px;
  }
  > textarea {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 10px;
  }
`;

const CommentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  > h3 {
    font-size: 20px;
    cursor: pointer;
  }
  > h3:hover {
    text-decoration: underline;
  }
`;

const Buttons = styled.div`
  > button {
    border: none;
    background: transparent;
    color: #7b7b7b;
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
