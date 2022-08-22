import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const options = [
  { eng: "all", kor: "전체" },
  { eng: "user", kor: "사용자명" },
  { eng: "title", kor: "제목" },
  { eng: "content", kor: "내용" },
];

const SearchInputForm = ({ search }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(search);
  const [option, setOption] = useState({ eng: "all", kor: "전체" });

  const handleKeyPress = (key) => {
    if (key === "Enter") {
      navigate(
        `/posts?option=${option.eng}&search=${encodeURIComponent(
          searchKeyword
        )}`
      );
    }
  };

  const handleClickOption = (option) => {
    setOption(option);
    setIsOpen(false);
  };

  return (
    <InputContainer>
      <InputWrapper>
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <span>{option.kor}</span>
            <OpenButton onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faCaretDown} />
            </OpenButton>
          </SelectBoxWrapper>
          {options.map((option) => (
            <Option
              key={option.eng}
              onClick={() => handleClickOption(option)}
              open={isOpen ? "block" : "none"}
            >
              {option.kor}
            </Option>
          ))}
        </SelectBoxContainer>
        <InputFormWrapper>
          <input
            type="text"
            value={searchKeyword || ""}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e.key)}
          />
          <button
            onClick={() =>
              navigate(
                `/posts?option=${option.eng}&search=${encodeURIComponent(
                  searchKeyword
                )}`
              )
            }
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{
                color: "#ff758f",
                fontSize: "30px",
                marginRight: "5px",
              }}
            />
          </button>
        </InputFormWrapper>
      </InputWrapper>
    </InputContainer>
  );
};

export default SearchInputForm;

const InputContainer = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputFormWrapper = styled.div`
  border: 3px solid #ff758f;
  border-left: none;
  border-radius: 0 20px 20px 0;
  height: 50px;
  display: flex;
  align-items: center;
  > input {
    width: 500px;
    border: none;
    height: 100%;
  }
  > input:focus {
    outline: none;
  }
  > button {
    background: transparent;
    border: none;
  }
`;

const SelectBoxContainer = styled.div`
  position: absolute;
  left: -100px;
  width: 100px;
  display: inline-block;
  border: 3px solid #ff758f;
  border-radius: 20px 0 0 20px;
  padding: 5px 0 5px 8px;
  line-height: 25px;
  background: #fff;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  > span {
    font-weight: bold;
  }
`;

const Option = styled.div`
  display: ${(props) => props.open};
  postion: abosolute;
  cursor: pointer;
`;

const OpenButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
