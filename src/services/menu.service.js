import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import { prisma } from '../utils/prisma.util.js';

export class MenuService {
	constructor(menuRepository, restaurantRepository) {
		this.menuRepository = menuRepository;
		this.restaurantRepository = restaurantRepository;
	}

	createMenu = async (name, price, image, content) => {

		if (!name || !price || !image) {
			throw new HttpError.BadRequest('x');
		}
		const createdMenu = await this.menuRepository.createMenu(name, price, image, content);

		return createdMenu;
	};
	// 메뉴 수정
	updateMenu = async (restaurantId, menuId, name, price, image, content) => {

		const restaurant = await this.restaurantRepository.findById(restaurantId);
		const menu = await this.menuRepository.findByMenuId(menuId);

		if (!restaurant || !menu) {
			throw new HttpError.NotFound('x');
		}

		const updatedMenu = await this.menuRepository.updateMenu(menuId, name, price, image, content);

		return updatedMenu;
	};


	// 메뉴 삭제
	deleteMenu = async (restaurantId, menuId) => {

		const menu = await this.menuRepository.findById(menuId);

		if (!menu) {
			throw new HttpError.NotFound(MESSAGES.NOT_FOUND);
		}

		const deletedMenu = await this.menuRepository.deleteMenu(menuId);
		return deletedMenu;
	};

}