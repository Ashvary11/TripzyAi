import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"], // track requests by a custom user ID
      refillRate: 6, // refill 10 tokens per interval
      interval: 60 * 60 * 12, // 60 * 60 * 24 refill every 24 hrs that in seconds
      capacity: 6, // bucket maximum capacity of 30 tokens
    }),
  ],
});
