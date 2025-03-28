/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    USER_ACCESS_TOKEN_KEY: "pops_access_token",
    BASE_URL:
      "http://ec2-13-212-60-65.ap-southeast-1.compute.amazonaws.com:9092/pops-influencer-service/api",

    FACEBOOK_CLIENT_ID: "1302998961028389",
    FACEBOOK_CLIENT_SECRET: "0c55a63f020787a2f53254ecb667b6aa",
    FACEBOOK_REDIRECT_URI:
      "https://ec2-13-212-60-65.ap-southeast-1.compute.amazonaws.com:81/social/success/facebook",
    FACEBOOK_SCOPE:
      "pages_show_list,pages_read_user_content,pages_read_engagement,read_insights",
  },
};

export default nextConfig;
