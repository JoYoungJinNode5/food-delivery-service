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

  async getUserById(userId) {
    // getUserById 메서드 추가
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  createUser = async (email, password, nickname, name, address, profileImg) => {
    const userData = await this.prisma.user.create({
      data: {
        email,
        password,
        nickname,
        name,
        address,
        profileImg,
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
  changedRole = async (id, role) => {
    const data = await this.prisma.user.update({
      where: { id: +id },
      data: {
        role,
      },
    });
    return data;
  };
}
