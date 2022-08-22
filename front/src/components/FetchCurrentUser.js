import React, { useLayoutEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserStateContext } from "./ContextProvider";
import * as Api from "../api";

const FetchCurrentUser = ({ children }) => {
  const { user, dispatch } = useContext(UserStateContext);

  const navigate = useNavigate();
  //const location=useLocation();
  //const pathname=location.pathname;

  const fetchUser = async () => {
    if (!user) {
      try {
        const res = await Api.get("user/current");
        const userData = res.data;

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: userData,
        });
      } catch {
        navigate("/login");
      }
    }
  };

  useLayoutEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
};

export default FetchCurrentUser;
