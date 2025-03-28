/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    USER_ACCESS_TOKEN_KEY: "pops_access_token",
    BASE_URL:
      "http://ec2-13-212-60-65.ap-southeast-1.compute.amazonaws.com:9092/pops-influencer-service/api",

    FACEBOOK_CLIENT_ID: "2235829596835938",
    FACEBOOK_CLIENT_SECRET: "012f47ff9e61f45a303f50fa04ee9616",
    FACEBOOK_REDIRECT_URI:
      "https://pops-phi.vercel.app/auth/success/facebook",
    FACEBOOK_SCOPE:
      "pages_show_list,pages_read_user_content,pages_read_engagement,read_insights",
 
 
      INSTAGRAM_CLIENT_ID: "1654872321791189",
      INSTAGRAM_CLIENT_SECRET: "2b9cbaae58b975bf56b85a9076098b33",
      INSTAGRAM_REDIRECT_URI: "https://pops-phi.vercel.app/auth/success/instagram",
      INSTAGRAM_SCOPE: "instagram_business_basic instagram_business_manage_messages instagram_business_manage_comments instagram_business_content_publish instagram_business_manage_insights",
  
    },
};

export default nextConfig;
