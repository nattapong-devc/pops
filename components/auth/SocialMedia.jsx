import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
export default function SocialMedia() {
  const { social, disconnectSocial, user } = useUserContext();
  const router = useRouter();

  const FACEBOOK_CLIENT_ID = "2235829596835938";
  const FACEBOOK_REDIRECT_URI =
    "https://pops-phi.vercel.app/auth/success/facebook";
  const currentProviderFacebook = {
    name: "Facebook",
    clientId: FACEBOOK_CLIENT_ID,
    redirect_url: FACEBOOK_REDIRECT_URI,
    loginUrl: "https://www.facebook.com/v11.0/dialog/oauth",

    authorization: {
      params: {
        scope: "pages_read_user_content,pages_read_engagement,read_insights",
        // "pages_show_list,pages_read_user_content,pages_read_engagement,read_insights",
      },
    },
  };

  const INSTAGRAM_CLIENT_ID = "1654872321791189";
  const INSTAGRAM_REDIRECT_URI =
    "https://pops-phi.vercel.app/auth/success/instagram";

  const currentProviderInstagram = {
    name: "Instagram",
    clientId: INSTAGRAM_CLIENT_ID,
    redirect_url: INSTAGRAM_REDIRECT_URI,
    loginUrl: "https://api.instagram.com/oauth/authorize",

    authorization: {
      params: {
        scope:
          "instagram_business_basic,instagram_business_manage_insights,instagram_business_content_publish",
      },
    },
  };

  let facebookLoginUrl = `${currentProviderFacebook.loginUrl}?client_id=${currentProviderFacebook.clientId}&redirect_uri=${currentProviderFacebook.redirect_url}&response_type=code&scope=${currentProviderFacebook.authorization.params.scope}`;
  let instagramLoginUrl = `${currentProviderInstagram.loginUrl}?client_id=${currentProviderInstagram.clientId}&redirect_uri=${currentProviderInstagram.redirect_url}&response_type=code&scope=${currentProviderInstagram.authorization.params.scope}`;

  const [socialDatas, setSocialDatas] = React.useState([
    {
      id: 1,
      name: "Facebook",
      icon: <FacebookIcon />,
      loginUrl: facebookLoginUrl,
      status: user?.facebook ? user?.facebook : null,
    },
    {
      id: 2,
      name: "Instagram",
      icon: <InstagramIcon />,
      loginUrl: instagramLoginUrl,
      status: user?.instagram ? user?.instagram : null,
    },
  ]);

  return (
    <Box className="flex flex-col items-center gap-5 w-full ">
      <Container maxWidth="sm">
        {/* <Box className="flex flex-row gap-5 shadow-2xl py-2 px-5 rounded-2xl w-full justify-between items-center">
     
        </Box> */}
        {socialDatas.map((item) => (
          <Box
            key={item.id}
            className="flex flex-row gap-5 shadow-2xl py-2 px-5 rounded-2xl w-full justify-between items-center"
          >
            <Box className="flex flex-row gap-5">
              {item.icon}
              <Typography>{item.name}</Typography>
            </Box>
            {item.status ? (
              <Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#FF4F4F",
                    "&:hover": {
                      backgroundColor: "#FF4F4F",
                    },
                  }}
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: `You won't be able to revert this!`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, disconnect it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        disconnectSocial(item.name.toLowerCase());
                        Swal.fire({
                          title: "Disconnected!",
                          text: `${item.name} has been disconnected.`,
                          icon: "success",
                          confirmButtonText: "OK",
                        });
                      }
                    });
                  }}
                >
                  Disconnect
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    router.push(
                      `/auth/social/detail/${item.name.toLowerCase()}`
                    )
                  }
                  endIcon={<NavigateNextIcon />}
                  sx={{
                    marginLeft: 1,
                    borderRadius: "8px",
                    color: "#000",
                    borderColor: "#000",
                    "&:hover": {
                      backgroundColor: "#000",
                      color: "#fff",
                      borderColor: "#000",
                    },
                  }}
                >
                  View
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => router.push(item.loginUrl)}
              >
                Connect
              </Button>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
}
