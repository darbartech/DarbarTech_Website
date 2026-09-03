export interface ExportColumn<T> {
  key: keyof T;
  header: string;
}

export function exportToCsv<T extends Record<string, unknown>>(
  columns: ExportColumn<T>[],
  rows: T[],
  filename: string,
): void {
  const headerRow = columns.map((c) => `"${c.header}"`).join(",");

  const dataRows = rows.map((row) =>
    columns
      .map((c) => {
        const val = row[c.key];
        const str = val == null ? "" : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      })
      .join(","),
  );

  const csv = [headerRow, ...dataRows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  downloadBlob(blob, `${filename}.csv`);
}

export function exportToPdf<T extends Record<string, unknown>>(
  columns: ExportColumn<T>[],
  rows: T[],
  title: string,
): void {
  const lines: string[] = [];
  lines.push(title);
  lines.push("");

  const colWidths = columns.map((c) =>
    Math.max(c.header.length, ...rows.map((r) => String(r[c.key] ?? "").length)),
  );

  const headerLine = columns
    .map((c, i) => c.header.padEnd(colWidths[i]))
    .join("  ");
  lines.push(headerLine);
  lines.push("-".repeat(headerLine.length));

  for (const row of rows) {
    const line = columns
      .map((c, i) => String(row[c.key] ?? "").padEnd(colWidths[i]))
      .join("  ");
    lines.push(line);
  }

  const text = lines.join("\n");
  const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
  downloadBlob(blob, `${title.replace(/\s+/g, "_").toLowerCase()}.txt`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
