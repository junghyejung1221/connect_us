import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";
import EducationCard from "./EducationCard";
import EducationAddForm from "./EducationAddForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Educations = ({ userId, isEditable }) => {
  const [educations, setEducations] = useState([]);

  const [isAdding, setIsAdding] = useState(false);

  const getEducationList = async () => {
    try {
      const res = await Api.get(`educationlist/${userId}`);
      setEducations(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getEducationList();
  }, [userId]);

  return (
    <EductaionContainer>
      <h3>학력</h3>
      {isEditable && (
        <ButtonWrapper>
          <Button onClick={() => setIsAdding(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonWrapper>
      )}
      {isAdding && (
        <EducationAddForm
          userId={userId}
          setIsAdding={setIsAdding}
          setEducations={setEducations}
        />
      )}
      {educations.length === 0 && !isAdding && (
        <div style={{ textAlign: "center" }}>
          <p>학력을 추가해주세요!</p>
        </div>
      )}
      {educations.map((education) => (
        <EducationCard
          key={education.id}
          userId={userId}
          education={education}
          setEducations={setEducations}
          isEditable={isEditable}
        />
      ))}
    </EductaionContainer>
  );
};

export default Educations;

const EductaionContainer = styled.div`
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
