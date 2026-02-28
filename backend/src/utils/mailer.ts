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
  <body
    style="
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div
      style="font-family: Arial; padding: 10px; color: #212121; width: 500px"
    >
      <h4>Logo</h4>
      <p>Hi ABC,</p>
      <p style="font-size: 15px; margin-bottom: 40px">
        We've received a request to reset your password. <br /><br />If you
        didn't make the request, just ignore this message. Otherwise, you can
        reset your password.
      </p>
      <a
        href="/"
        style="
          width: fit-content;
          text-decoration: none;
          background-color: #212121;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          outline: none;
          border: none;
        "
        >Reset your password</a
      >
      <p style="margin-top: 30px; font-size: 20px">
        Thanks,
        <span style="display: block; font-size: 15px; margin-top: 10px"
          >The Logo team</span
        >
      </p>
      <p>${hashedToken}</p>
    </div>
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
