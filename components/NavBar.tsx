import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Page from "@/types/Page";
import { useRouter } from "next/router";

interface NavBarProps {
  pages: Page[];
}

function NavBar({ pages }: NavBarProps) {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={() => router.push(page.href)}
          sx={{ my: 2, display: "block" }}
          color={router.pathname === page.href ? "primary" : "inherit"}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}

export default NavBar;
