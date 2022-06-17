import { useEffect, useRef, useState } from "react";
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loginCall } from "../../apiCalls";

import { useNavigate } from "react-router-dom";

import store from "../../redux/store";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loginClickHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await loginCall({ email, password }, dispatch);
    const token = store.getState().userInfo.user.accessToken;
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify(store.getState().userInfo.user.userData)
    );
    setLogged(true);
    console.log(token);
  };

  useEffect(() => {
    if (logged) {
      return navigate("/");
    }
  }, [logged, navigate]);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialMedia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocialMedia.
          </span>
        </div>
        <div className="loginRight" onSubmit={loginClickHandler}>
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              minLength="5"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton">Login</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Create new account</button>
          </form>
          {/* <DisplayedPost /> */}
        </div>
      </div>
    </div>
  );
}
