"use client";

import { Card, Table, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

type SensorData = {
  id: string; // ✅ unique key
  indoorTemp: number | null;
  indoorHumi: number | null;
  outdoorTemp: number | null;
  outdoorHumi: number | null;
  acTemp: number | null;
  time: string;
};

//  latestData = {
//     deviceId: body.deviceId,
//     indoorTemp: body.temperature1,
//     indoorHumi: body.humidity1,
//     outdoorTemp: body.temperature2,
//     outdoorHumi: body.humidity2,
//     acTemp: acTemp,
//     time: new Date().toISOString(),
//   };
export default function IotPage() {
  const [data, setData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/iot");
      const json = await res.json();

      const record: SensorData = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        indoorTemp: json.temperature1 ?? null,
        indoorHumi: json.humidity1 ?? null,
        outdoorTemp: json.temperature2 ?? null,
        outdoorHumi: json.humidity2 ?? null,
        time: json.time,
        acTemp: json.acTemp,
      };

      setData(record);

      // Lưu history (data mới ở trên cùng)
      setHistory((prev) => [record, ...prev].slice(0, 100));
    };

    fetchData();
    const timer = setInterval(fetchData, 3000);
    return () => clearInterval(timer);
  }, []);

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Indoor Temperature (°C)",
      dataIndex: "indoorTemp",
      key: "indoorTemp",
      render: (value: number | null) => value ?? "—",
    },
    {
      title: "Indoor Humidity (💧)",
      dataIndex: "indoorHumi",
      key: "indoorHumi",
      render: (value: number | null) => value ?? "—",
    },
    {
      title: "Outdoor Temperature (°C)",
      dataIndex: "outdoorTemp",
      key: "outdoorTemp",
      render: (value: number | null) => value ?? "—",
    },
    {
      title: "Outdoor Humidity (💧)",
      dataIndex: "outdoorHumi",
      key: "outdoorHumi",
      render: (value: number | null) => value ?? "—",
    },
    {
      title: "Temperature of controller (°C)",
      dataIndex: "acTemp",
      key: "acTemp",
      render: (value: number | null) => value ?? "—",
    },
  ];

  return (
    <main style={{ padding: 24 }}>
      <Title level={3}>📡 ESP32 Sensor Data</Title>

      {/* Current data */}
      <Card style={{ marginBottom: 24 }}>
        {!data ? (
          <Text>Waiting for data...</Text>
        ) : (
          <>
            <p>🌡 Indoor Temperature: {data.indoorTemp ?? "—"} °C</p>
            <p>💧 Indoor Humidity: {data.indoorHumi ?? "—"} %</p>
            <p>🌡 Outdoor Temperature: {data.outdoorTemp ?? "—"} °C</p>
            <p>💧 Outdoor Humidity: {data.outdoorHumi ?? "—"} %</p>
            <p>🕒 Time: {data.time}</p>
          </>
        )}
      </Card>

      {/* History table */}
      <Card title="📊 Sensor Data History">
        <Table
          rowKey="id" // ✅ unique key
          columns={columns}
          dataSource={history}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </main>
  );
}
