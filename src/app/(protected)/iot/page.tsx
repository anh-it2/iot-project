"use client";

import { Card, Table, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

type SensorData = {
  id: string; // ✅ unique key
  temperature: number | null;
  humidity: number | null;
  time: string;
};

export default function IotPage() {
  const [data, setData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/iot");
      const json = await res.json();

      const record: SensorData = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        temperature: json.temperature ?? null,
        humidity: json.humidity ?? null,
        time: json.time,
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
      title: "Temperature (°C)",
      dataIndex: "temperature",
      key: "temperature",
      render: (value: number | null) => value ?? "—",
    },
    {
      title: "Humidity (%)",
      dataIndex: "humidity",
      key: "humidity",
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
            <p>🌡 Temperature: {data.temperature ?? "—"} °C</p>
            <p>💧 Humidity: {data.humidity ?? "—"} %</p>
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
