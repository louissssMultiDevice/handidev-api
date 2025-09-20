import EmailFetcher from "../../../lib/emailFetcher";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const gmail = url.searchParams.get("gmail");
    if (!gmail) return new Response(JSON.stringify({ error: "gmail missing" }), { status: 400 });

    const ef = new EmailFetcher();
    const link = await ef.getVerificationLink(gmail);
    return new Response(JSON.stringify({ link: link || null }), { status: 200 });
  } catch (err) {
    console.error("api/verification error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
