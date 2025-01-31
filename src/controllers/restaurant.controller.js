import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { RestaurantService } from '../services/restaurant.service.js';

export class RestaurantController {
	constructor(restaurantService) {
		this.restaurantService = restaurantService;
	}

	// restaurantService = new RestaurantService();

	// 업장 생성 컨트롤러
	createRestaurant = async (req, res, next) => {
		try {
			// req.body 값에 name, category, address, content, openingTime 구조 분해 할당
			const { name, category, address, content, openingTime } = req.body;
			const imageData = req.files;
			const image = imageData[0].location;
			const user = req.user;
			const userId = user.id;



			const createdRestaurant = await this.restaurantService.createRestaurant(
				name, category, address, content, image, openingTime, userId
			);

			return res.status(HTTP_STATUS.CREATED).json({
				status: HTTP_STATUS.CREATED,
				message: MESSAGES.RESTAURANT.CREATE.SUCCEED,
				data: createdRestaurant
			});

		} catch (err) {
			next(err);
		}
	}

	// 업장 정보 수정 컨트롤러
	updateRestaurant = async (req, res, next) => {
		try {
			const user = req.user;
			const userId = user.id;
			// req.body 값에 name, category, address, content 구조 분해 할당
			const { name, category, address, content, image, openingTime } = req.body;
			// 파라미터 값 가져오기
			const { restaurantId } = req.params;


			const updatedRestaurant = await this.restaurantService.updateRestaurant(
				userId, name, category, address, content, restaurantId, image, openingTime
			);

			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.RESTAURANT.UPDATE.SUCCEED,
				data: updatedRestaurant
			});

		} catch (err) {
			next(err);
		}
	}

	// 업장 상세 조회 컨트롤러
	getRestaurant = async (req, res, next) => {
		try {
			// 파라미터 값 가져오기
			const { restaurantId } = req.params;

			const restaurant = await this.restaurantService.findRestaurantById(restaurantId);

			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.RESTAURANT.READ_DETAIL.SUCCEED,
				data: restaurant
			});
		} catch (err) {
			next(err);
		}
	}

	// 업장 목록 조회
	getAllRestaurants = async (req, res, next) => {
		try {
			// 쿼리 값 받아오기
			const { keyword } = req.query;
			const restaurants = await this.restaurantService.findRestaurants(keyword);

			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.RESTAURANT.READ.SUCCEED,
				data: restaurants
			});
		} catch (err) {
			next(err);
		}
	}
	// 키워드 기반 목록 조회
	getRestaurantsByKeyword = async (req, res, next) => {
		try {
			const { keyword } = req.body;
			const restaurants = await this.restaurantService.findRestaurantByKeyword(keyword);

			return res.staus(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.RESTAURANT.READ_KEYWORD.SUCCEED,
				data: restaurants
			});
		} catch (err) {
			next(err);
		}
	}

	// 업장 삭제
	deleteRestaurant = async (req, res, next) => {
		try {
			// 파라미터 값 가져오기
			const { restaurantId } = req.params;
			const user = req.user;
			const userId = user.id;

			const deletedRestaurant = await this.restaurantService.deleteRestaurantById(userId, restaurantId);

			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.RESTAURANT.DELETE.SUCCEED,
				data: deletedRestaurant
			});

		} catch (err) {
			next(err);
		}
	}
}