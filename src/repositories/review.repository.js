export class ReviewRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findById = async (id) => {
    return await this.prisma.review.findUnique({
      where: {
        id,
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

  findByOrderId = async (orderId) => {
    return await this.prisma.review.findUnique({
      where: {
        orderId,
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

  createReview = async (tx, orderId, content, rating) => {
    return await tx.review.create({
      data: {
        orderId,
        content,
        rating,
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

  updateReview = async (tx, id, content, rating) => {
    return await tx.review.update({
      where: {
        id,
      },
      data: {
        ...(content && { content }),
        ...(rating && { rating }),
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

  deleteById = async (id) => {
    return await this.prisma.review.delete({
      where: {
        id,
      },
    });
  };
}
