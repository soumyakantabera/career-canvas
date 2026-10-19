import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Every download linked from the site must ship in public/files, with exact casing.
const sources = ["src/data/profile.ts", "src/components/snapshot-deck.tsx"];
const names = sources.flatMap((p) =>
  [...readFileSync(resolve(p), "utf8").matchAll(/file\("([^"]+)"\)/g)].map((m) => m[1]),
);

describe("static downloads", () => {
  it("references at least the CV files", () => {
    expect(names).toContain("Soumyakanta_Bera_CV_AnalistaFinanziario-FPA-CreditoRischio_IT_v5.pdf");
  });
  it.each(names)("public/files/%s exists", (name) => {
    expect(existsSync(resolve("public/files", name))).toBe(true);
  });
});
