import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { USER_ROLE } from '../constants/role.constants.js';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  changedRole = async (id, role) => {
    let whereCondition = { id: +id };
    const user = await this.userRepository.findByUser(whereCondition);
    if (!user) {
      throw new HttpError.NotFound(MESSAGES.USERS.NOT_FOUND);
    }
    if (!(role == USER_ROLE.MANAGER || role == USER_ROLE.USER)) {
      throw new HttpError.BadRequest(MESSAGES.USERS.UPDATE.ROLE.FAILED_ENUM);
    }
    let data = await this.userRepository.changedRole(id, role);
    data = {
      id: data.id,
      name: data.name,
      role: data.role,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    return data;
  };
}
