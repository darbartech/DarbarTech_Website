import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const faqs = await pool.query(`
      SELECT *
      FROM faq
    `);

    return NextResponse.json(faqs.rows);
  } catch (error) {
    console.error("Error fetching faqs:", error);

    return NextResponse.json(
      { error: "Failed to fetch faqs" },
      { status: 500 }
    );
  }
}
