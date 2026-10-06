import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const karlson_template = await pool.query(`
      SELECT *
      FROM karlson_template
    `);

    return NextResponse.json(karlson_template.rows);
  } catch (error) {
    console.error("Error fetching karlson template content:", error);

    return NextResponse.json(
      { error: "Failed to fetch karlson template content" },
      { status: 500 }
    );
  }
}
