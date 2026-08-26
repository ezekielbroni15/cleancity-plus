export function buildTrackerCsv(entries) {
  const headers = ["Category", "Quantity", "Created At", "Updated At"];
  const rows = entries.map((entry) => [
    entry.category,
    entry.quantity,
    entry.createdAt,
    entry.updatedAt || ""
  ]);

  return [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => {
          const value = String(cell ?? "");
          return `"${value.replaceAll('"', '""')}"`;
        })
        .join(",")
    )
    .join("\n");
}
