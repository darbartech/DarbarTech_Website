import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const why_choose_us = await pool.query(`
      SELECT *
      FROM why-choose-us
      ORDER BY date DESC
    `);

    return NextResponse.json(why_choose_us.rows);
  } catch (error) {
    console.error("Error fetching Why Choose Us contents:", error);

    return NextResponse.json(
      { error: "Failed to fetch Why Choose Us contents" },
      { status: 500 }
    );
  }
}
