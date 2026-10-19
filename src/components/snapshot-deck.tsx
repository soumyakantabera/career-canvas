import { useEffect, useState } from "react";
import photo from "@/assets/photo.png.asset.json";
import cvIt from "@/assets/cv-it-preview.png.asset.json";
import cvEn from "@/assets/cv-preview.png.asset.json";
import { documents } from "@/data/profile";
import type { ModalItem } from "@/components/ui-blocks";

const slides = [
  { src: photo.url, alt: "Photo of Soumyakanta Bera", label: "Me", doc: null },
  { src: cvIt.url, alt: "Italian CV - front page", label: "CV · IT", doc: 5 },
  { src: cvEn.url, alt: "English CV - front page", label: "CV · EN", doc: 4 },
] as const;

export function SnapshotDeck({ open }: { open: (m: ModalItem) => void }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seq, setSeq] = useState(0); // bumping this restarts the countdown
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, [paused, seq]);

  const onTop = () => {
    const s = slides[i]!;
    if (s.doc === null) { setI(1); return; }
    const d = documents[s.doc]!;
    open({ title: d.title, embed: d.url, links: [{ label: "Download", url: d.url, kind: "download" }] });
  };

  return (
    <div className="flex flex-col items-center justify-self-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <button onClick={onTop} aria-label={slides[i]!.doc === null ? "Show my CV" : `Preview ${slides[i]!.label}`} className="relative block h-60 w-44 sm:w-40 md:h-64 md:w-48">
        {slides.map((s, k) => {
          const pos = (k - i + slides.length) % slides.length; // 0 = top
          const style = [
            "z-30 rotate-2 translate-x-0 translate-y-0",
            "z-20 -rotate-3 -translate-x-3 translate-y-2 saturate-50",
            "z-10 rotate-6 translate-x-3 translate-y-4 saturate-50",
          ][pos];
          return (
            <img key={s.label} src={s.src} alt={pos === 0 ? s.alt : ""} aria-hidden={pos !== 0}
              loading="eager"
              className={`absolute inset-0 h-full w-full rounded-xl bg-card object-cover object-top shadow-2xl transition-all duration-500 ${style}`} />
          );
        })}
      </button>
      <div className="mt-4 flex items-center gap-1" role="tablist" aria-label="Snapshots">
        {slides.map((s, k) => (
          <button key={s.label} role="tab" aria-selected={k === i} onClick={() => { setI(k); setPaused(true); }}
            className={`min-h-11 rounded-full px-3 text-xs font-bold uppercase tracking-wide ${k === i ? "bg-ink-foreground text-ink" : "opacity-90"}`}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
