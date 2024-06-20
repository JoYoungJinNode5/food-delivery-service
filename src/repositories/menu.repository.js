import { prisma } from '../utils/prisma.util.js';

export class MenuRepository {
  async createMenu(data) {
    return prisma.menu.create({
      data: {
        restaurantId: data.restaurantId,
        name: data.name,
        price: data.price,
        image: data.image,
        content: data.content,
      },
    });
  }

  async updateMenu(menuId, data) {
    return prisma.menu.update({
      where: { id: menuId },
      data: {
        name: data.name,
        price: data.price,
        image: data.image,
        content: data.content,
      },
    });
  }

  async getMenuById(menuId) {
    return prisma.menu.findUnique({
      where: { id: menuId },
    });
  }

  async getAllMenus() {
    return prisma.menu.findMany();
  }

  async deleteMenu(menuId) {
    return prisma.menu.delete({
      where: { id: menuId },
    });
  }
}
