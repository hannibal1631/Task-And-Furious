import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  reEnterPassword?: string;
  profilePicture?: string;
  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

interface TokenPayload {
  _id: string;
  fullName: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      index: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    reEnterPassword: {
      type: String,
      select: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (this.password !== this.reEnterPassword) {
    throw new Error("Password do not match");
  }

  this.password = await bcrypt.hash(this.password, 10);

  this.reEnterPassword = undefined;
});

userSchema.methods.isPasswordCorrect = async function (
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  const payload: TokenPayload = {
    _id: this._id.toString(),
    fullName: this.email,
    email: this.email,
  };

  const secret = process.env.ACCESS_TOKEN_SECRET as string;

  return jwt.sign(payload, secret, {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "1d") as any,
  });
};

userSchema.methods.generateRefreshToken = function (): string {
  const payload: TokenPayload = {
    _id: this._id.toString(),
    fullName: this.email,
    email: this.email,
  };

  const secret = process.env.REFRESH_TOKEN_SECRET as string;

  return jwt.sign(payload, secret, {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "10d") as any,
  });
};

export const User = mongoose.model<IUser>("User", userSchema);
