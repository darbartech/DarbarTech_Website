import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const testimonials = await pool.query(`
      SELECT *
      FROM testimonials
    `);

    return NextResponse.json(testimonials.rows);
  } catch (error) {
    console.error("Error fetching testimonials:", error);

    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
