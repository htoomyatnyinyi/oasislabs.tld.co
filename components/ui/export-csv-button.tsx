"use client";

import { Download } from "lucide-react";

interface ExportCsvButtonProps {
  data: Record<string, any>[];
  filename: string;
  label?: string;
}

export function ExportCsvButton({
  data,
  filename,
  label = "Export to CSV",
}: ExportCsvButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    // Extract headers
    const headers = Object.keys(data[0]);

    // Build CSV content
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const val = row[header];
        const escaped = (val === null || val === undefined ? "" : String(val)).replace(
          /"/g,
          '""'
        );
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-sm hover:bg-secondary transition-colors"
    >
      <Download className="h-4 w-4 text-primary" />
      {label}
    </button>
  );
}
