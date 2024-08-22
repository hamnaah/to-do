import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  message } from "antd";

const Login = () => {
  const [inputData, setInputData] = useState({ name: "", password: "" });
  const navigate = useNavigate();
  const onInputChange = (name, e) => {
    setInputData({ ...inputData, [name]: e.target.value });
  };

  const onButtonClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputData
      );
      console.log(response.data);

      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token); //set token in local storage
        console.log("logged in");
        // Display success message using Ant Design's message component
        message.success("Login successful!", 3); // Message will close after 3 seconds

        navigate("/createtodo");
      } else {
        console.error("token not found in response", response.data);
      }
    } catch (err) {
      console.log("Login Failed", err);
    }
  };

  
  const forgotPassword = async () => {
    const email = prompt("Enter your email address to reset password:");
    if (email) {
      try {
        // Send API request to reset password
        const response = await axios.post(
          "http://localhost:8800/api/user/forgotPassword",
          { mail: email }
        );
        alert(response.data.message); // Display success or error message
        console.log(response.data.message);
      } catch (error) {
        console.error(error);
        alert("Failed to reset password. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-box">
          <label>User Name</label>
          <input
            type="text"
            placeholder="Username"
            className="input"
            onChange={(e) => {
              onInputChange("name", e);
            }}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={(e) => {
              onInputChange("password", e);
            }}
          />
          <div className="button-group">
            <button className="button" onClick={onButtonClick}>
              Login
            </button>
            <button className="button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
          {/* <button className="forgot-btn" onClick={onButtonClick} disabled={loading}>
        {loading ? "Loading..." : "Submit"} */}
      {/* </button> */}
        </div>
      </div>
    </>
  );
};

export default Login;
