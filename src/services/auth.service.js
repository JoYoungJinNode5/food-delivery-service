import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';
import { SALT } from '../constants/auth.constant.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '../constants/env.constant.js';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';
import * as nodemailer from 'nodemailer';

export class AuthService {
  constructor(userRepository, authRepository) {
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }
  signUp = async (email, password, passwordConfirm, nickname, name, address, profile_img) => {
    const whereCondition = { email };
    const isExistUser = await this.userRepository.findByUser(whereCondition);

    // 이메일 중복체크
    if (isExistUser) {
      throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    // 패스워드 검사
    if (password !== passwordConfirm) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD);
    }

    const hashedPassword = await bcrypt.hash(password, SALT);
    const userData = await this.userRepository.createUser(email, hashedPassword, nickname, name, address, profile_img);

    userData.password = undefined;
    return userData;
  };

  signIn = async (email, password) => {
    const whereCondition = { email };
    const user = await this.userRepository.findByUser(whereCondition);

    // 회원 체크
    if (!user) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
    }

    // 패스워드 검사
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
    }
    const payload = { id: user.id };
    // 토큰 생성
    const data = await this.generateAuthTokens(payload);

    return data;
  };

  signOut = async (userId) => {
    await this.authRepository.signOutUser(userId);
  };

  generateAuthTokens = async (payload) => {
    const userId = payload.id;

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, SALT);

    await this.authRepository.tokenUpload(userId, hashedRefreshToken);
    // RefreshToken을 생성 또는 갱신
    return { accessToken, refreshToken };
  };

  checkNickname = async (nickname) => {
    const whereCondition = { nickname };
    const user = await this.userRepository.findByUser(whereCondition);
    if (user) {
      throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.NICKNAME.DUPLICATED);
    }
  };

  verifyEmail = async (serverEmail, content, email, verifyNumber) => {
    await this.authRepository.createEmailKey(email, verifyNumber);
    nodemailer.createTransport(serverEmail).sendMail(content, (error, info) => {
      if (error) {
        throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.EMAIL.TRANSFER_FAILED);
      } else {
        console.log(info);
        return info.response;
      }
    });
  };
  verifyEmailInput = async (email, userNumber) => {
    const sendNumber = await this.authRepository.getEmailKey(email);
    if (!(sendNumber == userNumber)) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.NOT_MACHTED_TRANSFER);
    }
  };
}
