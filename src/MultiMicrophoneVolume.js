import React, { useState, useEffect, useRef } from "react";

const MultiMicrophoneVolume = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {

    async function requestMicrophonePermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
        // Use the stream as needed, e.g., to create an AudioContext
        return stream;
      } catch (error) {
        console.error('Microphone permission denied:', error);
        alert('Microphone permission is required for this feature. Please enable it in your browser settings.');
      }
    }

    requestMicrophonePermission();

    
    const getMicrophoneAccess = async () => {
      try {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = mediaDevices.filter(
          ({ kind }) => kind === "audioinput"
        );
        setDevices(audioDevices);

        if (audioDevices.length > 0) {
          setSelectedDeviceId(audioDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    getMicrophoneAccess();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedDeviceId) return;

    const setupAudioContext = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: selectedDeviceId },
        });

        // Handle permission denied or error
        if (!stream) {
          console.error("User denied microphone access or an error occurred.");
          alert(
            "Microphone access is required for this feature. Please enable it in your browser settings."
          );
          return;
        }
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const updateVolume = () => {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
          const average = sum / dataArrayRef.current.length;
          setVolume(average);
          animationFrameRef.current = requestAnimationFrame(updateVolume);
        };

        updateVolume();
      } catch (err) {
        console.error("Error setting up audio context:", err);
      }
    };

    setupAudioContext();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [selectedDeviceId]);

  return (
    <div>
      <select
        onChange={(e) => setSelectedDeviceId(e.target.value)}
        value={selectedDeviceId}
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId}`}
          </option>
        ))}
      </select>
      <div style={{ width: "100%", height: "30px", background: "#ccc" }}>
        <div
          style={{
            width: `${volume}%`,
            height: "100%",
            background: "green",
          }}
        />
      </div>
      <p>Volume: {volume.toFixed(2)}%</p>
    </div>
  );
};

export default MultiMicrophoneVolume;
