import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import StateContext from "../context/StateContext";

const IsUserRedirect = ({ name }) => {
  const ctx = useContext(StateContext);
  return ctx.loggedIn ? name : <Navigate to="/" />;
};

export default IsUserRedirect;
