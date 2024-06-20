import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import { prisma } from '../utils/prisma.util.js';

const menuRepository = new MenuRepository(prisma);

export class MenuService {
	constructor(menuRepository) {
		this.menuRepository = menuRepository;
	}

	createMenu = async (name, price, image, content) => {

		if (!name || !price || !image) {
			throw new HttpError.BadRequest('x');
		}
		const createdMenu = await this.menuRepository.createMenu(name, price, image, content);

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

	getMenus = async () => {
		const menus = await menuRepository.findAll();
		return menus;
	};

}
