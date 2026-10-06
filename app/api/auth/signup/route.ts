import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, address, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Name, email and password are required",
        },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        {
          message: "User with this email already exists",
        },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, phone, address, password, role)
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING id, name, email, phone, address, role`,
      [name, email, phone, address, hashedPassword, "user"],
    );

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: result.rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
