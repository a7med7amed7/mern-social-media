import { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();
  const navigate = useNavigate();

  const registerClickHandler = async (e) => {
    e.preventDefault();
    if (password.current.value !== password2.current.value) {
      password2.current.setCustomValidity("Password doesn't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialMedia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocialMedia.
          </span>
        </div>
        <div className="loginRight">
          <form
            className="loginBox"
            type="submit"
            onSubmit={registerClickHandler}
          >
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              ref={password}
              className="loginInput"
              type="password"
              minLength="5"
            />
            <input
              placeholder="Password Again"
              ref={password2}
              className="loginInput"
              type="password"
              minLength="5"
            />
            <button className="loginButton">Sign Up</button>
            <span className="loginForgot">Already have an account?</span>

            <Link to="/login" className="loginRegisterButton">Log into Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
