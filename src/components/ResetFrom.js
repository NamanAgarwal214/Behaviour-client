import React, { useState, useContext, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DispatchContext from "../context/DispatchContext";
import Navbar from "./Navbar";

const ResetFrom = (props) => {
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewpassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch("/api/user/resetPassword", {
        token,
        password: newPassword,
      });
      // console.log(res.data);
      if (res.data && res.data.token) {
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "Your password was updated!",
          status: true,
        });
        // console.log(res.data);
        appDispatch({ type: "LOGIN", payload: res.data });

        navigate("/", { replace: true });
      } else {
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "There was an error!",
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
    <Fragment>
      <div className="homeL">
        <Navbar onClick={props.onClick} onClickR={props.onClickR} />
        <div className="d-flex flex-row row g-0 my-5 reset mx-auto">
          <div className="form_details col">
            <h3 className="separate text-center mb-3 fw-4">Reset Password</h3>
            <form className="login-form" action="">
              <div className="form__group">
                <label htmlFor="token" className="form__label">
                  Reset Token sent to your mail
                </label>
                <input
                  onChange={(e) => setToken(e.target.value)}
                  id="token"
                  type="text"
                  placeholder="you@example.com"
                  required
                  className="form__input"
                  autoComplete="off"
                />
              </div>
              <div className="form__group">
                <label htmlFor="newPassword" className="form__label">
                  Password
                </label>
                <input
                  onChange={(e) => setNewpassword(e.target.value)}
                  type="password"
                  placeholder="New Password"
                  className="form__input"
                  id="newPassword"
                  required
                  minLength="8"
                  autoComplete="on"
                />
              </div>
              <div className="d-flex">
                <button className="butn mx-auto" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetFrom;
