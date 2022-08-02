import { GridColumns } from "@mui/x-data-grid";
import { Product } from "@prisma/client";

export default function exportGridCsv(
  products: Product[],
  columns: GridColumns
) {
  const headersRow = columns
    .map((column) => column.headerName || column.field)
    .join(",");

  const dataRows = products
    .map((product) => {
      const row = columns
        .map((column) => {
          const value = product[column.field as keyof Product];
          return value ? value.toString() : "";
        })
        .map((value) => value.replace(/,/g, ""))
        .join(",");
      return row;
    })
    .join("\n");

  const csv = [headersRow, dataRows].join("\n");
  return csv;
}
