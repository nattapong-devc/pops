import { useUserContext } from "@/contexts/UserContext";
import { Avatar, Box, TextField } from "@mui/material";
import React from "react";

export default function ProfileData() {
  const { user } = useUserContext();
  return (
    <Box className="flex flex-col items-center gap-8 w-full">
      <Avatar
        src={user?.profile}
        alt={user?.username}
        sx={{
          width: 160,
          height: 160,
          boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
        }}
      />
      <Box className="grid grid-cols-2 gap-5 w-full">
        <TextField
          label="First Name"
          value={user?.firstName}
          disabled
          size="small"
        />
        <TextField
          label="Last Name"
          value={user?.lastName}
          disabled
          size="small"
        />
      </Box>
    </Box>
  );
}
