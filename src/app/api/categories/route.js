import mongoose from "mongoose";
import { Category } from "@/app/models/Category";

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name) return Response.json({}, { status: 403 });

    mongoose.connect(process.env.MONGODB_URL);

    const newCategory = new Category({ name });

    await newCategory.save();

    return Response.json(newCategory || {});
  } catch (error) {
    console.error(error);
    return new Response("mongo error", { status: 403 });
  }
}
