import React from "react";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import Typography from "@mui/material/Typography";

export default function LogoLabelMobile() {
  return (
    <>
      <ContentPasteSearchIcon
        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
      />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        ASIN SCRAPER
      </Typography>
    </>
  );
}
