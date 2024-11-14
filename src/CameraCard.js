import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import MultiMicrophoneVolume from "./MultiMicrophoneVolume";

const CameraCard = () => {
  const webcamRef = useRef(null);
  const [deviceId, setDeviceId] = useState("");
  const [devices, setDevices] = useState([]);
  const [switchCam, setSwitchCam] = useState(false);

  useEffect(() => {
    const getDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(
          ({ kind }) => kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setDeviceId(videoDevices[0].deviceId);
        }
        if (videoDevices.length > 1) {
          setSwitchCam(true);
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getDevices();
  }, []);

  const handleSwitchCamera = () => {
    const currentIndex = devices.findIndex(
      (device) => device.deviceId === deviceId
    );
    const nextIndex = (currentIndex + 1) % devices.length;
    setDeviceId(devices[nextIndex].deviceId);
  };

  return (
    <div className="col card">
      <div className="">
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={{ deviceId: deviceId }}
        />
      
      </div>

      {switchCam && <button onClick={handleSwitchCamera}>Switch Camera</button>}
    </div>
  );
};

export default CameraCard;
