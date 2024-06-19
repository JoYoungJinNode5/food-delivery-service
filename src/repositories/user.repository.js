export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  findByUser = async (whereCondition) => {
    const isExistUser = await this.prisma.user.findUnique({
      where: whereCondition,
    });
    return isExistUser;
  };

  createUser = async (email, password, nickname, name, address, profile_img) => {
    const userData = await this.prisma.user.create({
      data: {
        email,
        password,
        nickname,
        name,
        address,
        profile_img,
      },
    });
    return userData;
  };

  signOutUser = async (userId) => {
    await this.prisma.RefreshToken.update({
      where: { userId },
      data: {
        refreshToken: null,
      },
    });
  };

  //   tokenUpload = async (userId, refreshToken) => {
  //     const data = await this.prisma.RefreshToken.upsert({
  //       where: {
  //         userId,
  //       },
  //       update: {
  //         refreshToken,
  //       },
  //       create: {
  //         userId,
  //         refreshToken,
  //       },
  //     });
  //     return data;
  //   };
  //   refreshToken = async (userId) => {
  //     const data = await this.prisma.RefreshToken.findUnique({
  //       where: { userId },
  //     });
  //     return data;
  //   };
}
