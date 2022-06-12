import React, { Fragment, useEffect, useReducer, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Habit from "./components/Habit";
import StateContext, { initialState } from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";
import Landing from "./components/Landing";
import IsUserRedirect from "./components/IsUserRedirect";
import ResetFrom from "./components/ResetFrom";
import FlashMessage from "./components/FlashMessage";
axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const [show, setShow] = useState(false);
  const [showr, setShowr] = useState(false);
  const showHandler = () => {
    setShow(true);
  };

  const hideHandler = () => {
    setShow(false);
  };

  const showrHandler = () => {
    setShowr(true);
  };

  const hiderHandler = () => {
    setShowr(false);
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "REGISTER":
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        return {
          ...state,
          loggedIn: true,
          user: JSON.stringify(action.payload.user),
          token: localStorage.getItem("token"),
        };
      case "FLASH_MESSAGE":
        state.flashMessages.push({
          message: action.value,
          status: action.status,
        });
        return {
          ...state,
          flashMessages: state.flashMessages,
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          loggedIn: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (Boolean(localStorage.getItem("token"))) {
      state.loggedIn = true;
      state.user = localStorage.getItem("user");
      state.token = localStorage.getItem("token");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.loggedIn = false;
    }
    // eslint-disable-next-line
  }, [state]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Fragment>
          <FlashMessage flashMessages={state.flashMessages} />
          <Router>
            {show && <Login onClose={hideHandler} />}
            {showr && <Register onClose={hiderHandler} />}
            <Routes>
              <Route
                path="/"
                element={
                  <Landing
                    onClick={showHandler}
                    onClose={hideHandler}
                    onClickR={showrHandler}
                    onCloseR={hiderHandler}
                  />
                }
              />
              <Route
                path="/:num"
                element={<IsUserRedirect name={<Habit />} />}
              />
              <Route
                path="/resetPassword"
                element={
                  <ResetFrom onClick={showHandler} onClickR={showrHandler} />
                }
              />
            </Routes>
          </Router>
        </Fragment>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
