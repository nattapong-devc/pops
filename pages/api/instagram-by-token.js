import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { access_token } = req.body;

    try {
      const response_me = await axios.get(`https://graph.instagram.com/me`, {
        params: {
          access_token: access_token,
          fields:
            "followers_count,media_count,username,profile_picture_url,account_type,biography,name",
        },
      });

      console.log(response_me.data);

      const response_media = await axios.get(
        `https://graph.instagram.com/${response_me.data.id}/media`,
        {
          params: {
            access_token: access_token,
            fields:
              "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,like_count,comments_count",
          },
        }
      );

      const insightsMediaType = {
        image: response_media.data.data.filter(
          (media) => media.media_type === "IMAGE"
        ),
        video: response_media.data.data.filter(
          (media) => media.media_type === "VIDEO"
        ),
        carousel: response_media.data.data.filter(
          (media) => media.media_type === "CAROUSEL_ALBUM"
        ),
      };

      const insightsAgeRes = await axios.get(
        `https://graph.instagram.com/${response_me.data.id}/insights`,
        {
          params: {
            metric: "follower_demographics",
            access_token: access_token,
            period: "lifetime",
            breakdown: "age",
            metric_type: "total_value",
            timeframe: "last_90_days",
          },
        }
      );

      const insightsCityRes = await axios.get(
        `https://graph.instagram.com/${response_me.data.id}/insights`,
        {
          params: {
            metric: "follower_demographics",
            access_token: access_token,
            period: "lifetime",
            breakdown: "city",
            metric_type: "total_value",
            timeframe: "last_90_days",
          },
        }
      );

      const insightsGender = await axios.get(
        `https://graph.instagram.com/${response_me.data.id}/insights`,
        {
          params: {
            metric: "follower_demographics",
            access_token: access_token,
            period: "lifetime",
            breakdown: "gender",
            metric_type: "total_value",
            timeframe: "last_90_days",
          },
        }
      );

      res.status(200).json({
        status: "success",
        data: {
            me: response_me ? response_me.data : null,
            media: response_media ? response_media.data : null,
            insightsAge: insightsAgeRes ? insightsAgeRes.data : null,
            insightsCity: insightsCityRes ? insightsCityRes.data : null,
            insightsGender: insightsGender ? insightsGender.data : null,
            insightsMediaType: insightsMediaType,
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
