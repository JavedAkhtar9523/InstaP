import React, { useState, useContext } from "react";
import "./SignIn.css";
import logo from "../image/instagramLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

const SignIn = () => {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const NotifyA = (msg) => toast.error(msg);
  const NotifyB = (msg) => toast.success(msg);

  const Emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const postData = () => {
    // checking email

    if (!Emailregex.test(email)) {
      NotifyA("Invalid Email");
      return;
    }

    // console.log(email, password);
    fetch("http://localhost:5000/api/v1/auth/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          NotifyA(data.error);
        } else {
          NotifyB("Signed in Successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };

  return (
    <>
      <div className="signIn">
        <div>
          <div className="loginForm">
            <img className="signUpLogo" src={logo} alt="" />
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </div>
            <input
              type="submit"
              onClick={() => {
                postData();
              }}
              id="login-btn"
              value="Sign In"
            />
          </div>
          <div className="loginForm2">
            Don't have an account ?
            <Link to="/signup">
              <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
