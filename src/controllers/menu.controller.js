import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { createResponse } from '../utils/response.util.js';

export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const image = req.files;
      const { name, price, content } = req.body;
      const createdMenu = await this.menuService.createMenu(restaurantId, name, price, image, content);

      return res
        .status(HTTP_STATUS.CREATED)
        .json(createResponse(HTTP_STATUS.CREATED, MESSAGES.MENU.CREATE.SUCCEED, createdMenu));
    } catch (err) {
      next(err);
    }
  };

  updateMenu = async (req, res, next) => {
    try {
      const { restaurantId, menuId } = req.params;
      const { name, price, image, content } = req.body;

      const updatedMenu = await this.menuService.updateMenu(restaurantId, menuId, name, price, image, content);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '',
        data: updatedMenu,
      });
    } catch (err) {
      next(err);
    }
  };

  async deleteMenu(req, res) {
    try {
      const { id } = req.params;
      const deletedMenu = await deleteMenu(id);
      res.status(200).json(deletedMenu);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  findAll = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const menus = await this.menuService.findAll(restaurantId);
      return res.status(HTTP_STATUS.OK).json(createResponse(HTTP_STATUS.OK, MESSAGES.MENU.READ_LIST.SUCCEED, menus));
    } catch (error) {
      next(error);
    }
  };

  findById = async (req, res, next) => {
    try {
      const { menuId } = req.params;
      const menu = await this.menuService.findById(menuId);

      return res.status(HTTP_STATUS.OK).json(createResponse(HTTP_STATUS.OK, MESSAGES.MENU.READ_DETAIL.SUCCEED, menu));
    } catch (error) {
      next(error);
    }
  };
}
