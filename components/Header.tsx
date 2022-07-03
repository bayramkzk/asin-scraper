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

const Header = () => {
  const router = useRouter();

  const pages: Page[] = [
    { name: "Panel", onClick: () => router.push("/") },
    { name: "Profile", onClick: () => router.push("/profile") },
    { name: "About", onClick: () => router.push("/about") },
  ];

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
