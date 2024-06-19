import { prisma } from '../utils/prisma.util.js';

export class RestaurantRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findById = async (id) => {
    return await this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    });
  };

  // 업장이 이미 있는지 조회
  findRestaurantByUserId = async (userId) => {
    return await this.prisma.restaurant.findUnique({
      where: {
        userId: +userId,
      },
    });
  };

  // 업장 생성
  createdRestaurant = async (name, category, address, content, image, openingTime, userId) => {
    // req.body 에 넣은 name, category, address, content, image, openingTime 으로 업장 생성
    const createdRestaurant = await this.prisma.restaurant.create({
      data: {
        name,
        category,
        address,
        content,
        image,
        openingTime,
        userId,
      },
    });

    return createdRestaurant;
  };

  // 업장 수정
  updatedRestaurant = async (name, category, address, content, restaurantId, image, openingTime) => {
    // restaurant 테이블에서 id값이 restaurantId 값인 name, category, address, content 중 변경된 값 넣기
    const updatedRestaurant = await this.prisma.restaurant.update({
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
  };

  // 업장 상세 조회
  findRestaurantById = async (restaurantId) => {
    // restaurant 테이블에 id가 restaurantId 값인 업장 조회
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: +restaurantId,
      },
    });
    return restaurant;
  };

  // 키워드 기반 업장 조회
  findRestaurantByKeyword = async (whereCondition) => {
    const restaurants = await this.prisma.restaurant.findMany({
      where: whereCondition,
    });
    return restaurants;
  };

  // 업장 삭제
  deleteRestaurantById = async (restaurantId) => {
    // restaurant 테이블에 id값이 restaurantId 값인 것 업장 삭제
    const deletedrestaurant = await this.prisma.restaurant.delete({
      where: {
        id: +restaurantId,
      },
    });
    return deletedrestaurant;
  };
}
