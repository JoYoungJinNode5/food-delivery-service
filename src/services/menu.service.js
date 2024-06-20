import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import { prisma } from '../utils/prisma.util.js';

const menuRepository = new MenuRepository(prisma);

export class MenuService {
  constructor(menuRepository, restaurantRepository) {
    this.menuRepository = menuRepository;
    this.restaurantRepository = restaurantRepository;
  }

  createMenu = async (restaurantId, name, price, image, content) => {
    const existRestaurant = await this.restaurantRepository.findById(+restaurantId);
    if (!existRestaurant) {
      throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
    }

    const duplicateMenu = await this.menuRepository.findByRestaurantIdAndMenuName(+restaurantId, name);
    if (duplicateMenu) {
      throw new HttpError.NotFound(MESSAGES.MENU.COMMON.NAME.DUPLICATED);
    }

    const createdMenu = await this.menuRepository.createMenu(+restaurantId, name, price, image[0].location, content);

    return createdMenu;
  };

  updateMenu = async (restaurantId, menuId, name, price, image, content) => {
    const restaurant = await this.menuRepository.findByRestaurantId(restaurantId);
    const menu = await this.menuRepository.findByMenuId(menuId);

    if (!restaurant || !menu) {
      throw new HttpError.NotFound('x');
    }

    const updatedMenu = await this.menuRepository.updateMenu(name, price, image, content);

    return updatedMenu;
  };

  deleteMenu = async (id) => {
    const menu = await menuRepository.findById(id);

    if (!menu) {
      throw new HttpError(404, MESSAGES.NOT_FOUND);
    }

    const deletedMenu = await menuRepository.delete(id);
    return deletedMenu;
  };

  findAll = async (restaurantId) => {
    const existRestaurant = await this.restaurantRepository.findById(+restaurantId);
    if (!existRestaurant) {
      throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
    }

    const menus = await menuRepository.findAll(+restaurantId);
    return menus;
  };

  findById = async (menuId) => {
    const existMenu = await this.menuRepository.findById(+menuId);
    if (!existMenu) {
      throw new HttpError.NotFound(MESSAGES.MENU.COMMON.NOT_FOUND);
    }

    return existMenu;
  };
}
