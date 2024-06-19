import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import { prisma } from '../utils/prisma.util.js';

const menuRepository = new MenuRepository(prisma);

export const createMenu = async (name, price, description) => {
    if (!name || !price || !description) {
        throw new HttpError(400, MESSAGES.INVALID_INPUT);
    }

    const newMenu = await menuRepository.create({ name, price, description });
    return newMenu;
};

export const updateMenu = async (id, name, price, description) => {
    const menu = await menuRepository.findById(id);

    if (!menu) {
        throw new HttpError(404, MESSAGES.NOT_FOUND);
    }

    const updatedMenu = await menuRepository.update(id, { name, price, description });
    return updatedMenu;
};

export const deleteMenu = async (id) => {
    const menu = await menuRepository.findById(id);

    if (!menu) {
        throw new HttpError(404, MESSAGES.NOT_FOUND);
    }

    const deletedMenu = await menuRepository.delete(id);
    return deletedMenu;
};

export const getMenus = async () => {
    const menus = await menuRepository.findAll();
    return menus;
};
