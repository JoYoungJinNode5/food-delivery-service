export class AuthRepository {
  constructor(redis) {
    this.redis = redis;
  }
  createEmailKey = async (email, verifyNumber) => {
    await this.redis.set(`auth:${email}`, verifyNumber);
    await this.redis.expire(`auth:${email}`, 180);
  };
  getEmailKey = async (email) => {
    const data = await this.redis.get(`auth:${email}`);
    return data;
  };

  tokenUpload = async (userId, refreshToken) => {
    const data = await this.redis.set(`userId:${userId}`, refreshToken);
    await this.redis.expire(`auth:${userId}`, 86400);
    return data;
  };

  refreshToken = async (userId) => {
    const data = await this.redis.get(`userId:${userId}`);
    return data;
  };

  signOutUser = async (userId) => {
    const data = await this.redis.del(`userId:${userId}`);
    return data;
  };
}

// 이메일로 저장,
