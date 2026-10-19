import { describe, expect, it } from "vitest";

import { renderErrorPage } from "@/lib/error-page";

describe("error page", () => {
  it("uses the repository base path for the home link", () => {
    const html = renderErrorPage("/career-canvas");
    expect(html).toContain('href="/career-canvas/"');
  });

  it("falls back to root for account-level pages", () => {
    const html = renderErrorPage("/");
    expect(html).toContain('href="/"');
  });
});
