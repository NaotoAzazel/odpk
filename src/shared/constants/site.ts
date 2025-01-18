import { env } from "@/env";

export type SiteConfig = typeof SITE_CONFIG;

const LINKS = {
  youtube: "youtube url",
  facebook: "facebook url",
  instagram: "instagram url",
};

export const SITE_CONFIG = {
  name: "ОДПК",
  fullName: "Олександрійський політехнічний фаховий коледж",
  description:
    "Офіційний сайт Олександрійського політехнічного фахового коледжу",
  url: env.NEXT_PUBLIC_APP_URL,
  links: LINKS,
};
