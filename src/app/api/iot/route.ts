/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

let latestData: any = null;

export async function POST(req: Request) {
  const body = await req.json();

  latestData = {
    deviceId: body.deviceId,
    temperature: body.temperature,
    humidity: body.humidity,
    time: new Date().toISOString(),
  };

  console.log("📡 ESP32 DATA:", latestData);

  return NextResponse.json({ ok: true });
}

export async function GET() {
  if (!latestData) {
    return NextResponse.json({ message: "No data yet" }, { status: 404 });
  }

  return NextResponse.json(latestData);
}
