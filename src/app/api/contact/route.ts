import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { ratelimit } from "@/lib/rateLimiter";
import DOMPurify from "isomorphic-dompurify";
// import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ??
      req.headers.get("x-real-ip") ??
      "unknown";
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    // Rate limit check
    const { success } = await ratelimit.limit(ip);
    if (!success)
      return NextResponse.json(
        { error: "Too many requests, slow down" },
        { status: 429 },
      );

    const { name, email, message } = await req.json();

    // Validation
    if (!name || !email || !message)
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 },
      );
    if (message.length > 1000)
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    // Sanitize
    const clean = {
      name: DOMPurify.sanitize(name),
      email: DOMPurify.sanitize(email),
      message: DOMPurify.sanitize(message),
    };

    // Insert into Supabase
    const { error } = await supabaseServer.from("contacts").insert([
      {
        name: clean.name,
        email: clean.email,
        message: clean.message,
        ip,
        user_agent: userAgent,
      },
    ]);
    if (error) throw error;

    // Email Notification (optional)
    // const transporter = nodemailer.createTransport({
    //   service: "gmail", // or smtp provider
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // await transporter.sendMail({
    //   from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    //   to: process.env.EMAIL_TO,
    //   subject: `New message from ${clean.name}`,
    //   text: `${clean.name} (${clean.email}) wrote:\n\n${clean.message}\n\nIP: ${ip}`,
    // });

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
