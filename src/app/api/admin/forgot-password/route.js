import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import Settings from "@/models/Settings";
import transporter from "@/lib/mailer";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

// Use global store for rate limiting to survive hot-reloads during development
if (!global.forgotPasswordRateLimits) {
  global.forgotPasswordRateLimits = new Map();
}
const rateLimits = global.forgotPasswordRateLimits;

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    await connectDB();

    const admin = await Admin.findOne({ email: trimmedEmail });

    if (!admin) {
      return NextResponse.json(
        { error: "Email address does not match the administrator account." },
        { status: 400 }
      );
    }

    // Rate Limiting Logic: Max 5 requests per email/IP in 15 minutes
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const maxRequests = 5;

    // Cleanup expired entries
    for (const [key, timestamps] of rateLimits.entries()) {
      const filtered = timestamps.filter((t) => now - t < windowMs);
      if (filtered.length === 0) {
        rateLimits.delete(key);
      } else {
        rateLimits.set(key, filtered);
      }
    }

    const emailKey = `email:${trimmedEmail}`;
    const ipKey = `ip:${ip}`;

    const emailAttempts = rateLimits.get(emailKey) || [];
    const ipAttempts = rateLimits.get(ipKey) || [];

    const emailCount = emailAttempts.filter((t) => now - t < windowMs).length;
    const ipCount = ipAttempts.filter((t) => now - t < windowMs).length;

    if (emailCount >= maxRequests || ipCount >= maxRequests) {
      console.warn(`Rate limit triggered for password reset request.`);
      return NextResponse.json({
        success: true,
        message: "Password reset link has been sent to your email address.",
      });
    }

    // Record this attempt
    emailAttempts.push(now);
    ipAttempts.push(now);
    rateLimits.set(emailKey, emailAttempts);
    rateLimits.set(ipKey, ipAttempts);

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    admin.resetToken = hashedToken;
    admin.resetTokenExpiry = new Date(now + 3600000); // 1 hour expiry
    await admin.save();

    // Fetch branding information with a safe fallback
    let restaurantName = "Figaro Restaurant";
    try {
      const settings = await Settings.findOne({});
      if (settings && settings.restaurantName) {
        restaurantName = settings.restaurantName;
      }
    } catch (settingsError) {
      console.error("Failed to retrieve settings branding, using fallback name.");
    }

    // Email link configuration
    const baseUrl = process.env.NEXTAUTH_URL || new URL(req.url).origin;
    const resetUrl = `${baseUrl}/adminfigaro/reset-password?token=${token}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #0b0b0f;
            color: #e4e4e7;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
          }
          .email-wrapper {
            width: 100%;
            background-color: #0b0b0f;
            padding: 40px 0;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #121214;
            border: 1px solid #27272a;
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .header {
            text-align: center;
            margin-bottom: 32px;
          }
          .brand {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: -0.5px;
          }
          .orange-dot {
            color: #f97316;
          }
          .subtitle {
            color: #71717a;
            font-size: 14px;
            font-weight: 500;
            margin-top: 4px;
          }
          .content-title {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 16px;
            text-align: center;
          }
          .text {
            font-size: 15px;
            line-height: 24px;
            color: #a1a1aa;
            margin-bottom: 24px;
            text-align: center;
          }
          .btn-container {
            text-align: center;
            margin: 32px 0;
          }
          .btn {
            background-color: #f97316;
            color: #ffffff !important;
            text-decoration: none;
            font-size: 16px;
            font-weight: 700;
            padding: 16px 32px;
            border-radius: 14px;
            display: inline-block;
            transition: background-color 0.2s ease;
          }
          .expiry-notice {
            font-size: 13px;
            color: #71717a;
            text-align: center;
            margin-bottom: 24px;
          }
          .footer {
            text-align: center;
            margin-top: 32px;
            border-top: 1px solid #1f1f23;
            padding-top: 24px;
            color: #52525b;
            font-size: 12px;
            line-height: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <div class="brand">${restaurantName}<span class="orange-dot">.</span></div>
              <div class="subtitle">Admin Control Panel</div>
            </div>
            
            <div class="content-title">Password Reset Request</div>
            
            <div class="text">
              We received a request to reset the password for your administrator account. Click the button below to set up a new password.
            </div>
            
            <div class="btn-container">
              <a href="${resetUrl}" class="btn" target="_blank">Reset Password</a>
            </div>
            
            <div class="expiry-notice">
              For security, this link is only valid for <strong>1 hour</strong>. If you did not request this change, you can safely ignore this email.
            </div>
            
            <div class="footer">
              &copy; ${new Date().getFullYear()} ${restaurantName} Restaurant System.<br>
              This is an automated system email. Please do not reply.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using configured transporter
    await transporter.sendMail({
      from: `"${restaurantName}" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: "Reset Your Password",
      html: emailHtml,
    });

    console.log("Password reset email sent successfully.");

    return NextResponse.json({
      success: true,
      message: "Password reset link has been sent to your email address.",
    });
  } catch (error) {
    console.error("Forgot password API handler error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request. Please try again." },
      { status: 500 }
    );
  }
}