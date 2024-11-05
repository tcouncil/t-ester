import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const keys = [
  "Escape",
  "`",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "Backspace",
  "Tab",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "[",
  "]",
  "\\",
  "Search",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  ";",
  "'",
  "Enter",
  "ShiftLeft",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  ",",
  ".",
  "/",
  "ShiftRight",
  "ControlLeft",
  "AltLeft",
  "Space",
  "AltRight",
  "ControlRight",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];

const rowStructure = [
  [
    "Escape",
    "`",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "Backspace",
  ],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Search", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["ShiftLeft", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "ShiftRight"],
  ["ControlLeft", "AltLeft", "Space", "AltRight", "ControlRight"],
  ["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"],
];

const normalizeKey = (key, code) => {
  switch (code) {
    case "Space":
      return "SPACE";
    case "ControlLeft":
      return "CONTROLLEFT";
    case "ControlRight":
      return "CONTROLRIGHT";
    case "AltLeft":
      return "ALTLEFT";
    case "AltRight":
      return "ALTRIGHT";
    case "Escape":
      return "ESCAPE";
    case "OSLeft":
    case "MetaLeft":
    case "SuperLeft":
    case "CapsLock":
      return "SEARCH";
    case "ShiftLeft":
      return "SHIFTLEFT";
    case "ShiftRight":
      return "SHIFTRIGHT";
    case "ArrowUp":
      return "ARROWUP";
    case "ArrowDown":
      return "ARROWDOWN";
    case "ArrowLeft":
      return "ARROWLEFT";
    case "ArrowRight":
      return "ARROWRIGHT";
    default:
      return key.toUpperCase();
  }
};

const KeyboardTest = () => {
  const [pressedKeys, setPressedKeys] = useState([]);
  const [totalKeys, setTotalKeys] = useState(keys.length);

  const handleKeyPress = (event) => {
    const key = normalizeKey(event.key, event.code);

    if (!pressedKeys.includes(key)) {
      setPressedKeys([...pressedKeys, key]);
    }
  };

  const getPercentage = () => {
    return ((pressedKeys.length / totalKeys) * 100).toFixed(2);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [pressedKeys]);

  return (
    <div className="keyboard">
      {/*
      <h1 className="text-center">Keyboard Functionality Test</h1>
      <p className="text-center">Pressed Key: {pressedKeys[pressedKeys.length - 1]}</p>
      <p className="text-center">Keys Pressed: {pressedKeys.length} / {totalKeys}</p>
      
      */}
      <p className="text-center mt-3">Percentage Working: {getPercentage()}%</p>
      <div className="">
        {rowStructure.map((row, rowIndex) => (
          <div className="row justify-content-center my-2" key={rowIndex}>
            {row.map((key) => (
              <div
                className={`col-auto p-2 m-1 border ${
                  pressedKeys.includes(key.toUpperCase())
                    ? "key-success"
                    : "key"
                }`}
                key={key}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardTest;
