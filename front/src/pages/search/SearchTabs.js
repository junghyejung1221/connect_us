import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const SearchTabs = ({ tab, setTab }) => {
  const navigate = useNavigate();

  const handleClick = (tab) => () => {
    setTab(tab);
    navigate(`/search?tab=${tab}`, { replace: true });
  };

  return (
    <TabsContainer>
      <Tab onClick={handleClick("user")} borderBottom={tab === "user"}>
        <span>구직자 인기글</span>
      </Tab>
      <Tab onClick={handleClick("company")} borderBottom={tab === "company"}>
        <span>구인자 인기글</span>
      </Tab>
      <Tab onClick={handleClick("recent")} borderBottom={tab === "recent"}>
        <span>최신</span>
      </Tab>
      <Tab onClick={handleClick("recommend")} borderBottom={tab === "recommend"}>
        <span>추천</span>
      </Tab>
    </TabsContainer>
  );
};

export default SearchTabs;

const TabsContainer = styled.div`
  position: absolute;
  top: 170px;
  z-index: 5;
  width: 100%;
  display: flex;
`;

const Tab = styled.div`
  cursor: pointer;
  width: 10%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ;
  border-bottom: ${(props) => props.borderBottom};
  span {
    pointer-events: none;
  }
  ${(props) =>
    props.borderBottom &&
    css`
      border-bottom: 2px solid #000;
      span {
        font-weight: bold;
      }
    `}
`;
