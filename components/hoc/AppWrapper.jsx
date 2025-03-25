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

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
        <Toolbar>
          <Box
            sx={{
              py: 1,
            }}
          >
            <Link href="/">
              <Image src={LOGO.src} width={150} height={150} alt="logo" />
            </Link>
          </Box>
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
