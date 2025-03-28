import { Box, Container, Typography } from "@mui/material";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        height: "100dvh",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          gap: 5,
        }}
      >
        <CheckCircleRoundedIcon
          sx={{
            fontSize: 150,
            color: "green",
          }}
        />
        <Typography variant="h1" fontWeight={"bold"} textAlign={"center"}>
          Successfully connected
        </Typography>
        <Typography
          variant="caption"
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{
            textWrap: "wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            width: "100%",
            color: "gray",
          }}
        >
          {code}
        </Typography>
      </Box>
    </Container>
  );
};

export default Success;
