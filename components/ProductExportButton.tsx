import exportGridCsv from "@/utils/exportGridCsv";
import saveFile from "@/utils/saveFile";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GridColumns } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import React from "react";

interface ProductExportButtonProps {
  products: Product[];
  columns: GridColumns;
}

const ProductExportButton: React.FC<ProductExportButtonProps> = (props) => {
  const id = React.useId();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleExportCsv = () => {
    const content = exportGridCsv(props.products, props.columns);
    const filename = `Products-${new Date().toISOString()}.csv`;
    saveFile(content, filename, "text/csv");
  };

  return (
    <>
      <Button color="success" onClick={handleClick}>
        Export
      </Button>
      <Menu
        id={`${id}-menu`}
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleExportCsv}>Download as CSV</MenuItem>
        <MenuItem>Download as Excel</MenuItem>
      </Menu>
    </>
  );
};

export default ProductExportButton;
