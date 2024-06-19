import { createMenu, updateMenu, deleteMenu, getMenus } from '../services/menu.service.js';

class MenuController {
    async createMenu(req, res) {
        try {
            const { name, price, description } = req.body;
            const newMenu = await createMenu(name, price, description);
            res.status(201).json(newMenu);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async updateMenu(req, res) {
        try {
            const { id } = req.params;
            const { name, price, description } = req.body;
            const updatedMenu = await updateMenu(id, name, price, description);
            res.status(200).json(updatedMenu);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
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
