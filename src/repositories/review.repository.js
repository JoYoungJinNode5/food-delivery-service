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
        order: {
          include: {
            user: true,
          },
        },
      },
    });
  };

  createReview = async (orderId, content, rating) => {
    return await this.prisma.review.create({
      data: {
        orderId,
        content,
        rating,
      },
    });
  };

  updateReview = async (id, content, rating) => {
    return await this.prisma.review.update({
      where: {
        id,
      },
      data: {
        ...(content && { content }),
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
