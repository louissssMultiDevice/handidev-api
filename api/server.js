import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route testing
app.get("/", (req, res) => {
  res.status(200).json({ status: "✅ Handi Dev API jalan!" });
});

// Route emailFatcher
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Pesan dari ${name}`,
      text: message
    });

    res.status(200).json({ success: true, message: "Email terkirim!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Gagal mengirim email." });
  }
});

export default app; // ⚠️ PENTING untuk Vercel
