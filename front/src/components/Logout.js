import React from "react";
import { Button } from "react-bootstrap";
import { googleLogout } from "@react-oauth/google";
import { setCurrentUser } from "../store/user/user.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccess = () => {
    googleLogout();
    dispatch(setCurrentUser(null));
    localStorage.setItem("login", null);
    navigate("/");
  };

  return (
    <div>
      <Button variant="light" onClick={onSuccess}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
