import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchPostCard from "./SearchPostCard";
import * as Api from "api";

const RecentPostsTab = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bottomRef, setBottomRef] = useState(null);
  const [isFirst, setIsFirst] = useState(true);

  const getRecentPosts = async () => {
    if (page === 0) return;
    if (page > totalPage) return;
    try {
      setLoading(true);
      if (isFirst) {
        setIsFirst(false);
      } else {
        const res = await Api.getWithoutParams(
          `postlist?page=${page}&perPage=8`
        );
        setPosts((cur) => [...cur, ...res.data.posts]);
        setTotalPage(res.data.totalPage);
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    } catch (err) {
      setPosts([]);
    }
  };

  useEffect(() => {
    getRecentPosts();
  }, []);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await getRecentPosts();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (bottomRef) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(bottomRef);
    }
    return () => observer && observer.disconnect();
  }, [bottomRef]);

  return (
    <Container>
      {posts.map((post, idx) => (
        <SearchPostCard post={post} key={idx} />
      ))}
      {!loading && <div ref={setBottomRef} />}
    </Container>
  );
};

export default RecentPostsTab;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
`;
