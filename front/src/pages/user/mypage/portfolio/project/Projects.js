import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";
import ProjectCard from "./ProjectCard";
import ProjectAddForm from "./ProjectAddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Projects = ({ userId, isEditable }) => {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const getProjectList = async () => {
    try {
      const res = await Api.get(`projectlist/${userId}`);
      setProjects(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProjectList();
  }, [userId]);

  return (
    <ProjectContainer>
      <h3>프로젝트</h3>
      {isEditable && (
        <ButtonWrapper>
          <Button onClick={() => setIsAdding((prev) => !prev)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonWrapper>
      )}
      {isAdding && (
        <ProjectAddForm
          userId={userId}
          setIsAdding={setIsAdding}
          setProjects={setProjects}
        />
      )}
      {projects.length === 0 && !isAdding && (
        <div style={{ textAlign: "center" }}>
          <p>프로젝트를 추가해주세요!</p>
        </div>
      )}
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          userId={userId}
          project={project}
          setProjects={setProjects}
          isEditable={isEditable}
        />
      ))}
    </ProjectContainer>
  );
};

export default Projects;

const ProjectContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: solid 1px #c4c4c4;
  border-radius: 5px;
  padding: 1% 2%;
  > h3 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  border-radius: 50%;
  background: #feb8b8;
  color: #fff;
`;
