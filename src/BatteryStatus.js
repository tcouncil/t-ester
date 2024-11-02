import React from "react";
import { useBattery } from "@uidotdev/usehooks";

const BatteryStatus = () => {
  const { loading, level, charging, chargingTime, dischargingTime } =
    useBattery();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate battery score, charge rate, and discharge rate
  const batteryScore = (level * 100).toFixed(0);
  const chargeRate = chargingTime ? (1 / chargingTime) * 100 : 0; // Charging rate in percent per second
  const dischargeRate = dischargingTime ? (1 / dischargingTime) * 100 : 0; // Discharging rate in percent per second

  // Format time in hours and minutes
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <p>Battery Level: {batteryScore}%</p>
      <p>Charging: {charging ? "Yes" : "No"}</p>
      <p>
        {charging && chargingTime !== Infinity ? (
          <>
            <p>Charging Time: {formatTime(chargingTime)}</p>
            <p>Charge Rate: {chargeRate.toFixed(4)}% / s</p>
          </>
        ) : dischargingTime !== Infinity ? (
          <>
            <p>Discharging Time: {formatTime(dischargingTime)}</p>
            <p>Discharge Rate: {dischargeRate.toFixed(4)}% / s</p>
          </>
        ) : (
          "Calculating battery..."
        )}
      </p>
    </>
  );
};

export default BatteryStatus;
