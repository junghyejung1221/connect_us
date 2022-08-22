import styled from "styled-components";
import SearchPostCard from "./SearchPostCard";

const CompanyPopularPostsTab = ({ posts }) => {
  return (
    <Container>
      <Container>
        {posts.map((post) => (
          <SearchPostCard post={post} key={post.id} />
        ))}
      </Container>
    </Container>
  );
};

export default CompanyPopularPostsTab;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
`;
