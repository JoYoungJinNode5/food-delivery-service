import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';

export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  signUp = async (email, password, passwordConfirm, nickname, name, address, profile_img) => {
    const isExistUser = await this.userRepository.ExistUser(email);
    // 이메일 중복체크
    if (isExistUser) {
      throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }
    // 패스워드 검사
    if (password !== repeat_password) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD);
    }
    const hashedPassword = await bcrypt.hash(password);
  };

  checkNickname = async (nickname) => {
    const isExistUser = await this.userRepository.ExistUser(nickname);
  };
}
