import React from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ProfileMenu from "./ProfileMenu";
import NavBar from "./NavBar";
import NavMenu from "./NavMenu";
import LogoLabelDesktop from "./LogoLabelDesktop";
import LogoLabelMobile from "./LogoLabelMobile";
import Page from "@/types/Page";
import { useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin =
    session &&
    (session.user.role === "ADMIN" || session.user.role === "SUPERADMIN");

  const pages = [
    { name: "Products", onClick: () => router.push("/") },
    isAdmin && { name: "Users", onClick: () => router.push("/users") },
    { name: "Profile", onClick: () => router.push("/profile") },
    { name: "About", onClick: () => router.push("/about") },
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
