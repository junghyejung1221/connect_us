import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Educations from "./portfolio/education/Educations";
import Projects from "./portfolio/project/Projects";
import Certificates from "./portfolio/certificate/Certificates";
import Awards from "./portfolio/award/Awards";
import { UserStateContext } from "components/ContextProvider";

const MyPortfolioTab = () => {
  const { user } = useContext(UserStateContext);
  const { ownerId } = useParams();

  const [isEditable, setIsEditable] = useState(ownerId === user?.id);

  useEffect(() => {
    if (user) {
      setIsEditable(ownerId === user.id);
    }
  }, [user]);

  return (
    <Container>
      <Educations userId={ownerId} isEditable={isEditable} />
      <Projects userId={ownerId} isEditable={isEditable} />
      <Certificates userId={ownerId} isEditable={isEditable} />
      <Awards userId={ownerId} isEditable={isEditable} />
    </Container>
  );
};

export default MyPortfolioTab;

const Container = styled.div`
  width: 100%;
  height: 90%;
  margin-top: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
