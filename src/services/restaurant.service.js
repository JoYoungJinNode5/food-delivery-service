import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { KEYWORD } from '../constants/keyword.constants.js';

export class RestaurantService {
	constructor(restaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}
	// restaurantRepository = new RestaurantRepository();

	// 업장 생성 서비스
	createRestaurant = async (name, category, address, content, image, openingTime, userId) => {
		const findRestaurantByUserId = await this.restaurantRepository.findRestaurantByUserId(userId);

		if (findRestaurantByUserId) {
			throw new HttpError.BadRequest(MESSAGES.RESTAURANT.CREATE.MULTI_NOT_ALLOW);
		}

		const createdRestaurant = await this.restaurantRepository.createdRestaurant(
			name, category, address, content, image, openingTime, userId
		);

		return {
			id: createdRestaurant.id,
			name: createdRestaurant.name,
			category: createdRestaurant.category,
			address: createdRestaurant.address,
			content: createdRestaurant.content,
			image: createdRestaurant.image,
			openingTime: createdRestaurant.openingTime,
			createdAt: createdRestaurant.createdAt,
			updateAt: createdRestaurant.updatedAt,
		};
	};

	// 업장 정보 수정 서비스
	updateRestaurant = async (userId, name, category, address, content, restaurantId, image, openingTime) => {

		const existRestaurant = await this.restaurantRepository.findRestaurantByRestaurantId(userId);

		if (!existRestaurant) {
			throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
		}

		const updatedRestaurant = await this.restaurantRepository.updatedRestaurant(
			userId, name, category, address, content, restaurantId, image, openingTime
		);



		return {
			id: updatedRestaurant.id,
			name: updatedRestaurant.name,
			category: updatedRestaurant.category,
			address: updatedRestaurant.address,
			content: updatedRestaurant.content,
			image: updatedRestaurant.image,
			openingTime: updatedRestaurant.openingTime,
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
			openingTime: restaurant.openingTime,
			createdAt: restaurant.createdAt,
			updateAt: restaurant.updatedAt,
		};
	}

	// 업장 목록 조회 서비스
	findRestaurants = async (keyword) => {
		let whereCondition;


		if (keyword) {
			whereCondition = { category: keyword }
		}
		console.log(whereCondition);

		const restaurants = await this.restaurantRepository.findRestaurantByKeyword(whereCondition);

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

	// 키워드 기반 업장 조회 서비스
	findRestaurantByKeyword = async (keyword) => {

		const restaurants = await this.restaurantRepository.findRestaurantByKeyword(keyword);


		return restaurants.map((restaurant) => {
			return {
				id: restaurant.id,
				name: restaurant.name,
				category: restaurant.category,
				address: restaurant.address,
				content: restaurant.content,
				createdAt: restaurant.createdAt,
				updatedAt: restaurant.updatedAt,
			}
		})
	}

	// 업장 삭제 서비스
	deleteRestaurantById = async (userId, restaurantId) => {

		const existRestaurant = await this.restaurantRepository.findRestaurantByRestaurantId(restaurantId);

		if (!existRestaurant) {
			throw new HttpError.NotFound(MESSAGES.RESTAURANT.COMMON.NOT_FOUND);
		}
		const deletedRestaurant = await this.restaurantRepository.deleteRestaurantById(userId, restaurantId);
		return {
			id: deletedRestaurant.id,
		};
	};


}