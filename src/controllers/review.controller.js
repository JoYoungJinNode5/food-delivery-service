import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { createResponse } from '../utils/response.util.js';

export class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  createReview = async (req, res, next) => {
    try {
      const images = req.files;
      const { orderId, content, rating } = req.body;
      const review = await this.reviewService.createReview(orderId, content, images, rating);

      return res
        .status(HTTP_STATUS.CREATED)
        .json(createResponse(HTTP_STATUS.CREATED, MESSAGES.REVIEW.CREATE.SUCCEED, review));
    } catch (error) {
      next(error);
    }
  };
  updateReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { content, image, rating } = req.body;

      const review = await this.reviewService.updateReview(reviewId, content, image, rating);

      return res.status(HTTP_STATUS.OK).json(createResponse(HTTP_STATUS.OK, MESSAGES.REVIEW.UPDATE.SUCCEED, review));
    } catch (error) {
      next(error);
    }
  };
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;

      const review = await this.reviewService.deleteReview(reviewId);

      return res.status(HTTP_STATUS.OK).json(createResponse(HTTP_STATUS.OK, MESSAGES.REVIEW.DELETE.SUCCEED, review));
    } catch (error) {
      next(error);
    }
  };
  findReviews = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const reviews = await this.reviewService.findReviews(restaurantId);

      return res
        .status(HTTP_STATUS.OK)
        .json(createResponse(HTTP_STATUS.OK, MESSAGES.REVIEW.READ_LIST.SUCCEED, reviews));
    } catch (error) {
      next(error);
    }
  };
}
