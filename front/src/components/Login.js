import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { fetchUser } from "../utils/user/user.utils";

function Login() {
  const dispatch = useDispatch();
  const onSuccess = async (res) => {
    var tokenData = jwt_decode(res.credential);
    var loginData = {
      googleId: tokenData.sub,
      ...tokenData,
    };
    fetchUser(loginData, dispatch);
    localStorage.setItem("login", JSON.stringify(loginData));
    console.log("Login Success: currentUser:", loginData);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  return (
    <div>
      <GoogleLogin
        id="login"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
        auto_select={true}
      />
    </div>
  );
}

export default Login;
