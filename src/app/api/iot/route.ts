/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

let latestData: any = null;

function calculateACTemperature(
  indoorTemp: number,
  indoorHumi: number,
  outdoorTemp: number,
  outdoorHumi: number
): number {
  /**
   * 1. Điều chỉnh nhiệt độ cảm nhận theo độ ẩm trong phòng
   * - 50% là mốc dễ chịu
   * - Cứ +10% độ ẩm → cảm giác nóng hơn ~0.3°C
   */
  const humidityEffect = (indoorHumi - 50) * 0.03; // ±0.3°C mỗi 10% RH

  const perceivedIndoorTemp = indoorTemp + humidityEffect;

  /**
   * 2. Tính nhiệt độ mục tiêu cơ bản
   * - Không kéo AC theo ngoài trời quá nhiều
   */
  let target = perceivedIndoorTemp - (perceivedIndoorTemp - outdoorTemp) * 0.25;

  /**
   * 3. Nếu trong phòng rất ẩm → ưu tiên hút ẩm
   */
  if (indoorHumi > 65) {
    target -= 0.5;
  }

  /**
   * 4. Nếu ngoài trời vừa nóng vừa ẩm → tránh set quá thấp
   */
  if (outdoorTemp > 32 && outdoorHumi > 70) {
    target += 0.5;
  }

  /**
   * 5. Giới hạn vùng thoải mái
   */
  target = Math.max(24, Math.min(target, 27));

  /**
   * 6. Tránh sốc nhiệt
   */
  if (outdoorTemp - target > 8) {
    target = outdoorTemp - 8;
  }

  /**
   * 7. Làm tròn 0.5°C
   */
  return Math.round(target * 2) / 2;
}

export async function POST(req: Request) {
  const body = await req.json();

  const indoorTemp = Number(body.temperature1);
  const indoorHumi = Number(body.humidity1);
  const outdoorTemp = Number(body.temperature2);
  const outdoorHumi = Number(body.humidity2);

  const acTemp = calculateACTemperature(
    indoorTemp,
    indoorHumi,
    outdoorTemp,
    outdoorHumi
  );

  latestData = {
    deviceId: body.deviceId,
    indoorTemp: body.temperature1,
    indoorHumi: body.humidity1,
    outdoorTemp: body.temperature2,
    outdoorHumi: body.humidity2,
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
