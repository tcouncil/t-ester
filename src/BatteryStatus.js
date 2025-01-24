import React from "react";
import { useBattery } from "@uidotdev/usehooks";
import "./Battery.css"

const BatteryStatus = () => {
  const { loading, level, charging, chargingTime, dischargingTime } =
    useBattery();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate battery score
  const batteryScore = (level * 100).toFixed(0);
  
  // Format time in hours and minutes
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      {/* Battery Information */}
      <div className="">
        <div className="battery">
          <div className={`battery-level ${charging ? 'charging' : ''} ${batteryScore <= 20 ? 'warn' : ''}`} style={{ width: `${batteryScore}%` }}></div>
        </div>
      </div>
      <div className="BatteryInfo">
        <h6>Battery Level: {batteryScore}%</h6>
        <p>
          {charging && chargingTime !== Infinity ? (
            <>
              <p>Charging Time: {formatTime(chargingTime)}</p>
            </>
          ) : dischargingTime !== Infinity ? (
            <>
              <p>Discharging Time: {formatTime(dischargingTime)}</p>
            </>
          ) : (
            "Calculating battery..."
          )}
        </p>
      </div>



    </>
  );
};

export default BatteryStatus;
