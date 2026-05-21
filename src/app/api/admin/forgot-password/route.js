import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import crypto from "crypto";
import mailer from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 });
    }

    await connectDB();

    const emailQuery = email.trim().toLowerCase();
    
    const admin = await Admin.findOne({
      $or: [
        { email: emailQuery },
        { recoveryEmail: emailQuery }
      ]
    });

    if (!admin) {
      return NextResponse.json({
        error: "Admin account with this email address does not exist."
      }, { status: 404 });
    }

    const recoveryTarget = admin.recoveryEmail || admin.email;

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await Admin.updateOne(
      { _id: admin._id },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: expiry
        }
      }
    );

    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/adminfigaro/reset-password/${token}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #030303;
            color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #0d0d0d;
            border: 1px solid #1a1a1a;
            border-radius: 16px;
            padding: 40px;
            text-align: center;
          }
          h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.05em;
            margin-bottom: 24px;
          }
          p {
            color: #a3a3a3;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 32px;
          }
          .btn {
            display: inline-block;
            background-color: #f97316;
            color: #ffffff;
            font-weight: 700;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 9999px;
            font-size: 16px;
            margin-bottom: 32px;
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
          }
          .footer {
            color: #525252;
            font-size: 12px;
            border-top: 1px solid #1a1a1a;
            padding-top: 24px;
            margin-top: 32px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>FIGARO<span style="color:#f97316">.</span></h1>
          <p>You are receiving this because you requested a password reset for your administrator account.</p>
          <a href="${resetUrl}" class="btn" style="color: #ffffff;">Reset Password</a>
          <p style="font-size: 13px; color: #f97316;">This secure recovery link is active for exactly 1 hour.</p>
          <p style="font-size: 14px; color: #737373;">If you did not request this, ignore this email.</p>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Figaro Restaurant System. Secure Admin Access.
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("SMTP server credentials (EMAIL_USER / EMAIL_PASS) are unconfigured.");
      }

      const mailOptions = {
        from: `"Figaro Admin System" <${process.env.EMAIL_USER}>`,
        to: recoveryTarget,
        subject: "Figaro Admin - Reset Password Link",
        html: emailHtml
      };

      await mailer.sendMail(mailOptions);
    } catch (smtpError) {
      console.error("SMTP dispatch failed:", smtpError);
      return NextResponse.json({
        error: `Reset email failed to send: ${smtpError.message}`
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Password reset link sent successfully to recovery email: ${recoveryTarget}`
    });
  } catch (error) {
    console.error("POST /api/admin/forgot-password error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
