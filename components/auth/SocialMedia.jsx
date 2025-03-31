import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
export default function SocialMedia() {
  const { social, user } = useUserContext();
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
        scope:
          "pages_read_user_content,pages_read_engagement,read_insights",
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
          "instagram_business_basic,instagram_business_content_publish,instagram_graph_user_media",
          // "instagram_business_basic,instagram_business_manage_insights,instagram_business_content_publish",
      },
    },
  };

  const handleFindFacebookData = async (code) => {
    try {
      const res = await axios.post("/api/facebook", { code });
      if (res.data.status === "success") {
        social("facebook", res.data.data);
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
        social("instagram", res.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const initializedFacebook = useRef(false); // ✅ ใช้ useRef() เพื่อเก็บสถานะข้าม re-renders

  useEffect(() => {
    const intervalId = setInterval(() => {
      const oauth_code_facebook = localStorage.getItem("oauth_code_facebook");

      if (oauth_code_facebook && !initializedFacebook.current) {
        initializedFacebook.current = true;
        handleFindFacebookData(oauth_code_facebook);

        // ✅ ลบค่าออกจาก localStorage เพื่อลดการทำงานซ้ำ
        localStorage.removeItem("oauth_code_facebook");
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // ✅ ล้าง interval อย่างถูกต้อง
    };
  }, []);

  const initializedInstagram = useRef(false); // ✅ ใช้ useRef() เพื่อเก็บสถานะข้าม re-renders

  useEffect(() => {
    const intervalId = setInterval(() => {
      const oauth_code_instagram = localStorage.getItem("oauth_code_instagram");

      if (oauth_code_instagram && !initializedInstagram.current) {
        initializedInstagram.current = true;
        handleFindInstagramData(oauth_code_instagram);

        // ✅ ลบค่าออกจาก localStorage เพื่อลดการทำงานซ้ำ
        localStorage.removeItem("oauth_code_instagram");
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // ✅ ล้าง interval อย่างถูกต้อง
    };
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Box className="flex flex-col items-center gap-5 w-full ">
      <Container maxWidth="sm">
        <Box className="flex flex-row gap-5 shadow-2xl py-2 px-5 rounded-2xl w-full justify-between items-center">
          <Typography>
            <FacebookIcon
              sx={{
                fontSize: "2rem",
                marginRight: "1rem",
              }}
            />
            Facebook
          </Typography>

          {user.facebook ? (
            <>
              {" "}
              <Box className="flex flex-row gap-5">
                {/* <Button
              size="small"
              sx={{
                borderRadius: "8px",
                backgroundColor: "#FF0000",
                color: "white",
                px: 2,
                "&:hover": {
                  backgroundColor: "#FF0000",
                },
              }}
            >
              Disconnect
            </Button> */}
                <Button
                  size="small"
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#FF7A00",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#FF7A00",
                    },
                  }}
                  onClick={() => {
                    router.push("/auth/social/detail/facebook");
                  }}
                >
                  information
                </Button>
              </Box>
            </>
          ) : (
            <>
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
                  //open new window
                  const width = 800;
                  const height = 800;
                  const left = window.innerWidth / 2 - width / 2;
                  const top = window.innerHeight / 2 - height / 2;

                  const url = `${currentProviderFacebook.loginUrl}?client_id=${currentProviderFacebook.clientId}&redirect_uri=${currentProviderFacebook.redirect_url}&response_type=code&scope=${currentProviderFacebook.authorization.params.scope}`;

                  window.open(
                    url,
                    "Facebook",
                    `width=${width},height=${height},left=${left},top=${top}`
                  );
                }}
              >
                Connect
              </Button>
            </>
          )}
        </Box>
        <Box className="flex flex-row gap-5 shadow-2xl py-2 px-5 rounded-2xl w-full justify-between items-center">
          <Typography>
            <InstagramIcon
              sx={{
                fontSize: "2rem",
                marginRight: "1rem",
              }}
            />
            Instagram
          </Typography>
          {user.instagram ? (
            <Box className="flex flex-row gap-5">
              {/* <Button
                size="small"
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#FF0000",
                  color: "white",
                  px: 2,
                  "&:hover": {
                    backgroundColor: "#FF0000",
                  },
                }}
              >
                Disconnect
              </Button> */}
              <Button
                size="small"
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#FF7A00",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#FF7A00",
                  },
                }}
                onClick={() => {
                  router.push("/auth/social/detail/instagram");
                }}
              >
                information
              </Button>
            </Box>
          ) : (
            <>
              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "8px",
                  background:
                    "linear-gradient(to right, #FFDC80, #FCAF45, #F77737, #F56040, #FD1D1D, #E1306C, #C13584, #833AB4, #5851DB, #405DE6)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(to right, #FFDC80, #FCAF45, #F77737, #F56040, #FD1D1D, #E1306C, #C13584, #833AB4, #5851DB, #405DE6)",
                  },
                }}
                onClick={() => {
                  //open new window
                  const width = 800;
                  const height = 800;
                  const left = window.innerWidth / 2 - width / 2;
                  const top = window.innerHeight / 2 - height / 2;

                  const url = `${currentProviderInstagram.loginUrl}?client_id=${currentProviderInstagram.clientId}&redirect_uri=${currentProviderInstagram.redirect_url}&response_type=code&scope=${currentProviderInstagram.authorization.params.scope}`;
                  window.open(
                    url,
                    "Instagram",
                    `width=${width},height=${height},left=${left},top=${top}`
                  );
                }}
              >
                Connect
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
