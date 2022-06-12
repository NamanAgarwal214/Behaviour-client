import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import StateContext from "../context/StateContext";

const Behaviour = () => {
  const [behaviour, setBehaviour] = useState([]);
  const state = useContext(StateContext);
  useEffect(() => {
    axios
      .get("/api/behaviour/all", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.behaviour[0].behaviour);
        setBehaviour(res.data.behaviour[0].behaviour);
      })
      .catch((err) => {
        // console.log(err.message);
      });
    // console.log(state);
  }, [state]);

  return (
    <Fragment>
      <div className="homeL">
        <Navbar />
        <div className="d-flex align-items-center justify-content-center flex-wrap mx-auto">
          <div className="disp d-flex align-items-center justify-content-center rounded-circle mx-5 my-1 p-4 border color border-3 text-center">
            <Link
              to="/one"
              state={{ title: behaviour[0] }}
              className="text-decoration-none"
            >
              <h2>{behaviour[0]}</h2>
            </Link>
          </div>
          <div className="disp d-flex align-items-center justify-content-center rounded-circle mx-5 my-1 p-4 border color border-3 text-center">
            <Link
              to="/two"
              state={{ title: behaviour[1] }}
              className="text-decoration-none"
            >
              <h2>{behaviour[1]}</h2>
            </Link>
          </div>
          <div className="disp d-flex align-items-center justify-content-center rounded-circle mx-5 my-1 p-4 border color border-3 text-center">
            <Link
              to="/third"
              state={{ title: behaviour[2] }}
              className="text-decoration-none"
            >
              <h2>{behaviour[2]}</h2>
            </Link>
          </div>

          <div className="disp d-flex align-items-center justify-content-center rounded-circle mx-5 my-1 p-4 border color border-3 text-center">
            <Link
              to="/four"
              state={{ title: behaviour[3] }}
              className="text-decoration-none"
            >
              <h2>{behaviour[3]}</h2>
            </Link>
          </div>

          <div className="disp d-flex align-items-center justify-content-center rounded-circle mx-5 my-1 p-4 border color border-3 text-center">
            <Link
              to="/five"
              state={{ title: behaviour[4] }}
              className="text-decoration-none"
            >
              <h2>{behaviour[4]}</h2>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Behaviour;
