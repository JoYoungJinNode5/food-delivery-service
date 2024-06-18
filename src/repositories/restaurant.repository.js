import { prisma } from "../utils/prisma.util.js";

export class RestaurantRepository {

	// 업장 생성
	createdRestaurant = async (name, category, address, content, image) => {
		const createdRestaurant = await prisma.restaurant.create({
			data: {
				name, category, address, content, image
			},
		});

		return createdRestaurant;
	};

	// 업장 수정
	updatedRestaurant = async (name, category, address, content, restaurantId) => {
		const updatedRestaurant = await prisma.restaurant.update({
			where: {
				id: +restaurantId,
			},
			data: {
				name,
				category,
				address,
				content,
			},
		});
		return updatedRestaurant;
	}

	// 업장 상세 조회
	findRestaurantById = async (restaurantId) => {
		const restaurant = await prisma.restaurant.findUnique({
			where: {
				id: +restaurantId,
			},
		});
		return restaurant;
	}

	// 업장 목록 조회
	findAllRestaurants = async () => {
		const restaurants = await prisma.restaurant.findMany();

		return restaurants;
	};

	// 업장 삭제
	deleteRestaurantById = async (restaurantId) => {
		const deletedrestaurant = await prisma.restaurant.delete({
			where: {
				id: +restaurantId,
			},
		});
		return deletedrestaurant;
	}
}