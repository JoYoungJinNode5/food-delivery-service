export const MIN_PASSWORD_LENGTH = 6;
export const MIN_RESUME_LENGTH = 150;

export const SALT = 10;
export const ACCESS_TOKEN_EXPIRES_IN = '12h';
export const REFRESH_TOKEN_EXPIRES_IN = '7d';

export const verifyNumber = Math.floor(Math.random() * 888888) + 111111;

export const serverEmail = {
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
