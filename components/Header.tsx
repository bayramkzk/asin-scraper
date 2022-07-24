import Page from "@/types/Page";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LogoLabelDesktop from "./LogoLabelDesktop";
import LogoLabelMobile from "./LogoLabelMobile";
import NavBar from "./NavBar";
import NavMenu from "./NavMenu";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin =
    session &&
    (session.user.role === "ADMIN" || session.user.role === "SUPERADMIN");

  const pages = [
    { name: "Products", href: "/" },
    isAdmin && { name: "Users", href: "/users" },
    { name: "Profile", href: "/profile" },
    { name: "About", href: "/about" },
  ].filter((p) => p) as Page[];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoLabelDesktop />
          <NavMenu pages={pages} />
          <LogoLabelMobile />
          <NavBar pages={pages} />
          <ProfileMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
