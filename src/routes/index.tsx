import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import { BrandLogo } from "@/components/brand-logos";
import { Roadmap } from "@/components/roadmap";
import { Recommender } from "@/components/recommender";
import { Modal, Progress, SectionTitle, StatusChip, fill, soft, solid, statusClass, type ModalItem } from "@/components/ui-blocks";
import { certificates, defaultActions, documents, privateNotes, profile, projects, stats, tracks, type TrackId } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soumyakanta Bera - Finance, Data & BA Analyst | Milan" },
      { name: "description", content: "Career dashboard and portfolio of Soumyakanta Bera: FP&A, Data/BI and Business Analyst projects, CVs and 6-month roadmap." },
      { property: "og:title", content: "Soumyakanta Bera - Finance, Data & BA Analyst" },
      { property: "og:description", content: "Projects, thesis, certificates, CVs and a live 6-month roadmap." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Extra = { id: string; title: string; url: string };
function useLocal<T>(key: string, init: T) {
  const [v, setV] = useState<T>(init);
  useEffect(() => { try { const s = localStorage.getItem(key); if (s) setV(JSON.parse(s)); } catch {} }, [key]);
  const set = (n: T) => { setV(n); localStorage.setItem(key, JSON.stringify(n)); };
  return [v, set] as const;
}

const nav = [["match", "Match"], ["tracks", "Tracks"], ["projects", "Projects"], ["roadmap", "Roadmap"], ["certs", "Certificates"], ["docs", "Downloads"], ["contact", "Contact"]];
const dock: [string, string, IconName][] = [["match", "Match", "flow"], ["projects", "Projects", "dashboard"], ["roadmap", "Roadmap", "calendar"], ["docs", "Docs", "cv"], ["contact", "Contact", "mail"]];

function Index() {
  const [mine, setMine] = useLocal("sb-mymode", false);
  const [filter, setFilter] = useState<TrackId | "all">("all");
  const [modal, setModal] = useState<ModalItem | null>(null);
  const [done, setDone] = useLocal<string[]>("sb-actions", []);
  const [pipe, setPipe] = useLocal("sb-pipe", { applied: 0, interview: 0, offer: 0 });
  const [hours, setHours] = useLocal("sb-hours", 0);
  const [extras, setExtras] = useLocal<Extra[]>("sb-extras", []);
  const [late, setLate] = useState(false);
  useEffect(() => { const h = new Date().getHours(); setLate(h >= 23 || h < 5); }, []);

  const shownProjects = projects.filter((p) => filter === "all" || p.track.includes(filter));

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-2 font-bold">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue text-blue-ink">SB</span>
            <span className="hidden sm:inline">Soumyakanta Bera</span>
          </a>
          <nav className="hidden gap-1 lg:flex">
            {nav.map(([id, l]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium hover:bg-yellow-soft">{l}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-ink-foreground tile-hover">
              <BrandLogo brand="github" mono /><span className="hidden sm:inline">GitHub</span>
            </a>
            <button onClick={() => setMine(!mine)} aria-pressed={mine}
              className={`inline-flex items-center gap-2 rounded-full min-h-11 px-4 py-2 text-sm font-bold ${mine ? "bg-ink text-ink-foreground" : "bg-yellow text-yellow-ink"}`}>
              <Icon name="eye" width={18} height={18} />{mine ? "My mode" : "Showcase"}
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl space-y-20 px-4 py-6 md:px-8 md:py-10">
        {/* Hero bento */}
        <section className="grid gap-4 md:grid-cols-12">
          <div className="tile bg-ink p-7 text-ink-foreground md:col-span-7 md:row-span-3 md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-green px-3 py-1 text-sm font-bold text-green-ink">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-ink" /> Available now
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{profile.name}</h1>
            <p className="mt-4 text-lg opacity-90 md:text-xl">{profile.title} · University of Florence 2026</p>
            <p className="mt-2 flex items-center gap-2 opacity-90"><Icon name="pin" width={18} height={18} />{profile.location} · {profile.openTo}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={documents[0]!.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-yellow px-5 py-3 font-bold text-yellow-ink tile-hover"><Icon name="download" />Download CV</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue px-5 py-3 font-bold text-blue-ink tile-hover"><BrandLogo brand="linkedin" mono />LinkedIn</a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-ink-foreground px-5 py-3 font-bold text-ink tile-hover"><Icon name="mail" />Email</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 font-bold text-orange-ink tile-hover"><BrandLogo brand="github" mono />GitHub</a>

            </div>
          </div>
          {tracks.map((t) => (
            <a key={t.id} href="#tracks" onClick={() => setFilter(t.id)} className={`tile tile-hover flex items-center justify-between p-6 md:col-span-5 md:py-5 ${solid[t.color]}`}>
              <div><p className="text-2xl font-bold">{t.title}</p><p className="text-sm font-medium opacity-90">{t.roles}</p></div>
              <Icon name={t.icon} width={44} height={44} />
            </a>
          ))}
        </section>

        {/* Snapshot */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={`tile p-5 md:p-6 ${soft[s.color]}`}>
              <div className={`mb-4 h-2 w-10 rounded-full ${fill[s.color]}`} />
              <p className="text-2xl font-bold md:text-3xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>

        {/* My mode dashboard */}
        {mine && (
          <section className="space-y-4">
            <SectionTitle kicker="Only visible in My mode" title="This week" />
            {late && (
              <div className="tile flex items-center gap-4 bg-blue p-5 text-blue-ink">
                <Icon name="moon" width={32} height={32} /><p className="font-medium">It's late. Close the laptop and sleep - the applications will still be here tomorrow.</p>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-12">
              <div className="tile bg-card p-6 md:col-span-7">
                <h3 className="text-lg font-bold">Next actions <span className="text-muted-foreground">· {done.length}/{defaultActions.length}</span></h3>
                <ul className="mt-4 space-y-2">
                  {defaultActions.map((a) => {
                    const on = done.includes(a);
                    return (
                      <li key={a}>
                        <button onClick={() => setDone(on ? done.filter((x) => x !== a) : [...done, a])}
                          className={`flex w-full items-center gap-3 rounded-xl p-3 text-left ${on ? "bg-green-soft" : "bg-muted"}`}>
                          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${on ? "bg-green text-green-ink" : "bg-card"}`}>{on && <Icon name="check" width={16} height={16} />}</span>
                          <span className={on ? "line-through opacity-70" : ""}>{a}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="space-y-4 md:col-span-5">
                <div className="tile bg-card p-6">
                  <h3 className="text-lg font-bold">Application pipeline</h3>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {(["applied", "interview", "offer"] as const).map((k, i) => (
                      <div key={k} className={`rounded-2xl p-2 text-center ${solid[(["blue", "orange", "green"] as const)[i]!]}`}>
                        <p className="text-3xl font-bold">{pipe[k]}</p>
                        <p className="text-xs font-bold uppercase">{k}</p>
                        <div className="mt-2 flex justify-center gap-1">
                          <button aria-label={`Decrease ${k}`} onClick={() => setPipe({ ...pipe, [k]: Math.max(0, pipe[k] - 1) })} className="h-11 w-11 rounded-full bg-ink/20 text-lg font-bold">-</button>
                          <button aria-label={`Increase ${k}`} onClick={() => setPipe({ ...pipe, [k]: pipe[k] + 1 })} className="h-11 w-11 rounded-full bg-ink/20 text-lg font-bold">+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="tile bg-yellow-soft p-6">
                  <div className="flex items-center justify-between"><h3 className="text-lg font-bold">Hours this week</h3><span className="font-bold">{hours} / 10 h</span></div>
                  <div className="mt-3"><Progress value={Math.min(100, hours * 10)} label="Weekly hours" /></div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setHours(hours + 1)} className="rounded-full bg-ink min-h-11 px-4 py-2 text-sm font-bold text-ink-foreground">+1 h</button>
                    <button onClick={() => setHours(0)} className="rounded-full bg-card min-h-11 px-4 py-2 text-sm font-bold">Reset week</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-12">
              <div className="tile grid gap-3 bg-card p-6 sm:grid-cols-2 md:col-span-7">
                {privateNotes.map((n) => (
                  <div key={n.label} className="rounded-xl bg-muted p-3"><p className="text-xs font-bold uppercase text-muted-foreground">{n.label}</p><p className="mt-1 text-sm">{n.value}</p></div>
                ))}
              </div>
              <AddLink extras={extras} setExtras={setExtras} open={(e) => setModal({ title: e.title, embed: e.url, links: [{ label: "Open link", url: e.url, kind: "link" }] })} />
            </div>
          </section>
        )}

        <Recommender open={setModal} />

        {/* Tracks */}
        <section id="tracks">
          <SectionTitle kicker="Three directions" title="Career tracks I'm building" />
          <div className="grid gap-4 lg:grid-cols-3">
            {tracks.map((t) => (
              <article key={t.id} className={`tile flex flex-col overflow-hidden ${filter !== "all" && filter !== t.id ? "saturate-50" : ""}`}>
                <div className={`p-6 ${solid[t.color]}`}>
                  <div className="flex items-center justify-between"><Icon name={t.icon} width={40} height={40} /><span className="text-sm font-bold">{t.focus}% focus</span></div>
                  <h3 className="mt-4 text-2xl font-bold">{t.title}</h3>
                  <p className="font-medium opacity-90">{t.roles}</p>
                </div>
                <div className="flex flex-1 flex-col bg-card p-6">
                  <p className="text-muted-foreground">{t.pitch}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {t.skills.map((s) => (
                      <li key={s.name} className={`rounded-full px-3 py-1.5 text-sm font-medium ${s.status === "done" ? solid[t.color] : soft[t.color]} ${statusClass[s.status]}`} title={s.status}>
                        {s.status !== "done" && <span className="mr-1 text-xs font-bold uppercase">{s.status === "progress" ? "• now" : "○ next"}</span>}{s.name}
                      </li>
                    ))}
                  </ul>
                  {mine && (<><p className="mt-4 text-xs font-bold uppercase text-muted-foreground">Gaps (private)</p>
                  <p className="text-sm text-muted-foreground">{t.gaps.join(" · ")}</p></>)}
                  <div className="mt-auto flex gap-2 pt-5">
                    {t.cv.map((c) => <button key={c.label} onClick={() => setModal({ title: `${t.title} - ${c.label}`, embed: c.url, links: [{ label: "Download PDF", url: c.url, kind: "download" }] })} className="inline-flex items-center gap-2 rounded-full bg-ink min-h-11 px-4 py-2 text-sm font-bold text-ink-foreground tile-hover"><Icon name="cv" width={18} height={18} />{c.label}</button>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <SectionTitle kicker="Proof of work" title="Projects">
            <div className="flex flex-wrap gap-2">
              {([["all", "All"], ["finance", "Finance"], ["data", "Data / BI"], ["ba", "BA"]] as const).map(([id, l]) => (
                <button key={id} onClick={() => setFilter(id)} aria-pressed={filter === id} className={`rounded-full min-h-11 px-4 py-2 text-sm font-bold ${filter === id ? "bg-ink text-ink-foreground" : "bg-muted"}`}>{l}</button>
              ))}
            </div>
          </SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shownProjects.map((p) => (
              <button key={p.id} onClick={() => setModal({ title: p.title, body: p.detail, embed: p.embed, links: p.links })}
                className={`tile tile-hover flex flex-col p-6 text-left ${p.status === "done" ? solid[p.color] : soft[p.color]} ${statusClass[p.status]}`}>
                <div className="flex items-start justify-between gap-3"><Icon name={p.icon} width={40} height={40} /><StatusChip status={p.status} /></div>
                <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm opacity-90">{p.summary}</p>
                <div className="mt-auto pt-5">
                  {p.progress !== undefined && <div className="mb-3"><Progress value={p.progress} label={p.title} /></div>}
                  <p className="text-sm font-bold">{p.when} →</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <Roadmap mine={mine} open={setModal} />

        {/* Certificates */}
        <section id="certs">
          <SectionTitle kicker="Learning" title="Certificates" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {certificates.map((c) => (
              <div key={c.name} className={`tile p-5 ${c.status === "done" ? soft[c.color] : soft[c.color] + " " + statusClass[c.status]}`}>
                <span className="inline-flex h-12 items-center gap-2 rounded-xl bg-card px-3">{c.brands.map((b) => <BrandLogo key={b} brand={b} size={26} />)}</span>
                <p className="mt-3 font-bold leading-tight">{c.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                {c.status !== "done" && <div className="mt-2"><StatusChip status={c.status} /></div>}
              </div>
            ))}
          </div>
        </section>

        {/* Docs */}
        <section id="docs">
          <SectionTitle kicker="Preview or download" title="CVs & documents" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {documents.map((d) => (
              <div key={d.url} className={`tile flex flex-col p-5 ${solid[d.color]}`}>
                <div className="flex items-center justify-between"><Icon name={d.icon} width={32} height={32} /><span className="rounded-full bg-ink px-2 py-0.5 text-xs font-bold text-ink-foreground">{d.ext}</span></div>
                <p className="mt-4 text-lg font-bold">{d.title}</p>
                <p className="text-sm opacity-90">{d.sub}</p>
                <div className="mt-4 flex gap-2">
                  {d.ext === "PDF" && <button onClick={() => setModal({ title: d.title, embed: d.url, links: [{ label: "Download", url: d.url, kind: "download" }] })} className="min-h-11 rounded-full bg-ink px-4 text-sm font-bold text-ink-foreground">Preview</button>}
                  <a href={d.url} download target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 min-h-11 rounded-full bg-ink/15 px-4 text-sm font-bold"><Icon name="download" width={16} height={16} />Download</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="tile grid grid-cols-1 gap-6 bg-blue p-6 md:p-8 text-blue-ink md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">Let's talk.</h2>
            <p className="mt-3 text-lg opacity-90">{profile.openTo}. English C1, Italian B1.</p>
          </div>
          <div className="grid min-w-0 gap-3">
            <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-3 break-all rounded-2xl bg-yellow p-4 font-bold text-yellow-ink tile-hover"><Icon name="mail" />{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex min-w-0 items-center gap-3 break-all rounded-2xl bg-orange p-4 font-bold text-orange-ink tile-hover"><Icon name="language" />{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-3 break-all rounded-2xl bg-green p-4 font-bold text-green-ink tile-hover"><BrandLogo brand="linkedin" mono />linkedin.com/in/soumyakantabera</a>
            {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-3 break-all rounded-2xl bg-ink p-4 font-bold text-ink-foreground tile-hover"><BrandLogo brand="github" mono />GitHub</a>}
          </div>
        </section>
        <p className="pb-6 text-center text-sm text-muted-foreground">© 2026 Soumyakanta Bera · Milan</p>
      </main>

      {/* Mobile / tablet bottom dock */}
      <nav aria-label="Sections" className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-md items-center gap-1 rounded-full bg-ink p-2 shadow-xl lg:hidden">
        {dock.map(([id, l, icon]) => (
          <a key={id} href={`#${id}`} aria-label={l}
            className="flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-1 rounded-full px-1 py-1.5 text-ink-foreground transition-colors hover:bg-ink-foreground/15">
            <Icon name={icon} width={20} height={20} />
            <span className="text-[10px] font-bold leading-none">{l}</span>
          </a>
        ))}
      </nav>

      <Modal item={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function AddLink({ extras, setExtras, open }: { extras: Extra[]; setExtras: (e: Extra[]) => void; open: (e: Extra) => void }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  return (
    <div className="tile bg-orange-soft p-6 md:col-span-5">
      <h3 className="text-lg font-bold">Add link or embed</h3>
      <form className="mt-3 space-y-2" onSubmit={(e) => {
        e.preventDefault();
        if (!/^https?:\/\//.test(url)) return;
        setExtras([...extras, { id: String(Date.now()), title: title || url, url }]); setTitle(""); setUrl("");
      }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (e.g. GitHub repo)" className="w-full rounded-xl bg-card px-4 py-3" aria-label="Title" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="w-full rounded-xl bg-card px-4 py-3" aria-label="URL" required />
        <button className="inline-flex items-center gap-2 rounded-full bg-ink min-h-11 px-4 py-2 text-sm font-bold text-ink-foreground"><Icon name="plus" width={16} height={16} />Add</button>
      </form>
      <ul className="mt-4 space-y-2">
        {extras.map((e) => (
          <li key={e.id} className="flex items-center gap-2 rounded-xl bg-card p-2 pl-3">
            <button onClick={() => open(e)} className="min-h-11 flex-1 truncate text-left font-medium">{e.title}</button>
            <button onClick={() => setExtras(extras.filter((x) => x.id !== e.id))} aria-label="Remove" className="grid min-h-11 min-w-11 place-items-center rounded-full hover:bg-muted"><Icon name="close" width={16} height={16} /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
