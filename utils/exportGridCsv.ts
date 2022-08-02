import { GridColumns, GridRowsProp } from "@mui/x-data-grid";

export default function exportGridCsv(
  rows: GridRowsProp,
  columns: GridColumns
) {
  const headersRow = columns
    .map((column) => column.headerName || column.field)
    .map((column) => column.replace(/,/g, ""))
    .join(",");

  const dataRows = rows
    .map((row) => {
      const line = columns
        .map((column) => {
          const value = row[column.field];
          return value ? value.toString() : "";
        })
        .map((value) => value.replace(/,/g, ""))
        .join(",");
      return line;
    })
    .join("\n");

  const csv = [headersRow, dataRows].join("\n");
  return csv;
}
