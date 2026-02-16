

import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file to get UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN which are hidden for security reasons


const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    analytics: true,
});

export default ratelimit;