import React, { useState } from 'react';
import useOrientationChange from './useOrientationChange';

const OrientationTracker = () => {
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

    return (
        <div>
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
        </div>
    );
};

export default OrientationTracker;
