import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // ปิด bodyParser ของ Next.js
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'tmp'); // ใช้ temp directory แทนที่จะเก็บไฟล์บนดิสก์ถาวร
  form.keepExtensions = true; // เก็บนามสกุลไฟล์
  form.multiples = true; // รองรับการอัปโหลดหลายไฟล์

  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing files:', err);
      return res.status(500).json({ error: 'Error parsing files' });
    }

    console.log('Uploaded files:', files); // ตรวจสอบไฟล์ที่อัปโหลด
    res.status(200).json({ status: 'success', files: files });
  });
}