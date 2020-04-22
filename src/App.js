import React from "react";
import "./App.css";
import StopWatch from "./components/StopWatch";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="App">
      <h1 className="first-title title">Stopwatch</h1>
      <div className="stopwatch">
        <StopWatch />
      </div>
      <div className="timer">
        <h1 className="second-title title">Timer</h1>
        <Timer />
      </div>
    </div>
  );
}

export default App;
