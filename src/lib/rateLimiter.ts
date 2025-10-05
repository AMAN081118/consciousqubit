// /lib/rateLimiter.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(), // expects UPSTASH_REDIS_REST_URL & TOKEN in .env
  limiter: Ratelimit.slidingWindow(3, "1 m"), // 3 requests/minute per IP
  analytics: true,
});
