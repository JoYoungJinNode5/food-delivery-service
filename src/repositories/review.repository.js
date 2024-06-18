export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findById = async (id) => {
    return await this.prisma.review.findUnique({
      where: {
        id,
      },
    });
  };

  findAll = async (restaurantId) => {
    return await this.prisma.review.findMany({
      where: {
        order: {
          restaurantId,
        },
      },
      include: {
        order: true,
      },
    });
  };

  createReview = async (userId, orderId, restaurantId, content, image, rating) => {
    return await this.prisma.review.create({
      data: {
        userId,
        orderId,
        restaurantId,
        content,
        image,
        rating,
      },
    });
  };

  updateReview = async (id, content, image, rating) => {
    return await this.prisma.review.update({
      where: {
        id,
      },
      data: {
        ...(content && { content }),
        ...(image && { image }),
        ...(rating && { rating }),
      },
    });
  };

  deleteById = async (id) => {
    return await this.prisma.review.delete({
      where: {
        id,
      },
    });
  };
}
