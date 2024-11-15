import React, { useState, useRef, useEffect } from "react";
import "./TouchscreenTest.css";
import touchscreentest from "./touchscreen-icon.png";

const numRows = 7;
const numCols = 7;

const TouchscreenTest = () => {
  const [grid, setGrid] = useState(
    Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill(false))
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTouchTestVisible, setIsTouchTestVisible] = useState(false);
  const containerRef = useRef(null);

  const handleTouch = (row, col) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? true : c))
    );
    setGrid(newGrid);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.dataset && target.dataset.row && target.dataset.col) {
      const row = parseInt(target.dataset.row, 10);
      const col = parseInt(target.dataset.col, 10);
      handleTouch(row, col);
    }
  };

  const enterFullscreen = () => {
    if (containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("touchmove", handleTouchMove);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [grid]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      exitFullscreen();
      setIsTouchTestVisible(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsTouchTestVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const startTouchTest = () => {
    setIsTouchTestVisible(true);
    setTimeout(enterFullscreen, 100);  // Adding a slight delay to ensure visibility first
  };

  return (
    <>
      <button className="fullscreen-button" onClick={startTouchTest}>
        <img src={touchscreentest} alt="Touch Test" className="button-image" />
      </button>
      {isTouchTestVisible && (
        <div className="touchscreen-test" ref={containerRef}>
          <div className="grid">
            {grid.map((row, rowIndex) =>
              row.map((col, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  data-row={rowIndex}
                  data-col={colIndex}
                  className={`cell ${col ? "touched" : "untouched"}`}
                  onTouchStart={() => handleTouch(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TouchscreenTest;
