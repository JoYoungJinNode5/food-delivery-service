import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

export class RestaurantService {
	restaurantRepository = new RestaurantRepository();

	// 업장 생성 서비스
	createRestaurant = async (name, category, address, content) => {
		const createdRestaurant = await this.restaurantRepository.createdRestaurant(
			name, category, address, content
		);

		if (!createdRestaurant) {
			throw new Error('업장 생성 오류 발생');
		}

		return {
			id: createdRestaurant.id,
			name: createdRestaurant.name,
			address: createdRestaurant.address,
			content: createdRestaurant.content,
			createdAt: createdRestaurant.createdAt,
			updateAt: createdRestaurant.updateAt,
		};
	};

	// 업장 정보 수정 서비스
	updateRestaurant = async (name, category, address, content) => {

		const updatedRestaurant = await this.restaurantRepository.updatedRestaurant(
			name, category, address, content
		);

		if (!updatedRestaurant) {
			throw new Error('업장 정보 수정 오류 발생');
		}

		return {
			id: updatedRestaurant.id,
			name: updatedRestaurant.name,
			category: updatedRestaurant.category,
			content: updatedRestaurant.content,
			createdAt: updatedRestaurant.createdAt,
			updatedAt: updatedRestaurant.updateAt,

		};
	};

	// 업장 상세 조회 서비스
	findRestaurantById = async (restaurantId) => {
		const restaurant = await this.restaurantRepository.findRestaurantById(restaurantId);

		return {
			id: restaurant.id,
			name: restaurant.name,
			category: restaurant.category,
			address: restaurant.address,
			content: restaurant.content,
			createdAt: restaurant.createdAt,
			updateAt: restaurant.updateAt,
		};
	}

	// 업장 목록 조회 서비스
	findAllRestaurants = async () => {
		const restaurants = await this.restaurantRepository.findAllRestaurants();

		restaurants.map((restaurant) => {
			return {
				id: restaurant.id,
				name: restaurant.name,
				category: restaurant.category,
				address: restaurant.address,
				content: restaurant.content,
				createdAt: restaurant.createdAt,
				updatedAt: restaurant.updatedAt,
			};
		});
	}

}