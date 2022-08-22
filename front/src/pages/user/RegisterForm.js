import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style/user/RegisterForm.module.css";
import * as Api from "../../api";

function RegisterForm() {
  const navigate = useNavigate();

  const [isCompany, setIsCompany] = useState(false);

  const [registerNumber, setRegisterNumber] = useState("");
  //const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === confirmPassword;
  const isNameValid = name.length >= 2;

  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isCompany) {
        await Api.post("user/register", {
          type: "company",
          name,
          email,
          password,
          registerNumber,
          ownerName,
        });
      } else {
        await Api.post("user/register", {
          type: "user",
          name,
          email,
          password,
        });
      }
      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <h3>Connect Us</h3>
        <div className={styles.box_button}>
          <button
            onClick={() => setIsCompany(false)}
            className={isCompany ? "" : styles.clicked}
          >
            개인회원
          </button>
          <button
            onClick={() => setIsCompany(true)}
            className={isCompany ? styles.clicked : ""}
          >
            기업회원
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {isCompany && (
            <div>
              <h3 className={styles.subtitle}>기업 정보</h3>
              <div className={styles.box_input}>
                <input
                  type="text"
                  autoComplete="off"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  placeholder="사업자 등록번호"
                />
              </div>

              <div className={styles.box_input}>
                <input
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="회사명"
                />
              </div>

              <div className={styles.box_input}>
                <input
                  type="text"
                  autoComplete="off"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="대표자명"
                />
              </div>
            </div>
          )}
          <div>
            {isCompany && <h3 className={styles.subtitle}>인사담당자 정보</h3>}
            <div className={styles.box_input}>
              <input
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
              />

              {!isEmailValid && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#ff758f",
                    marginLeft: "10px",
                  }}
                >
                  이메일 형식이 올바르지 않습니다.
                </p>
              )}
            </div>

            <div className={styles.box_input}>
              <input
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
              />
              {!isPasswordValid && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#ff758f",
                    marginLeft: "10px",
                  }}
                >
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </p>
              )}
            </div>

            <div className={styles.box_input}>
              <input
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 재확인"
              />
              {!isPasswordSame && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#ff758f",
                    marginLeft: "10px",
                  }}
                >
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>
            {!isCompany && (
              <div className={styles.box_input}>
                <input
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                />
                {!isNameValid && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#ff758f",
                      marginLeft: "10px",
                    }}
                  >
                    이름은 2글자 이상으로 설정해 주세요.
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={styles.button_register}
          >
            회원가입
          </button>

          <div className={styles.box_button_login}>
            <button
              onClick={() => navigate("/login")}
              className={styles.button_login}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
