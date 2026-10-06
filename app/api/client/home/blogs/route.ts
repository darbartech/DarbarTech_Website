import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const blogs = await pool.query(`
      SELECT *
      FROM blogs
    `);

    return NextResponse.json(blogs.rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
