import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoImage } from "../../assets/loginFormImg.svg";
import styles from "../../style/user/LoginForm.module.css";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import * as Api from "../../api";
import { UserStateContext } from "../../components/ContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginErrorModal from "pages/modal/LoginErrorModal";

function LoginForm() {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserStateContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;

  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (error) {
      setEmail("");
      setPassword("");
      setIsModalOpen(true);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h3>Connect Us</h3>
        <h2>
          일상의 기록이
          <br />
          포트폴리오가 되는 곳
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <div
              className={`${styles.box} ${focusEmail ? styles.box_focus : ""}`}
            >
              <FontAwesomeIcon icon={faUser} style={{ color: "gray" }} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
              />
            </div>
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

          <div style={{ marginBottom: "20px" }}>
            <div
              className={`${styles.box} ${
                focusPassword ? styles.box_focus : ""
              }`}
            >
              <FontAwesomeIcon icon={faLock} style={{ color: "gray" }} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
              />
            </div>
            {!isPasswordValid && (
              <p
                style={{
                  fontSize: "13px",
                  color: "#ff758f",
                  marginLeft: "10px",
                }}
              >
                비밀번호는 4글자 이상입니다.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`${styles.button} ${styles.button_login}`}
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/register")}
            className={`${styles.button} ${styles.button_register}`}
          >
            회원가입
          </button>
        </form>
      </div>
      <div className={styles.logoImg}>
        <LogoImage width="100%" />
      </div>
      {isModalOpen && (
        <LoginErrorModal
          setIsModalOpen={setIsModalOpen}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}

export default LoginForm;
