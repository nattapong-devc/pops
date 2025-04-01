import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { access_token, video_url, caption } = req.body;

    try {
      // STEP 1: อัปโหลดวิดีโอ (สร้าง Media Container)
      const response = await axios.post(
        `https://graph.instagram.com/me/media`,
        new URLSearchParams({
          video_url: video_url,
          caption: caption,
          access_token: access_token,
          media_type: "REEL",
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      console.log("Media Response:", response.data);

      const { id } = response.data;

      // STEP 2: ตรวจสอบสถานะว่า Media พร้อมหรือไม่
      const statusResponse = await axios.get(
        `https://graph.instagram.com/${id}?fields=status_code&access_token=${access_token}`
      );

      if (statusResponse.data.status_code === "FINISHED") {
        // STEP 3: Publish วิดีโอ
        const publishResponse = await axios.post(
          `https://graph.instagram.com/me/media_publish`,
          new URLSearchParams({
            access_token: access_token,
            creation_id: id,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        res.status(200).json({
          status: "success",
          data: {
            id: id,
            publishResponse: publishResponse.data,
          },
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Media is not ready for publishing yet.",
        });
      }
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