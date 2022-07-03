import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Page from "@/types/Page";

interface NavBarProps {
  pages: Page[];
}

function NavBar({ pages }: NavBarProps) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={page.onClick}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}

export default NavBar;
