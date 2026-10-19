import { certificates, documents, projects, tracks } from "@/data/profile";
import { months } from "@/data/plan";

// One flat list of everything a visitor can be pointed to. Shared by the AI prompt and the UI.
export type CatalogItem = { id: string; kind: "project" | "track" | "certificate" | "document" | "month"; title: string; text: string; url?: string | undefined };

export function getCatalog(): CatalogItem[] {
  return [
    ...projects.map((p) => ({ id: `project:${p.id}`, kind: "project" as const, title: p.title, text: `${p.summary} ${p.detail} Status: ${p.status}, ${p.when}.`, url: p.links?.[0]?.url })),
    ...tracks.map((t) => ({ id: `track:${t.id}`, kind: "track" as const, title: `${t.title} track (${t.roles})`, text: `${t.pitch} Skills: ${t.skills.map((s) => `${s.name} (${s.status})`).join(", ")}.`, url: t.cv[0]?.url })),
    ...certificates.map((c, i) => ({ id: `cert:${i}`, kind: "certificate" as const, title: c.name, text: `${c.issuer}. Status: ${c.status}.` })),
    ...documents.map((d, i) => ({ id: `doc:${i}`, kind: "document" as const, title: d.title, text: `${d.sub} (${d.ext})`, url: d.url })),
    ...months.map((m) => ({ id: `month:${m.id}`, kind: "month" as const, title: `${m.range}: ${m.theme}`, text: `${m.build.join("; ")}. Deliverable: ${m.deliverable}.` })),
  ];
}
