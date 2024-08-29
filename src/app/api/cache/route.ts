import { z } from "zod";

import { getCachedValue, setCachedValue } from "@/lib/actions/cache";
import { cacheCreateRoute } from "@/lib/validation/cache";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");

    if (!key) {
      return new Response("Key is missing", { status: 400 });
    }

    const cachedValue = await getCachedValue(key);

    return new Response(JSON.stringify(cachedValue), { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { key, data } = cacheCreateRoute.parse(json);

    await setCachedValue(key, data, 120);

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
