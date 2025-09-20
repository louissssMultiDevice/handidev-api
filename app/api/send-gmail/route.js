import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // transporter menggunakan SMTP Gmail (pastikan .env.local berisi EMAIL_USER & EMAIL_PASS)
    const transporter = nodemailer.createTransport({
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

    return new Response(JSON.stringify({ success: true, message: "Email terkirim!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("send-email error:", error);
    return new Response(JSON.stringify({ success: false, error: "Gagal mengirim email." }), { status: 500 });
  }
}
