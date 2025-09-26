import FormData from "form-data";
import Mailgun from "mailgun.js";
import dotenv from "dotenv";
dotenv.config();

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const  sendOtpEmail = async (toEmail, userName, otp)=> {
  try {
    const domain = process.env.MAILGUN_DOMAIN; // sandbox or custom domain
    const messageData = {
      from: `e-Labour <postmaster@${domain}>`,
      to: `${userName} <${toEmail}>`,
      subject: "Your e-Labour OTP Code",
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h2>Hello ${userName},</h2>
          <p>Your OTP code is:</p>
          <h1 style="color: #1E90FF;">${otp}</h1>
          <p>This code will expire in <strong>5 minutes</strong>.</p>
          <p>Thank you for using <strong>e-Labour</strong>!</p>
        </div>
      `,
    };

    const response = await mg.messages.create(domain, messageData);
    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}

export default sendOtpEmail;