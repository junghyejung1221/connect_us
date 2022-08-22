import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Api from "api";
import Header from "components/Header";
import styled from "styled-components";
import LoadingSpinner from "components/LoadingSpinner";
import PostCard from "components/PostCard";
import UserCard from "components/UserCard";
//import useUpdateEffect from "components/useUpdateEffect";

const SearchResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const option = searchParams.get("option");

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPostsNum, setTotalPostsNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bottomRef, setBottomRef] = useState(null);
  const [isFirst, setIsFirst] = useState(true);

  const getPostsData = async () => {
    if (page === 0) return;
    if (page > totalPage) return;
    try {
      setLoading(true);
      if (isFirst) {
        setIsFirst(false);
      } else {
        const res = await Api.get(
          "search",
          `${option}?page=${page}&perPage=${5}&keyword=${search}`
        );
        if (page === 1) {
          setUsers(res.data.users);
        }
        setPosts((cur) => [...cur, ...res.data.posts.posts]);
        setTotalPostsNum(res.data.posts.len);
        setTotalPage(res.data.posts.totalPage);
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    } catch (err) {
      setPosts([]);
      setTotalPostsNum(0);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await getPostsData();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (bottomRef) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(bottomRef);
    }
    return () => observer && observer.disconnect();
  }, [bottomRef]);

  // if (loading) {
  //   return (
  //     <Container>
  //       <Header />
  //       <LoadingSpinnerWrapper>
  //         <LoadingSpinner />
  //       </LoadingSpinnerWrapper>
  //     </Container>
  //   );
  // }

  return (
    <Container>
      <Header />
      <ResultPageWrapper>
        <UsersResultWrapper>
          {users.length !== 0 && (
            <UserCardWrapper>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </UserCardWrapper>
          )}
        </UsersResultWrapper>
        <PostsResultWrapper>
          <p>
            총 <span>{totalPostsNum}</span>개의 포스트
          </p>
          {totalPostsNum === 0 && <h3>검색 결과가 없습니다.</h3>}
          {posts.map((post, idx) => {
            if (idx === posts.length - 1) {
              return <PostCard key={post.id} post={post} isLast />;
            }
            return <PostCard key={post.id} post={post} />;
          })}
        </PostsResultWrapper>
      </ResultPageWrapper>
      {!loading && <div ref={setBottomRef} />}
      {loading && (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
    </Container>
  );
};

export default SearchResultPage;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const LoadingSpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultPageWrapper = styled.div`
  margin-top: 80px;
  width: 100%;
  padding: 0 5%;
`;

const UsersResultWrapper = styled.div`
  overflow-x: hidden;
`;

const UserCardWrapper = styled.div`
  overflow-x: scroll;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostsResultWrapper = styled.div`
  margin-top: 20px;
  > p {
    font-size: 20px;
    > span {
      font-weight: bold;
    }
  }
  > h3 {
    font-size: 20px;
    color: #7b7b7b;
  }
`;
