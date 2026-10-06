import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const partners = await pool.query(`
      SELECT *
      FROM partners
    `);

    return NextResponse.json(partners.rows);
  } catch (error) {
    console.error("Error fetching partners:", error);

    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}
