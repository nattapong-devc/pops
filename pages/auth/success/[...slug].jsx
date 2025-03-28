import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useRouter } from "next/router";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
const Success = () => {
  const router = useRouter();
  const { code } = router.query;
  const [codeKey, setCodeKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code && router.query.slug) {
      localStorage.setItem(`oauth_code_${router.query.slug}`, code);
      setCodeKey(code);

      setTimeout(() => {
        window.close();
      }, 3000);
    }

    setLoading(false);
  }, [code, router.query.slug]);
  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        height: "100dvh",
      }}
    >
      {loading ? (
        <Box className="flex flex-col items-center gap-5 w-full justify-center">
          <CircularProgress
            sx={{
              fontSize: 150,
            }}
          />
          <Typography>Loading...</Typography>
        </Box>
      ) : (
        <>
          {" "}
          {codeKey ? (
            <>
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
            </>
          ) : (
            <>
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
                <ErrorOutlineRoundedIcon
                  sx={{
                    fontSize: 150,
                    color: "red",
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
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Success;
