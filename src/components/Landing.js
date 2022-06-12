import React, { useContext } from "react";
import StateContext from "../context/StateContext";
import Behaviour from "./Behaviour";
import Home from "./Home";

const Landing = ({ onClick, onClose, onClickR, onCloseR }) => {
  const appState = useContext(StateContext);
  return (
    <>
      {!appState.loggedIn ? (
        <Home
          onClick={onClick}
          onClose={onClose}
          onClickR={onClickR}
          onCloseR={onCloseR}
        />
      ) : (
        <Behaviour />
      )}
    </>
  );
};

export default Landing;
