export class ReviewImageRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createReviewImage = (reviewId, imageUrl) => {
    return this.prisma.reivewImage.create({
      data: {
        reviewId,
        imageUrl,
      },
    });
  };
}
