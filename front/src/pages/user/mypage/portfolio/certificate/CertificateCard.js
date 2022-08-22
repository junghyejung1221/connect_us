import { useState } from "react";
import styled from "styled-components";
import CertificateEditForm from "./CertificateEditForm";
import * as Api from "api";

const CertificateCard = ({
  userId,
  certificate,
  setCertificates,
  isEditable,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await Api.delete("certificate", certificate.id);
      const res = await Api.get(`certificatelist/${userId}`);
      setCertificates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          certificate={certificate}
          setIsEditing={setIsEditing}
          userId={userId}
          setCertificates={setCertificates}
        />
      ) : (
        <CardContainer>
          <CardWrapper>
            <h3>{certificate.date}</h3>
            <Content>
              <h3>{certificate.title}</h3>
              <p>{certificate.description}</p>
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

export default CertificateCard;

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
