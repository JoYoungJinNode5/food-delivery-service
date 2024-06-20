import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  changedRole = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const data = await this.userService.changedRole(userId, role);

      return res.status(HTTP_STATUS.CREATED).json({
        status: res.statusCode,
        message: MESSAGES.USERS.UPDATE.ROLE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
