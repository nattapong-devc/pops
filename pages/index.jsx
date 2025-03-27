import { BANNER } from "@/assets";
import AppWrapper from "@/components/hoc/AppWrapper";
import { Box, Container, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import TapAndPlayRoundedIcon from "@mui/icons-material/TapAndPlayRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import Groups3RoundedIcon from "@mui/icons-material/Groups3Rounded";
export default function Home() {
  return (
    <AppWrapper>
      <Image
        src={BANNER.src}
        alt="banner"
        width={1920}
        height={1080}
        style={{ width: "100%", height: "auto" }}
      />

      <Container className="py-12 flex flex-col gap-12">
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Noto Sans Thai",
          }}
        >
          POPS is a platform designed to help influencers and businesses
          connect, collaborate, and grow their online presence. With easy access
          to Instagram Business, Facebook Pages, and other social media
          accounts, POPS allows you to manage your content, track performance
          insights, and optimize your marketing campaigns. Whether you’re an
          influencer seeking brand partnerships or a business looking to enhance
          engagement, POPS is your all-in-one solution for social media success.
        </Typography>

        <Box className="flex flex-col gap-8">
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Noto Sans Thai",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#F7531D",
              }}
            >
              How it works
            </Typography>
            <Divider
              sx={{
                backgroundColor: "#F7531D",
                width: "100px",
                margin: "auto",
                height: "5px",
                borderRadius: "5px",
              }}
            />
          </Box>

          <Box className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {howToWorks.map((item) => (
              <Box
                key={item.id}
                className="flex flex-col items-center gap-2 shadow-md p-5 rounded-2xl"
                sx={{
                  textAlign: "center",
                  fontFamily: "Noto Sans Thai",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#FFEEEB",
                    borderRadius: "50%",
                    padding: "1rem",
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "#7e7e7e",
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "Noto Sans Thai",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </AppWrapper>
  );
}

const howToWorks = [
  {
    id: 1,
    title: "Register",
    description:
      "Users create an account by registering with their email address or phone number. This allows them to securely access the app and its features.",
    icon: (
      <HowToRegRoundedIcon
        sx={{
          fontSize: "3rem",
          color: "#F7531D",
        }}
      />
    ),
  },
  {
    id: 2,
    title: "Connect Social Media Accounts",
    description:
      "After registration, users link their Instagram Business, Facebook Pages, and other social media accounts to the app.",
    icon: (
      <TapAndPlayRoundedIcon
        sx={{
          fontSize: "3rem",
          color: "#F7531D",
        }}
      />
    ),
  },
  {
    id: 3,
    title: "Access Insights & Data",
    description:
      "The app retrieves insights, engagement metrics, and audience analytics to help users track performance.",
    icon: (
      <InsightsRoundedIcon
        sx={{
          fontSize: "3rem",
          color: "#F7531D",
        }}
      />
    ),
  },
  {
    id: 4,
    title: "Manage Content & Interactions",
    description:
      "Users can schedule posts, publish content, manage comments, and respond to messages efficiently.",
    icon: (
      <ContentPasteRoundedIcon
        sx={{
          fontSize: "3rem",
          color: "#F7531D",
        }}
      />
    ),
  },
  {
    id: 5,
    title: "Optimize Campaigns",
    description:
      "The app provides valuable analytics to improve marketing strategies and maximize reach.",
    icon: (
      <CampaignRoundedIcon
        sx={{
          fontSize: "3rem",
          color: "#F7531D",
        }}
      />
    ),
  },
  {
    id: 6,
    title: "Seamless Collaboration",
    description:
      "Businesses and influencers can work together using integrated tools for better engagement and brand partnerships.",
    icon: (
      <Groups3RoundedIcon
        sx={{
          fontSize: "3rem",
          color: "#F7531D",
        }}
      />
    ),
  },
];
