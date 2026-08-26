"use client";

import { Button } from "react-bootstrap";
import { Download } from "lucide-react";
import { buildTrackerCsv } from "@/utils/csv";

export default function ExportCsvButton({ entries, onExport, onEmpty }) {
  const exportLogs = () => {
    if (entries.length === 0) {
      onEmpty?.();
      return;
    }

    const csv = buildTrackerCsv(entries);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `cleancity-recycling-log-${date}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    onExport?.();
  };

  return (
    <Button type="button" className="icon-button export-button" onClick={exportLogs}>
      <Download aria-hidden="true" size={17} />
      Export CSV
    </Button>
  );
}
