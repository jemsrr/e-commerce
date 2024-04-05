import { connectionstr } from "@/lib/db";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionstr);
  const result = await User.find();
  return NextResponse.json(result);
}

export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(connectionstr);
  const result = await User.findOne(payload);
  return NextResponse.json(result);
}
