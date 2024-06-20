export class MenuService {
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  async createMenu(data) {
    return this.menuRepository.createMenu(data);
  }

  async updateMenu(menuId, data) {
    return this.menuRepository.updateMenu(menuId, data);
  }

  async getMenuById(menuId) {
    return this.menuRepository.getMenuById(menuId);
  }

  async getAllMenus() {
    return this.menuRepository.getAllMenus();
  }

  async deleteMenu(menuId) {
    return this.menuRepository.deleteMenu(menuId);
  }
}
