import React from "react";
import { v4 as uuidv4 } from "uuid";

function TimeList({ times, clearList, isListEmpty }) {
  return (
    <div className="list">
      <h1 className="list-title title">Time List</h1>
      <ul className="list-ul">
        {times.map((time) => {
          return (
            <li className="list-li" key={uuidv4()}>
              {time}
            </li>
          );
        })}
        <div className="list-button-wrapper">
          <button
            className="list-button button"
            type="button"
            onClick={clearList}
            style={
              isListEmpty
                ? {
                    backgroundColor: "#dddddd",
                    pointerEvents: "none",
                  }
                : { backgroundColor: "red", cursor: "pointer" }
            }
          >
            Clear List
          </button>
        </div>
      </ul>
    </div>
  );
}

export default TimeList;
