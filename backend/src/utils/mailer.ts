import { Types } from "mongoose";
import { User } from "../models/user.models";
import { ApiError } from "./ApiError";
import nodemailer, { SendMailOptions } from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { resetPasswordTemplate } from "./emailTemplate";

interface SendEmailParams {
  name: string;
  email: string;
  emailType: "RESET" | "WELCOME";
  userId: Types.ObjectId;
  html?: string;
}

export const sendEmail = async ({
  name,
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    const hashedToken = uuidv4();

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions: SendMailOptions = {
      from: "abc@example.com",
      to: email,
      subject: emailType === "RESET" ? "Reset your password" : "",
      html:
        emailType === "RESET" ? resetPasswordTemplate(name, hashedToken) : "",
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};
