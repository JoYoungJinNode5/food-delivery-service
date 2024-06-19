import { prisma } from '../utils/prisma.util.js';

export class RestaurantRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findById = async (id) => {
    return await this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    });
  };
}
