import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { createResponse } from '../utils/response.util.js';

export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  createReview = async (req, res, next) => {
    try {
      // const { id } = req.user;
      // const { restaurantId } = req.param;
      // const { orderId, content, image, rating } = req.body;

      // const review = await this.reviewService.createReview(id, orderId, restaurantId, content, image, rating);

      return res
        .status(HTTP_STATUS.CREATED)
        .json(createResponse(HTTP_STATUS.CREATED, MESSAGES.REVIEW.CREATE.SUCCEED, review));
    } catch (error) {
      next(error);
    }
  };
  updateReview = async (req, res, next) => {
    try {
      const { reviewId } = req.param;
      const { content, image, rating } = req.body;

      const review = await this.reviewService.updateReview(reviewId, content, image, rating);

      return res.status(HTTP_STATUS.OK).json(createResponse(HTTP_STATUS.OK, MESSAGES.REVIEW.UPDATE.SUCCEED, review));
    } catch (error) {
      next(error);
    }
  };
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.param;

      const review = await this.reviewService.deleteReview(reviewId);

      return res.status(HTTP_STATUS.OK).json(createResponse(HTTP_STATUS.OK, MESSAGES.REVIEW.DELETE.SUCCEED, review));
    } catch (error) {
      next(error);
    }
  };
  findReviews = async (req, res, next) => {
    try {
      const { restaurantId } = req.param;
      const reviews = await this.reviewService.findReviews(restaurantId);

      return res
        .status(HTTP_STATUS.OK)
        .json(createResponse(HTTP_STATUS.OK, MESSAGES.REVIEW.READ_LIST.SUCCEED, reviews));
    } catch (error) {
      next(error);
    }
  };
}
