import React, { useState, useEffect, useRef } from "react";
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
  ["ControlLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"],
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
      return "↑";  // Up Arrow Symbol
    case "ArrowDown":
      return "↓";  // Down Arrow Symbol
    case "ArrowLeft":
      return "←";  // Left Arrow Symbol
    case "ArrowRight":
      return "→";  // Right Arrow Symbol
    default:
      return key.toUpperCase();
  }
};

const KeyboardTest = () => {
  const [pressedKeys, setPressedKeys] = useState([]);
  const [totalKeys] = useState(keys.length);
  const divRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.code === "Tab") {
      event.preventDefault(); // Prevent default tab behavior
    }

    // Filter out function keys (F1 to F12) 
    if (event.code.startsWith("F") && !isNaN(event.code.slice(1)) && event.code.slice(1) <= 12) { return; }

    let key = normalizeKey(event.key, event.code);

    // Map `?` to `/`
    if (key === '?') {
      key = '/';
    }

    // Map `"" to `'`
    if (key === '"') {
      key = "'";
    }

    if (!pressedKeys.includes(key)) {
      setPressedKeys([...pressedKeys, key]);
    }
  };

  const getPercentage = () => {
    const percentage = (pressedKeys.length / totalKeys) * 100;
    return Math.min(percentage, 100).toFixed(2);
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [pressedKeys]);

  return (
    <div
      className="keyboard"
      tabIndex="0"
      ref={divRef}
      style={{ outline: "none" }} // Prevent default focus outline
    >
      <p className="text-center mb-1">Percentage Working: {getPercentage()}%</p>
      <div className="mb-3">
        {rowStructure.map((row, rowIndex) => (
          <div className="row flex-grow-1 d-flex justify-content-around align-items-stretch my-0 mx-5" key={rowIndex}>
            {row.map((key) => (
              <div
                className={`col p-2 m-1 border ${pressedKeys.includes(normalizeKey(key, key)) ? "key-success" : "key"
                  } d-flex align-items-center justify-content-center`}
                key={key}
              >
                {normalizeKey(key, key)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardTest;
