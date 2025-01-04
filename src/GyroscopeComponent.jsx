import React, { useState, useEffect } from 'react';

function GyroscopeComponent() {
  const [acceleration, setAcceleration] = useState({ x: null, y: null, z: null });
  const [rotationRate, setRotationRate] = useState({ alpha: null, beta: null, gamma: null });
  const [isSupported, setIsSupported] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [orientationsMet, setOrientationsMet] = useState({
    landscape: false,
    portraitLeft: false,
    portraitRight: false,
    reverseLandscape: false,
  });

  useEffect(() => {
    const handleMotionEvent = (event) => {
      if (!event.accelerationIncludingGravity) return;

      const { x, y, z } = event.accelerationIncludingGravity;

      setAcceleration({ x, y, z });

      setOrientationsMet((prev) => ({
        ...prev, // Keep previous states
        landscape: prev.landscape || (x < -50 && z < 7000),
        portraitLeft: prev.portraitLeft || (x < -7000 && z > 0),
        portraitRight: prev.portraitRight || (x > 7500 && z < -1),
        reverseLandscape: prev.reverseLandscape || (z < 1000 && x > 25 && y <  -7500),
      }));
    };

    const checkSupportAndPermissions = async () => {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        setIsSupported(true);
        try {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === 'granted') {
            setHasPermission(true);
            window.addEventListener('devicemotion', handleMotionEvent);
          } else {
            console.log("Device Motion permission not granted.");
          }
        } catch (error) {
          console.error("Error requesting Device Motion permission:", error);
        }
      } else if (window.DeviceMotionEvent) {
        setIsSupported(true);
        setHasPermission(true);
        window.addEventListener('devicemotion', handleMotionEvent);
      } else {
        console.log("Device Motion API not supported.");
      }
    };

    checkSupportAndPermissions();

    return () => {
      window.removeEventListener('devicemotion', handleMotionEvent);
    };
  }, []);

  const requestPermission = async () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === 'granted') {
          setHasPermission(true);
        } else {
          console.log("Device Motion permission not granted.");
        }
      } catch (error) {
        console.error("Error requesting Device Motion permission:", error);
      }
    }
  };

  const displayCheckmark = (orientation) => {
    return orientationsMet[orientation] ? <span style={{ color: 'green' }}>&#10004;</span> : null;
  };

  if (!isSupported) {
    return <div>Device Motion Not Supported</div>;
  }

  return (
    <div>
      {hasPermission ? (
        <div>
          <p>Acceleration (including gravity): X: {acceleration.x} Y: {acceleration.y} Z: {acceleration.z}</p>

          <div>
            <p>Landscape: {displayCheckmark('landscape')}</p>
            <p>Portrait Left: {displayCheckmark('portraitLeft')}</p>
            <p>Portrait Right: {displayCheckmark('portraitRight')}</p>
            <p>Reverse Landscape: {displayCheckmark('reverseLandscape')}</p>
          </div>
        </div>
      ) : (
        <button onClick={requestPermission}>Request Device Motion Permission</button>
      )}
    </div>
  );
}

export default GyroscopeComponent;