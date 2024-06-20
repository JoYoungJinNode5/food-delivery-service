export class MenuRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 메뉴 생성
  createMenu = async (restaurantId, name, price, image, content) => {
    return await this.prisma.menu.create({
      data: {
        restaurantId,
        name,
        price,
        image,
        content,
      },
    });
  };

  findAll = async (restaurantId) => {
    return await this.prisma.menu.findMany({
      where: {
        restaurantId,
      },
    });
  };

  findById = async (id) => {
    return await this.prisma.menu.findUnique({
      where: {
        id,
      },
    });
  };

  findByRestaurantIdAndMenuName = async (restaurantId, name) => {
    return await this.prisma.menu.findFirst({
      where: {
        restaurantId,
        name,
      },
    });
  };
}
