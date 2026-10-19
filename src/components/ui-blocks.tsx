import { useEffect, type ReactNode } from "react";
import type { Color, Status } from "@/data/profile";
import { Icon } from "./icons";

export const solid: Record<Color, string> = {
  blue: "bg-blue text-blue-ink",
  orange: "bg-orange text-orange-ink",
  green: "bg-green text-green-ink",
  yellow: "bg-yellow text-yellow-ink",
};
export const soft: Record<Color, string> = {
  blue: "bg-blue-soft text-foreground",
  orange: "bg-orange-soft text-foreground",
  green: "bg-green-soft text-foreground",
  yellow: "bg-yellow-soft text-foreground",
};
export const fill: Record<Color, string> = { blue: "bg-blue", orange: "bg-orange", green: "bg-green", yellow: "bg-yellow" };

export const statusClass: Record<Status, string> = { done: "", progress: "status-progress", planned: "status-planned" };

export function StatusChip({ status, when }: { status: Status; when?: string }) {
  const label = status === "done" ? "Done" : status === "progress" ? "In progress" : "Planned";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-ink-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${status === "done" ? "bg-green" : status === "progress" ? "bg-yellow" : "bg-ink-foreground/60"}`} />
      {label}{when ? ` · ${when}` : ""}
    </span>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-ink/15" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="stripes h-full rounded-full bg-ink" style={{ width: `${value}%` }} />
    </div>
  );
}

export function SectionTitle({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{kicker}</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export type ModalItem = {
  title: string; body?: string; embed?: string;
  links?: { label: string; url: string; kind: "link" | "github" | "pdf" | "download" }[];
};

export function Modal({ item, onClose }: { item: ModalItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [item, onClose]);
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 md:items-center md:p-6 animate-in fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-card md:rounded-3xl animate-in slide-in-from-bottom-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 bg-yellow p-5 text-yellow-ink">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <button autoFocus onClick={onClose} className="rounded-full bg-ink p-2 text-ink-foreground" aria-label="Close"><Icon name="close" width={18} height={18} /></button>
        </div>
        <div className="overflow-y-auto p-5">
          {item.body && <p className="text-base leading-relaxed text-muted-foreground">{item.body}</p>}
          {item.embed && (
            <div className="mt-4 overflow-hidden rounded-2xl bg-muted">
              <iframe src={item.embed} title={item.title} className="h-[60vh] w-full" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
            </div>
          )}
          {item.links && item.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {item.links.map((l) => (
                <a key={l.url + l.label} href={l.url} target="_blank" rel="noreferrer" download={l.kind === "download" || undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground tile-hover">
                  <Icon name={l.kind === "pdf" ? "pdf" : l.kind} width={18} height={18} />{l.label}
                </a>
              ))}
            </div>
          )}
          {item.embed && <p className="mt-3 text-xs text-muted-foreground">If the preview stays empty, the site blocks embedding - use the button above to open it.</p>}
        </div>
      </div>
    </div>
  );
}
