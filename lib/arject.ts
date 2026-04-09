import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"], // track requests by a custom user ID
      refillRate: 1, // refill 1 tokens per interval
      interval: 6, //  refill every 6sec that in seconds
      capacity: 10, // bucket maximum capacity of 30 tokens
    }),
  ],
});
