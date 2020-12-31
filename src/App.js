import React, { useState } from "react";
import Countdown from "./Countdown";
import HappyNewYear from "./HappyNewYear";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      {show ? <HappyNewYear /> : <Countdown onFinish={() => setShow(true)} />}
    </div>
  );
}
