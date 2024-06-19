export class ReviewImageRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createReviewImage = (tx, reviewId, imageUrl) => {
    return tx.reivewImage.create({
      data: {
        reviewId,
        imageUrl,
      },
      omit: {
        id: true,
        reviewId: true,
      },
    });
  };

  deleteByReviewId = (tx, reviewId) => {
    return tx.reivewImage.deleteMany({
      where: {
        reviewId,
      },
    });
  };

  findByReviewId = (reviewId) => {
    return this.prisma.reivewImage.findMany({
      where: {
        reviewId,
      },
      omit: {
        id: true,
        reviewId: true,
      },
    });
  };
}
