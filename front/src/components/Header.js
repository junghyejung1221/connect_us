import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext } from "./ContextProvider";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, dispatch } = useContext(UserStateContext);

  const isLogin = !!user;

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const goPage = (router) => {
    navigate(router);
    window.location.reload();
  };

  return (
    <Nav
      activeKey={location.pathname}
      style={{
        background: "#FF758F",
        width: "100%",
        height: "60px",
        marginBottom: "30px",
        lineHeight: "40px",
        position: "fixed",
        zIndex: 10,
      }}
    >
      <Nav.Item className="me-auto mb-5">
        <Nav.Link
          onClick={() => goPage("/")}
          style={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}
        >
          Connect Us
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => navigate(`/myPage/${user.id}`)}
          style={{ color: "#fff" }}
        >
          나의 페이지
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate(`/search`)} style={{ color: "#fff" }}>
          검색
        </Nav.Link>
      </Nav.Item>
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout} style={{ color: "#fff" }}>
            로그아웃
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default Header;
