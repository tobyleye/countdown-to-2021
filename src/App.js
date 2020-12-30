import React, { useEffect, useReducer } from "react";
import "./styles.css";

let nextYear = new Date(2021, 0, 1);

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
  [days, hours, minutes, seconds].forEach((item) => {
    item.toString().padStart(2, "0");
  });
  return { days: days.toString().padStart(2, "0"), hours, minutes, seconds };
};

const PadStart = ({ value, padString = "0", times = 2 }) => (
  <span>{value.toString().padStart(times, padString)}</span>
);

const Countdown = () => {
  const [_, tick] = useReducer((c) => c + 1, 0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      tick();
    }, 1000);
    return () => clearTimeout(timeout);
  });

  let remainingMilliSeconds = nextYear - new Date();
  const dhms = millisecondsToDHMS(remainingMilliSeconds);

  return (
    <div>
      <div className="countdown-to-next-year">
        <div className="unit">
          <PadStart value={dhms.days} />
          <span>Days</span>
        </div>

        <div className="unit">
          <PadStart value={dhms.hours} />
          <span>Hours</span>
        </div>

        <div className="unit">
          <PadStart value={dhms.minutes} />
          <span>Minutes</span>
        </div>
        <div className="unit">
          <PadStart value={dhms.seconds} />
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
