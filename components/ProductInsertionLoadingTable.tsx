import { ProductInsertionStatusMap } from "@/types/ProductInsertionStatusMap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/Pending";
import { Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

interface ProductInsertionLoadingTableProps {
  statusMap: ProductInsertionStatusMap;
}

const statusIcons = {
  pending: <PendingIcon />,
  loading: <CloudUploadIcon />,
  error: <ErrorIcon />,
  success: <CheckCircleIcon />,
};

const ProductInsertionLoadingTable: React.FC<
  ProductInsertionLoadingTableProps
> = ({ statusMap }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ASIN</TableCell>
          <TableCell width={100} align="center">
            Status
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(statusMap).map(([asin, status]) => (
          <TableRow key={asin}>
            <TableCell>{asin}</TableCell>
            <TableCell sx={{ fontFamily: "monospace" }} align="center">
              <Tooltip title={status.toUpperCase()}>
                {statusIcons[status]}
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductInsertionLoadingTable;
