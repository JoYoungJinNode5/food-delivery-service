import { prisma } from "../utils/prisma.util.js";

export class RestaurantRepository {

	// 업장 생성
	createdRestaurant = async (name, category, address, content, image, openingTime) => {
		// req.body 에 넣은 name, category, address, content, image, openingTime 으로 업장 생성
		const createdRestaurant = await prisma.restaurant.create({
			data: {
				name, category, address, content, image, openingTime
			},
		});

		return createdRestaurant;
	};

	// 업장 수정
	updatedRestaurant = async (name, category, address, content, restaurantId, image, openingTime) => {
		// restaurant 테이블에서 id값이 restaurantId 값인 name, category, address, content 중 변경된 값 넣기
		const updatedRestaurant = await prisma.restaurant.update({
			where: {
				id: +restaurantId,
			},
			data: {
				name,
				category,
				address,
				content,
				image,
				openingTime,
			},
		});
		return updatedRestaurant;
	}

	// 업장 상세 조회
	findRestaurantById = async (restaurantId) => {
		// restaurant 테이블에 id가 restaurantId 값인 업장 조회
		const restaurant = await prisma.restaurant.findUnique({
			where: {
				id: +restaurantId,
			},
		});
		return restaurant;
	}

	// 업장 목록 조회
	findAllRestaurants = async () => {
		// 조건없이 조회하므로 restaurant 테이블의 모든 데이터 조회
		const restaurants = await prisma.restaurant.findMany();

		return restaurants;
	};

	// 업장 삭제
	deleteRestaurantById = async (restaurantId) => {
		// restaurant 테이블에 id값이 restaurantId 값인 것 업장 삭제
		const deletedrestaurant = await prisma.restaurant.delete({
			where: {
				id: +restaurantId,
			},
		});
		return deletedrestaurant;
	}
}