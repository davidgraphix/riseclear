import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to business
    await transporter.sendMail({
      from: `"RiseClear Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "info@risecleaning.ca",
      replyTo: email,
      subject: `New Quote Request from ${name} — RiseClear Website`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
          .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #0369A1, #0EA5E9); padding: 28px 36px; }
          .logo { color: #ffffff; font-size: 20px; font-weight: 800; }
          .logo span { color: #BAE6FD; }
          .body { padding: 32px 36px; }
          .field { margin-bottom: 18px; }
          .label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; margin-bottom: 5px; }
          .value { font-size: 15px; color: #1F2937; background: #F0F9FF; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #0EA5E9; white-space: pre-wrap; line-height: 1.6; }
          .footer { background: #F0F9FF; padding: 18px 36px; border-top: 1px solid #E0F2FE; font-size: 12px; color: #94A3B8; text-align: center; }
        </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo">Rise<span>Clear</span> — New Lead</div>
            </div>
            <div class="body">
              <div class="field"><div class="label">Name</div><div class="value">${name}</div></div>
              <div class="field"><div class="label">Email</div><div class="value">${email}</div></div>
              ${phone ? `<div class="field"><div class="label">Phone</div><div class="value">${phone}</div></div>` : ""}
              ${service ? `<div class="field"><div class="label">Service</div><div class="value">${service}</div></div>` : ""}
              <div class="field"><div class="label">Details</div><div class="value">${message}</div></div>
            </div>
            <div class="footer">RiseClear Property Services &bull; Winnipeg, Manitoba &bull; +1 431 816 4106</div>
          </div>
        </body>
        </html>
      `,
    });

    // Auto-reply to client
    await transporter.sendMail({
      from: `"RiseClear Property Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your request — RiseClear Property Services",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
          .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #0369A1, #0EA5E9); padding: 36px 40px; text-align: center; }
          .logo { color: #ffffff; font-size: 24px; font-weight: 800; }
          .logo span { color: #BAE6FD; }
          .body { padding: 36px 40px; }
          .greeting { font-size: 20px; font-weight: 700; color: #0C1A2E; margin-bottom: 14px; }
          p { font-size: 15px; color: #4B5563; line-height: 1.7; margin-bottom: 14px; }
          .highlight { background: #EFF6FF; border-left: 4px solid #0EA5E9; padding: 14px 18px; border-radius: 8px; margin: 20px 0; font-size: 14px; color: #0369A1; font-weight: 500; }
          .btn { display: inline-block; background: linear-gradient(135deg,#0EA5E9,#0284C7); color: #ffffff; padding: 13px 26px; border-radius: 8px; font-size: 14px; font-weight: 700; text-decoration: none; margin-top: 8px; }
          .footer { background: #F0F9FF; padding: 22px 40px; text-align: center; border-top: 1px solid #E0F2FE; font-size: 12px; color: #94A3B8; line-height: 1.8; }
        </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header"><div class="logo">Rise<span>Clear</span></div></div>
            <div class="body">
              <div class="greeting">Hi ${name}, we got your message! 👋</div>
              <p>Thank you for reaching out to <strong>RiseClear Property Services</strong>. We've received your quote request and our team will be in touch shortly — typically within a few hours.</p>
              <div class="highlight">⚡ For faster service, call us directly at <strong>+1 431 816 4106</strong> or DM us on Instagram @riseclearpropertyservices.</div>
              <p>Here's a quick look at what we can help you with:</p>
              <ul style="color:#4B5563;font-size:14px;line-height:2;padding-left:20px;">
                <li>✅ Window Cleaning (Residential &amp; Commercial)</li>
                <li>✅ Gutter Cleaning</li>
                <li>✅ Pressure Washing</li>
                <li>✅ Deep Cleaning &amp; Home Cleaning</li>
                <li>✅ Move-In / Move-Out Cleaning</li>
                <li>✅ Permanent LED Light Installation</li>
              </ul>
              <a href="https://www.instagram.com/riseclearpropertyservices/" class="btn">📸 DM Us on Instagram</a>
            </div>
            <div class="footer">RiseClear Property Services<br>Winnipeg, Manitoba, Canada<br>📞 +1 431 816 4106 &nbsp;|&nbsp; ✉️ info@risecleaning.ca</div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
