import Page from "@/types/Page";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

interface NavBarProps {
  pages: Page[];
}

function NavBar({ pages }: NavBarProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={() => router.push(page.href)}
          sx={{
            my: 2,
            display: "block",
          }}
          color={
            theme.palette.mode === "dark" && router.pathname === page.href
              ? "primary"
              : "inherit"
          }
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}

export default NavBar;
