
import ratelimit from "../config/upstash.js";

const rateLimiter= async (req, res, next) => {
    try {

        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({ error: "Rate limit exceeded" });
        }

        next();

    } catch (error) {
        console.error("Error in rate limiter middleware:", error);
        res.status(500).json({ error: "Internal server error" });
        next(error);
    }
};

export default rateLimiter;