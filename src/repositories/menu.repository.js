import { prisma } from "../utils/prisma.util.js";

export class MenuRepository {
	constructor(prisma) {
		this.prisma = prisma;
	}

	// 레스토랑 조회
	findByRestaurantId = async (restaurantId) => {

		return await this.prisma.restaurant.findUnique({
			where: {
				restaurantId
			}
		});
	}

	// 메뉴 생성
	createMenu = async (name, price, image, content) => {
		return await this.prisma.menu.create({
			data: {
				name,
				price,
				image,
				content
			}
		});
	};

}
