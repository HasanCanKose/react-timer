import React, { useState, useRef, useEffect, useCallback } from "react";

function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timer, setTimer] = useState(false);

  const handleChangeHour = (e) => {
    if (e.target.value > 99) {
      alert("Enter an hour less then 100");
    } else if (e.target.value === "") {
      setHour(hour);
    } else {
      setHour(e.target.value);
    }
  };
  const handleChangeMinute = (e) => {
    if (e.target.value > 59) {
      alert("Enter a minute less then 60");
    } else if (e.target.value === "") {
      setMinute(minute);
    } else {
      setMinute(e.target.value);
    }
  };
  const handleChangeSecond = (e) => {
    if (e.target.value > 59) {
      alert("Enter a second less then 60");
    } else if (e.target.value === "") {
      setSecond(second);
    } else {
      setSecond(e.target.value);
    }
  };

  const intervalRef = useRef();

  const startCountDown = () => {
    intervalRef.current = setInterval(() => {
      setTimer(true);
      setSecond((prevSecond) => prevSecond - 1);
    }, 1000);
  };

  const stopCountDown = useCallback(() => {
    clearInterval(intervalRef.current);
    setTimer(false);
  }, [intervalRef]);

  const resetCountDown = useCallback(() => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    stopCountDown();
    document.getElementById("hour-input").value = "";
    document.getElementById("minute-input").value = "";
    document.getElementById("second-input").value = "";
  }, [stopCountDown]);

  const alarm = () => {
    const myAudio = document.getElementsByClassName("timer-audio")[0];
    myAudio.play();
  };
  useEffect(() => {
    if (second < 0) {
      setSecond(59);
      setMinute((prevMinute) => prevMinute - 1);
    } else if (minute < 0 && hour !== 0) {
      setMinute(59);
      setHour((prevHour) => prevHour - 1);
    } else if (second < 0 && minute < 0 && hour !== 0) {
      setSecond(59);
      setMinute(59);
      setHour((prevHour) => prevHour - 1);
    }
    if (hour === 0 && minute === 0 && second < 0) {
      alarm();

      resetCountDown();
    }
  }, [second, minute, hour, resetCountDown]);
  return (
    <div>
      <div className="timer-time-container">
        <div className="timer-hour">{hour}</div>
        <div className="colon">:</div>
        <div className="timer-minute">{minute}</div>
        <div className="colon">:</div>
        <div className="timer-second">{second}</div>
      </div>
      <div className="timer-info">
        <div className="hour-info">Hour</div>
        <div className="minute-info">Minute</div>
        <div className="second-info">Second</div>
      </div>
      <div className="timer-input">
        <div className="hour-input">
          <input
            id="hour-input"
            type="text"
            placeholder="Hour.."
            onChange={handleChangeHour}
          />
        </div>
        <div className="minute-input">
          <input
            id="minute-input"
            type="text"
            placeholder="Minute.."
            onChange={handleChangeMinute}
          />
        </div>
        <div className="second-input">
          <input
            id="second-input"
            type="text"
            placeholder="Second.."
            onChange={handleChangeSecond}
          />
        </div>
      </div>
      <div className="timer-button button">
        <button
          className="start-stop-button button"
          onClick={!timer ? startCountDown : stopCountDown}
          style={
            !timer
              ? { backgroundColor: "#32CD32" }
              : { backgroundColor: "#DC143C" }
          }
        >
          {!timer ? "Start" : "Stop"}
        </button>
        <button className="reset-button button" onClick={resetCountDown}>
          Reset
        </button>
        <audio className="timer-audio">
          <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
        </audio>
      </div>
    </div>
  );
}

export default Timer;
