import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to business
    const businessMailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || "RiseClear Website"}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "info@risecleaning.ca",
      replyTo: email,
      subject: `New Quote Request from ${name} — RiseClear Website`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #080C10 0%, #0D1117 100%); padding: 32px 40px; text-align: center; }
            .logo { color: #60A5FA; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
            .logo span { color: #F8FAFC; }
            .tagline { color: #6B7280; font-size: 13px; margin-top: 4px; }
            .body { padding: 36px 40px; }
            .title { font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 8px; }
            .subtitle { color: #6B7280; font-size: 14px; margin-bottom: 28px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #9CA3AF; margin-bottom: 6px; }
            .value { font-size: 15px; color: #1F2937; background: #F9FAFB; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #3B82F6; }
            .message-value { white-space: pre-wrap; line-height: 1.6; }
            .divider { height: 1px; background: #E5E7EB; margin: 24px 0; }
            .cta-row { display: flex; gap: 12px; margin-top: 28px; }
            .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; text-align: center; }
            .btn-call { background: #3B82F6; color: #ffffff; }
            .btn-email { background: #F3F4F6; color: #374151; }
            .footer { background: #F9FAFB; padding: 20px 40px; text-align: center; border-top: 1px solid #E5E7EB; }
            .footer-text { font-size: 12px; color: #9CA3AF; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo">Rise<span>Clear</span></div>
              <div class="tagline">New lead from your website</div>
            </div>
            <div class="body">
              <div class="title">📋 New Quote Request</div>
              <div class="subtitle">Someone submitted the contact form on risecleaning.ca</div>

              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">${email}</div>
              </div>

              ${
                phone
                  ? `<div class="field">
                <div class="label">Phone Number</div>
                <div class="value">${phone}</div>
              </div>`
                  : ""
              }

              ${
                service
                  ? `<div class="field">
                <div class="label">Service Interested In</div>
                <div class="value">${service}</div>
              </div>`
                  : ""
              }

              <div class="field">
                <div class="label">Message</div>
                <div class="value message-value">${message}</div>
              </div>

              <div class="divider"></div>

              <div class="cta-row">
                ${phone ? `<a href="tel:${phone.replace(/\D/g, "")}" class="btn btn-call">📞 Call ${phone}</a>` : ""}
                <a href="mailto:${email}" class="btn btn-email">✉️ Reply to Email</a>
              </div>
            </div>
            <div class="footer">
              <div class="footer-text">RiseClear Property Services • Winnipeg, Manitoba, Canada<br>+1 431 816 4106 • info@risecleaning.ca</div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Auto-reply to client
    const clientMailOptions = {
      from: `"RiseClear Property Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your request — RiseClear Property Services",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #080C10 0%, #0D1117 100%); padding: 40px; text-align: center; }
            .logo { color: #60A5FA; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
            .logo span { color: #F8FAFC; }
            .body { padding: 40px; }
            .greeting { font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 16px; }
            p { font-size: 15px; color: #4B5563; line-height: 1.7; margin-bottom: 16px; }
            .highlight { background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 16px 20px; border-radius: 8px; margin: 24px 0; font-size: 14px; color: #1E40AF; font-weight: 500; }
            .contact-grid { display: grid; gap: 12px; margin: 24px 0; }
            .contact-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151; }
            .btn { display: inline-block; background: #3B82F6; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none; margin-top: 8px; }
            .footer { background: #F9FAFB; padding: 24px 40px; text-align: center; border-top: 1px solid #E5E7EB; }
            .footer-text { font-size: 12px; color: #9CA3AF; line-height: 1.8; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="logo">Rise<span>Clear</span></div>
            </div>
            <div class="body">
              <div class="greeting">Hi ${name}, we got your message! 👋</div>
              <p>Thank you for reaching out to <strong>RiseClear Property Services</strong>. We've received your quote request and our team will be in touch with you shortly — typically within a few hours.</p>

              <div class="highlight">
                ⚡ For faster service, you can also reach us directly by phone at <strong>+1 431 816 4106</strong>, or DM us on Instagram.
              </div>

              <p>While you wait, here's a quick look at what we can help you with:</p>
              <ul style="color:#4B5563;font-size:14px;line-height:2;padding-left:20px;">
                <li>✅ Window Cleaning (Residential & Commercial)</li>
                <li>✅ Gutter Cleaning</li>
                <li>✅ Pressure Washing</li>
                <li>✅ Deep Cleaning & Home Cleaning</li>
                <li>✅ Move-In / Move-Out Cleaning</li>
                <li>✅ Permanent LED Light Installation</li>
              </ul>

              <a href="https://www.instagram.com/riseclearpropertyservices/" class="btn">📸 DM Us on Instagram</a>
            </div>
            <div class="footer">
              <div class="footer-text">
                RiseClear Property Services<br>
                Winnipeg, Manitoba, Canada<br>
                📞 +1 431 816 4106 &nbsp;|&nbsp; ✉️ info@risecleaning.ca
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

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
