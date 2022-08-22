import PostCard from "components/PostCard";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPosts = ({ posts, page, totalPage, setPage }) => {
  const navigate = useNavigate();

  if (posts.length === 0) {
    return (
      <NoPostsContainer>
        <img src={`${process.env.PUBLIC_URL}/noContent.svg`} alt="No Posts" />
        <h3>게시글이 없습니다.</h3>
        <button onClick={() => navigate(`/post`)}>게시글 작성하기</button>
      </NoPostsContainer>
    );
  }

  return (
    <Container>
      {posts.map((post, idx) => {
        if (idx === posts.length - 1) {
          return <PostCard key={post.id} post={post} isLast />;
        }
        return <PostCard key={post.id} post={post} />;
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <PaginationButton>
          <button
            style={{
              borderRight: "1px solid #c4c4c4",
              marginRight: "10px",
            }}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page <= 1}
          >
            {"<"}
          </button>
          <span>
            {page}/{totalPage}
          </span>
          <button
            style={{ borderLeft: "1px solid #c4c4c4", marginLeft: "10px" }}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPage}
          >
            {">"}
          </button>
        </PaginationButton>
      </div>
    </Container>
  );
};

export default MyPosts;

const NoPostsContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  text-align: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  > img {
    margin-top: 5%;
    width: 45%;
  }
  > h3 {
    margin-top: 3%;
  }
  > button {
    margin-top: 1%;
    border-radius: 10px;
    border: none;
    font-size: 15px;
    padding: 1% 2%;
    color: #ff758e;
    font-weight: bold;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PaginationButton = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 12%;
  text-align: center;
  font-size: 20px;
  > button {
    border: none;
    background: transparent;
    font-weight: bold;
  }
  > button:hover {
    color: #ff758f;
  }
`;
