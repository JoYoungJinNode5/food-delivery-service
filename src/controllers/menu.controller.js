import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class MenuController {
  constructor(menuService) {
    this.menuService = menuService;
  }

  createMenu = async (req, res, next) => {
    try {
      const data = {
        restaurantId: req.body.restaurantId,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        content: req.body.content,
      };
      const menu = await this.menuService.createMenu(data);
      return res.status(HTTP_STATUS.CREATED).json({
        status: res.statusCode,
        message: MESSAGES.MENU.CREATE.SUCCEED,
        data: menu,
      });
    } catch (error) {
      next(error);
    }
  };

  updateMenu = async (req, res, next) => {
    try {
      const menuId = parseInt(req.params.menuId, 10);
      const data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        content: req.body.content,
      };
      const updatedMenu = await this.menuService.updateMenu(menuId, data);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.MENU.UPDATE.SUCCEED,
        data: updatedMenu,
      });
    } catch (error) {
      next(error);
    }
  };

  getMenuById = async (req, res, next) => {
    try {
      const menuId = parseInt(req.params.menuId, 10);
      const menu = await this.menuService.getMenuById(menuId);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.MENU.READ_DETAIL.SUCCEED,
        data: menu,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllMenus = async (req, res, next) => {
    try {
      const menus = await this.menuService.getAllMenus();
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.MENU.READ_LIST.SUCCEED,
        data: menus,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMenu = async (req, res, next) => {
    try {
      const menuId = parseInt(req.params.menuId, 10);
      await this.menuService.deleteMenu(menuId);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.MENU.DELETE.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  };
}
