import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const drawerWidth = 260;

const menuProfile = [
  {
    id: 1,
    name: "Profile",
    state: "profile",
    icon: <AccountCircleIcon />,
  },
  {
    id: 2,
    name: "Social Media",
    state: "social",
    icon: <PublicIcon />,
  },
];

export default function ProfileWrapper({
  handleProfileState,
  profileState,
  children,
}) {
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Box
        sx={{
          borderRight: "1px solid #E5E5E5",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <List
          sx={{
            "& .MuiListItemButton-root": {
              borderRadius: "8px",
            },
          }}
        >
          {menuProfile.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                sx={{
                  backgroundColor: profileState === item.state ? "#F7531D" : "",
                  borderRadius: "8px",
                  color: profileState === item.state ? "white" : "",
                  "&:hover": {
                    backgroundColor: "#FFA689",
                    color: "white",
                  },
                }}
                onClick={() => handleProfileState(item.state)}
              >
                <ListItemIcon
                  sx={{
                    color: profileState === item.state ? "white" : "",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        component="main"
        sx={{
          width: "100%",
          p: 3,
          height: "67vh",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
