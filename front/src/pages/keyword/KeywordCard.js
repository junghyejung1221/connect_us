import styled from "styled-components";

const KeywordCard = ({ title, data, state, setState }) => {
  return (
    <CardContainer>
      <h5>{title}</h5>
      <CardContent>
        {data.map((s) => (
          <Keyword
            onClick={() => setState(s)}
            bgcolor={state === s ? "#ff758f" : "#fff"}
            color={state === s ? "#fff" : "#828282"}
            border={state === s ? "none" : "1px solid #c4c4c4"}
          >
            {s}
          </Keyword>
        ))}
      </CardContent>
    </CardContainer>
  );
};

export default KeywordCard;

const CardContainer = styled.div`
  max-width: 100%;
  padding: 0 0 30px 20px;
`;

const CardContent = styled.div`
  width: 100%;
  white-space: nowrap;
  height: 100px;
  overflow-x: scroll;
  padding: 20px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Keyword = styled.span`
  padding: 8px 20px;
  border: ${(props) => props.border};
  border-radius: 30px;
  margin-right: 20px;
  color: ${(props) => props.color};
  font-weight: 700;
  background: ${(props) => props.bgcolor};
  &:hover {
    background: #ff758f;
    color: #fff;
    border: none;
  }
`;
