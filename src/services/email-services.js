import nodemailer from "nodemailer";

const client = "http://localhost:5173/";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendVerificationEmail = async (to, link) => {
  const mailOptions = {
    from: '"e-comm" <noreply@ddesigno.com>',
    to,
    subject: "Verify Your Email",
    html: `
      <div style="background-color: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background-color: #84cc16; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
              <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/mail.svg" alt="Email Icon" style="width: 30px; height: 30px; filter: invert(1);">
            </div>
          </div>
          <h1 style="color: #111827; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 16px;">
            Verify Your Email Address
          </h1>
          <p style="color: #4b5563; text-align: center; margin-bottom: 24px;">
            Thanks for signing up! Please click the button below to verify your email address.
          </p>
          <div style="text-align: center;">
            <a href=${client + "/verify-email/" + link} 
               style="display: inline-block; background-color: #84cc16; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; transition: background-color 0.2s;">
              Verify Email
            </a>
          </div>
          <p style="color: #6b7280; text-align: center; margin-top: 24px; font-size: 14px;">
            If you didn't request this email, you can safely ignore it.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
