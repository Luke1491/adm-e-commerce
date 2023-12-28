import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { name } = body;
    const { user } = await getServerSession(authOptions);
    const { email } = user;

    if (!name) return new Response("name missing", { status: 403 });

    if (!email) return new Response("user not found", { status: 403 });

    mongoose.connect(process.env.MONGODB_URL);

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        name: name,
      },
      { new: true } // return the updated document
    ).exec();

    return Response.json(updatedUser || {});
    // return Response.json(true);
  } catch (error) {
    console.log(error);
    return new Response("mongo error", { status: 403 });
  }
}
