import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { LIKE_ACTION } from '../constants/like.constant.js';

export class LikeService {
  constructor(likeRepository, restaurantRepository) {
    this.likeRepository = likeRepository;
    this.restaurantRepository = restaurantRepository;
  }

  likes = async (userId, restaurantId, action) => {
    const existRestaurant = await this.restaurantRepository.findById(+restaurantId);
    if (!existRestaurant) {
      throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
    }

    const isActionLike = action == LIKE_ACTION.LIKE;
    const existLikes = await this.likeRepository.findByUserIdAndRestaurantId(+userId, +restaurantId);

    if (isActionLike && existLikes) {
      throw new HttpError.Conflict(MESSAGES.LIKES.LIKE.DUPLICATED);
    }

    let like;
    let message;
    if (isActionLike) {
      like = await this.likeRepository.createLike(userId, parseInt(restaurantId, 10));
      message = MESSAGES.LIKES.LIKE.SUCCEED;
    } else {
      like = await this.likeRepository.deleteLike(+userId, +restaurantId);
      message = MESSAGES.LIKES.UNLIKE.SUCCEED;
    }

    return { like, message };
  };
}
