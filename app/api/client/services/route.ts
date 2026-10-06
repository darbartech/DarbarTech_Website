import { NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db";

// Write operations are restricted to a signed-in session. GET stays public
// because the public services page reads it.
const isUnauthorized = (request: NextRequest) =>
  !request.cookies.get("session_active")?.value;

const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

const fail = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const readString = (value: unknown) =>
  typeof value === "string" ? value : undefined;

const readId = (value: unknown) =>
  value !== undefined && value !== null && value !== "" ? Number(value) : NaN;

const readBoolean = (value: unknown) =>
  typeof value === "boolean" ? value : false;

const readCategory = (value: unknown): unknown[] | null => {
  if (value === undefined || value === null || value === "") return [];

  let parsed: unknown = value;

  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return null;
    }
  }

  return Array.isArray(parsed) ? parsed : null;
};

export async function GET() {
  try {
    const services = await pool.query(`
      SELECT *
      FROM services
      ORDER BY id ASC
    `);

    return NextResponse.json(services.rows);
  } catch (error) {
    console.error("Error fetching services:", error);

    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (isUnauthorized(request)) return unauthorized();

  try {
    const body = await request.json().catch(() => null);

    const title = readString(body?.title)?.trim() ?? "";
    const description = readString(body?.description) ?? "";
    const image = readString(body?.image) || null;
    const category = readCategory(body?.category);
    const altDescription = readString(body?.altDescription) || null;
    const btnName = readString(body?.btnName) || null;
    const isImageOnLeft = readBoolean(body?.isImageOnLeft);

    if (!title) {
      return fail("title is required", 400);
    }

    if (!category) {
      return fail("category must be an array", 400);
    }

    const created = await pool.query(
      `INSERT INTO services
         (title, description, image, category, "altDescription", "btnName", "isImageOnLeft")
       VALUES ($1, $2, $3, CAST($4 AS jsonb), $5, $6, $7)
       RETURNING *`,
      [
        title,
        description,
        image,
        JSON.stringify(category),
        altDescription,
        btnName,
        isImageOnLeft,
      ]
    );

    return NextResponse.json(created.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);

    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (isUnauthorized(request)) return unauthorized();

  try {
    const body = await request.json().catch(() => null);

    const id = readId(body?.id);

    if (Number.isNaN(id)) {
      return fail("id is required", 400);
    }

    const title = readString(body?.title)?.trim() ?? "";
    const description = readString(body?.description) ?? "";
    const image = readString(body?.image) || null;
    const category = readCategory(body?.category);
    const altDescription = readString(body?.altDescription) || null;
    const btnName = readString(body?.btnName) || null;
    const isImageOnLeft = readBoolean(body?.isImageOnLeft);

    if (!title) {
      return fail("title is required", 400);
    }

    if (!category) {
      return fail("category must be an array", 400);
    }

    const updated = await pool.query(
      `UPDATE services
       SET title = $1,
           description = $2,
           image = $3,
           category = CAST($4 AS jsonb),
           "altDescription" = $5,
           "btnName" = $6,
           "isImageOnLeft" = $7,
           "updatedAt" = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [
        title,
        description,
        image,
        JSON.stringify(category),
        altDescription,
        btnName,
        isImageOnLeft,
        id,
      ]
    );

    if (updated.rows.length === 0) {
      return fail("Service not found", 404);
    }

    return NextResponse.json(updated.rows[0]);
  } catch (error) {
    console.error("Error updating service:", error);

    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (isUnauthorized(request)) return unauthorized();

  try {
    let id = request.nextUrl.searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id != null ? String(body.id) : null;
      } catch {
        id = null;
      }
    }

    const parsedId = readId(id);

    if (Number.isNaN(parsedId)) {
      return fail("id is required", 400);
    }

    const deleted = await pool.query(
      `DELETE FROM services WHERE id = $1 RETURNING *`,
      [parsedId]
    );

    if (deleted.rows.length === 0) {
      return fail("Service not found", 404);
    }

    return NextResponse.json(deleted.rows[0]);
  } catch (error) {
    console.error("Error deleting service:", error);

    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
