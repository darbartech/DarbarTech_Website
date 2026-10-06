import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const about_us_pillars = await pool.query(`
      SELECT *
      FROM about_us_pillars
      ORDER BY id
    `);

    return NextResponse.json(about_us_pillars.rows);
  } catch (error) {
    console.error("Error fetching about us pillars contents:", error);

    return NextResponse.json(
      { error: "Failed to fetch about us pillars contents" },
      { status: 500 }
    );
  }
}
