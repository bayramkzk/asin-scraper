import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import Header from "@/components/Header";

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
          Version 1
        </Typography>
      </Box>
    </>
  );
}
