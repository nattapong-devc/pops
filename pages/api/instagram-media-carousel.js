import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { access_token, images, caption } = req.body;

    try {
      const mediaIds = [];

      // Step 1: อัปโหลดภาพแต่ละภาพ
      for (const image of images) {
        const response = await axios.post(
          `https://graph.instagram.com/me/media`,
          new URLSearchParams({
            image_url: image,
            caption: caption,
            access_token: access_token,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            timeout: 60000, // 60 seconds timeout
          }
        );
        mediaIds.push(response.data.id);
      }

      // Step 2: สร้าง Carousel โดยใช้ Media IDs
      const responseCarousel = await axios.post(
        `https://graph.instagram.com/me/media`,
        new URLSearchParams({
          access_token: access_token,
          children: mediaIds.join(","),
          media_type: "CAROUSEL",
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 60000, // 60 seconds timeout
        }
      );
      console.log(responseCarousel.data);

      const { id } = responseCarousel.data;

      // Step 3: ตรวจสอบสถานะ Media ว่าพร้อมหรือไม่
      const statusResponse = await axios.get(
        `https://graph.instagram.com/${id}?fields=status_code&access_token=${access_token}`,
        { timeout: 60000 } // 60 seconds timeout
      );

      if (statusResponse.data.status_code === "FINISHED") {
        // Step 4: ถ้า Media พร้อม, ทำการ Publish
        const publishResponse = await axios.post(
          `https://graph.instagram.com/me/media_publish`,
          new URLSearchParams({
            access_token: access_token,
            creation_id: id,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            timeout: 60000, // 60 seconds timeout
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
