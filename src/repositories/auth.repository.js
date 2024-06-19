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
}

// 이메일로 저장,
