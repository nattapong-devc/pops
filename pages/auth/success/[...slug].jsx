import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      localStorage.setItem(`oauth_code_${router.query.slug}`, code);
      window.close();
    }
  }, [code]);
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
        <Typography
          sx={{
            fontSize: 24,
          }}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Successfully connected
        </Typography>
      </Box>
    </Container>
  );
};

export default Success;
