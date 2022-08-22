import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBehance,
  faFacebook,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import * as Api from "api";

const SocialDataEditCard = ({ user, setUser }) => {
  const socialData = user?.socialData ?? [];
  const [isEditSocialData, setIsEditSocialData] = useState(false);

  const [github, setGithub] = useState(socialData[0]?.github ?? "");
  const [behance, setBehance] = useState(socialData[0]?.behance ?? "");
  const [twitter, setTwitter] = useState(socialData[0]?.twitter ?? "");
  const [facebook, setFacebook] = useState(socialData[0]?.facebook ?? "");
  const [linkedIn, setLinkedIn] = useState(socialData[0]?.linkedIn ?? "");
  const [homepage, setHomepage] = useState(socialData[0]?.homepage ?? "");
  const [blog, setBlog] = useState(socialData[0]?.blog ?? "");

  const socialDataCategory = [
    {
      val: github,
      setVal: setGithub,
      icon: faGithub,
      text: "Github 계정을 입력하세요",
    },
    {
      val: behance,
      setVal: setBehance,
      icon: faBehance,
      text: "Behance 계정을 입력하세요",
    },
    {
      val: twitter,
      setVal: setTwitter,
      icon: faTwitter,
      text: "트위터 계정을 입력하세요",
    },
    {
      val: facebook,
      setVal: setFacebook,
      icon: faFacebook,
      text: "페이스북 계정을 입력하세요",
    },
    {
      val: linkedIn,
      setVal: setLinkedIn,
      icon: faLinkedin,
      text: "링크드인 계정을 입력하세요",
    },
    {
      val: homepage,
      setVal: setHomepage,
      icon: faHouse,
      text: "홈페이지 주소를 입력하세요",
    },
    {
      val: blog,
      setVal: setBlog,
      icon: faPenToSquare,
      text: "블로그 주소를 입력하세요",
    },
  ];

  const handleSubmit = async () => {
    try {
      const res = await Api.post("users/social", {
        github,
        behance,
        twitter,
        facebook,
        linkedIn,
        homepage,
        blog,
      });
      setUser(res.data);
      setIsEditSocialData(false);
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <ContentEditCard>
      <h3>소셜 정보</h3>
      {!isEditSocialData ? (
        <button onClick={() => setIsEditSocialData(true)}>수정</button>
      ) : (
        <EditForm>
          <ul>
            {socialDataCategory.map((category, idx) => (
              <li key={idx}>
                <FontAwesomeIcon
                  icon={category.icon}
                  style={{ width: "25px" }}
                />
                <input
                  type="text"
                  placeholder={category.text}
                  value={category.val}
                  onChange={(e) => category.setVal(e.target.value)}
                />
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handleSubmit}>저장</button>
          </div>
        </EditForm>
      )}
    </ContentEditCard>
  );
};

export default SocialDataEditCard;

const ContentEditCard = styled.div`
  margin-top: 5%;
  display: flex;
  margin-left: 3%;
  > h3 {
    width: 20%;
    font-size: 20px;
    margin-right: 22px;
    margin-bottom: 0;
  }
  > button {
    border: none;
    background: transparent;
    text-decoration: underline;
    color: #ff758e;
  }
  > button:hover {
    color: #feb8b8;
  }
`;

const EditForm = styled.div`
  width: 70%;
  ul {
    padding-left: 0;
  }
  li {
    list-style-type: none;
    > input {
      display: inline;
      width: 80%;
      margin-left: 2%;
    }
  }
  > div {
    text-align: right;
    > button {
      border-radius: 10px;
      padding: 1% 3%;
      border: none;
      background: #ff758e;
      color: #fff;
    }
  }
`;
