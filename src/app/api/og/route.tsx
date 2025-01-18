import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/shared/constants";
import { ogImageSchema } from "@/shared/model";

export const runtime = "edge";

const interRegular = fetch(
  new URL("../../../shared/assets/fonts/Inter-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL("../../../shared/assets/fonts/Manrope-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  try {
    const fontRegular = await interRegular;
    const fontBold = await interBold;

    const url = new URL(request.url);
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));
    const heading =
      values.heading.length > 50
        ? `${values.heading.slice(0, 50)}...`
        : values.heading;

    const fontSize = heading.length > 100 ? "70px" : "100px";

    return new ImageResponse(
      (
        <div
          tw="relative flex h-full w-full flex-col items-start bg-white p-12"
          style={{ color: "#fff", background: "white" }}
        >
          <div tw="flex flex-1 flex-col py-10 text-gray-800">
            <div
              tw="flex text-center text-4xl font-bold tracking-tight"
              style={{ fontFamily: "Manrope", fontWeight: "bold" }}
            >
              {SITE_CONFIG.fullName}
            </div>

            <div
              tw="flex text-xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              {values.type}
            </div>
            <div
              tw="flex text-[80px] font-bold leading-[1.1] tracking-tight"
              style={{
                fontFamily: "Manrope",
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {heading}
            </div>
          </div>
          <div tw="flex w-full items-center">{SITE_CONFIG.url}</div>
        </div>
      ),
      {
        width: 1280,
        height: 680,
        fonts: [
          {
            name: "Inter",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "Manrope",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
        ],
      },
    );
  } catch (error) {
    return Response.json(
      { message: "FAILED_GENERATE_OG_IMAGE" },
      { status: 500 },
    );
  }
}
