import React from "react";

const TimeInput = ({ timeValue, setTimeValue, timeUnit, placeholder }) => {
  return (
    <div>
      <input
        type="number"
        placeholder={`Time in ${timeUnit}`}
        value={timeValue}
        onChange={(event) => setTimeValue(event.target.value)}
      />
    </div>
  );
};

export default TimeInput;
