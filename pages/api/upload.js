import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // ปิด bodyParser เพื่อใช้ formidable
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const uploadDir = path.join(process.cwd(), "/public/uploads");

      // ตรวจสอบและสร้างโฟลเดอร์อัตโนมัติ
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const form = formidable({
        uploadDir,
        keepExtensions: true,
        multiples: true, // รองรับหลายไฟล์
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing files:", err);
          return res.status(500).json({ error: "Error parsing files" });
        }

        console.log("Received files:", files); // ดูว่าได้รับไฟล์จริงไหม

        if (!files.file) {
          return res.status(400).json({ error: "No files uploaded" });
        }

        const uploadedFiles = [];

        if (Array.isArray(files.file)) {
          for (const file of files.file) {
            uploadedFiles.push({ name: file.originalFilename, url: `/uploads/${file.newFilename}` });
          }
        } else {
          uploadedFiles.push({ name: files.file.originalFilename, url: `/uploads/${files.file.newFilename}` });
        }

        res.status(200).json({ status: "success", files: uploadedFiles });
      });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}