import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useRouter } from "next/router";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useUserContext } from "@/contexts/UserContext";
import axios from "axios";
const Success = () => {
  const router = useRouter();
  const { code } = router.query;
  const [codeKey, setCodeKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const { social,user } = useUserContext();

  const handleFindFacebookData = async (code) => {
    try {
      const res = await axios.post("/api/facebook", { code });
      if (res.data.status === "success") {
        social("facebook", res.data.data,user);
        setCodeKey(res.data.status);
        setLoading(false);

        setTimeout(() => {
          router.push("/auth/profile?state=social");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFindInstagramData = async (code) => {
    try {
      const res = await axios.post("/api/instagram", { code });
      if (res.data.status === "success") {
        console.log(res.data);
        social("instagram", res.data.data,user);
        setCodeKey(res.data.status);
        setLoading(false);

        setTimeout(() => {
          router.push("/auth/profile?state=social");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (code && user) {
      console.log(code);
      console.log(router.query.slug);
      let slug = router.query.slug[0];
      if (slug === "facebook") {
        console.log(router.query.slug);
        handleFindFacebookData(code);
      } else if (slug === "instagram") {
        handleFindInstagramData(code);
      }
    }
  }, [code, router.query.slug,user]);

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
                  Something went wrong
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
