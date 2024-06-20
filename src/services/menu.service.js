import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';

export class MenuService {
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
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
  // 메뉴 수정
  updateMenu = async (menuId, name, price, image, content) => {
    const menu = await this.menuRepository.findById(menuId);

    if (!menu) {
      throw new HttpError.NotFound(MESSAGES.MENU.COMMON.NOT_FOUND);
    }

    const updatedMenu = await this.menuRepository.updateMenu(menuId, name, price, image, content);

    return updatedMenu;
  };

  // 메뉴 삭제
  deleteMenu = async (menuId) => {
    const menu = await this.menuRepository.findById(menuId);

    if (!menu) {
      throw new HttpError.NotFound(MESSAGES.MENU.COMMON.NOT_FOUND);
    }

    const deletedMenu = await this.menuRepository.deleteMenu(menuId);
    return deletedMenu;
  };

  findAll = async (restaurantId) => {
    const existRestaurant = await this.restaurantRepository.findById(+restaurantId);
    if (!existRestaurant) {
      throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
    }

    const menus = await this.menuRepository.findAll(+restaurantId);
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
