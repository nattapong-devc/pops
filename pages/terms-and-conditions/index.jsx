import { Box, Container, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import AppWrapper from "@/components/hoc/AppWrapper";
import Head from "next/head";

const TermsText = styled.ol`
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

export default function TermsAndConditions() {
  return (
    <> 
      <Head>
        <title>POPS แหล่งรวมงานสำหรับ Influencer - Terms and Conditions</title>
        <meta name="description" content="This is the terms and conditions page of our website." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.yoursite.com/terms-and-conditions" />
        {/* Schema Markup for Terms and Conditions */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Terms and Conditions",
              "url": "https://www.yoursite.com/terms-and-conditions",
              "description": "This is the terms and conditions page of our website."
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
          Terms and Conditions
        </Typography>
      </Box>

      <Container sx={{ py: 5 }}>
        <Box>
          <TermsText>
            <li>Registration and Account Management</li>
            <BulletParagraph>
              Users must complete the registration process by providing accurate
              and complete information, including contact details and social
              media profiles. By registering, users agree to comply with the
              Terms of Service.
            </BulletParagraph>
            <BulletParagraph>
              Users are responsible for maintaining the confidentiality of their
              login credentials, including usernames and passwords. They must
              notify the platform immediately if they suspect any unauthorized
              access to their account.
            </BulletParagraph>

            <li>User Responsibilities</li>
            <BulletParagraph>
              Users must comply with all applicable local, state, national, and
              international laws while using the platform. They must not engage
              in activities that could harm the platform or other users.
            </BulletParagraph>
            <BulletParagraph>
              Users are prohibited from using the platform to engage in
              fraudulent activities, spread malware, or conduct illegal
              transactions.
            </BulletParagraph>

            <li>Social Media Integration</li>
            <BulletParagraph>
              Users must grant the platform access to their social media
              profiles in order to use certain platform features, including
              campaign participation. Access to social media accounts can be
              revoked by the user at any time.
            </BulletParagraph>

            <li>Payment and Fees</li>
            <BulletParagraph>
              Users are responsible for any fees or costs associated with
              campaigns, sponsorships, or services on the platform. Payment
              terms, including refund policies, are outlined separately on the
              platform.
            </BulletParagraph>

            <li>Account Termination</li>
            <BulletParagraph>
              The platform reserves the right to suspend or terminate user
              accounts for violations of the Terms and Conditions, including but
              not limited to fraudulent behavior, misuse of the platform, or
              legal non-compliance.
            </BulletParagraph>

            <li>Limitation of Liability</li>
            <BulletParagraph>
              The platform is not responsible for any indirect, incidental, or
              consequential damages resulting from the use of the platform,
              including loss of data or business interruption.
            </BulletParagraph>
            <BulletParagraph>
              Users agree to indemnify and hold harmless the platform from any
              claims, damages, or expenses arising out of their use of the
              platform.
            </BulletParagraph>

            <li>Changes to Terms and Conditions</li>
            <BulletParagraph>
              The platform may update these Terms and Conditions periodically.
              Users will be notified of any significant changes via email or
              platform notifications. Continued use of the platform after
              changes constitute acceptance of the new Terms.
            </BulletParagraph>
          </TermsText>
        </Box>
      </Container>
    </AppWrapper></>
   
  );
}
