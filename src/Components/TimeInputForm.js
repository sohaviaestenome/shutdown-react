import React, { useState, useEffect } from "react";
import TimeInput from "./TimeInput";
import TimeToggle from "./TimeToggle";
import "./TimeInputForm.css";

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
    <div className="time-input-form-container">
      <form className="time-input-form" onSubmit={handleSubmit}>
        <div className="time-input-row">
          <TimeInput
            timeValue={timeValue}
            setTimeValue={setTimeValue}
            timeUnit={timeUnit}
            placeholder={`Put time here in ${timeUnit}`}
            className="time-input"
          />
          <TimeToggle
            timeUnit={timeUnit}
            handleToggle={handleToggle}
            className="toggle-button"
          />
          <button type="submit" className="shutdown-button">Shutdown</button>
        </div>
      </form>
      <button onClick={handleCancelShutdown} className="cancel-button">Cancel Shutdown</button>
      <p className="message">{message}</p>
    </div>
  );
};

export default TimeInputForm;
