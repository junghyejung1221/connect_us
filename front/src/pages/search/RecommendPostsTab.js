import styled from "styled-components";
import SearchPostCard from "./SearchPostCard";


const RecommendPostsTab = ({ posts }) => {
  return (
    <Container>
      {posts.map((post) => (
        <SearchPostCard post={post} key={post.id} />
      ))}
    </Container>
  );
};

export default RecommendPostsTab;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
`;
