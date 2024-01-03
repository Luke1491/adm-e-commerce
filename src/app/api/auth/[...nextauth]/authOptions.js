import { User } from "@/app/models/User";
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/libs/mongoConnect";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      id: "credentials",
      type: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log("credentials", credentials);
        const { email, password } = credentials;

        try {
          mongoose.connect(process.env.MONGODB_URL);
          const user = await User.findOne({ email });
          const passwordOk =
            user && bcrypt.compareSync(password, user.password);

          // console.log(passwordOk);

          if (passwordOk) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: "jwt",
  },
};
