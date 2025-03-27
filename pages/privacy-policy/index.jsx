import { Box, Container, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import AppWrapper from "@/components/hoc/AppWrapper";
import Head from "next/head";

const PrivacyText = styled.ol`
  list-style-type: none;
  counter-reset: item;
  margin: 0;
  padding: 0;

  li {
    display: table;
    counter-increment: item;
    font-family: "Noto Sans Thai";
    font-size: 1.1rem;
    font-weight: bold;

    & > ol > li {
      margin-bottom: 0.3em;
    }
  }

  li:before {
    content: counters(item, ".") ". ";
    display: table-cell;
    padding-right: 0.6em;
  }

  li li {
    margin: 0;
  }

  li li:before {
    content: counters(item, ".") " ";
  }
`;

const BulletParagraph = styled.p`
  position: relative;
  padding-left: 1.5em;
  margin: 0;
  margin-bottom: 0.3em;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: black;
  }
`;

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>POPS แหล่งรวมงานสำหรับ Influencer - Privacy Policy</title>
        <meta
          name="description"
          content="This is the privacy policy page of our website."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.yoursite.com/privacy-policy" />
        {/* Schema Markup for Privacy Policy */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy",
              "url": "https://www.yoursite.com/privacy-policy",
              "description": "This is the privacy policy page of our website."
            }
          `}
        </script>
      </Head>
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
            Privacy Policy
          </Typography>
        </Box>

        <Container sx={{ py: 5 }}>
          <Box>
            <PrivacyText>
              <li>Introduction</li>

              <BulletParagraph>
                POPS is a platform for influencers to connect with clients for
                campaigns, opportunities, and collaborations. By using this
                platform, you agree to the terms outlined in this Privacy Policy
                to protect your personal information. Your privacy is important
                to us, and we are committed to safeguarding your data in
                compliance with applicable data protection laws.
              </BulletParagraph>

              <li>Information Collection</li>
              <BulletParagraph>
                We collect personal information such as your name, email
                address, social media profiles (Facebook, Instagram, TikTok,
                YouTube, Twitter/X), and other details you provide when creating
                an account.
              </BulletParagraph>
              <BulletParagraph>
                In addition, we may collect payment information, communications
                preferences, and other necessary details required for a smooth
                transaction and service delivery on the platform.
              </BulletParagraph>
              <BulletParagraph>
                We also collect technical data such as IP addresses, browser
                types, access times, pages visited, device types, and other
                usage statistics through cookies or tracking technologies. This
                helps us improve the platform, troubleshoot, and provide a more
                personalized experience.
              </BulletParagraph>

              <li>How We Use Your Information</li>
              <BulletParagraph>
                The information we collect is used to provide, enhance, and
                personalize your experience on the platform. We use your
                personal data for the following purposes:
              </BulletParagraph>
              <Box
                sx={{
                  pl: "1.5em",
                  mt: "0.5rem",
                  mb: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - To create and manage your account.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - To personalize content, advertisements, and recommendations
                  based on your preferences and behavior.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - To improve platform functionality and services through
                  performance analysis and feedback.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - To facilitate communications with clients and brands for
                  campaigns and collaborations.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - To send you marketing materials, updates, and promotions
                  with your consent.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - To comply with applicable laws, including to detect,
                  prevent, and address fraud or security concerns.
                </Typography>
              </Box>

              <li>Data Protection</li>
              <BulletParagraph>
                We take robust measures to protect your data from unauthorized
                access, alteration, disclosure, or destruction. These measures
                include:
              </BulletParagraph>
              <Box
                sx={{
                  pl: "1.5em",
                  mt: "0.5rem",
                  mb: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - Encrypting sensitive data during transmission.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - Employing access control systems to limit access to
                  authorized personnel only.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - Storing data on secure servers with up-to-date security
                  patches.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - Regularly auditing and monitoring our infrastructure to
                  detect and mitigate potential threats.
                </Typography>
              </Box>

              <li>Data Sharing</li>
              <BulletParagraph>
                We do not sell or rent your personal information to third
                parties. However, we may share your information in the following
                cases:
              </BulletParagraph>

              <Box
                sx={{
                  pl: "1.5em",
                  mt: "0.5rem",
                  mb: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - With clients, sponsors, and partners to facilitate campaign
                  participation and fulfill our business obligations to you.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - With trusted third-party service providers who assist in
                  platform management, analytics, or improvements, subject to
                  strict confidentiality agreements.
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Noto Sans Thai",
                  }}
                >
                  - If required by law, or in response to legal requests or
                  obligations.
                </Typography>
              </Box>

              <li>Your Rights</li>
              <BulletParagraph>
                You have the right to access, update, correct, and request the
                deletion of your personal data. You can manage your data
                preferences through the account settings on the platform, or by
                contacting our support team.
              </BulletParagraph>
              <BulletParagraph>
                Additionally, you can withdraw consent for marketing
                communications at any time by following the unsubscribe
                instructions in any communication we send.
              </BulletParagraph>

              <li>Changes to This Privacy Policy</li>
              <BulletParagraph>
                We may update this Privacy Policy periodically to reflect
                changes in our practices, services, or legal requirements. Any
                significant changes will be communicated to users via email or
                platform notifications.
              </BulletParagraph>
            </PrivacyText>
          </Box>
        </Container>
      </AppWrapper>
    </>
  );
}
