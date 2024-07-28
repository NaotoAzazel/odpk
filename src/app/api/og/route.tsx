import { siteConfig } from "@/config/site";
import { ogImageSchema } from "@/lib/validation/og";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const interRegular = fetch(
  new URL("../../../assets/fonts/Inter-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL("../../../assets/fonts/Manrope-Bold.ttf", import.meta.url),
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
          tw="flex relative flex-col p-12 w-full h-full items-start bg-white"
          style={{ color: "#fff", background: "white" }}
        >
          <div tw="flex flex-col flex-1 py-10 text-gray-800">
            <div
              tw="flex text-center text-4xl font-bold tracking-tight"
              style={{ fontFamily: "Manrope", fontWeight: "bold" }}
            >
              {siteConfig.fullName}
            </div>

            <div
              tw="flex text-xl uppercase font-bold tracking-tight"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              {values.type}
            </div>
            <div
              tw="flex tracking-tight leading-[1.1] text-[80px] font-bold"
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
          <div tw="flex items-center w-full">{siteConfig.url}</div>
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
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
