import { prisma } from "../utils/prisma.util.js";

export class MenuRepository {
	constructor(prisma) {
		this.prisma = prisma;
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

	// 메뉴 수정
	updatedMenu = async (menuId, name, price, image, content) => {
		return await this.prisma.menu.update({
			where: {
				id: +menuId,
			},
			data: {
				...(name && { name }),
				...(content && { content }),
				...(price && { price }),
				...(image && { image }),
				...(content && { content }),
			}
		});
	}

	findById = async (menuId) => {
		return await this.prisma.menu.findUnique({
			where: {
				id: +menuId
			},
		});
	}

	// 메뉴 삭제
	deleteMenu = async (menuId) => {
		return await this.prisma.menu.findUnique({
			where: {
				id: +menuId
			},
			include: {
				restaurant: true,
			},
		});
	}
}
