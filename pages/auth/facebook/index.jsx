import { LOGO } from "@/assets";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
export default function Facebook() {
  return (
    <Box className="flex flex-col  gap-5 w-full justify-center items-center min-h-screen px-5">
      <Card
        sx={{
          borderRadius: "2rem",
          boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
          padding: "2rem",
        }}
      >
        <CardContent className="flex flex-col gap-5 w-full justify-center items-center rounded-2xl ">
          <Image
            src={LOGO.src}
            alt="logo"
            width={160}
            height={160}
            draggable={false}
          />

          <Typography>Sign in with Facebook</Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#1877F2",
              color: "white",
              "&:hover": {
                backgroundColor: "#1877F2",
              },
            }}
            startIcon={<FacebookIcon />}
          >
            <Typography
              className="normal-case"
              sx={{
                color: "white",
                textTransform: "none",
                fontSize: "0.9rem",
              }}
            >
              Sign in with Facebook
            </Typography>
          </Button>

          <Typography
            sx={{
              color: "gray",
              textAlign: "center",
              maxWidth: 400,
              fontSize: "0.8rem",
            }}
          >
            *Connect Facebook to pull your follower count and profile
            statistics. Simply log in and authorize the necessary access
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
