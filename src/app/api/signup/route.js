import { connectionstr } from "@/lib/db";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(connectionstr);
  console.log(payload);
  const find = await User.findOne({ email: payload.email });
  if (find) {
    console.log("object");
    return NextResponse.json(find);
  }

  const result = await new User(payload).save();
  return NextResponse.json(result);
}
