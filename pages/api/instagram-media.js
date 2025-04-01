import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { access_token, image_url, caption } = req.body;

    try {
      const response = await axios.post(
        `https://graph.instagram.com/me/media`,
        {
          image_url: image_url,
          caption: caption,
          access_token: access_token,
        }
      );

      console.log(response.data);

      const { id } = response.data;

      const publishResponse = await axios.post(
        `https://graph.instagram.com/${id}/publish`,
        {
          access_token: access_token,
        }
      );

      res.status(200).json({
        status: "success",
        data: {
          id: id,
          publishResponse: publishResponse.data,
          a,
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
