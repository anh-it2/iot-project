"use client";

import { useEffect, useState } from "react";

type SensorData = {
  temperature: number | null;
  humidity: number | null;
  time: string;
};

export default function Home() {
  const [data, setData] = useState<SensorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/iot");
      const json = await res.json();
      setData(json);
    };

    fetchData();
    const timer = setInterval(fetchData, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>📡 ESP32 Sensor Data (Wokwi)</h1>

      {!data ? (
        <p>Waiting for data...</p>
      ) : (
        <div style={{ marginTop: 16 }}>
          <p>🌡 Temperature: {data.temperature ?? "—"} °C</p>
          <p>💧 Humidity: {data.humidity ?? "—"} %</p>
          <p>🕒 Time: {data.time}</p>
        </div>
      )}
    </main>
  );
}
