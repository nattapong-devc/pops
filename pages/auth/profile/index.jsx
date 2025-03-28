import React, { useEffect, useState } from "react";
import AppWrapper from "@/components/hoc/AppWrapper";
import { Box, Container, Typography } from "@mui/material";
import ProfileWrapper from "@/components/hoc/ProfileWrapper";
import ProfileData from "@/components/auth/ProfileData";
import SocialMedia from "@/components/auth/SocialMedia";
import { useRouter } from "next/router";
export default function Profile() {
  const router = useRouter();
  const [profileState, setProfileState] = useState("profile");

  const handleProfileState = (state) => {
    setProfileState(state);

    if (state === "social") {
      router.push("/auth/profile/?state=social");
    } else {
      router.push("/auth/profile");
    }
  };

  useEffect(() => {
    const { state } = router.query;
    if (state === "social") {
      setProfileState("social");
    }
  }, [router]);

  return (
    <AppWrapper>
      <Box
        sx={{
          background:
            "linear-gradient(93.82deg, #FE8308 -3.25%, #EC4528 99.01%)",
          padding: "2rem 1rem",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "1.75rem",
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "Noto Sans Thai",
          }}
          component={"h1"}
          variant="h1"
        >
          {profileState === "profile" ? "Profile" : "Social Media"}
        </Typography>
      </Box>

      <Container className="flex-1 flex flex-col gap-5 p-5" maxWidth="xl">
        <ProfileWrapper
          handleProfileState={handleProfileState}
          profileState={profileState}
        >
          {profileState === "profile" ? <ProfileData /> : <SocialMedia />}
        </ProfileWrapper>
      </Container>
    </AppWrapper>
  );
}
