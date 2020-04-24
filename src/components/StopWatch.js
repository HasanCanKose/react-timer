import React, { useState, useEffect, useRef } from "react";
import TimeList from "./TimeList";

function StopWatch() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [splitSecond, setSplitSecond] = useState(0);
  const [timer, setTimer] = useState(false);
  const [times, setTimes] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true);
  const [title, setTitle] = useState(false);

  const intervalRef = useRef();

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTitle(true);
      setTimer(true);
      setSplitSecond((prevSecond) => prevSecond + 1);
    }, 16.6);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(false);
  };

  const resetTimer = () => {
    setSplitSecond(0);
    setSecond(0);
    setMinute(0);
    stopTimer();
    setTitle(false);
  };

  const addTime = (e) => {
    e.preventDefault();

    const newTime = [minute, " : ", second, " : ", splitSecond];

    const updatedTimes = [...times, newTime];
    if (splitSecond === 0 && second === 0 && minute === 0) {
      alert("Start the stopwatch first!");
    } else {
      setTimes(updatedTimes);
      setIsListEmpty(false);
    }
  };

  const clearlist = () => {
    setTimes([]);
    setIsListEmpty(true);
  };

  useEffect(() => {
    if (splitSecond === 60) {
      setSecond((prevMinute) => prevMinute + 1);
      setSplitSecond(0);
    }
    if (second === 60) {
      setMinute((prevHour) => prevHour + 1);
      setSecond(0);
      setSplitSecond(0);
    }
    if (title) {
      document.title = `${minute} : ${second} : ${splitSecond}`;
    } else {
      document.title = "Timer App";
    }
  }, [splitSecond, second, minute, title]);
  return (
    <div className="stopwatch-container">
      <div>
        <div className="time-container">
          <div className="minute">{minute}</div>
          <div className="colon">:</div>
          <div className="second">{second}</div>
          <div className="colon">:</div>
          <div className="split-second">{splitSecond}</div>
        </div>
        <div className="stopwatch-button button">
          <button
            className="start-stop-button button"
            onClick={!timer ? startTimer : stopTimer}
            style={
              !timer
                ? { backgroundColor: "#32CD32" }
                : { backgroundColor: "#DC143C" }
            }
          >
            {!timer ? "Start" : "Stop"}
          </button>
          <button className="reset-button button" onClick={resetTimer}>
            Reset
          </button>
          <button
            className="lap-button button"
            onClick={addTime}
            style={
              !timer
                ? { backgroundColor: "#ff8c00" }
                : { backgroundColor: "blue" }
            }
          >
            Lap
          </button>
        </div>
      </div>
      <div className="time-list">
        <TimeList
          isListEmpty={isListEmpty}
          times={times}
          clearList={clearlist}
        />
      </div>
    </div>
  );
}

export default StopWatch;
