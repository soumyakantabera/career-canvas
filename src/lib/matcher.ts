import type { CatalogItem } from "./catalog";

// Local TF-IDF + synonym expansion matcher. Runs in the browser, no API.
const synonyms: Record<string, string[]> = {
  fpa: ["budget", "variance", "forecast", "kpi", "pack", "controller", "finance"],
  controller: ["controlling", "budget", "variance", "close", "sap", "co", "management", "accounting"],
  controlling: ["controller", "sap", "co", "budget"],
  accountant: ["accounting", "close", "ledger", "sap"],
  credit: ["risk", "distress", "early", "warning", "signal", "thesis"],
  risk: ["credit", "distress", "stress", "thesis", "warning"],
  bi: ["power", "dashboard", "kpi", "data", "etl"],
  dashboard: ["power", "bi", "kpi", "dashboards"],
  dashboards: ["power", "bi", "kpi", "dashboard"],
  data: ["python", "etl", "sql", "pandas", "power", "bi"],
  analyst: ["analysis"],
  python: ["pandas", "etl", "data"],
  sql: ["database", "data", "check"],
  excel: ["model", "modelling", "pack", "budget"],
  valuation: ["dcf", "comps", "model", "modelling", "equity"],
  modelling: ["model", "dcf", "valuation", "financial"],
  modeling: ["modelling", "model", "dcf", "valuation"],
  ba: ["business", "requirements", "uat", "process", "stories"],
  business: ["requirements", "process", "uat", "stakeholder"],
  uat: ["testing", "requirements", "business"],
  process: ["as-is", "to-be", "maps", "business"],
  sap: ["s/4hana", "co", "erp", "management", "accounting"],
  manufacturer: ["inventory", "manufacturing", "cost", "budget"],
  manufacturing: ["inventory", "manufacturer", "cost"],
  cv: ["resume", "document"],
  resume: ["cv"],
  italian: ["italiano", "it"],
};
const stop = new Set("a an the and or of for to in on with at by is are be as from my your our who that this junior senior role roles job".split(" "));

const tokenize = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9&/+ ]/g, " ").replace(/&/g, "").split(/\s+/).filter((w) => w.length > 1 && !stop.has(w));
const stem = (w: string) => w.replace(/(ing|ers|er|es|s)$/,"") || w;

export type Match = { item: CatalogItem; score: number; reason: string };

export function match(query: string, catalog: CatalogItem[], max = 6): { summary: string; picks: Match[] } {
  const docs = catalog.map((c) => tokenize(`${c.title} ${c.title} ${c.text}`).map(stem));
  const df = new Map<string, number>();
  docs.forEach((d) => new Set(d).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1)));
  const idf = (t: string) => Math.log(1 + catalog.length / (df.get(t) ?? catalog.length));

  const raw = tokenize(query);
  const weights = new Map<string, number>();
  raw.forEach((w) => { weights.set(stem(w), 1); (synonyms[w] ?? []).forEach((s) => { const k = stem(s); if (!weights.has(k)) weights.set(k, 0.5); }); });

  const scored = catalog.map((item, i) => {
    const d = docs[i]!; const hits: string[] = []; let score = 0;
    weights.forEach((w, t) => { const tf = d.filter((x) => x === t).length; if (tf) { score += w * (1 + Math.log(tf)) * idf(t); if (w === 1) hits.push(t); } });
    score /= Math.sqrt(d.length || 1) / 3;
    if (/planned/.test(item.text)) score *= 0.85;
    const status = /progress/.test(item.text) ? " (in progress)" : /planned/.test(item.text) ? " (planned)" : "";
    const reason = hits.length ? `Matches ${hits.slice(0, 3).join(", ")}${status}.` : `Related skills${status}.`;
    return { item, score, reason };
  }).filter((m) => m.score > 0.05).sort((a, b) => b.score - a.score);

  const picks: Match[] = []; const perKind = new Map<string, number>();
  for (const m of scored) { const n = perKind.get(m.item.kind) ?? 0; if (n < 3) { picks.push(m); perKind.set(m.item.kind, n + 1); } if (picks.length >= max) break; }

  const summary = !picks.length
    ? "No close match in this portfolio. Try a finance, data, BI or business analyst skill."
    : picks[0]!.score > 1.5 ? `Strong overlap: ${picks.length} items match "${query}".` : `Partial overlap: these items are the closest to "${query}".`;
  return { summary, picks };
}
