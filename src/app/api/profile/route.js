import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { name, image } = body;
    const { user } = await getServerSession(authOptions);
    const { email } = user;

    // if (!name) return new Response("name missing", { status: 403 });

    if (!email) return new Response("user not found", { status: 403 });

    const query = {};

    if (name) query.name = name;
    if (image) query.image = image;

    //hold for a 2 seconds to simulate a slow network
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    mongoose.connect(process.env.MONGODB_URL);

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      query,
      { new: true } // return the updated document
    ).exec();

    return Response.json(updatedUser || {});
    // return Response.json(true);
  } catch (error) {
    console.log(error);
    return new Response("mongo error", { status: 403 });
  }
}
