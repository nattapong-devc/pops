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
  },
};

export default nextConfig;
