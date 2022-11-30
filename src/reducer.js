export const DECREMENT_BREAK = "dec_break",
    INCREMENT_BREAK = "inc_break",
    DECREMENT_SESSION = "dec_session",
    INCREMENT_SESSION = "inc_session",
    START = "start",
    PAUSE = "pause",
    RESET = "reset",
    COUNTDOWN = "countdown";

export const initialState = {
    breakLength: 5,
    sessionLength: 25,
    isPlaying: false,
    isBreak: false,
    currentMinute: "25",
    currentSeconds: "00",
    remainingSeconds: 25 * 60,
    intervalId: 0
}

const reducer = (state, action) => {
    if (!state.isPlaying)
        switch (action.type) {
            case DECREMENT_BREAK: {
                let temp = state.breakLength - 1;
                temp = (temp < 1) ? 1 : temp > 60 ? 60 : temp;
                if (state.isBreak)
                    return {
                        ...state,
                        breakLength: temp,
                        currentMinute: temp.toString().padStart(2, '0'),
                        currentSeconds: "00",
                        remainingSeconds: temp * 60
                    };

                return { ...state, breakLength: temp };
            }
            case INCREMENT_BREAK: {
                let temp = state.breakLength + 1;
                temp = (temp < 1) ? 1 : temp > 60 ? 60 : temp;
                if (state.isBreak)
                    return {
                        ...state,
                        breakLength: temp,
                        currentMinute: temp.toString().padStart(2, '0'),
                        currentSeconds: "00",
                        remainingSeconds: temp * 60
                    };
                return { ...state, breakLength: temp };
            }
            case DECREMENT_SESSION: {
                let temp = state.sessionLength - 1;
                temp = (temp < 1) ? 1 : temp > 60 ? 60 : temp;
                if (!state.isBreak)
                    return {
                        ...state,
                        sessionLength: temp,
                        currentMinute: temp.toString().padStart(2, '0'),
                        currentSeconds: "00",
                        remainingSeconds: temp * 60
                    };
                return { ...state, sessionLength: temp };
            }
            case INCREMENT_SESSION: {
                let temp = state.sessionLength + 1;
                temp = (temp < 1) ? 1 : temp > 60 ? 60 : temp;
                if (!state.isBreak)
                    return {
                        ...state,
                        sessionLength: temp,
                        currentMinute: temp.toString().padStart(2, '0'),
                        currentSeconds: "00",
                        remainingSeconds: temp * 60
                    };
                return { ...state, sessionLength: temp };
            }
            case START: {
                action.beforeStart();
                return {
                    ...state,
                    isPlaying: true,
                    intervalId: setInterval(() =>
                        action.dispatcher({ type: COUNTDOWN, onEnd: action.onEnd }),
                        50)
                };
            }
            case RESET: {
                //action.afterReset();
                return initialState;
            }
            default:
                return state;
        }
    else
        switch (action.type) {
            case COUNTDOWN: {
                if (state.remainingSeconds > 0)
                    return {
                        ...state,
                        currentMinute: Math.floor((state.remainingSeconds - 1) / 60).toString().padStart(2, '0'),
                        currentSeconds: ((state.remainingSeconds - 1) % 60).toString().padStart(2, '0'),
                        remainingSeconds: state.remainingSeconds - 1,
                    };
                else {
                    action.onEnd();
                    // if isBreak then break is ending so set timer to session
                    return {
                        ...state,
                        isBreak: !state.isBreak,
                        currentMinute: (state.isBreak ? state.sessionLength : state.breakLength).toString().padStart(2, '0'),
                        currentSeconds: "00",
                        remainingSeconds: state.isBreak ? state.sessionLength * 60 : state.breakLength * 60
                    };
                }
            }
            case PAUSE: {
                action.onPause();
                clearInterval(state.intervalId);
                return { ...state, isPlaying: false };
            }
            case RESET: {
                //action.afterReset();
                clearInterval(state.intervalId);
                return initialState;
            }
            default:
                return state;
        }
}

export default reducer;