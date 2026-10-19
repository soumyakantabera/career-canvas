import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { recommend, type Recommendation } from "@/lib/recommend.functions";
import { getCatalog, type CatalogItem } from "@/lib/catalog";
import { Icon } from "./icons";
import { SectionTitle, type ModalItem } from "./ui-blocks";

const kindStyle: Record<CatalogItem["kind"], string> = {
  project: "bg-blue text-blue-ink", track: "bg-orange text-orange-ink", certificate: "bg-green text-green-ink",
  document: "bg-yellow text-yellow-ink", month: "bg-ink text-ink-foreground",
};
const examples = ["FP&A analyst at a manufacturer", "Power BI dashboards", "Credit risk analyst", "Business analyst with UAT"];

export function Recommender({ open }: { open: (m: ModalItem) => void }) {
  const run = useServerFn(recommend);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<Recommendation | null>(null);
  const catalog = getCatalog();

  async function go(query: string) {
    if (query.trim().length < 3 || busy) return;
    setQ(query); setBusy(true); setRes(null);
    try { setRes(await run({ data: { query } })); }
    catch { setRes({ error: "Please describe the role or skill in 3-400 characters." }); }
    finally { setBusy(false); }
  }

  return (
    <section id="match" className="tile bg-yellow-soft p-6 md:p-10">
      <SectionTitle kicker="AI-powered" title="What are you hiring for?" />
      <form onSubmit={(e) => { e.preventDefault(); void go(q); }} className="flex flex-col gap-3 md:flex-row">
        <label htmlFor="match-q" className="sr-only">Role or skill you are exploring</label>
        <input id="match-q" value={q} onChange={(e) => setQ(e.target.value)} maxLength={400}
          placeholder="e.g. Junior controller with SAP and Excel" className="min-h-12 flex-1 rounded-2xl bg-card px-5 text-base placeholder:text-muted-foreground" />
        <button disabled={busy} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-ink px-6 font-bold text-ink-foreground disabled:opacity-70">
          <Icon name="eye" width={20} height={20} />{busy ? "Matching..." : "Show matches"}
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((ex) => <button key={ex} onClick={() => void go(ex)} className="min-h-11 rounded-full bg-card px-4 text-sm font-medium">{ex}</button>)}
      </div>

      <div aria-live="polite" className="mt-6">
        {busy && <p className="font-medium text-muted-foreground">Looking through projects, CVs and the roadmap...</p>}
        {res && "error" in res && <p className="rounded-2xl bg-card p-4 font-medium">{res.error}</p>}
        {res && "picks" in res && (
          <>
            <p className="text-lg font-medium">{res.summary}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {res.picks.map((p) => {
                const item = catalog.find((c) => c.id === p.id);
                if (!item) return null;
                return (
                  <li key={p.id}>
                    <button onClick={() => open({ title: item.title, body: `${p.reason}\n\n${item.text}`, embed: item.url?.endsWith(".pdf") ? item.url : undefined, links: item.url ? [{ label: "Open", url: item.url, kind: item.url.endsWith(".pdf") ? "pdf" : "link" }] : undefined })}
                      className="tile tile-hover flex h-full w-full flex-col bg-card p-5 text-left">
                      <span className={`self-start rounded-full px-3 py-1 text-xs font-bold uppercase ${kindStyle[item.kind]}`}>{item.kind}</span>
                      <span className="mt-3 font-bold">{item.title}</span>
                      <span className="mt-1 text-sm text-muted-foreground">{p.reason}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
