import React, { useState, useRef, useEffect } from 'react';
import './TouchscreenTest.css';

const numRows = 7;
const numCols = 7;

const TouchscreenTest = () => {
  const [grid, setGrid] = useState(
    Array(numRows).fill(null).map(() => Array(numCols).fill(false))
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [grid]);

  return (
    <div className="touchscreen-test" ref={containerRef}>
      <button className="fullscreen-button" onClick={toggleFullscreen}>
        Touch Test
      </button>
      {isFullscreen && (
        <div className="grid">
          {grid.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                data-row={rowIndex}
                data-col={colIndex}
                className={`cell ${col ? 'touched' : 'untouched'}`}
                onTouchStart={() => handleTouch(rowIndex, colIndex)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TouchscreenTest;
