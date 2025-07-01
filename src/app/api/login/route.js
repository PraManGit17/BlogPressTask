
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {

  await connectDB();

  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return NextResponse.json({
      error: 'Invalid email'
    },
      { status: 401 });
  };

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return NextResponse.json({
      error: 'Invalid password'
    },
      { status: 401 });
  }

  // const token = generateToken(admin._id);

  const token = generateToken({ id: admin._id, email: admin.email });

  const response = NextResponse.json({ success: true });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}