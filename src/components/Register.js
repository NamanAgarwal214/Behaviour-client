import axios from "axios";
import React, { useContext, useState } from "react";
import DispatchContext from "../context/DispatchContext";
import Modal from "./Modal/Modal";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appDispatch = useContext(DispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !password) {
      appDispatch({
        type: "FLASH_MESSAGE",
        value: "Please fill the form completely!",
        status: false,
      });
    }
    try {
      const res = await axios.post(
        "/api/user/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.status === "success") {
        appDispatch({ type: "REGISTER", payload: res.data });
        props.onClose();
        // console.log(res.data);
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "You signed in successfully!",
          status: true,
        });
      } else {
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "Incorrect Email or Password!",
          status: false,
        });
        // console.log("some error");
      }

      // navigate("/", { replace: true });
    } catch (err) {
      appDispatch({
        type: "FLASH_MESSAGE",
        value: err.message,
        status: false,
      });
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="d-flex row g-0">
        <div className="form_details col">
          <form className="login-form" action="">
            <div className="form__group form_item">
              <label htmlFor="username" className="form__label">
                Username
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="username"
                type="text"
                placeholder="Username"
                required
                className="form__input reg"
              />
            </div>
            <div className="form__group form_item">
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="form__input reg"
              />
            </div>
            <div className="form__group form_item">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="form__input reg"
                id="password"
                required
                minLength="8"
                autoComplete="on"
              />
            </div>
            <br />
            <div className="d-flex">
              <button className="butn mx-auto" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Register;
