import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { RestaurantService } from '../services/restaurant.service.js';

export class RestaurantController {
	restaurantService = new RestaurantService();

	// 업장 생성 컨트롤러
	createRestaurant = async (req, res, next) => {
		try {
			const { name, category, address, content } = req.body;

			const createdRestaurant = await this.restaurantService.createRestaurant(
				name, category, address, content
			);

			return res.status(HTTP_STATUS.CREATED).json({ data: createdRestaurant });

		} catch (err) {
			next(err);
		}
	}

	// 업장 정보 수정 컨트롤러
	updateRestaurant = async (req, res, next) => {
		try {
			const { name, category, address, content } = req.body;
			const updatedRestaurant = await this.restaurantService.updateRestaurant(
				name, category, address, content
			);

			return res.status(HTTP_STATUS.OK).json({ data: updatedRestaurant });

		} catch (err) {
			next(err);
		}
	}

	// 업장 상세 조회 컨트롤러
	getRestaurant = async (req, res, next) => {
		try {
			const { restaurantId } = req.params;

			const restaurant = await this.restaurantService.findRestaurantById(restaurantId);

			return res.status(HTTP_STATUS.OK).json({ data: restaurant });
		} catch (err) {
			next(err);
		}
	}

	// 업장 목록 조회
	getAllRestaurants = async (req, res, next) => {
		try {
			const restaurants = await this.restaurantService.findAllRestaurants();

			return res.status(HTTP_STATUS.OK).json({ data: restaurants });
		} catch (err) {
			next(err);
		}
	}
}