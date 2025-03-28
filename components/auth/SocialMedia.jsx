import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
export default function SocialMedia() {
  const FACEBOOK_CLIENT_ID = "2235829596835938";
  const FACEBOOK_REDIRECT_URI =
    // "https://ec2-13-212-60-65.ap-southeast-1.compute.amazonaws.com:81/social/success/facebook";
    "https://pops-phi.vercel.app/auth/success/facebook";
  const currentProviderFacebook = {
    name: "Facebook",
    clientId: FACEBOOK_CLIENT_ID,
    redirect_url: FACEBOOK_REDIRECT_URI,
    loginUrl: "https://www.facebook.com/v11.0/dialog/oauth",

    authorization: {
      params: {
        scope:
          "pages_show_list,pages_read_user_content,pages_read_engagement,read_insights",
      },
    },
  };

  return (
    <Box className="flex flex-col items-center gap-5 w-full ">
      <Container maxWidth="sm">
        <Box className="flex flex-row gap-5 shadow-2xl py-2 px-5 rounded-2xl w-full justify-between items-center">
          <Typography>
            <FacebookIcon
              sx={{
                color: "#1877F2",
                fontSize: "2rem",
                marginRight: "1rem",
              }}
            />
            Facebook
          </Typography>
          <Button
            size="small"
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
            onClick={() => {
              const width = 800;
              const height = 800;
              const left = window.innerWidth / 2 - width / 2;
              const top = window.innerHeight / 2 - height / 2;

              const url = `${currentProviderFacebook.loginUrl}?client_id=${currentProviderFacebook.clientId}&redirect_uri=${currentProviderFacebook.redirect_url}&response_type=code&scope=${currentProviderFacebook.authorization.params.scope}`;

            const popup =   window.open(
                url,
                "Instagram",
                `width=${width},height=${height},left=${left},top=${top}`
              );
              
              console.log(popup);

  //ปิด popup หลังจากที่ login สำเร็จ

    window.addEventListener("message", (event) => {
        console.log(event);
      if (event.origin.includes("https://pops-phi.vercel.app")) {
        console.log(event.data);
        popup.close();
      }
    });
            
            }}

          
          >
            Connect
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
