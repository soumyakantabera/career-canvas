import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCatalog } from "./catalog";

const Input = z.object({ query: z.string().trim().min(3).max(400) });

export type Recommendation = { summary: string; picks: { id: string; reason: string }[] } | { error: string };

// Public on purpose: visitors use it without signing in. Input is length-capped; only catalog IDs come back.
export const recommend = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<Recommendation> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { error: "AI is not configured yet." };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText, Output } = await import("ai");

    const catalog = getCatalog();
    const ids = catalog.map((c) => c.id) as [string, ...string[]];
    const schema = z.object({
      summary: z.string().describe("1-2 sentences, honest fit of Soumyakanta for this role/skill"),
      picks: z.array(z.object({ id: z.enum(ids), reason: z.string().describe("one short sentence") })).describe("3 to 6 most relevant items, best first"),
    });

    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        instructions:
          "You recommend items from Soumyakanta Bera's career portfolio (junior finance / data / business analyst, Milan) to a recruiter or visitor. Only use the catalog. Be honest: if the fit is weak, say so briefly. Mark planned items as planned. No dashes other than plain hyphens.",
        messages: [{ role: "user", content: `Visitor is exploring: "${data.query}"\n\nCatalog:\n${catalog.map((c) => `- ${c.id} | ${c.title} | ${c.text}`).join("\n")}` }],
        output: Output.object({ schema }),
        providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", include: ["reasoning.encrypted_content"] } },
      });
      const out = await result.output;
      return { summary: out.summary, picks: out.picks.slice(0, 6) };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      console.error("recommend failed", status, e);
      if (status === 429) return { error: "Too many requests right now. Try again in a minute." };
      if (status === 402) return { error: "AI credits are used up for this site." };
      return { error: "Couldn't get recommendations right now." };
    }
  });
