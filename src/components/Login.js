import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DispatchContext from "../context/DispatchContext";
import Modal from "./Modal/Modal";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      appDispatch({
        type: "FLASH_MESSAGES",
        value: "Please fill the form completely!",
        status: false,
      });
    }
    try {
      const res = await axios.post(
        "/api/user/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.cookie);
      if (res.data && res.data.token) {
        // console.log(res.data);
        appDispatch({
          type: "LOGIN",
          payload: res.data,
        });
        props.onClose();
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "You logged in successfully!",
          status: true,
        });
      } else {
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "Incorrect Email or Password!",
          status: false,
        });
        // console.log(res.data);
      }
      // console.log(ctx);
    } catch (error) {
      appDispatch({
        type: "FLASH_MESSAGE",
        value: error.message,
        status: false,
      });
      // console.log("There was an error");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      appDispatch({
        type: "FLASH_MESSAGE",
        value: "Please enter your email!",
        status: false,
      });
    }
    try {
      const res = await axios.post("/api/user/forgotPassword", { email });
      if (res.data && res.data.status === "success") {
        navigate("/resetPassword");
        // setForgotPassword(true);
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "A mail has been sent to you with a token!",
          status: true,
        });
        // console.log(res.data);
      } else {
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "This email is not registered with us!",
          status: false,
        });
      }
    } catch (error) {
      appDispatch({
        type: "FLASH_MESSAGE",
        value: error.message,
        status: false,
      });
      // console.log("There was an error");
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="d-flex row g-0 mt-4">
        <div className="form_details col">
          <form className="login-form" action="">
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="form__input"
              />
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="form__input"
                id="password"
                required
                minLength="8"
                autoComplete="on"
              />
            </div>
            {/* <Link to="/resetPassword"> */}
            <div className="right_span">
              <span
                onClick={(e) => {
                  handleForgotPassword(e);
                  props.onClose();
                }}
                className="span"
              >
                forgot password?
              </span>
            </div>
            {/* </Link> */}
            <br />
            <div className="d-flex">
              <button className="butn mx-auto" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
