import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const about_us_contents = await pool.query(`
      SELECT *
      FROM about_us_contents
      ORDER BY id
    `);

    return NextResponse.json(about_us_contents.rows);
  } catch (error) {
    console.error("Error fetching about us contents:", error);

    return NextResponse.json(
      { error: "Failed to fetch about us contents" },
      { status: 500 }
    );
  }
}
