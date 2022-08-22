import { useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import * as Api from "api";

const ProjectAddForm = ({ userId, setIsAdding, setProjects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const isValid =
    title.length > 0 &&
    description.length > 0 &&
    RegExp(/^\d{4}.(0[1-9]|1[012])$/).test(fromDate) &&
    RegExp(/^\d{4}.(0[1-9]|1[012])$/).test(toDate);

  const handleFromDate = (e) => {
    const value = e.target.value;
    if (value.length > 7) return;

    setFromDate(
      value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})$/g, "$1.$2")
        .replace(/(\.{0,1})$/g, "")
    );
  };

  const handleToDate = (e) => {
    const value = e.target.value;
    if (value.length > 7) return;

    setToDate(
      value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})$/g, "$1.$2")
        .replace(/(\.{0,1})$/g, "")
    );
  };

  const handleSubmit = async () => {
    try {
      await Api.post("project/create", {
        userId,
        title,
        description,
        fromDate,
        toDate,
      });
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await Api.get(`projectlist/${userId}`);
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsAdding(false);
  };

  return (
    <FormContainer>
      <div>
        <TextField
          label="프로젝트 제목"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "40%", marginRight: "2%" }}
        />
        <TextField
          label="시작년월"
          variant="outlined"
          value={fromDate}
          onChange={handleFromDate}
          autoComplete="off"
          placeholder="2022.08"
          style={{ width: "25%", marginRight: "1%" }}
        />
        <TextField
          label="종료년월"
          variant="outlined"
          value={toDate}
          onChange={handleToDate}
          autoComplete="off"
          placeholder="2022.09"
          style={{ width: "25%" }}
        />
      </div>
      <TextField
        label="프로젝트 설명"
        multiline
        rows={4}
        value={description}
        placeholder="프로젝트에 대해서 설명해주세요"
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginTop: "10px", width: "93%" }}
      />
      <Buttons>
        <Button disabled={!isValid} valid={isValid} onClick={handleSubmit}>
          확인
        </Button>
        <Button onClick={() => setIsAdding(false)} valid={true}>
          취소
        </Button>
      </Buttons>
    </FormContainer>
  );
};

export default ProjectAddForm;

const FormContainer = styled.div`
  margin-left: 5%;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const Button = styled.button`
  height: 55px;
  width: 10%;
  margin-right: 2%;
  border: none;
  cursor: ${(props) => (props.valid ? "pointer" : "")};
  background-color: ${(props) => (props.valid ? "#FEB8B7" : "#D0D0D0")};
`;
