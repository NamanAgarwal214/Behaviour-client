import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DispatchContext from "../context/DispatchContext";
import StateContext from "../context/StateContext";
import ListItem from "./ListItem";
import Navbar from "./Navbar";

const Habit = () => {
  const { num } = useParams();
  const [imp, setImp] = useState("");
  const [oldVal, setOldVal] = useState("");
  const [edit, setEdit] = useState(false);
  const [habit, setHabit] = useState([]);
  const state = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const location = useLocation();
  const { title } = location.state;
  document.title = title;

  const deleteHandler = async (val) => {
    try {
      // console.log(val);
      const res = await axios.delete(`/api/behaviour/${num}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        data: {
          imp: val,
        },
      });
      // console.log(res.data);
      if (res.data.status === "success") {
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "Improvement deleted successfully",
          status: true,
        });
        setHabit(res.data.behaviour);
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

  const editHandler = async () => {
    try {
      const res = await axios.patch(
        `/api/behaviour/${num}`,
        {
          oldVal,
          upImp: imp,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.status === "success") {
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "Improvement edited successfully",
          status: true,
        });
        setHabit(res.data.behaviour);
        setImp("");
        setEdit(false);
        setOldVal("");
      }
    } catch (error) {
      appDispatch({
        type: "FLASH_MESSAGE",
        value: error.mesage,
        status: false,
      });
      // console.log(error.message);
    }
  };

  const addHandler = async () => {
    try {
      if (imp === "") {
        throw new Error("Please enter a valid entry, i.e. not empty");
      }
      const res = await axios.post(
        `/api/behaviour/${num}`,
        { imp },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.data.status === "success") {
        // console.log(res.data);
        appDispatch({
          type: "FLASH_MESSAGE",
          value: "Improvement added successfully",
          status: true,
        });
        setHabit([...habit, res.data.imp]);
        setImp("");
      } else {
        throw new Error(res.data);
      }
    } catch (error) {
      appDispatch({
        type: "FLASH_MESSAGE",
        value: error.message,
        status: false,
      });
      // console.log(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/behaviour/${num}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setHabit(res.data.improvement);
        console.log(res.data);
      })
      .catch((err) => {
        appDispatch({
          type: "FLASH_MESSAGE",
          value: err.message,
          status: false,
        });
        console.log(err.message);
      });
    // eslint-disable-next-line
  }, [num, state.token]);

  return (
    <Fragment>
      <div className="habit">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center page">
          <h1>{title}</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center inpDiv">
          <input
            type="input"
            className="form_field input"
            placeholder="Add your Improvement"
            name="name"
            id="name"
            value={imp}
            onChange={(e) => setImp(e.target.value)}
            required
          />
          {edit ? (
            <button className="hbtn" onClick={editHandler}>
              Update
            </button>
          ) : (
            <button className="hbtn" onClick={addHandler}>
              ADD
            </button>
          )}
        </div>
        <div className="hab mx-auto my-5 ">
          <div className="d-flex justify-content-center flex-wrap">
            {habit.map((item) => {
              return (
                <ListItem
                  key={item}
                  setOldVal={setOldVal}
                  item={item}
                  setEdit={setEdit}
                  setImp={setImp}
                  deleteHandler={deleteHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Habit;
