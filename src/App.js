import React, { useState } from "react";
import Main from "./components/Main";
import "./App.css";
import Menu from "./components/Menu";
import Canvas from "./components/Canvas";
import GameOver from "./components/GameOver";

function App() {
  const [time, setTime] = useState(null);
  const [diff, setDiff] = useState(null);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [next, setNext] = useState(false);
  const [end, setEnd] = useState(false);

  const handleRestart = () => {
    setTime(null);
    setDiff(null);
    setScore(0);
    setAccuracy(0);
    setEnd(false);
    setNext(false);
  };

  return (
    <div>
      <Main />
      <Menu
        next={next}
        setNext={setNext}
        time={time}
        setTime={setTime}
        diff={diff}
        setDiff={setDiff}
      />
      {!end && time && diff ? (
        <Canvas
          time={time}
          diff={diff}
          score={score}
          setScore={setScore}
          accuracy={accuracy}
          setAccuracy={setAccuracy}
          end={end}
          setEnd={setEnd}
        />
      ) : (
        <GameOver
          score={score}
          accuracy={accuracy}
          handleRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
