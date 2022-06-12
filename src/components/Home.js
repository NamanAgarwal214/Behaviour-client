import React, { Fragment } from "react";
import Navbar from "./Navbar";

const Home = (props) => {
  return (
    <Fragment>
      <div className="home">
        <Navbar onClick={props.onClick} onClickR={props.onClickR} />
      </div>
    </Fragment>
  );
};

export default Home;
