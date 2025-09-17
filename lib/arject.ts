import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    tokenBucket({
      mode: "LIVE", 
      characteristics: ["userId"],
      refillRate: 100,
      interval: 60 * 60 * 24,
      capacity: 100,
    }),
  ],
});
