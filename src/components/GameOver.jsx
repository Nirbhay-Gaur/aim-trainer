import React from "react";

function GameOver({ score, accuracy, handleRestart }) {
  return (
    <div className="screen">
      <h1>Game Over</h1>
      <div className="results">
        <p>
          Score: <span id="score-over">{score}</span>
        </p>
        <p>
          Accuracy: <span id="accuracy-over">{`${accuracy}%`}</span>
        </p>
      </div>
      <button className="btn restart" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
}

export default GameOver;
