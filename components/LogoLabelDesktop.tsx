import React from "react";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import Typography from "@mui/material/Typography";

export default function LogoLabelDesktop() {
  return (
    <>
      <ContentPasteSearchIcon
        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
      />
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          userSelect: "none",
        }}
      >
        ASIN SCRAPER
      </Typography>
    </>
  );
}
