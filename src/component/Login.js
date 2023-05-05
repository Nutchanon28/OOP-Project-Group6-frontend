import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataContext from "../context/DataContext";
import "../css/Login.css";

const Login = ({ setHasLogin }) => {
  const navigate = useNavigate();
  const { setUserId } = useContext(DataContext);
  const [isRegistering, SetIsRegistering] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [fetchError, setFetchError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        loginUser
      );
      console.log(response.data);
      setFetchError(null);

      if (response.data.response === "successful") {
        setUserId(response.data.user_id);
        setHasLogin(true);
        navigate("/");
      } else {
        setFetchError("Invalid Credentials");
      }
    } catch (error) {
      if (error.response) {
        setFetchError(error.response.data.message);
      } else {
        setFetchError(error.message);
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        loginUser
      );
      console.log(response.data);
      setFetchError(null);

      if (response.data.response === "successful") {
        setUserId(response.data.user_id);
        SetIsRegistering(false);
      } else {
        setFetchError("Invalid Credentials");
      }
    } catch (error) {
      if (error.response) {
        setFetchError(error.response.data.message);
      } else {
        setFetchError(error.message);
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }

    setLoginUser({});
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  return (
    <div className="loginRegister">
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="register">{isRegistering ? "Sign up" : "Log in"}</label>
        <input
          required
          id="gmail"
          type="email"
          placeholder="gmail"
          value={loginUser.gmail}
          onChange={(e) =>
            setLoginUser(Object.assign(loginUser, { gmail: e.target.value }))
          }
        />
        <input
          required
          id="password"
          type="password"
          placeholder="password"
          value={loginUser.password}
          onChange={(e) =>
            setLoginUser(Object.assign(loginUser, { password: e.target.value }))
          }
        />
        <button type="Submit">submit</button>
      <button
        onClick={() => {
          SetIsRegistering(!isRegistering);
        }}
      >
        {isRegistering ? "log in" : "sign up"}
      </button>
      </form>
      {fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
    </div>
  );
};

export default Login;
