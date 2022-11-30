export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randCol(withOpacity = false) {
    return withOpacity
        ? `rgba(${randInt(0, 255)} ,${randInt(0, 255)} ,${randInt(0, 255)} , ${Math.random()})`
        : `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;
}

export function randRot() {
    return randInt(0, 360) + 'deg';
}

export function randPer() {
    return (Math.round(Math.random() * 10000) / 100) + '%';
}