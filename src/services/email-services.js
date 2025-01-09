import nodemailer from "nodemailer";

const client = process.env.CLIENT_URL;

if (!client) {
  throw new Error("CLIENT_URL is missing in .env");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: "xdan nbzr xwjq uoqt",
  },
});

export const sendVerificationEmail = async (to, id) => {
  const mailOptions = {
    from: '"e-comm" <noreply@ddesigno.com>',
    to,
    subject: "Verify Your Email",
    html: `
      <div style="background-color: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
           <h1 style="color: #111827; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 16px;">
            Verify Your Email Address
          </h1>
          <p style="color: #4b5563; text-align: center; margin-bottom: 24px;">
            Thanks for signing up! Please click the button below to verify your email address.
          </p>
          <div style="text-align: center;">
            <a href="${client + "/verify-email/" + id}"
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

export const sendForgetPassword = async (to, token) => {
  try {
    const mailOptions = {
      from: '"e-comm" <noreply@ddesigno.com>',
      to,
      subject: "Reset Your Password",
      html: `
      <div style="background-color: #f9fafb; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #111827; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 16px;">
            Reset Your Password
          </h1>
          <p style="color: #4b5563; text-align: center; margin-bottom: 24px;">
            We received a request to reset your password. Click the button below to create a new password.
          </p>
          <div style="text-align: center;">
            <a href="${client + "/reset-password/" + token}"
               style="display: inline-block; background-color: #84cc16; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; transition: background-color 0.2s;">
              Reset Password
            </a>
          </div>
          <p style="color: #6b7280; text-align: center; margin-top: 16px; font-size: 14px;">
            For security, never share this email or the reset link with anyone.
          </p>
        </div>
      </div>
    `,
    };
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
