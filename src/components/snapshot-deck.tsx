import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import photo from "@/assets/photo.png.asset.json";
import cvIt from "@/assets/cv-it-preview.png.asset.json";
import cvEn from "@/assets/cv-preview.png.asset.json";
import { documents } from "@/data/profile";
import type { ModalItem } from "@/components/ui-blocks";

const slides: { src: string; alt: string; label: string; doc: number | null; icon: IconName }[] = [
  { src: photo.url, alt: "Photo of Soumyakanta Bera", label: "Me", doc: null, icon: "user" },
  { src: cvIt.url, alt: "Italian CV - front page", label: "CV · IT", doc: 5, icon: "language" },
  { src: cvEn.url, alt: "English CV - front page", label: "CV · EN", doc: 4, icon: "cv" },
];

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
    if (s.doc === null) { setI(1); setSeq((v) => v + 1); return; }
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
          <button key={s.label} role="tab" aria-selected={k === i} aria-label={s.alt} title={s.alt} onClick={() => { setI(k); setSeq((v) => v + 1); }}
            className={`grid min-h-11 min-w-11 place-items-center rounded-full ${k === i ? "bg-ink-foreground text-ink" : "bg-ink-foreground/20 text-ink-foreground"}`}>
            <Icon name={s.icon} width={20} height={20} />
          </button>
        ))}
      </div>
    </div>
  );
}
