import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const data = {
    temperature: body.temperature,
    humidity: body.humidity,
    deviceId: body.deviceId,
    time: new Date().toISOString(),
  };

  console.log("📡 ESP32 DATA:", data);

  return NextResponse.json(data);
}
