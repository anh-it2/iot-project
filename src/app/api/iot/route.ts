import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const temp = searchParams.get("temp");
  const humi = searchParams.get("humi");

  const data = {
    temperature: temp ? Number(temp) : null,
    humidity: humi ? Number(humi) : null,
    time: new Date().toISOString(),
  };

  console.log("📡 ESP32 DATA:", data);

  return NextResponse.json(data);
}
