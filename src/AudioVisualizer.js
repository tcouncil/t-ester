import React, { useState, useEffect, useRef } from 'react';

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 255, 0)';

    canvasCtx.beginPath();
    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArrayRef.current[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();

    animationFrameRef.current = requestAnimationFrame(drawWaveform);
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
          analyserRef.current.fftSize = 2048;
          const bufferLength = analyserRef.current.frequencyBinCount;
          dataArrayRef.current = new Uint8Array(bufferLength);

          microphoneRef.current.connect(analyserRef.current);
          drawWaveform();
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
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="audio-visualizer-container">
      <canvas ref={canvasRef} width="auto" height="auto"></canvas>
    </div>
  );
};

export default AudioVisualizer;
