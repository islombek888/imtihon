
export const rateLimitConfig = {
  points: Number(process.env.RATE_LIMIT_POINTS) || 10, 
  duration: Number(process.env.RATE_LIMIT_DURATION) || 1, 
  blockDuration: Number(process.env.RATE_LIMIT_BLOCK) || 60, 
};