import React, { useState, useRef, useEffect } from "react";
import "./TouchscreenTest.css";
import orientationtest from "./orientation-icon.png";
import useOrientationChange from './useOrientationChange';
import GyroscopeComponent from "./GyroscopeComponent";

const OrientationTracker = () => {

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

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
                    <p>This feature is a work in progress and might not work correctly.</p>
                    <GyroscopeComponent />
                </div>)}
        </div>
    );
};

export default OrientationTracker;
