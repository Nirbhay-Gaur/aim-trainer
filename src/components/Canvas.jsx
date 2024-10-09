import React, { useEffect, useRef, useState } from "react";

function Canvas({
  time,
  diff,
  accuracy,
  setAccuracy,
  score,
  setScore,
  end,
  setEnd,
}) {
  const [seconds, setSeconds] = useState(time);
  const [missed, setMissed] = useState(0);
  const [heart1, setHeart1] = useState(false);
  const [heart2, setHeart2] = useState(false);
  const [heart3, setHeart3] = useState(false);
  const [hCounter, setHCounter] = useState(0);
  const boardRef = useRef(null);
  const [board, setBoard] = useState(null);
  const [showBtn, setShowBtn] = useState(true);
  const heart_1_class = `heart ${heart1 ? "dead" : ""}`;
  const heart_2_class = `heart ${heart2 ? "dead" : ""}`;
  const heart_3_class = `heart ${heart3 ? "dead" : ""}`;
  var intervalId;

  const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const createRandomTargets = () => {
    let size;
    switch (diff) {
      case 1:
        size = 80;
        break;
      case 2:
        size = 60;
        break;
      case 3:
        size = 50;
        break;
      default:
        break;
    }
    const colors = [
      "#FF5733", // Bright Red-Orange
      "#33FF57", // Bright Green
      "#3357FF", // Bright Blue
      "#FF33A1", // Bright Pink
      "#FFD733", // Bright Yellow
      "#33FFF6", // Bright Cyan
      "#FF33FF", // Bright Magenta
      "#FF8C33", // Bright Orange
      "#33FF8C", // Bright Teal
      "#FFC300", // Bright Gold
    ];
    if (board) {
      const { width, height } = board;
      const x = getRandomNumber(0, width - size);
      const y = getRandomNumber(0, height - size);
      let color = Math.floor(Math.random() * 10);
      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.top = `${y}px`;
      circle.style.left = `${x}px`;
      circle.style.background = `${colors[color]}`;

      boardRef.current.appendChild(circle);

      if (diff === 1) {
        circle.style.animationDuration = "2s";
      } else if (diff === 2) {
        circle.style.animationDuration = "1.2s";
      } else {
        circle.style.animationDuration = "1s";
      }

      circle.addEventListener("animationend", () => {
        circle.remove();
        setMissed((prev) => prev + 1);
        setHCounter((prev) => prev + 1);
        if (!end) createRandomTargets();
      });
    }
  };

  useEffect(() => {
    switch (hCounter) {
      case 1:
        setHeart1(true);
        break;
      case 2:
        setHeart2(true);
        break;
      case 3:
        setHeart3(true);
        setEnd(true);
        break;
    }
  }, [hCounter]);

  const startTimer = () => {
    if (seconds === null) setSeconds(time);
    if (seconds > 0) {
      intervalId = setInterval(() => {
        if (seconds != 0) setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
  };

  const handleReady = () => {
    startTimer();
    setShowBtn(false);
    createRandomTargets();

    boardRef.current.addEventListener("click", (event) => {
      if (event.target.classList.contains("circle")) {
        setScore((prev) => prev + 1);
        event.target.remove();
        createRandomTargets();
      } else {
        setMissed((prev) => prev + 1);
      }
    });
  };

  useEffect(() => {
    if (seconds === 0) {
      setEnd(true);
    }
    return () => clearInterval(intervalId);
  }, [seconds]);

  useEffect(() => {
    let _accuracy = (score / (score + missed)) * 100;
    _accuracy = _accuracy.toFixed(2);
    setAccuracy(_accuracy);
  }, [score, missed]);

  useEffect(() => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      setBoard(rect);
    }
  }, [board]);

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="screen">
      <div className="stats">
        <div className="info">
          <p>
            Time:
            <span id="time">{time != -1 ? formatTime(seconds) : "∞"}</span>
          </p>
          <p>
            Score: <span id="score">{score}</span>
          </p>
          <p>
            Accuracy: <span id="accuracy">{`${accuracy}%`}</span>
          </p>
        </div>
        <div className="lives">
          <p className={heart_1_class}>❤️</p>
          <p className={heart_2_class}>❤️</p>
          <p className={heart_3_class}>❤️</p>
        </div>
      </div>
      <div key="board" className="board" id="board" ref={boardRef}></div>
      {showBtn ? (
        <button className="btn ready" onClick={handleReady}>
          Ready!
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Canvas;
