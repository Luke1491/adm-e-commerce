import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();

    //TO DO - validate email and password
    if (!body?.email || !body?.password)
      return new Response("email or password missing", { status: 403 });

    // console.log(body);
    // console.log(process.env.MONGODB_URL);

    //DO TO - check how to use not "test" database
    mongoose.connect(process.env.MONGODB_URL);

    const createdUser = await User.create({
      email: body.email,
      password: body.password,
    });
    return Response.json(createdUser || {});
  } catch (error) {
    console.log(error);
    return new Response("mongo error", { status: 403 });
  }
}
