const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

exports.otpsender = async (name, emailId, otp) => { 
  try {
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`, 
      to: emailId, // ✅ Fixed variable name
      subject: "Your OTP Code",
      html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your OTP code is: <strong style="color:blue; font-size:18px;">${otp}</strong></p>
        <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <br>
        <p>Best regards, <br> <strong>Your Company Name</strong></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully. Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
    throw error;
  }
};
