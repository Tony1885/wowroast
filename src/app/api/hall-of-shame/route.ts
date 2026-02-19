import { NextResponse } from "next/server";
import { getHallOfShame } from "@/lib/shame";

export async function GET() {
  const entries = getHallOfShame(10);
  return NextResponse.json({ entries });
}
