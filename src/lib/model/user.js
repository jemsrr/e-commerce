import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: [],
    },
    totalAmount: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.users || mongoose.model("users", userModel);
