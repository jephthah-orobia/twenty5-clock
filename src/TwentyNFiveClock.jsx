import React, { useReducer, useRef } from "react";
import reducer, {
  initialState,
  DECREMENT_BREAK,
  INCREMENT_BREAK,
  DECREMENT_SESSION,
  INCREMENT_SESSION,
  START,
  RESET,
  PAUSE,
} from "./reducer";
import beep from "./Assets/beep.wav";

export default function TwentyNFiveClockApp(props) {
  const [timer, dispatch] = useReducer(reducer, initialState);

  const audio = useRef();

  const playBeep = () => {
    audio.current.play();
  };

  const stopBeep = () => {
    audio.current.currentTime = audio.current.seekable.end(0);
  };

  return (
    <div>
      <audio src={beep} id="beep" ref={audio} preload="auto" />
      <h1>25 + 5 Clock</h1>
      <div>
        <h2 id="break-label">Break Length</h2>
        <p>
          <button
            id="break-decrement"
            onClick={() => dispatch({ type: DECREMENT_BREAK })}
          >
            -
          </button>
          <span id="break-length">{timer.breakLength}</span>
          <button
            id="break-increment"
            onClick={() => dispatch({ type: INCREMENT_BREAK })}
          >
            +
          </button>
        </p>
      </div>
      <div>
        <h2 id="session-label">Session Length</h2>
        <p>
          <button
            id="session-decrement"
            onClick={() => dispatch({ type: DECREMENT_SESSION })}
          >
            -
          </button>
          <span id="session-length">{timer.sessionLength}</span>
          <button
            id="session-increment"
            onClick={() => dispatch({ type: INCREMENT_SESSION })}
          >
            +
          </button>
        </p>
      </div>
      <div>
        <h2 id="timer-label">{timer.isBreak ? "Break" : "Session"}</h2>
        <p id="time-left">
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
                      beforeStart: stopBeep,
                      onEnd: playBeep,
                    }
              )
            }
          >
            {timer.isPlaying ? "Pause" : "Play"}
          </button>
          <button
            id="reset"
            onClick={() => {
              stopBeep();
              dispatch({ type: RESET });
            }}
          >
            Reset
          </button>
        </p>
      </div>
    </div>
  );
}
