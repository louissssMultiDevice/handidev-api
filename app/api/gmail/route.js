import EmailFetcher from "../../../lib/emailFetcher";

export async function GET(req) {
  try {
    const ef = new EmailFetcher();
    const gmail = await ef.getGmail();
    if (!gmail) return new Response(JSON.stringify({ error: "Gagal membuat Gmail" }), { status: 500 });
    return new Response(JSON.stringify({ gmail }), { status: 200 });
  } catch (err) {
    console.error("api/gmail error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
