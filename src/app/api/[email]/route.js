import { connectionstr } from "@/lib/db";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await mongoose.connect(connectionstr);
  const result = await User.findOne({ email: params.email });
  return NextResponse.json(result);
}

export async function POST(req, { params }) {
  const payload = await req.json();
  await mongoose.connect(connectionstr);

  if (payload.order === "order") {
    await User.updateOne(
      { email: params.email },
      { $set: { cart: [], totalAmount: 0 } }
    );
    const result = await User.findOne({ email: params.email });
    return NextResponse.json(result);
  }

  const r = await User.findOne({
    email: params.email,
    cart: {
      $elemMatch: {
        "item.title": payload.item.title,
      },
    },
  });
  if (r) {
    console.log(r);

    if (payload.con === "add") {
      await User.updateOne(
        { email: params.email, "cart.item.title": payload.item.title },
        {
          $inc: {
            "cart.$.amount": 1,
            totalAmount: payload.item.price,
            "cart.$.price": payload.item.price,
          },
        }
      );
      const result = await User.findOne({ email: params.email });
      return NextResponse.json(result);
    }

    if (payload.con === "dec") {
      await User.updateOne(
        { email: params.email, "cart.item.title": payload.item.title },
        {
          $inc: {
            "cart.$.amount": -1,
            totalAmount: -payload.item.price,
            "cart.$.price": -payload.item.price,
          },
        }
      );

      await User.updateOne(
        { email: params.email },
        { $pull: { cart: { amount: 0 } } }
      );

      const result = await User.findOne({ email: params.email });
      return NextResponse.json(result);
    }

    await User.updateOne(
      { email: params.email, "cart.item.title": payload.item.title },
      {
        $inc: {
          "cart.$.amount": 1,
          totalAmount: payload.item.price,
          "cart.$.price": payload.item.price,
        },
      }
    );
    const result = await User.findOne({ email: params.email });
    return NextResponse.json(result);
  }

  const result = await User.findOneAndUpdate(
    { email: params.email },
    {
      $push: { cart: payload },
      $inc: { totalAmount: payload.item.price },
    }
  );

  return NextResponse.json(result);
}
