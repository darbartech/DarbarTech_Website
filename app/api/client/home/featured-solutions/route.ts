import { NextResponse } from "next/server";
import  pool  from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        *
      FROM featured_solutions
      ORDER BY id ASC
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("FEATURED SOLUTIONS ERROR:", error);

    return NextResponse.json(
      {
        error: "Database query failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}