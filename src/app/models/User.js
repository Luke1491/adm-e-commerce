import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          throw new Error("Password must be at least 5 characters long");
        }
      },
    },
    image: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
  },
  {
    timestamps: true,
  }
);

//hash password before saving (after validation)
UserSchema.post("validate", function (user) {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPassword, salt);
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
