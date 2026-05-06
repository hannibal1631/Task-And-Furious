import { Types } from "mongoose";
import { User } from "../models/user.models";
import { ApiError } from "./ApiError";
import nodemailer, { SendMailOptions } from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import {
  inviteToWorkspaceTemplate,
  resetPasswordTemplate,
} from "./emailTemplate";

interface SendEmailParams {
  name: string;
  email: string;
  emailType: "RESET" | "WELCOME" | "INVITE";
  userId?: Types.ObjectId;
  html?: string;
  inviteLink?: string;
}

export const sendEmail = async ({
  name,
  email,
  emailType,
  userId,
  inviteLink,
}: SendEmailParams) => {
  try {
    let hashedToken = "";

    if (emailType === "RESET") {
      hashedToken = uuidv4();

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

    let subject = "";
    let html = "";

    if (emailType === "RESET") {
      subject = "Reset your password";
      html = resetPasswordTemplate(name, hashedToken);
    }

    if (emailType === "INVITE") {
      subject = "You're invited to join a workspace";
      html = inviteToWorkspaceTemplate(name, inviteLink!, "Your Workspace");
    }

    const mailOptions: SendMailOptions = {
      from: "abc@example.com",
      to: email,
      subject,
      html,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};
