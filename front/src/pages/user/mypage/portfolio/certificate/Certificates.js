import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "api";
import CertificateCard from "./CertificateCard";
import CertificateAddForm from "./CertificateAddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Certificates = ({ userId, isEditable }) => {
  const [certificates, setCertificates] = useState([]);

  const [isAdding, setIsAdding] = useState(false);

  const getCertificateList = async () => {
    try {
      const res = await Api.get(`certificatelist/${userId}`);
      setCertificates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCertificateList();
  }, [userId]);

  return (
    <CertificateContainer>
      <h3>자격증</h3>
      {isEditable && (
        <ButtonWrapper>
          <Button onClick={() => setIsAdding((prev) => !prev)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonWrapper>
      )}
      {isAdding && (
        <CertificateAddForm
          userId={userId}
          setIsAdding={setIsAdding}
          setCertificates={setCertificates}
        />
      )}
      {certificates.length === 0 && !isAdding && (
        <div style={{ textAlign: "center" }}>
          <p>자격증을 추가해주세요!</p>
        </div>
      )}
      {certificates.map((certificate) => (
        <CertificateCard
          key={certificate.id}
          userId={userId}
          certificate={certificate}
          setCertificates={setCertificates}
          isEditable={isEditable}
        />
      ))}
    </CertificateContainer>
  );
};

export default Certificates;

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
