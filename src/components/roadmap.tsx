import { useState } from "react";
import { BrandLogo } from "./brand-logos";
import { Icon } from "./icons";
import { SectionTitle, StatusChip, fill, soft, solid, statusClass } from "./ui-blocks";
import { months, scenarios, totals, weeklyRhythm } from "@/data/plan";

const maxH = Math.max(...months.map((m) => m.projectHours));

export function Roadmap({ mine }: { mine: boolean }) {
  const [active, setActive] = useState(months[0]!.id);
  const m = months.find((x) => x.id === active)!;
  let cum = 0;
  const cumulative = months.map((x) => (cum += x.projectHours));

  return (
    <section id="roadmap" className="space-y-4">
      <SectionTitle kicker="12 Oct 2026 - 31 Mar 2027" title="The next 6 months, in detail" />

      {/* Summary tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="tile bg-ink p-5 text-ink-foreground"><p className="text-3xl font-bold">{totals.projectHours} h</p><p className="text-sm opacity-90">project & learning time</p></div>
        <div className="tile bg-blue p-5 text-blue-ink"><p className="text-3xl font-bold">~{totals.applications}</p><p className="text-sm opacity-90">tailored applications planned</p></div>
        <div className="tile bg-orange p-5 text-orange-ink"><p className="text-3xl font-bold">4</p><p className="text-sm">portfolio pieces (P0 - P3)</p></div>
        <div className="tile bg-green p-5 text-green-ink"><p className="text-3xl font-bold">6.5 h</p><p className="text-sm">per week, sized to real life</p></div>
      </div>

      {/* Gantt-style viz */}
      <div className="tile overflow-x-auto bg-card p-5 md:p-6" tabIndex={0} aria-label="Project timeline chart">
        <h3 className="text-lg font-bold">Project timeline</h3>
        <div className="mt-4 min-w-[560px]">
          <div className="grid grid-cols-[120px_repeat(6,1fr)] gap-1 text-xs font-bold uppercase text-muted-foreground">
            <span />{months.map((x) => <span key={x.id} className="text-center">{x.label}</span>)}
          </div>
          {[
            { n: "P0 Publish", s: 0, e: 1, c: "yellow" as const, st: "progress" as const },
            { n: "P1 Navaro Casa", s: 1, e: 3, c: "green" as const, st: "planned" as const },
            { n: "P3 Thesis card", s: 2, e: 3, c: "yellow" as const, st: "planned" as const },
            { n: "SQL (Kaggle)", s: 2, e: 4, c: "orange" as const, st: "planned" as const },
            { n: "P2 Valuation", s: 3, e: 5, c: "blue" as const, st: "planned" as const },
            { n: "Interview prep", s: 5, e: 6, c: "green" as const, st: "planned" as const },
            { n: "SAP CO", s: 0, e: 4, c: "blue" as const, st: "progress" as const },
            { n: "Applications", s: 0, e: 6, c: "orange" as const, st: "progress" as const },
          ].map((r) => (
            <div key={r.n} className="mt-2 grid grid-cols-[120px_repeat(6,1fr)] items-center gap-1">
              <span className="text-sm font-medium">{r.n}</span>
              <div className={`h-8 rounded-lg ${solid[r.c]} ${statusClass[r.st]} flex items-center px-2 text-xs font-bold`} style={{ gridColumn: `${r.s + 2} / ${r.e + 2}` }}>
                {r.st === "progress" ? "now" : "planned"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Hours bar chart */}
        <div className="tile bg-card p-5 md:p-6 lg:col-span-7">
          <h3 className="text-lg font-bold">Hours per month <span className="font-medium text-muted-foreground">· Σ = running total</span></h3>
          <div className="relative mt-6 flex h-48 items-end gap-3">
            {months.map((x, i) => (
              <div key={x.id} role="img" aria-label={`${x.label}: ${x.projectHours} hours, ${cumulative[i]} hours total`}
                className={`relative flex h-full flex-1 flex-col items-center justify-end ${statusClass[x.status]}`}>
                <span className="mb-1 text-xs font-bold">{x.projectHours}h</span>
                <span className={`w-full rounded-t-xl ${fill[x.color]} ${active === x.id ? "ring-4 ring-ink" : ""}`} style={{ height: `${(x.projectHours / maxH) * 75}%` }} />
                <span className="mt-2 text-xs font-bold">{x.label}</span>
                <span className="text-xs text-muted-foreground">Σ {cumulative[i]}h</span>
              </div>
            ))}
          </div>
        </div>
        {/* Weekly rhythm */}
        <div className="tile bg-yellow-soft p-5 md:p-6 lg:col-span-5">
          <h3 className="text-lg font-bold">A normal week</h3>
          <div className="mt-4 flex h-4 overflow-hidden rounded-full">
            {[2, 3.5, 0.5, 0.17].map((w, i) => <span key={i} className={fill[weeklyRhythm[i]!.color]} style={{ flex: w }} />)}
          </div>
          <ul className="mt-4 space-y-2">
            {weeklyRhythm.map((w) => (
              <li key={w.label} className="flex items-center justify-between gap-3 rounded-xl bg-card p-3">
                <span className="flex items-center gap-2"><span className={`h-3 w-3 rounded-full ${fill[w.color]}`} />{w.label}</span>
                <span className="font-bold">{w.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Month tabs */}
      <div role="tablist" aria-label="Choose a month" className="flex gap-2 overflow-x-auto pb-1">
        {months.map((x) => (
          <button key={x.id} role="tab" aria-selected={active === x.id} onClick={() => setActive(x.id)}
            className={`min-h-11 shrink-0 rounded-full px-5 font-bold ${active === x.id ? solid[x.color] : "bg-muted"}`}>
            {x.label}{x.status === "progress" ? " · now" : ""}
          </button>
        ))}
      </div>

      {/* Month detail */}
      <div role="tabpanel" className={`tile overflow-hidden ${statusClass[m.status]}`}>
        <div className={`flex flex-wrap items-center justify-between gap-4 p-6 ${solid[m.color]}`}>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest">{m.range}</p>
            <h3 className="mt-1 text-2xl font-bold md:text-3xl">{m.theme}</h3>
          </div>
          <div className="flex items-center gap-3"><StatusChip status={m.status} /><span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-ink-foreground">{m.projectHours} h · {m.applications} apps</span></div>
        </div>
        <div className={`grid gap-4 p-6 ${mine ? "md:grid-cols-3" : "md:grid-cols-2"} ${soft[m.color]}`}>
          <Lane icon="finance" title="Build & learn" items={m.build} />
          <Lane icon="mail" title="Apply & network" items={m.apply} />
          {mine && <Lane icon="calendar" title="Checkpoints (private)" items={m.checkpoint} />}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-6">
          <p className="flex items-center gap-2 font-bold"><Icon name="check" />Done when: <span className="font-medium">{m.deliverable}</span></p>
          <div className="flex flex-wrap items-center gap-2" aria-label="Tools and companies this month">
            {m.tools.map((t) => <span key={t} className="grid h-11 min-w-11 place-items-center rounded-xl bg-muted px-2"><BrandLogo brand={t} size={22} /></span>)}
          </div>
        </div>
      </div>

      {/* All months at a glance */}
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {months.map((x) => (
          <li key={x.id}>
            <button onClick={() => setActive(x.id)} className={`tile tile-hover flex h-full w-full flex-col p-4 text-left ${x.status === "planned" ? soft[x.color] : solid[x.color]} ${statusClass[x.status]}`}>
              <span className="text-xs font-bold uppercase">{x.label}</span>
              <span className="mt-1 font-bold leading-tight">{x.theme}</span>
              <span className="mt-auto flex gap-1 pt-3">{x.tools.slice(0, 3).map((t) => <span key={t} className="grid h-7 w-7 place-items-center rounded-md bg-card"><BrandLogo brand={t} size={16} /></span>)}</span>
            </button>
          </li>
        ))}
      </ol>

      {mine && (
        <div className="grid gap-3 md:grid-cols-3">
          {scenarios.map((s) => (
            <div key={s.name} className={`tile p-5 ${soft[s.color]}`}><span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${solid[s.color]}`}>{s.name}</span><p className="mt-3">{s.what}</p></div>
          ))}
        </div>
      )}
    </section>
  );
}

function Lane({ icon, title, items }: { icon: "finance" | "mail" | "calendar"; title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-card p-5">
      <h4 className="flex items-center gap-2 font-bold"><Icon name={icon} width={20} height={20} />{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((t) => <li key={t} className="flex gap-2"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ink" />{t}</li>)}
      </ul>
    </div>
  );
}
