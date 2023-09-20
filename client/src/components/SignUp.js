import React, { useState } from "react";
import logo from "../image/instagramLogo.png";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");

  //tost function
  const NotifyA = (msg) => toast.error(msg);
  const NotifyB = (msg) => toast.success(msg);

  const Emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const PasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    // checking email

    if (!Emailregex.test(email)) {
      NotifyA("Invalid Email");
      return;
    } else if (!PasswordRegex.test(password)) {
      NotifyA(
        "Pasword must contain atleast 8 charactars with special character and uppercase,lowercase (e.g- Javed@9523)"
      );
      return;
    }
    // console.log(name, email, username, password);
    fetch("http://localhost:5000/api/v1/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          NotifyA(data.error);
        } else {
          NotifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      });
  };
  return (
    <>
      <div className="signup">
        <div className="form-container">
          <div className="form">
            <img className="signuplogo" src={logo} alt="signuplogo" />
            <p className="loginPara">
              Signup to see your photos & videos <br /> from your friends
            </p>
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
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="FullName"
              />
            </div>
            <div>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
                placeholder="UserName"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </div>
            <p style={{ fontSize: "14px" }}>Term & Condition</p>
            <input
              type="submit"
              id="submitbtn"
              onClick={() => {
                postData();
              }}
              value="SignUp"
            />
          </div>
          <div className="form2">
            Already have an account?
            <Link to="/signin">
              <span style={{ color: "blue", cursor: "pointer" }}>SignIn</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
