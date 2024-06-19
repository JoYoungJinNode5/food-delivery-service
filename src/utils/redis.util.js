import { createClient } from 'redis';
import { REDIS_USERNAME, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '../constants/env.constant.js';

// export const redis = await createClient({
//   url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/0`,
//   legacyMode: true,
// })
//   .on('error', (err) => console.log('Redis Client Error', err))
//   .connect();

// const redisClient = async () => {
export const redis = await createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
}).connect();
//   return redis;
// };

// export const redis = redisClient();
