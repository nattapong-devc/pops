import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import { LOGO } from "@/assets";
import Link from "next/link";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useUserContext } from "@/contexts/UserContext";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SignIn from "../auth/SignIn";
import { useRouter } from "next/router";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const router = useRouter();
  const { user, signOut } = useUserContext();

  const { window, children } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              py: 1,
            }}
          >
            <Link href="/">
              <Image src={LOGO.src} width={150} height={150} alt="logo" />
            </Link>
          </Box>

          {user ? (
            <>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<Avatar src={user?.profile} />}
                sx={{
                  borderRadius: "8px",
                  px: 2,
                }}
              >
                <Typography
                  className="normal-case font-bold"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  {user?.firstName} {user?.lastName}
                </Typography>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  " & .MuiMenu-paper": {
                    borderRadius: "8px",
                    minWidth: "180px",
                    padding: 1,
                  },
                  "& .MuiList-root": {
                    padding: 0,
                    borderRadius: "8px",
                  },
                  "& .MuiMenuItem-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem onClick={() => router.push("/auth/profile")}>
                  <AccountCircleRoundedIcon sx={{ marginRight: 1 }} />
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    signOut();
                    handleClose();
                    router.push("/");
                  }}
                >
                  <LogoutRoundedIcon sx={{ marginRight: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <SignIn />
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar sx={{ mt: 2 }} />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
        <Box
          component={"footer"}
          sx={{
            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F7531D",
            color: "white",
            padding: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </Box>

          <Typography variant="body1">
            &copy; {new Date().getFullYear()} POPS. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
