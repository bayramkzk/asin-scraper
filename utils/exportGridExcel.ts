import { GridColumns, GridRowModel } from "@mui/x-data-grid";
import ExcelJS from "exceljs";

export default function exportGridExcel(
  rows: GridRowModel,
  columns: GridColumns,
  sheetName = "Main sheet"
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = columns.map((column) => ({
    header: column.headerName || column.field,
    key: column.field,
    width: (column.width || 100) / 10,
    style: { font: { name: "sans-serif", size: 10 } },
  }));

  // Make headers bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.font = {
      bold: true,
      size: 12,
      color: { argb: "FFFF0000" },
      ...cell.font,
    };
  });

  worksheet.addRows(rows);

  return workbook.xlsx.writeBuffer();
}
