import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { prisma } from '../utils/prisma.util.js';
import { Prisma } from '@prisma/client';
import { deleteS3Objects } from '../utils/file-upload.util.js';

export class ReviewService {
  constructor(reviewRepository, reviewImageRepository, orderRepository) {
    this.reviewRepository = reviewRepository;
    this.reviewImageRepository = reviewImageRepository;
    this.orderRepository = orderRepository;
  }

  createReviewResponseData = (review, images) => {
    return {
      id: review.id,
      nickname: review.order.user.nickname,
      content: review.content,
      images: images,
      rating: review.rating,
    };
  };

  createReview = async (orderId, content, images, rating) => {
    const existOrder = await this.orderRepository.findById(+orderId);
    if (!existOrder) {
      throw new HttpError.NotFound(MESSAGES.ORDERS.NOT_FOUND);
    }

    const existReview = await this.reviewRepository.findByOrderId(+orderId);
    if (existReview) {
      throw new HttpError.Conflict(MESSAGES.REVIEW.COMMON.DUPLICATED);
    }

    const [createdReview, createdReviewImage] = await prisma.$transaction(
      async (tx) => {
        const createdReview = await this.reviewRepository.createReview(tx, orderId, content, rating);
        let createdReviewImage = [];
        if (images) {
          for (const image of images) {
            createdReviewImage.push(
              await this.reviewImageRepository.createReviewImage(tx, +createdReview.id, image.location),
            );
          }
        }

        return [createdReview, createdReviewImage];
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
      },
    );

    return this.createReviewResponseData(createdReview, createdReviewImage);
  };

  updateReview = async (reviewId, content, images, rating) => {
    const existReview = await this.reviewRepository.findById(+reviewId);
    if (!existReview) {
      throw new HttpError.NotFound(MESSAGES.REVIEW.COMMON.NOT_FOUND);
    }

    const [updatedReview, updatedReviewImage] = await prisma.$transaction(
      async (tx) => {
        const updatedReview = await this.reviewRepository.updateReview(tx, +reviewId, content, rating);

        await this.reviewImageRepository.deleteByReviewId(tx, +reviewId);

        let updatedReviewImage = [];
        if (images) {
          for (const image of images) {
            updatedReviewImage.push(await this.reviewImageRepository.createReviewImage(tx, +reviewId, image.location));
          }
        }

        return [updatedReview, updatedReviewImage];
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
      },
    );

    return this.createReviewResponseData(updatedReview, updatedReviewImage);
  };

  deleteReview = async (reviewId) => {
    const existReview = await this.reviewRepository.findById(+reviewId);
    if (!existReview) {
      throw new HttpError.NotFound(MESSAGES.REVIEW.COMMON.NOT_FOUND);
    }

    const [reviewImageUrlsToDelete, deletedReivew] = await prisma.$transaction(
      async (tx) => {
        const reviewImageUrlsToDelete = await this.reviewImageRepository.findByReviewId(+reviewId);
        deleteS3Objects(reviewImageUrlsToDelete);

        const deletedReivew = await this.reviewRepository.deleteById(+reviewId);

        return [reviewImageUrlsToDelete, deletedReivew];
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
      },
    );

    return { id: deletedReivew.id };
  };

  findReviews = async (restaurantId) => {
    const reviews = await this.reviewRepository.findAll(+restaurantId);

    return await Promise.all(
      reviews.map(async (review) => {
        const reviewImages = await this.reviewImageRepository.findByReviewId(review.id);
        return this.createReviewResponseData(review, reviewImages);
      }),
    );
  };
}
