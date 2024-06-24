import { createResponse } from '../utils/response.util.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class LikeController {
  constructor(likeService) {
    this.likeService = likeService;
  }

  likes = async (req, res, next) => {
    try {
      const { id } = req.user;
      const { restaurantId } = req.params;
      const { action } = req.body;
      const { like, message } = await this.likeService.likes(id, restaurantId, action);

      return res.status(HTTP_STATUS.OK).json(createResponse(HTTP_STATUS.OK, message, like));
    } catch (error) {
      next(error);
    }
  };
}
