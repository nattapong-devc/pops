import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { access_token, images, caption } = req.body;

    try {
      const mediaIds = [];

      for (const image of images) {
        const response = await axios.post(
          `https://graph.instagram.com/me/media`,
          {
            image_url: image,
            caption: caption,
            access_token: access_token,
          }
        );
        mediaIds.push(response.data.id);
      }

      const responseCarousel = await axios.post(
        `https://graph.instagram.com/me/media`,
        {
          access_token: access_token,
          media_type: "CAROUSEL_ALBUM",
          children: mediaIds.join(","),
        }
      );
      console.log(responseCarousel.data);

      const { id } = responseCarousel.data;
      const publishResponse = await axios.post(
        `https://graph.instagram.com/me/media_publish`,
        {
          access_token: access_token,
          creation_id: id,
        }
      );
      res.status(200).json({
        status: "success",
        data: {
          id: id,
          publishResponse: publishResponse.data,
        },
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({
        status: "error",
        message: error.response ? error.response.data : error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
