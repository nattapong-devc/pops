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
          "instagram_business_basic,instagram_business_manage_insight",
          // "instagram_business_basic,instagram_business_manage_insights,instagram_business_content_publish",
      },
    },
  };

  let facebookLoginUrl = `${currentProviderFacebook.loginUrl}?client_id=${currentProviderFacebook.clientId}&redirect_uri=${currentProviderFacebook.redirect_url}&response_type=code&scope=${currentProviderFacebook.authorization.params.scope}`;
  let instagramLoginUrl = `${currentProviderInstagram.loginUrl}?client_id=${currentProviderInstagram.clientId}&redirect_uri=${currentProviderInstagram.redirect_url}&response_type=code&scope=${currentProviderInstagram.authorization.params.scope}`;


const [socialData, setSocialData] = React.useState([
  {
    id: 1,
    name: "Facebook",
    icon: <FacebookIcon />,
    loginUrl: facebookLoginUrl,
    status: user.facebook,
  },
  {
    id: 2,
    name: "Instagram",
    icon: <InstagramIcon />,
    loginUrl: instagramLoginUrl,
    status: user.instagram,
  },
]);



  // const handleFindFacebookData = async (code) => {
  //   try {
  //     const res = await axios.post("/api/facebook", { code });
  //     if (res.data.status === "success") {
  //       social("facebook", res.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleFindInstagramData = async (code) => {
  //   try {
  //     const res = await axios.post("/api/instagram", { code });
  //     if (res.data.status === "success") {
  //       console.log(res.data);
  //       social("instagram", res.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const initializedFacebook = useRef(false); // ✅ ใช้ useRef() เพื่อเก็บสถานะข้าม re-renders

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const oauth_code_facebook = localStorage.getItem("oauth_code_facebook");

  //     if (oauth_code_facebook && !initializedFacebook.current) {
  //       initializedFacebook.current = true;
  //       handleFindFacebookData(oauth_code_facebook);

  //       // ✅ ลบค่าออกจาก localStorage เพื่อลดการทำงานซ้ำ
  //       localStorage.removeItem("oauth_code_facebook");
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId); // ✅ ล้าง interval อย่างถูกต้อง
  //   };
  // }, []);

  // const initializedInstagram = useRef(false); // ✅ ใช้ useRef() เพื่อเก็บสถานะข้าม re-renders

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const oauth_code_instagram = localStorage.getItem("oauth_code_instagram");

  //     if (oauth_code_instagram && !initializedInstagram.current) {
  //       initializedInstagram.current = true;
  //       handleFindInstagramData(oauth_code_instagram);

  //       // ✅ ลบค่าออกจาก localStorage เพื่อลดการทำงานซ้ำ
  //       localStorage.removeItem("oauth_code_instagram");
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId); // ✅ ล้าง interval อย่างถูกต้อง
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <Box className="flex flex-col items-center gap-5 w-full ">
      <Container maxWidth="sm">
        {/* <Box className="flex flex-row gap-5 shadow-2xl py-2 px-5 rounded-2xl w-full justify-between items-center">
     
        </Box> */}
        {          socialData.map((item) => (
          <Box
            key={item.id}
            className="flex flex-row gap-5 shadow-2xl py-2 px-5 rounded-2xl w-full justify-between items-center"
          >
            <Box className="flex flex-row gap-5">
              {item.icon}
              <Typography>{item.name}</Typography>
            </Box>
            {item.status ? (
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => router.push(item.loginUrl)}
              >
                Connected
              </Button>
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
