import { useState } from "react";
import styled from "styled-components";
import AwardEditForm from "./AwardEditForm";
import * as Api from "api";

const AwardCard = ({ userId, award, setAwards, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await Api.delete("award", award.id);
      const res = await Api.get(`awardlist/${userId}`);
      setAwards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          award={award}
          setIsEditing={setIsEditing}
          userId={userId}
          setAwards={setAwards}
        />
      ) : (
        <CardContainer>
          <CardWrapper>
            <h3>{award.date}</h3>
            <Content>
              <h3>{award.title}</h3>
              <p>{award.description}</p>
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

export default AwardCard;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardWrapper = styled.div`
  display: flex;
  width: 80%;
  > h3 {
    font-size: 15px;
    font-weight: normal;
  }
`;

const Content = styled.div`
  margin-left: 30px;
  > h3 {
    font-size: 18px;
  }
  > p {
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
