import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, nickname, name, address, profile_img } = req.body;
      const data = await this.authService.signUp(
        email,
        password,
        passwordConfirm,
        nickname,
        name,
        address,
        profile_img,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: res.statusCode,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await this.authService.signIn(email, password);

      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  signOut = async (req, res, next) => {
    try {
      const user = req.user;
      const userId = user.id;

      await this.authService.signOut(userId);

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.AUTH.SIGN_OUT.SUCCEED,
        data: { id: userId },
      });
    } catch (error) {
      next(error);
    }
  };

  reloadToken = async (req, res, next) => {
    try {
      const user = req.user;
      const payload = { id: user.id };

      const data = await this.authService.generateAuthTokens(payload);

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.AUTH.TOKEN.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  checkNickname = async (req, res, next) => {
    try {
      const { nickname } = req.body;
      await this.authService.checkNickname(nickname);

      return res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.AUTH.COMMON.NICKNAME.SUCCEED,
        data: { nickname },
      });
    } catch (error) {
      next(error);
    }
  };
}
