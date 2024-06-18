import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

export class RestaurantService {
	restaurantRepository = new RestaurantRepository();

	// 업장 생성 서비스
	createRestaurant = async (name, category, address, content, image) => {
		const createdRestaurant = await this.restaurantRepository.createdRestaurant(
			name, category, address, content, image
		);

		return {
			id: createdRestaurant.id,
			name: createdRestaurant.name,
			category: createdRestaurant.category,
			address: createdRestaurant.address,
			content: createdRestaurant.content,
			image: createdRestaurant.image,
			createdAt: createdRestaurant.createdAt,
			updateAt: createdRestaurant.updatedAt,
		};
	};

	// 업장 정보 수정 서비스
	updateRestaurant = async (name, category, address, content, restaurantId) => {

		const updatedRestaurant = await this.restaurantRepository.updatedRestaurant(
			name, category, address, content, restaurantId
		);

		if (!updatedRestaurant) {
			throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
		}

		return {
			id: updatedRestaurant.id,
			name: updatedRestaurant.name,
			category: updatedRestaurant.category,
			address: updatedRestaurant.address,
			content: updatedRestaurant.content,
			createdAt: updatedRestaurant.createdAt,
			updatedAt: updatedRestaurant.updatedAt,

		};
	};

	// 업장 상세 조회 서비스
	findRestaurantById = async (restaurantId) => {
		const restaurant = await this.restaurantRepository.findRestaurantById(restaurantId);

		if (!restaurant) {
			throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
		}
		return {
			id: restaurant.id,
			name: restaurant.name,
			category: restaurant.category,
			address: restaurant.address,
			content: restaurant.content,
			createdAt: restaurant.createdAt,
			updateAt: restaurant.updatedAt,
		};
	}

	// 업장 목록 조회 서비스
	findAllRestaurants = async () => {
		const restaurants = await this.restaurantRepository.findAllRestaurants();

		return restaurants.map((restaurant) => {
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

	// 업장 삭제 서비스
	deleteRestaurantById = async (restaurantId) => {
		const deletedRestaurant = await this.restaurantRepository.deleteRestaurantById(restaurantId);

		if (!deletedRestaurant) {
			throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
		}
		return {
			id: deletedRestaurant.id,
		};
	};

}