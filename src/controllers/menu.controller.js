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
      const { menuId } = req.params;
      const { name, price, content } = req.body;
      const { image } = req.files;

      const updatedMenu = await this.menuService.updateMenu(menuId, name, price, image, content);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.MENU.UPDATE.SUCCEED,
        data: updatedMenu,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteMenu = async (req, res, next) => {
    try {
      const { restaurantId, menuId } = req.params;

      const deletedMenu = await this.menuService.deleteMenu(restaurantId, menuId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '삭제 완료',
        data: deletedMenu,
      });
    } catch (err) {
      next(err);
    }
  };

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
