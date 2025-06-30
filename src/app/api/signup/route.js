
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/lib/auth";
import { NextResponse } from 'next/server';

export async function POST(req) {


  console.log(" /api/signup")
  try {
    await connectDB();

    const { email, password } = await req.json();

    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      email,
      password: hashedPwd,
    });

    const token = generateToken(newAdmin._id);

    const response = NextResponse.json({
      success: true,
      adminId: newAdmin._id,
      email
    });


    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (error) {
    console.error("POST /api/signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
