import React, { useState, useEffect, useRef } from 'react';

const MultiMicrophoneVolume = () => {
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);

  const updateVolume = () => {
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
    const average = sum / dataArrayRef.current.length;
    setVolume(average);
    animationFrameRef.current = requestAnimationFrame(updateVolume);
  };

  useEffect(() => {
    const initAudio = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter(device => device.kind === 'audioinput');
        const lastMicrophoneDevice = audioDevices[audioDevices.length - 1];
        
        if (lastMicrophoneDevice) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: lastMicrophoneDevice.deviceId } });
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
          const bufferLength = analyserRef.current.frequencyBinCount;
          dataArrayRef.current = new Uint8Array(bufferLength);

          microphoneRef.current.connect(analyserRef.current);
          setInterval(updateVolume, 100);
        }
      } catch (err) {
        console.error('Error accessing the microphone', err);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="volume-meter-container">
      <div className="volume-icon">🔊</div>
      <div className="volume-meter">
        <div className="volume-bar" style={{ width: `${volume}%` }}></div>
      </div>
    </div>
  );
};

export default MultiMicrophoneVolume;
