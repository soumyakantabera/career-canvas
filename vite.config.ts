// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages needs only the explicit public page, not a Worker bundle or crawled downloads.
const pages = process.env["GITHUB_PAGES"] === "true";
const base = `/${(process.env["BASE_PATH"] || "/").replace(/^\/+|\/+$/g, "")}/`.replace(/^\/\/$/, "/");

export default defineConfig({
  vite: pages ? { base } : {},
  ...(pages ? { nitro: false as const } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(pages
      ? {
          router: { basepath: base },
          pages: [{ path: "/" }],
          prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false, failOnError: true },
        }
      : {}),
  },
});
