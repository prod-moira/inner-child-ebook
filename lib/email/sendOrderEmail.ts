import nodemailer from "nodemailer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Order } from "@/lib/types/order";

export async function sendOrderEmail(order: Order, status: "approved" | "rejected") {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const ebookTitle = "My Kid Found my Inner Child";
  let subject = "";
  let htmlContent = "";

  if (status === "approved") {
    subject = "📚 Your order has been approved!";

    // Create a supabase client with service role
    const supabase = createSupabaseServerClient();

    const { data: files, error: listError } = await supabase.storage.from("ebook").list();
    if (listError) {
      console.warn("Warning listing files from 'ebook' bucket:", listError.message);
    }

    const pdfFile = files?.find((f) => f.name.toLowerCase().endsWith(".pdf"))?.name;
    const epubFile = files?.find((f) => f.name.toLowerCase().endsWith(".epub"))?.name;

    let pdfUrl: string | null = null;
    let epubUrl: string | null = null;

    if (pdfFile) {
      const { data, error } = await supabase.storage.from("ebook").createSignedUrl(pdfFile, 7 * 24 * 60 * 60);
      if (!error && data?.signedUrl) pdfUrl = data.signedUrl;
    }

    if (epubFile) {
      const { data, error } = await supabase.storage.from("ebook").createSignedUrl(epubFile, 7 * 24 * 60 * 60);
      if (!error && data?.signedUrl) epubUrl = data.signedUrl;
    }

    if (!pdfUrl && !epubUrl) {
      throw new Error("Failed to generate signed URLs for ebook files");
    }

    htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your order has been approved!</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f4f0; font-family: system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f4f0; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e8e6e1; border-radius: 8px; padding: 40px; text-align: center;">
              <tr>
                <td>
                  <h1 style="margin: 0 0 8px 0; color: #1a1a18; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 700; letter-spacing: -0.025em;">
                    Hi ${order.name}!
                  </h1>
                  <p style="margin: 0 0 24px 0; color: #9b9b97; font-size: 12px; line-height: 1.6; text-transform: uppercase; letter-spacing: 0.08em;">
                    ${ebookTitle}
                  </p>
                  <p style="margin: 0 0 16px 0; color: #6b6b67; font-size: 14px; line-height: 1.75;">
                    Good news! Your copy of <strong style="color: #1a1a18;">${ebookTitle}</strong> is ready for download.
                  </p>
                  <p style="margin: 0 0 28px 0; color: #6b6b67; font-size: 14px; line-height: 1.75;">
                    Thank you for trusting us with a small part of your journey. We hope this book meets you exactly where you are.
                  </p>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                    <tr>
                      <td align="center" style="padding: 0 8px; font-family: Georgia, 'Times New Roman', serif; ">
                        ${pdfUrl ? `
                          <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin: 6px; padding: 12px 20px; background-color: #1D535F; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 14px;">
                            Download PDF
                          </a>
                        ` : ""}
                        ${epubUrl ? `
                          <a href="${epubUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin: 6px; padding: 12px 20px; background-color: #1A2D35; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 14px;">
                            Download EPUB
                          </a>
                        ` : ""}
                      </td>
                    </tr>
                  </table>
                  <p style="margin: 0 0 8px 0; color: #9b9b97; font-size: 12px; line-height: 1.6;">
                    Download links are valid for 7 days.
                  </p>
                  <hr style="border: 0; border-top: 1px solid #e8e6e1; margin: 32px 0 24px 0;" />
                  <p style="margin: 0; color: #9b9b97; font-size: 12px; line-height: 1.6;">
                    Need help? Just reply to this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  } else {

    subject = "🧾 Update on your order";
    htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Update on your order</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f4f0; font-family: system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f4f0; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e8e6e1; border-radius: 8px; padding: 40px; text-align: center;">
              <tr>
                <td>
                  <h1 style="margin: 0 0 8px 0; color: #1a1a18; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 700; letter-spacing: -0.025em;">
                    Hi ${order.name},
                  </h1>
                  <p style="margin: 0 0 24px 0; color: #9b9b97; font-size: 12px; line-height: 1.6; text-transform: uppercase; letter-spacing: 0.08em;">
                    ${ebookTitle}
                  </p>
                  <p style="margin: 0 0 16px 0; color: #6b6b67; font-size: 14px; line-height: 1.75;">
                    Thank you for your order. We couldn't verify your payment, so we weren't able to approve your order just yet.
                  </p>
                  <p style="margin: 0 0 24px 0; color: #6b6b67; font-size: 14px; line-height: 1.75;">
                    Please double-check your GCash reference number and submit a new order. If you think this was a mistake, simply reply to this email—we'll be happy to take another look.
                  </p>
                  <hr style="border: 0; border-top: 1px solid #e8e6e1; margin: 32px 0 24px 0;" />
                  <p style="margin: 0; color: #9b9b97; font-size: 12px; line-height: 1.6;">
                    We hope to share <em>${ebookTitle}</em> with you soon. 
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  }

  await transporter.sendMail({
    from: `"My Kid Found my Inner Child" <${gmailUser}>`,
    to: order.email,
    subject: subject,
    html: htmlContent,
  });
}
