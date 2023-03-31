// src/Components/TimeInputForm.js
import React, { useState, useEffect } from "react";
import TimeInput from "./TimeInput";
import TimeToggle from "./TimeToggle";

const TimeInputForm = () => {
  const [timeUnit, setTimeUnit] = useState("minutes");
  const [timeValue, setTimeValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const electron = window.electron;
    if (!electron) return;
  
    const handleMessage = (message) => {
      setMessage(message);
    };    
  
    electron.receive("Shutdown-schedule-sent", handleMessage);
    electron.receive("Cancel shutdown", handleMessage);
  
    return () => {
      electron.remove("Shutdown-schedule-sent", handleMessage);
      electron.remove("Cancel shutdown", handleMessage);
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
