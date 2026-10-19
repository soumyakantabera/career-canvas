import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import { BrandLogo } from "@/components/brand-logos";
import { Roadmap } from "@/components/roadmap";
import { Recommender } from "@/components/recommender";
import { Modal, Progress, SectionTitle, StatusChip, fill, soft, solid, statusClass, type ModalItem } from "@/components/ui-blocks";
import { certificates, documents, profile, projects, stats, tracks, type TrackId } from "@/data/profile";
import { SnapshotDeck } from "@/components/snapshot-deck";

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


const nav = [["match", "Match"], ["tracks", "Tracks"], ["projects", "Projects"], ["roadmap", "Roadmap"], ["certs", "Certificates"], ["docs", "Downloads"], ["contact", "Contact"]];
const dock: [string, string, IconName][] = [["match", "Match", "flow"], ["projects", "Projects", "dashboard"], ["roadmap", "Roadmap", "calendar"], ["docs", "Docs", "cv"], ["contact", "Contact", "mail"]];

function Index() {
  const [filter, setFilter] = useState<TrackId | "all">("all");
  const [modal, setModal] = useState<ModalItem | null>(null);

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
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl space-y-14 px-4 py-6 md:space-y-16 md:px-8 md:py-10">
        {/* Hero bento */}
        <section className="grid gap-4 md:grid-cols-12">
          <div className="tile bg-ink p-7 text-ink-foreground md:col-span-7 md:row-span-3 md:p-10">
            <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-green px-3 py-1 text-sm font-bold text-green-ink">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-ink" /> Available now
                </span>
                <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{profile.name}</h1>
                <p className="mt-4 text-lg md:text-xl">{profile.title} · University of Florence 2026</p>
                <p className="mt-2 flex items-center gap-2"><Icon name="pin" width={18} height={18} />{profile.location} · {profile.openTo}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={documents[0]!.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-yellow px-5 py-3 font-bold text-yellow-ink tile-hover"><Icon name="download" />Download CV</a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue px-5 py-3 font-bold text-blue-ink tile-hover"><BrandLogo brand="linkedin" mono />LinkedIn</a>
                  <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-ink-foreground px-5 py-3 font-bold text-ink tile-hover"><Icon name="mail" />Email</a>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 font-bold text-orange-ink tile-hover"><BrandLogo brand="github" mono />GitHub</a>
                </div>
              </div>
              <SnapshotDeck open={setModal} />
            </div>
          </div>
          {tracks.map((t) => (
            <a key={t.id} href="#tracks" onClick={() => setFilter(t.id)} className={`tile tile-hover flex items-center justify-between p-6 md:col-span-5 md:py-5 ${solid[t.color]}`}>
              <div><p className="text-2xl font-bold">{t.title}</p><p className="text-sm font-medium">{t.roles}</p></div>
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
                  <p className="font-medium">{t.roles}</p>
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
                <p className="mt-2 text-sm">{p.summary}</p>
                <div className="mt-auto pt-5">
                  {p.progress !== undefined && <div className="mb-3"><Progress value={p.progress} label={p.title} /></div>}
                  <p className="text-sm font-bold">{p.when} →</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <Roadmap open={setModal} />

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
                <p className="text-sm">{d.sub}</p>
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
            <p className="mt-3 text-lg">{profile.openTo}. English C1, Italian B1.</p>
          </div>
          <div className="grid min-w-0 gap-3">
            <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-3 break-all rounded-2xl bg-yellow p-4 font-bold text-yellow-ink tile-hover"><Icon name="mail" />{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex min-w-0 items-center gap-3 break-all rounded-2xl bg-orange p-4 font-bold text-orange-ink tile-hover"><Icon name="language" />{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-3 break-all rounded-2xl bg-linkedin p-4 font-bold text-linkedin-ink tile-hover"><BrandLogo brand="linkedin" mono />linkedin.com/in/soumyakantabera</a>
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
