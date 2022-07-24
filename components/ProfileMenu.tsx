import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SecurityIcon from "@mui/icons-material/Security";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import SessionAvatar from "./SessionAvatar";

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
        <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>{session.user.name}</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>{session.user.email}</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText>{session.user.role}</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
