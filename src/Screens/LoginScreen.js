import React, { useRef } from "react";
import Header from "../Areas/Header";
import { authenticateUser, mySvgIcons } from "../components/Utils";
import "./LoginScreen.css";
import Footer from "../Areas/Footer";

function LoginScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="LoginScreen">
      <Header simple />
      <div className="Login-box">
        <h2>Welcome!</h2>
        <form className="Login-form">
          <div className="User-box">
            {mySvgIcons("user")}
            <input
              ref={emailRef}
              type="email"
              placeholder="Email address"
              required
              defaultValue={"test@gmail.com"}
            />
          </div>
          <div className="User-box">
            {mySvgIcons("lock")}
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
              defaultValue={"test@123"}
            />
          </div>
          <button
            className="Login-box-btn"
            type="submit"
            onClick={(e) => {
              authenticateUser(e, "signin", emailRef, passwordRef);
            }}
          >
            Sign In
          </button>
          <p className="Login-box-text">
            Not a member?{" "}
            <span
              onClick={(e) => {
                authenticateUser(e, "register", emailRef, passwordRef);
              }}
            >
              Sign up now
            </span>{" "}
            {mySvgIcons("arrow")}
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default LoginScreen;
