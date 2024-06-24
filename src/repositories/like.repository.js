export class LikeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createLike = async (userId, restaurantId) => {
    return await this.prisma.like.create({
      data: {
        userId,
        restaurantId,
      },
    });
  };
  deleteLike = async (userId, restaurantId) => {
    return await this.prisma.like.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });
  };
  findByUserIdAndRestaurantId = async (userId, restaurantId) => {
    return await this.prisma.like.findUnique({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });
  };
}
