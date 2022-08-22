import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";
import AwardCard from "./AwardCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AwardAddForm from "./AwardAddForm";

const Awards = ({ userId, isEditable }) => {
  const [awards, setAwards] = useState([]);

  const [isAdding, setIsAdding] = useState(false);

  const getAwardList = async () => {
    try {
      const res = await Api.get(`awardlist/${userId}`);
      setAwards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAwardList();
  }, [userId]);

  return (
    <CertificateContainer>
      <h3>수상경력</h3>
      {isEditable && (
        <ButtonWrapper>
          <Button onClick={() => setIsAdding((prev) => !prev)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonWrapper>
      )}
      {isAdding && (
        <AwardAddForm
          userId={userId}
          setIsAdding={setIsAdding}
          setAwards={setAwards}
        />
      )}
      {awards.length === 0 && !isAdding && (
        <div style={{ textAlign: "center" }}>
          <p>자격증을 추가해주세요!</p>
        </div>
      )}
      {awards.map((award) => (
        <AwardCard
          key={award.id}
          userId={userId}
          award={award}
          setAwards={setAwards}
          isEditable={isEditable}
        />
      ))}
    </CertificateContainer>
  );
};

export default Awards;

const CertificateContainer = styled.div`
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
