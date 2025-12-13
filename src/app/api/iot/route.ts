import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const temp = searchParams.get("temp");
  const humi = searchParams.get("humi");

  console.log("📡 ESP32 DATA:", { temp, humi });

  return NextResponse.json({ ok: true });
}
