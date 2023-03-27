// src/Components/TimeInputForm.js
import React, { useState } from "react";
import TimeInput from "./TimeInput";
import TimeToggle from "./TimeToggle";

const TimeInputForm = () => {
  const [timeUnit, setTimeUnit] = useState("minutes");
  const [timeValue, setTimeValue] = useState("");

  const handleToggle = () => {
    setTimeUnit(timeUnit === "minutes" ? "hours" : "minutes");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted time: ${timeValue} ${timeUnit}`);
    // Send your command here
  };

  return (
    <form onSubmit={handleSubmit}>
      <TimeInput timeValue={timeValue} setTimeValue={setTimeValue} />
      <TimeToggle timeUnit={timeUnit} handleToggle={handleToggle} />
      <button type="submit">Send Command</button>
    </form>
  );
};

export default TimeInputForm;
