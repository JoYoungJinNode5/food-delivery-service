export class OrderRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findById = async (id) => {
    return await this.prisma.order.findUnique({
      where: {
        id,
      },
    });
  };
}
