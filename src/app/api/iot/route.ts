/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

let latestData: any = null;

function calculateACTemperature(
  indoorTemp: number,
  outdoorTemp: number
): number {
  let target = indoorTemp - (indoorTemp - outdoorTemp) * 0.3;

  // Giới hạn vùng thoải mái
  target = Math.max(24, Math.min(target, 27));

  // Tránh sốc nhiệt
  if (outdoorTemp - target > 8) {
    target = outdoorTemp - 8;
  }

  return Math.round(target * 2) / 2;
}

export async function POST(req: Request) {
  const body = await req.json();

  const indoorTemp = Number(body.temperature);
  const outdoorTemp = Number(body.humidity);

  const acTemp = calculateACTemperature(indoorTemp, outdoorTemp);

  latestData = {
    deviceId: body.deviceId,
    temperature: body.temperature,
    humidity: body.humidity,
    acTemp: acTemp,
    time: new Date().toISOString(),
  };

  console.log("📡 ESP32 DATA:", latestData);

  return NextResponse.json({ ok: true, acTemp });
}

export async function GET() {
  if (!latestData) {
    return NextResponse.json({ message: "No data yet" }, { status: 404 });
  }

  return NextResponse.json(latestData);
}
