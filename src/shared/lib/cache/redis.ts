import { Redis } from "@upstash/redis";

// Dont use "env" module from "@/env" it cause ->
// Attempted to access a server-side environment variable on the client
export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
});
