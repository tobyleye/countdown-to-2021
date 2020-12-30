import React, { useEffect, useReducer } from "react";
import "./styles.css";

let year2021 = new Date(2021, 0, 1);

let divmod = (numerator, denominator) => {
  let d = Math.floor(numerator / denominator);
  let remainder = numerator - denominator * d;
  return [d, remainder];
};

const millisecondsToDHMS = (ms) => {
  let [days, r1] = divmod(ms, 1000 * 60 * 60 * 24);
  let [hours, r2] = divmod(r1, 1000 * 60 * 60);
  let [minutes, r3] = divmod(r2, 1000 * 60);
  let [seconds] = divmod(r3, 1000);

  const result = { days, hours, minutes, seconds };
  // pad start each key value
  Object.keys(result).forEach((key) => {
    result[key] = result[key].toString().padStart(2, "0");
  });

  return result;
};

const Countdown = () => {
  const [, tick] = useReducer((c) => c + 1, 0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      tick();
    }, 1000);
    return () => clearTimeout(timeout);
  });

  let remainingMilliSeconds = year2021 - new Date();
  const dhms = millisecondsToDHMS(remainingMilliSeconds);

  return (
    <div>
      <div className="countdown-to-next-year">
        <div className="unit">
          <span>{dhms.days}</span>
          <span>Days</span>
        </div>

        <div className="unit">
          <span>{dhms.hours}</span>
          <span>Hours</span>
        </div>

        <div className="unit">
          <span>{dhms.minutes}</span>
          <span>Minutes</span>
        </div>
        <div className="unit">
          <span>{dhms.seconds}</span>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Countdown />
    </div>
  );
}
