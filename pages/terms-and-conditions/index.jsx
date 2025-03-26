import { Box, Container, Typography } from "@mui/material";
import React from "react";
import AppWrapper from "@/components/hoc/AppWrapper";
import styled from "@emotion/styled";

export default function TermsAndConditions() {
  const TermsText = styled.ol`
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
          Terms and Conditions
        </Typography>
      </Box>

      <Container
        sx={{
          py: 5,
        }}
      >
        <Box>
          <TermsText>
            <li>
              Acceptance of Terms
              <TermsText>
                <div>
                  By accessing or using the POPS platform ("the Platform"), you agree to comply with and be bound by the following terms and conditions ("Terms"). If you do not agree to these Terms, do not use the Platform.
                </div>
              </TermsText>
            </li>

            <li>
              Registration
              <TermsText>
                <BulletParagraph>
                  To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process.
                </BulletParagraph>
              </TermsText>
            </li>

            <li>
              User Obligations
              <TermsText>
                <BulletParagraph>
                  You must be at least 18 years old or the legal age of majority in your jurisdiction to use the Platform.
                </BulletParagraph>
                <BulletParagraph>
                  You are solely responsible for your interactions with other users and clients on the Platform.
                </BulletParagraph>
                <BulletParagraph>
                  You agree not to misuse the Platform, engage in any unlawful activities, or cause harm to the Platform’s infrastructure.
                </BulletParagraph>
              </TermsText>
            </li>

            <li>
              Intellectual Property
              <TermsText>
                <BulletParagraph>
                  The Platform and all content, features, and functionality are owned by the Platform and are protected by intellectual property laws. You may not use any part of the Platform’s content without prior written permission.
                </BulletParagraph>
              </TermsText>
            </li>

            <li>
              Privacy Policy
              <TermsText>
                <BulletParagraph>
                  Your use of the Platform is governed by our Privacy Policy. By using the Platform, you consent to the collection and use of your personal information as described in the Privacy Policy.
                </BulletParagraph>
              </TermsText>
            </li>

            <li>
              Limitation of Liability
              <TermsText>
                <BulletParagraph>
                  The Platform is not liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the Platform. This includes, but is not limited to, any loss of data, revenue, or opportunities.
                </BulletParagraph>
              </TermsText>
            </li>

            <li>
              Indemnity
              <TermsText>
                <BulletParagraph>
                  You agree to indemnify and hold the Platform, its affiliates, and its employees harmless from any claims, damages, losses, or expenses arising from your use of the Platform.
                </BulletParagraph>
              </TermsText>
            </li>

            <li>
              Dispute Resolution
              <TermsText>
                <BulletParagraph>
                  Any disputes related to these Terms or your use of the Platform shall be resolved through binding arbitration in accordance with the laws of [insert jurisdiction].
                </BulletParagraph>
              </TermsText>
            </li>

            <li>
              Governing Law
              <TermsText>
                <BulletParagraph>
                  These Terms shall be governed by and construed in accordance with the laws of [insert jurisdiction].
                </BulletParagraph>
              </TermsText>
            </li>

            <li>
              Contact Us
              <TermsText>
                <BulletParagraph>
                  For any questions or concerns regarding these Terms, please contact us at [contact@pops.com].
                </BulletParagraph>
              </TermsText>
            </li>
          </TermsText>
        </Box>
      </Container>
    </AppWrapper>
  );
}