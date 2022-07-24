import Header from "@/components/Header";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AboutPage() {
  return (
    <>
      <Header />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          paddingY: "4rem",
        }}
      >
        <ContentPasteSearchIcon
          sx={{ mr: 1, width: "12rem", height: "12rem" }}
        />

        <Typography
          variant="h4"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            textAlign: "center",
          }}
          className="gradient-text"
        >
          ASIN SCRAPER
        </Typography>

        <Typography
          noWrap
          sx={{
            fontFamily: "monospace",
            textAlign: "center",
          }}
        >
          Version 2
        </Typography>
      </Box>
    </>
  );
}
