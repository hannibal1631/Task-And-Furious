import { Types } from "mongoose";
import { User } from "../models/user.models";
import { ApiError } from "./ApiError";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

interface SendEmailParams {
  email: string;
  emailType: "RESET" | "VERIFY";
  userId: Types.ObjectId;
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
      html: `<!doctype html>
<html lang="en">
  <body>
    <img src="" alt="logo" />
    <p>Hi, ABC</p>
    <p>
      We've received a request to reset your password. <br /><br />If you didn't
      make the request, just ignore this message. Otherwise, you can reset your
      password.
    </p>
    <a
      href="/"
      style="
        outline: none;
        text-decoration: none;
        background-color: black;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        color: white;
      "
      >Reset your password</a
    >
    <p>Thanks, <br />The Logo team</p>
    <p>${hashedToken}</p>
  </body>
</html>
`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};
