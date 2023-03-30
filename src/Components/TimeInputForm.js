// src/Components/TimeInputForm.js
import React, { useState, useEffect } from "react";
import TimeInput from "./TimeInput";
import TimeToggle from "./TimeToggle";

const TimeInputForm = () => {
  const [timeUnit, setTimeUnit] = useState("minutes");
  const [timeValue, setTimeValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!window.electron) return;
  
    const handleMessage = (event, msg) => {
      setMessage(msg);
    };
  
    window.electron.receive("shutdown-schedule-error", handleMessage);
    window.electron.receive("shutdown-schedule-stderr", handleMessage);
    window.electron.receive("shutdown-schedule-success", handleMessage);
    window.electron.receive("shutdown-cancel-error", handleMessage);
    window.electron.receive("shutdown-cancel-stderr", handleMessage);
    window.electron.receive("shutdown-cancel-success", handleMessage);
  
    return () => {
      window.electron.remove("shutdown-schedule-error", handleMessage);
      window.electron.remove("shutdown-schedule-stderr", handleMessage);
      window.electron.remove("shutdown-schedule-success", handleMessage);
      window.electron.remove("shutdown-cancel-error", handleMessage);
      window.electron.remove("shutdown-cancel-stderr", handleMessage);
      window.electron.remove("shutdown-cancel-success", handleMessage);
    };
  }, []);
  

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
    <div>
      <form onSubmit={handleSubmit}>
        <TimeInput timeValue={timeValue} setTimeValue={setTimeValue} />
        <TimeToggle timeUnit={timeUnit} handleToggle={handleToggle} />
        <div>
          <button type="submit">Shutdown</button>
          <button onClick={handleCancelShutdown}>Cancel Shutdown</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default TimeInputForm;
