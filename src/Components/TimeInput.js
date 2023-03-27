// src/Components/TimeInput.js
import React from "react";

const TimeInput = ({ timeValue, setTimeValue }) => {
  return (
    <input
      type="number"
      min="0"
      value={timeValue}
      onChange={(e) => setTimeValue(e.target.value)}
      required
    />
  );
};

export default TimeInput;
