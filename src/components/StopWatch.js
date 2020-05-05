import React, { useState, useEffect, useRef } from "react";
import TimeList from "./TimeList";

function StopWatch() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timer, setTimer] = useState(false);
  const [times, setTimes] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true);
  const [title, setTitle] = useState(false);

  const intervalRef = useRef();

  const startTimer = () => {
    setTitle(true);
    setTimer(true);
    intervalRef.current = setInterval(() => {
      setSecond((prevSecond) => prevSecond + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(false);
  };

  const resetTimer = () => {
    setSecond(0);
    setMinute(0);
    setHour(0);
    stopTimer();
    setTitle(false);
  };

  const addTime = (e) => {
    e.preventDefault();

    const newTime = [hour, " : ", minute, " : ", second];

    const updatedTimes = [...times, newTime];
    if (second === 0 && minute === 0 && hour === 0) {
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
    if (second === 60) {
      setMinute((prevHour) => prevHour + 1);
      setSecond(0);
    }
    if (minute === 60) {
      setHour((prevHour) => prevHour + 1);
      setMinute(0);
      setSecond(0);
    }
    if (title) {
      document.title = `${hour} : ${minute} : ${second}`;
    } else {
      document.title = "Timer App";
    }
  }, [second, minute, hour, title]);

  return (
    <div className="stopwatch-container">
      <div>
        <div className="time-container">
          <div className="hour">{hour}</div>
          <div className="colon">:</div>
          <div className="minute">{minute}</div>
          <div className="colon">:</div>
          <div className="second">{second}</div>
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
