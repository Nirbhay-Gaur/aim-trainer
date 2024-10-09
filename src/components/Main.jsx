import React, { useState } from "react";

function Main() {
  const [start, setStart] = useState(false);
  const mainClass = `screen ${start ? "up" : ""}`;

  return (
    <div className={mainClass}>
      <h1>
        AIM<span>🎯</span>TRAINER
      </h1>
      <button className="btn" id="start" onClick={() => setStart(true)}>
        Start Training!
      </button>
    </div>
  );
}

export default Main;
