import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class MenuController {
	constructor(menuService) {
		this.menuService = menuService;
	}

	createMenu = async (req, res, next) => {
		try {

			const { name, price, image, content } = req.body;
			const createdMenu = await this.menuService.createMenu(name, price, image, content);

			return res.status(HTTP_STATUS.CREATED).json({
				status: HTTP_STATUS.CREATED,
				message: '',
				data: createdMenu
			});
		} catch (err) {
			next(err);
		}
	};

	updateMenu = async (req, res, next) {
		try {
			const { restaurantId, menuId } = req.params;
			const { name, price, image, content } = req.body;

			const updatedMenu = await this.menuService.updateMenu(restaurantId, menuId, name, price, image, content);

			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: '',
				data: updatedMenu
			});
		} catch (err) {
			next(err)
		}
	}

	async deleteMenu(req, res) {
		try {
			const { id } = req.params;
			const deletedMenu = await deleteMenu(id);
			res.status(200).json(deletedMenu);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	}

	async getMenus(req, res) {
		try {
			const menus = await getMenus();
			res.status(200).json(menus);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	}
}

export default new MenuController();
