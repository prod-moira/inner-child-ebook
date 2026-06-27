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
    subject = "Your order has been approved!";

    // Create a supabase client with service role
    const supabase = createSupabaseServerClient();

    // List the files in the 'ebook' bucket to find the first PDF file name
    const { data: files, error: listError } = await supabase.storage.from("ebook").list();
    if (listError) {
      console.warn("Warning listing files from 'ebook' bucket:", listError.message);
    }
    const ebookFile = files?.find((f) => f.name.toLowerCase().endsWith(".pdf"))?.name || "inner-child-ebook.pdf";

    // Generate a signed URL valid for 7 days (7 days = 7 * 24 * 60 * 60 seconds)
    const { data: signedData, error: signedError } = await supabase.storage
      .from("ebook")
      .createSignedUrl(ebookFile, 7 * 24 * 60 * 60);

    if (signedError || !signedData?.signedUrl) {
      throw new Error(`Failed to generate signed URL for ebook: ${signedError?.message || "unknown error"}`);
    }

    const downloadUrl = signedData.signedUrl;

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
                    <h1 style="margin: 0 0 24px 0; color: #1a1a18; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">
                      ${ebookTitle}
                    </h1>
                    <p style="margin: 0 0 16px 0; color: #1a1a18; font-size: 16px; line-height: 1.75;">
                      Hi ${order.name},
                    </p>
                    <p style="margin: 0 0 24px 0; color: #6b6b67; font-size: 16px; line-height: 1.75;">
                      Your order has been approved! We are absolutely thrilled for you to read <strong style="color: #1a1a18;">${ebookTitle}</strong>. We hope this ebook brings you meaningful insights on your journey of healing and self-discovery.
                    </p>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                      <tr>
                        <td align="center">
                          <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 32px; background-color: #c96442; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 16px;">
                            Download Your Ebook
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 0 0 8px 0; color: #9b9b97; font-size: 13px; line-height: 1.6;">
                      This download link is valid for 7 days.
                    </p>
                    <hr style="border: 0; border-top: 1px solid #e8e6e1; margin: 32px 0 24px 0;" />
                    <p style="margin: 0; color: #6b6b67; font-size: 14px; line-height: 1.6;">
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
    subject = "Update on your order";

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
                  <h1 style="margin: 0 0 24px 0; color: #1a1a18; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">
                    ${ebookTitle}
                  </h1>
                  <p style="margin: 0 0 16px 0; color: #1a1a18; font-size: 16px; line-height: 1.75;">
                    Hi ${order.name},
                  </p>
                  <p style="margin: 0 0 24px 0; color: #6b6b67; font-size: 16px; line-height: 1.75;">
                    Thank you for your order request. Unfortunately, we were unable to verify your GCash payment.
                  </p>
                  <p style="margin: 0 0 24px 0; color: #6b6b67; font-size: 16px; line-height: 1.75;">
                    Please double-check your GCash reference and submit a new order. If you believe this is a mistake, reply to this email and we'll sort it out.
                  </p>
                  <hr style="border: 0; border-top: 1px solid #e8e6e1; margin: 32px 0 24px 0;" />
                  <p style="margin: 0; color: #9b9b97; font-size: 14px; line-height: 1.6;">
                    We're here to help you get your copy of ${ebookTitle}.
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
