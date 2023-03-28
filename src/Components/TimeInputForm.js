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

  const handleSubmit = (event) => {
    event.preventDefault();
    const timeInMinutes = timeValue * (timeUnit === "hours" ? 60 : 1);
    window.electron.send("schedule-shutdown", timeInMinutes);
  };

  const handleCancelShutdown = () => {
    window.electron.send("cancel-shutdown");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TimeInput timeValue={timeValue} setTimeValue={setTimeValue} />
      <TimeToggle timeUnit={timeUnit} handleToggle={handleToggle} />
      <button type="submit">Send Command</button>
      <button onClick={handleCancelShutdown}>Cancel Shutdown</button>
    </form>
  );
};

export default TimeInputForm;
