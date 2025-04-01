import { IncomingForm } from 'formidable';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: "dsar7blob",
  api_key: "678833672667113",
  api_secret: "2wcVK1ba1jwM4n1KLfqWeDSNRns",
});


export const config = {
  api: {
    bodyParser: false, // ❗️ ปิด bodyParser
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    console.log("📂 Files received:", data.files);

    const files = data.files.file; // ✅ รับ array ของไฟล์
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // 📤 อัปโหลดทุกไฟล์ไปที่ Cloudinary
    const uploadPromises = files.map(file => 
      cloudinary.v2.uploader.upload(file.filepath, {
        folder: "uploads",
        resource_type: "auto",
      })
    );

    const uploadResults = await Promise.all(uploadPromises);
    const fileUrls = uploadResults.map(result => result.secure_url);

    console.log("✅ Upload successful:", fileUrls);

    return res.status(200).json({ success: true, fileUrls });
  } catch (error) {
    console.error("🚨 Upload error:", error);
    return res.status(500).json({ error: 'Error uploading files', details: error.message });
  }
}