import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import pool from "@/lib/db";

// Write operations are restricted to a signed-in session. GET stays public
// because the public home page reads it.
const isUnauthorized = (request: NextRequest) =>
  !request.cookies.get("session_active")?.value;

const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

const fail = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const UPLOAD_DIR = path.join(
  process.cwd(),
  "public",
  "home",
  "hero-section"
);

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/bmp": ".bmp",
  "image/x-icon": ".ico",
  "image/vnd.microsoft.icon": ".ico",
};

type StoredImage =
  | { ok: true; fileName: string }
  | { ok: false; message: string };

const storeImage = async (file: File): Promise<StoredImage> => {
  if (file.size === 0) {
    return { ok: false, message: "The selected image is empty." };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, message: "Image must be 5 MB or smaller." };
  }

  const extension = EXTENSION_BY_TYPE[file.type];

  if (!extension) {
    return {
      ok: false,
      message: `Unsupported image type: ${file.type || "unknown"}.`,
    };
  }

  const stem =
    path
      .basename(file.name, path.extname(file.name))
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .replace(/^_+/, "") || "image";

  await mkdir(UPLOAD_DIR, { recursive: true });

  let fileName = `${stem}${extension}`;
  let counter = 1;

  while (existsSync(path.join(UPLOAD_DIR, fileName))) {
    fileName = `${stem}-${counter}${extension}`;
    counter += 1;
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(UPLOAD_DIR, fileName), bytes);

  return { ok: true, fileName };
};

type ParsedPayload = {
  id?: unknown;
  name?: unknown;
  content?: unknown;
  link?: unknown;
  status?: unknown;
  imageName?: unknown;
  file: File | null;
};

const readPayload = async (request: NextRequest): Promise<ParsedPayload> => {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();

    const field = (key: string) => {
      const value = form.get(key);
      return typeof value === "string" ? value : undefined;
    };

    const candidate = form.get("file");
    const file =
      candidate !== null && typeof candidate !== "string" ? candidate : null;

    return {
      id: field("id"),
      name: field("name"),
      content: field("content"),
      link: field("link"),
      status: field("status"),
      imageName: field("imageName"),
      file,
    };
  }

  const body = await request.json();

  return {
    id: body?.id,
    name: body?.name,
    content: body?.content,
    link: body?.link,
    status: body?.status,
    imageName: body?.imageName,
    file: null,
  };
};

const saveRow = async (body: ParsedPayload, requireId: boolean) => {
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const content = typeof body?.content === "string" ? body.content : "";
  const link = typeof body?.link === "string" ? body.link : "";
  const status = typeof body?.status === "string" ? body.status : undefined;

  // undefined = leave the column untouched, null = clear it.
  let imageName =
    typeof body?.imageName === "string" ? body.imageName || null : undefined;

  const id = body?.id;
  const hasId = id !== undefined && id !== null && id !== "";

  if (requireId && !hasId) {
    return fail("id is required", 400);
  }

  if (!name || !content.trim()) {
    return fail("name and content are required", 400);
  }

  if (body.file) {
    const stored = await storeImage(body.file);

    if (!stored.ok) {
      return fail(stored.message, 400);
    }

    // Only the bare filename is persisted; the file lives in
    // public/home/hero-section and is addressed as
    // /home/hero-section/<imageName>.
    imageName = stored.fileName;
  }

  if (!hasId) {
    const created = await pool.query(
      `INSERT INTO hero_section (name, content, link, status, "imageName")
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, content, link, status ?? "active", imageName ?? null]
    );

    return NextResponse.json(created.rows[0], { status: 201 });
  }

  const values: (string | number | null)[] = [];
  const assignments: string[] = [];

  const set = (column: string, value: string | number | null) => {
    values.push(value);
    assignments.push(`"${column}" = $${values.length}`);
  };

  set("name", name);
  set("content", content);
  set("link", link);

  if (status !== undefined) set("status", status);
  if (imageName !== undefined) set("imageName", imageName);

  values.push(Number(id));

  const updated = await pool.query(
    `UPDATE hero_section
     SET ${assignments.join(", ")}, "updatedAt" = CURRENT_TIMESTAMP
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  if (updated.rows.length === 0) {
    return fail("Hero content not found", 404);
  }

  return NextResponse.json(updated.rows[0]);
};

export async function GET() {
  try {
    const hero_section_contents = await pool.query(`
      SELECT *
      FROM hero_section
      ORDER BY id ASC
    `);

    return NextResponse.json(hero_section_contents.rows);
  } catch (error) {
    console.error("Error fetching hero_section_contents:", error);

    return NextResponse.json(
      { error: "Failed to fetch hero_section_contents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (isUnauthorized(request)) return unauthorized();

  try {
    const body = await readPayload(request);

    return await saveRow(body, false);
  } catch (error) {
    console.error("Error saving hero_section content:", error);

    return NextResponse.json(
      { error: "Failed to save hero_section content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (isUnauthorized(request)) return unauthorized();

  try {
    const body = await readPayload(request);

    return await saveRow(body, true);
  } catch (error) {
    console.error("Error updating hero_section content:", error);

    return NextResponse.json(
      { error: "Failed to update hero_section content" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (isUnauthorized(request)) return unauthorized();

  try {
    const body: ParsedPayload = await request.json();

    const id = body?.id;
    const status = typeof body?.status === "string" ? body.status : "";

    if (id === undefined || id === null || id === "") {
      return fail("id is required", 400);
    }

    if (status !== "active" && status !== "inactive") {
      return fail("status must be active or inactive", 400);
    }

    const updated = await pool.query(
      `UPDATE hero_section
       SET "status" = $1, "updatedAt" = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, Number(id)]
    );

    if (updated.rows.length === 0) {
      return fail("Hero content not found", 404);
    }

    return NextResponse.json({ data: updated.rows[0] });
  } catch (error) {
    console.error("Error updating hero_section status:", error);

    return NextResponse.json(
      { error: "Failed to update hero_section status" },
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

    if (!id) {
      return fail("id is required", 400);
    }

    const deleted = await pool.query(
      `DELETE FROM hero_section WHERE id = $1 RETURNING *`,
      [Number(id)]
    );

    if (deleted.rows.length === 0) {
      return fail("Hero content not found", 404);
    }

    return NextResponse.json(deleted.rows[0]);
  } catch (error) {
    console.error("Error deleting hero_section content:", error);

    return NextResponse.json(
      { error: "Failed to delete hero_section content" },
      { status: 500 }
    );
  }
}