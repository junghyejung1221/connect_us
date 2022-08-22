import { useState } from "react";
import styled from "styled-components";
import EducationEditForm from "./EducationEditForm";
import * as Api from "api";

const EducationCard = ({ userId, education, setEducations, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await Api.delete("educations", education.id);
      const res = await Api.get(`educationlist/${userId}`);
      setEducations(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          education={education}
          setIsEditing={setIsEditing}
          userId={userId}
          setEducations={setEducations}
        />
      ) : (
        <CardContainer>
          <CardWrapper>
            <Date>
              <h3>
                {education.admission} ~ {education.graduate}
              </h3>
              <p>{education.position}</p>
            </Date>
            <Content>
              <h3>{education.school}</h3>
              <p>{education.major}</p>
            </Content>
          </CardWrapper>
          {isEditable && (
            <Buttons>
              <button onClick={() => setIsEditing(true)}>편집</button>
              <button onClick={handleDelete}>삭제</button>
            </Buttons>
          )}
        </CardContainer>
      )}
    </>
  );
};

export default EducationCard;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardWrapper = styled.div`
  display: flex;
  width: 80%;
`;

const Date = styled.div`
  > h3 {
    font-size: 15px;
    font-weight: normal;
  }
  > p {
    font-size: 15px;
    color: #3399ff;
  }
`;

const Content = styled.div`
  margin-left: 30px;
  > h3 {
    display: inline-block;
    font-size: 18px;
  }
  > p {
    display: inline-block;
    margin-left: 10px;
    font-size: 15px;
    color: #666;
  }
`;

const Buttons = styled.div`
  width: 20%;
  text-align: right;
  > button {
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    padding: 5px 10px;
  }
`;
