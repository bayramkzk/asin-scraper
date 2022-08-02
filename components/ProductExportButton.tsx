import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

interface ProductExportButtonProps {}

const ProductExportButton: React.FC<ProductExportButtonProps> = () => {
  const id = React.useId();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

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
        <MenuItem>Download as CSV</MenuItem>
        <MenuItem>Download as Excel</MenuItem>
      </Menu>
    </>
  );
};

export default ProductExportButton;
