import React from "react";

const TimeToggle = ({ timeUnit, handleToggle }) => {
  return (
    <button type="button" onClick={handleToggle} className="toggle-button">
      {timeUnit === "minutes" ? "Switch to Hours" : "Switch to Minutes"}
    </button>
  );
};

export default TimeToggle;
