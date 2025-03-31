import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code } = req.body;

    try {
      const response_token = await axios.post(
        "https://graph.facebook.com/v11.0/oauth/access_token",
        {
          code,
          client_id: process.env.FACEBOOK_CLIENT_ID,
          client_secret: process.env.FACEBOOK_CLIENT_SECRET,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
          grant_type: "authorization_code",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { access_token } = response_token.data;

      const response_page = await axios.get(
        `https://graph.facebook.com/v11.0/me/accounts`,
        {
          params: {
            access_token: access_token,
            fields: "id,name,access_token,picture,category_list,cover_photo,followers_count,fan_count",
            
          },
        }
      );

     const res_posts = await axios.get(
      "https://graph.facebook.com/me/posts",
      {
        params: {
          access_token: response_page.data.data[0].access_token,
          fields: "id,message,created_time,full_picture,permalink_url,shares,likes.summary(true),comments.summary(true)",
          limit: 10,
        },
      }
    );

      res.status(200).json({
        status: "success",
        data: {
          code,
          access_token,
          page: response_page ? response_page.data.data[0] : null,
          posts: res_posts ? res_posts.data.data : null,
        },
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({
        error: error.response ? error.response.data : "Something went wrong!",
      });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
