import { User } from "../models/user.models";
import { ApiError } from "./ApiError";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

interface SendEmailParams {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({
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

    const mailOptions = {
      from: "abc@example.com",
      to: email,
      subject: emailType === "RESET" ? "Reset your password" : "",
      html: `<p>Click <a href="${hashedToken}">here</a> to ${emailType === "RESET" ? "Reset your password" : ""} or copy paste the link below in your browser. <br /> ${hashedToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};
