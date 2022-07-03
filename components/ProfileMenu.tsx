import React from "react";
import { signOut, useSession } from "next-auth/react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import WarningIcon from "@mui/icons-material/Warning";
import SessionAvatar from "./SessionAvatar";
import { SessionUser } from "@/types/User";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data: session, status } = useSession();

  if (status === "loading") return <CircularProgress />;
  if (status === "unauthenticated" || !session) return <WarningIcon />;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
  };

  const user = session.user as SessionUser;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <SessionAvatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>{user.name}</MenuItem>
        <MenuItem disabled>{user.email}</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
