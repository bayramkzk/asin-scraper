import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import Typography from "@mui/material/Typography";

export default function LogoLabelDesktop({responsive}: { responsive?: boolean } = { responsive: true }) {
  return (
    <>
      <ContentPasteSearchIcon
        sx={{ display: responsive ? { xs: "none", md: "flex" } : {}, mr: 1 }}
      />
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: responsive ? { xs: "none", md: "flex" } : {},
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
