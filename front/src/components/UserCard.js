import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const keywordsArr =
    user.keywords && user.keywords.length !== 0
      ? Object.values(user.keywords[0])
      : [];
  keywordsArr.splice(keywordsArr.length - 1, 1);

  return (
    <Card
      style={{
        minWidth: "17rem",
        width: "17rem",
        maxwidth: "17rem",
        marginRight: "50px",
        paddingTop: "2%",
        display: "inline-block",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/myPage/${user.id}`)}
    >
      <ProfileImageWrapper>
        <img src={user.imageLink} alt="profile" />
      </ProfileImageWrapper>
      <Card.Body>
        <Card.Title style={{ display: "flex", justifyContent: "center" }}>
          <h4 style={{ fontSize: "20px", display: "inline", margin: 0 }}>
            {user.name}
          </h4>
          {user.type === "company" && <CompanyType>기업회원</CompanyType>}
        </Card.Title>
        <Card.Text>{user.introduction}</Card.Text>
        <Keywords>
          {keywordsArr.length !== 0 &&
            keywordsArr.map((keyword) => <span key={keyword}>{keyword}</span>)}
        </Keywords>
      </Card.Body>
    </Card>
  );
};

export default UserCard;

const ProfileImageWrapper = styled.div`
  width: 100%;
  text-align: center;
  > img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
`;

const CompanyType = styled.span`
  margin-left: 10px;
  font-size: 10px;
  margin-left: 10px;
  background: #d9e5ff;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  height: auto;
  align-self: center;
`;

const Keywords = styled.div`
  white-space: pre-line;
  > span {
    display: inline-block;
    background: #ffb8b8;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
    padding: 2% 5%;
    margin: 0 3% 3% 0;
  }
`;
