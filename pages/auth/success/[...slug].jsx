import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useRouter } from "next/router";

const Success = () => {




  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    console.log("🚀 ~ file: [...slug].jsx ~ line 10 ~ Success ~ code", code);
    console.log(window.opener);
    if (window.opener && code) {
      setTimeout(() => {
        console.log("✅ ส่ง OAuth Code กลับไปยัง parent window:", code);
        window.opener.postMessage({ code }, "*");
        window.close(); // ปิด popup
      }, 3000);
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
