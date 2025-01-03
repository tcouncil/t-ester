import React, { useState, useRef, useEffect } from "react";
import "./TouchscreenTest.css";
import orientationtest from "./orientation-icon.png";
import useOrientationChange from './useOrientationChange';

const OrientationTracker = () => {

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    const [orientations, setOrientations] = useState({
        portrait: false,
        landscape: false,
        reversePortrait: false,
        reverseLandscape: false,
    });

    useOrientationChange((newOrientation) => {

        setOrientations((prevOrientations) => {
            switch (newOrientation) {
                case 0:
                    return { ...prevOrientations, portrait: true };
                case 90:
                    return { ...prevOrientations, landscape: true };
                case 180:
                    return { ...prevOrientations, reversePortrait: true };
                case -90:
                case 270: // Some devices use 270 instead of -90
                    return { ...prevOrientations, reverseLandscape: true };
                default:
                    return prevOrientations;
            }
        });
    });

    const startOrientationTest = () => {
        setIsVisible(true);
        setTimeout(enterFullscreen, 100);  // Adding a slight delay to ensure visibility first
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

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          exitFullscreen();
          setIsVisible(false);
        }
      };
    

    useEffect(() => {
        const handleFullscreenChange = () => {
          if (!document.fullscreenElement) {
            setIsVisible(false);
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
      }, []);

    return (
        <div className='App'>
            <button className="orientation-button" onClick={startOrientationTest}>
                <img src={orientationtest} alt="Orientation Test" className="button-image" />
            </button>
            {isVisible &&
                (<div className="touchscreen-test" ref={containerRef}>
                    <p>This feature is a work in progress and might not work.</p>
                    <p>Rotate your device to all four orientations:</p>
                    <ul>
                        <li>
                            Portrait: {orientations.portrait ? '✓' : '✗'}
                        </li>
                        <li>
                            Landscape: {orientations.landscape ? '✓' : '✗'}
                        </li>
                        <li>
                            Reverse Portrait: {orientations.reversePortrait ? '✓' : '✗'}
                        </li>
                        <li>
                            Reverse Landscape: {orientations.reverseLandscape ? '✓' : '✗'}
                        </li>
                    </ul>
                </div>)}
        </div>
    );
};

export default OrientationTracker;
