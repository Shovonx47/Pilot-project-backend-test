import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import ejs from 'ejs';
import path from 'path';
import { sendEmail } from '../../utils/sendEmail';


export const generateUserId = async () => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  // Generate a random 4-digit number and pad it to ensure 4 digits.
  let randomId = Math.floor(1000 + Math.random() * 9000).toString();

  randomId = `MC-${currentYear}${randomId}`;

  return randomId;
};

export const createToken = (
  jwtPayload: { email: string; role: string, id?: Types.ObjectId },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};




export const createVerificationOTP = () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  return {
    code,
  };
};

export const sendEmailVerification = async (email: string, name: string) => {
  const verificationOtp = createVerificationOTP();

  // Prepare email data
  const emailData = {
    code: verificationOtp.code,
    email,
    name,
  };

  // Render email template
  const html = await ejs.renderFile(
    path.join(__dirname, '../../templates/email.verification.ejs'),
    emailData,
  );

  await sendEmail(email, 'Verify your email address', html);

  return verificationOtp.code;
};


export const sendEmailForUpdatePassword = async (
  email: string,
  name: string,
) => {
  const verificationOtp = createVerificationOTP();

  // Prepare email data
  const emailData = {
    code: verificationOtp.code,
    email,
    name,
  };

  // Render email template
  const html = await ejs.renderFile(
    path.join(__dirname, '../../templates/email.forget-password.ejs'),
    emailData,
  );

  await sendEmail(email, 'Verify your email address', html);

  return verificationOtp.code;
};
