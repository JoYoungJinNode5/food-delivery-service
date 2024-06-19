import express from 'express';
import MenuController from '../controllers/menu.controller.js';

const router = express.Router();

router.post('/', (req, res) => MenuController.createMenu(req, res));
router.put('/:id', (req, res) => MenuController.updateMenu(req, res));
router.delete('/:id', (req, res) => MenuController.deleteMenu(req, res));
router.get('/', (req, res) => MenuController.getMenus(req, res));

export default router;