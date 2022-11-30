import React, { useReducer, useState, useRef } from "react";
import reducer, {
  initialState,
  DECREMENT_BREAK,
  INCREMENT_BREAK,
  DECREMENT_SESSION,
  INCREMENT_SESSION,
  START,
  RESET,
  PAUSE,
} from "./modules/reducer";
import { randCol } from "./modules/random";
import beep from "./Assets/beep1.wav";
import style from "./TwentyNFiveApp.module.css";

export default function TwentyNFiveClockApp(props) {
  const genRand = () => {
    return {
      "--rand-color1": randCol(),
      "--rand-color2": randCol(),
    };
  };

  const [timer, dispatch] = useReducer(reducer, initialState);
  const [randBg, setRandBg] = useState(genRand());
  const audio = useRef();

  const playBeep = () => {
    audio.current.play();
  };

  const stopBeep = () => {
    audio.current.currentTime = audio.current.seekable.end(0);
  };

  return (
    <div className={style.container}>
      <audio src={beep} id="beep" ref={audio} preload="auto" />
      <div className={style.header}>
        <h1>25 + 5 Clock</h1>
      </div>
      <hr />
      <div className={style.lengthSetters}>
        <div>
          <h3 id="break-label">Break Length</h3>
          <p>
            <button
              id="break-decrement"
              onClick={() => dispatch({ type: DECREMENT_BREAK })}
              disabled={timer.isPlaying}
            >
              -
            </button>
            <span id="break-length">{timer.breakLength}</span>
            <button
              id="break-increment"
              onClick={() => dispatch({ type: INCREMENT_BREAK })}
              disabled={timer.isPlaying}
            >
              +
            </button>
          </p>
        </div>
        <div>
          <h3 id="session-label">Session Length</h3>
          <p>
            <button
              id="session-decrement"
              onClick={() => dispatch({ type: DECREMENT_SESSION })}
              disabled={timer.isPlaying}
            >
              -
            </button>
            <span id="session-length">{timer.sessionLength}</span>
            <button
              id="session-increment"
              onClick={() => dispatch({ type: INCREMENT_SESSION })}
              disabled={timer.isPlaying}
            >
              +
            </button>
          </p>
        </div>
      </div>
      <hr />
      <div className={style.timerDisplay}>
        <h2 id="timer-label">{timer.isBreak ? "Break" : "Session"}</h2>
        <p
          id="time-left"
          className={timer.isPlaying ? style.animatedBg : ""}
          style={randBg}
        >
          {timer.currentMinute}:{timer.currentSeconds}
        </p>
        <p>
          <button
            id="start_stop"
            onClick={() =>
              dispatch(
                timer.isPlaying
                  ? { type: PAUSE, onPause: stopBeep }
                  : {
                      type: START,
                      dispatcher: dispatch,
                      onStart: () => {
                        stopBeep();
                        setRandBg(genRand());
                      },
                      onEnd: playBeep,
                    }
              )
            }
          >
            {timer.isPlaying ? "Pause" : "Start"}
          </button>
          <button
            id="reset"
            onClick={() => {
              dispatch({ type: RESET, onReset: stopBeep });
            }}
          >
            Reset
          </button>
        </p>
      </div>
      <hr />
      <div>
        <h5>Coded by:</h5>
        <h3>
          <a
            href="https://github.com/jephthah-orobia"
            target="_blank"
            rel="noreferrer"
          >
            Jephthah M. Orobia
          </a>
        </h3>
      </div>
    </div>
  );
}
