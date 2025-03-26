import { BANNER } from "@/assets";
import AppWrapper from "@/components/hoc/AppWrapper";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styled from "@emotion/styled";

export default function PrivacyPolicy() {
  const PrivacyText = styled.ol`
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;

    li {
      display: table;
      counter-increment: item;
      margin-bottom: 0.6em;

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
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Privacy Policy
        </Typography>
      </Box>

      <Container
        sx={{
          py: 5,
        }}
      >
        <Box>
          <PrivacyText>
            <li>
              Introduction
              <PrivacyText>
                <div>
                  POPS is a platform for influencers to connect with clients for
                  campaigns and opportunities. By using this platform, you agree
                  to the terms outlined in this Privacy Policy to protect your
                  personal information.
                </div>
              </PrivacyText>
            </li>

            <li>
              Privacy Policy
              <PrivacyText>
                <li>Information Collection</li>
                <BulletParagraph>
                  We collect personal information such as your name, email
                  address, social media profiles, and other details you provide
                  when creating an account.
                </BulletParagraph>
                <BulletParagraph>
                  We also collect usage data, such as IP addresses, browser
                  types, access times, and pages visited on the platform.
                </BulletParagraph>
                <li>How We Use Your Information</li>
                <BulletParagraph>
                  The information we collect is used to enhance the user
                  experience, facilitate campaign participation, and improve our
                  services.
                </BulletParagraph>
                <BulletParagraph>
                  We may use your data for analytics and to improve the
                  platform's security.
                </BulletParagraph>
                <li>Data Protection</li>
                <BulletParagraph>
                  We take reasonable measures to protect your data, including
                  encryption, access control systems, and physical security
                  safeguards.
                </BulletParagraph>
                <BulletParagraph>
                  Access to your data is limited to authorized personnel only.
                </BulletParagraph>
              </PrivacyText>
            </li>

            <li>
              Terms of Service
              <PrivacyText>
                <li>Registration</li>
                <BulletParagraph>
                  Users must register and be authorized by the platform
                  administrator to access the platform.
                </BulletParagraph>
                <BulletParagraph>
                  Registration requires providing accurate and complete
                  information.
                </BulletParagraph>
                <li>User Responsibilities</li>
                <BulletParagraph>
                  Users must maintain the confidentiality of their login
                  details, such as usernames and passwords, and refrain from
                  sharing them with unauthorized individuals.
                </BulletParagraph>
                <BulletParagraph>
                  Users must not engage in actions that may harm the platform,
                  such as attempting to breach the system or spreading viruses.
                </BulletParagraph>
                <li>Data Management</li>
                <BulletParagraph>
                  Users must comply with this Privacy Policy and any relevant
                  legal regulations when handling personal data.
                </BulletParagraph>
                <BulletParagraph>
                  Only authorized personnel are allowed to edit or update the
                  data.
                </BulletParagraph>
              </PrivacyText>
            </li>
          </PrivacyText>
        </Box>
      </Container>
    </AppWrapper>
  );
}
