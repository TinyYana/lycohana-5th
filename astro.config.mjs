import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lycohana5th.tinyyana.com",
  output: "static",
  integrations: [sitemap()]
});
