import axios from "axios";
import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DispatchContext from "../context/DispatchContext";
import StateContext from "../context/StateContext";

const Navbar = (props) => {
  const state = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/user/logout", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      if (res.data.status === "success") {
        appDispatch({
          type: "LOGOUT",
        });
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "You logged out successfully!",
          status: true,
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      appDispatch({
        type: "FLASH_MESSAGE",
        value: error.message,
        status: false,
      });
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex navbtns justify-content-around align-items-center bg-transparent p-4">
        <Link to="/" className="text-decoration-none">
          <div className="title fw-bold">Behaviour</div>
        </Link>
        {!state.loggedIn ? (
          <div className="">
            <button
              onClick={props.onClick}
              className="mx-2 bg-transparent border-bottom border-0 text-white fs-3 rounded-pill"
            >
              Login
            </button>
            <button
              onClick={props.onClickR}
              className="mx-3 bg-transparent border-bottom border-0 fs-3 rounded-pill text-white"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="">
            <button
              onClick={logoutHandler}
              className="mx-2 bg-transparent border-bottom border-0 text-white fs-3 rounded-pill"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Navbar;
