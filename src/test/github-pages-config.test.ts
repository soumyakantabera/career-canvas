import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@lovable.dev/vite-tanstack-config", () => ({ defineConfig: (config: unknown) => config }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function pagesConfig(base: string) {
  vi.stubEnv("GITHUB_PAGES", "true");
  vi.stubEnv("BASE_PATH", base);
  return (await import("../../vite.config")).default as unknown as {
    vite: { base?: string };
    nitro?: boolean;
    tanstackStart: {
      router?: { basepath: string };
      pages?: { path: string }[];
      prerender?: { crawlLinks: boolean; autoStaticPathsDiscovery: boolean; failOnError: boolean };
    };
  };
}

describe("GitHub Pages deployment", () => {
  it("does not crawl CV downloads as routes", async () => {
    const config = await pagesConfig("/portfolio/");
    expect(config.tanstackStart.pages).toEqual([{ path: "/" }]);
    expect(config.tanstackStart.prerender?.crawlLinks).toBe(false);
    expect(config.tanstackStart.prerender?.autoStaticPathsDiscovery).toBe(false);
  });

  it("does not build a Worker for a static host", async () => {
    expect((await pagesConfig("/portfolio/")).nitro).toBe(false);
  });

  it("uses the repository path for both assets and navigation", async () => {
    const config = await pagesConfig("/portfolio");
    expect(config.vite.base).toBe("/portfolio/");
    expect(config.tanstackStart.router?.basepath).toBe("/portfolio/");
  });

  it("supports an account-level Pages site", async () => {
    const config = await pagesConfig("/");
    expect(config.vite.base).toBe("/");
    expect(config.tanstackStart.router?.basepath).toBe("/");
  });

  it("keeps the normal preview deployment unchanged", async () => {
    vi.stubEnv("GITHUB_PAGES", "false");
    const config = (await import("../../vite.config")).default as unknown as { nitro?: boolean; vite: unknown };
    expect(config.nitro).toBeUndefined();
    expect(config.vite).toEqual({});
  });
});