import { useEffect, useState } from "react";
import styled from "styled-components";
import * as Api from "api";
import LoadingSpinner from "components/LoadingSpinner";
import Header from "../../components/Header";
import SearchInputForm from "./SearchInputForm";
import SearchTabs from "./SearchTabs";
import UserPopularPostsTab from "./UserPopularPostsTab";
import CompanyPopularPostsTab from "./CompanyPopularPostsTab";
import RecentPostsTab from "./RecentPostsTab";
import RecommendPostsTab from "./RecommendPostsTab";
import UserCard from "../user/mypage/UserCard";


const SearchPage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [companyPosts, setCompanyPosts] = useState([]);
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("user");
  const [page, setPage] = useState(1);

  const getPopularPosts = async () => {
    const getUserPopularPosts = Api.get("posts", "popular/user?count=12");
    const getCompanyPopularPosts = Api.get("posts", "popular/company?count=12");

    try {
      setLoading(true);

      const [userPopularPosts, companyPopularPosts] = await Promise.all([
        getUserPopularPosts,
        getCompanyPopularPosts,
      ]);

      setUserPosts(userPopularPosts.data);
      setCompanyPosts(companyPopularPosts.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularPosts();
  }, []);

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

  return (
    <Container>
      <Header />
      <Content>
        <SearchInputForm />
        <SearchTabs tab={tab} setTab={setTab} />
        {tab === "user" && <UserPopularPostsTab posts={userPosts} />}
        {tab === "company" && <CompanyPopularPostsTab posts={companyPosts} />}
        {tab === "recent" && <RecentPostsTab />}
        {tab === "recommend" && <RecommendPostsTab posts={userPosts} />}
      </Content>
    </Container>
  );
};

export default SearchPage;

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
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
