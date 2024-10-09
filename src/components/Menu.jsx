import React, { useEffect, useState } from "react";

function Menu(props) {
  const time = props.time;
  const setTime = props.setTime;
  const diff = props.diff;
  const setDiff = props.setDiff;
  const menuClass = `screen ${props.next ? "up" : ""}`;

  const handleTime = (event) => {
    let btns = document.getElementsByClassName("time-btn");
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove("selected");
    }
    event.target.classList.add("selected");
    let _time = 0;
    if (event.target.getAttribute("data-time")) {
      _time = parseInt(event.target.getAttribute("data-time"));
    } else if (event.target.getAttribute("data-unlimited")) {
      _time = -1;
    }

    setTime(_time);
  };

  const handleDiff = (event) => {
    let btns = document.getElementsByClassName("difficulty-btn");
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove("selected");
    }
    event.target.classList.add("selected");

    let _diff = 0;
    if (event.target.getAttribute("data-difficulty")) {
      _diff = parseInt(event.target.getAttribute("data-difficulty"));
    }
    setDiff(_diff);
  };

  useEffect(() => {
    if (diff && time) {
      props.setNext(true);
    }

    if (!diff) {
      let btns_diff = document.getElementsByClassName("difficulty-btn");
      for (let i = 0; i < btns_diff.length; i++) {
        btns_diff[i].classList.remove("selected");
      }
    }
    if (!time) {
      let btns_time = document.getElementsByClassName("time-btn");
      for (let i = 0; i < btns_time.length; i++) {
        btns_time[i].classList.remove("selected");
      }
    }
  }, [diff, time]);

  return (
    <div className={menuClass}>
      <h1>Menu</h1>
      <h2>Time</h2>
      <ul className="list" id="time-list">
        <li>
          <button className="btn time-btn" data-time="30" onClick={handleTime}>
            30 sec
          </button>
        </li>
        <li>
          <button className="btn time-btn" data-time="120" onClick={handleTime}>
            2 min
          </button>
        </li>
        <li>
          <button className="btn time-btn" data-time="300" onClick={handleTime}>
            5 min
          </button>
        </li>
        <li>
          <button
            className="btn time-btn"
            data-unlimited="true"
            onClick={handleTime}
          >
            Unlimited
          </button>
        </li>
      </ul>

      <h2>Difficulty</h2>
      <ul className="list" id="difficulty-list">
        <li>
          <button
            className="btn difficulty-btn"
            data-difficulty="1"
            onClick={handleDiff}
          >
            Easy
          </button>
        </li>
        <li>
          <button
            className="btn difficulty-btn"
            data-difficulty="2"
            onClick={handleDiff}
          >
            Medium
          </button>
        </li>
        <li>
          <button
            className="btn difficulty-btn"
            data-difficulty="3"
            onClick={handleDiff}
          >
            Hard
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
