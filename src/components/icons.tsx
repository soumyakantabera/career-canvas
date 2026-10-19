import type { SVGProps } from "react";

// Custom icon set: 2px rounded stroke + one solid accent fill (currentColor at 30%).
type P = SVGProps<SVGSVGElement>;
const Base = ({ children, ...p }: P) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    {children}
  </svg>
);
const F = { fill: "currentColor", fillOpacity: 0.3, stroke: "none" } as const;

export const Icons = {
  finance: (p: P) => (<Base {...p}><rect x="3" y="13" width="4" height="8" rx="1" {...F} /><path d="M3 21h18M5 13v8M11 9v12M17 5v16M3 9l6-5 5 4 7-5" /></Base>),
  ledger: (p: P) => (<Base {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><rect x="7" y="6" width="10" height="4" rx="1" {...F} /><path d="M7 14h10M7 17h6" /></Base>),
  shield: (p: P) => (<Base {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M12 7l5 2v3c0 3-2 5-5 6z" {...F} /><path d="M9 12l2 2 4-4" /></Base>),
  database: (p: P) => (<Base {...p}><ellipse cx="12" cy="5" rx="8" ry="3" {...F} /><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></Base>),
  dashboard: (p: P) => (<Base {...p}><rect x="3" y="3" width="8" height="10" rx="2" {...F} /><rect x="3" y="3" width="8" height="10" rx="2" /><rect x="13" y="3" width="8" height="6" rx="2" /><rect x="13" y="11" width="8" height="10" rx="2" /><rect x="3" y="15" width="8" height="6" rx="2" /></Base>),
  flow: (p: P) => (<Base {...p}><rect x="2" y="3" width="7" height="6" rx="2" {...F} /><rect x="2" y="3" width="7" height="6" rx="2" /><rect x="15" y="3" width="7" height="6" rx="2" /><rect x="8.5" y="15" width="7" height="6" rx="2" /><path d="M9 6h6M18.5 9v3H12v3" /></Base>),
  book: (p: P) => (<Base {...p}><path d="M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4z" {...F} /><path d="M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-6a2 2 0 00-2 2v14a2 2 0 012-2h6z" /></Base>),
  badge: (p: P) => (<Base {...p}><circle cx="12" cy="9" r="6" {...F} /><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8M10 9l1.5 1.5L14.5 7.5" /></Base>),
  gear: (p: P) => (<Base {...p}><circle cx="12" cy="12" r="3" {...F} /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1" /></Base>),
  language: (p: P) => (<Base {...p}><path d="M3 5a2 2 0 012-2h9a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 3v-3a2 2 0 01-2-2z" {...F} /><path d="M3 5a2 2 0 012-2h9a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 3v-3a2 2 0 01-2-2zM18 9h1a2 2 0 012 2v6a2 2 0 01-2 2v2l-3-2h-4a2 2 0 01-2-2" /></Base>),
  passport: (p: P) => (<Base {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="10" r="3.5" {...F} /><circle cx="12" cy="10" r="3.5" /><path d="M9 17h6" /></Base>),
  cv: (p: P) => (<Base {...p}><path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" /><circle cx="10" cy="10" r="2.5" {...F} /><path d="M15 2v5h5M7.5 16h9M7.5 19h6" /></Base>),
  pdf: (p: P) => (<Base {...p}><path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" /><rect x="6" y="12" width="12" height="6" rx="1" {...F} /><path d="M15 2v5h5" /></Base>),
  github: (p: P) => (<Base {...p}><path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 00-6 0C6.8 3.8 5.8 4.1 5.8 4.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.4 10.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" /></Base>),
  link: (p: P) => (<Base {...p}><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" /><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" /></Base>),
  download: (p: P) => (<Base {...p}><path d="M12 3v12M7 10l5 5 5-5" /><rect x="3" y="17" width="18" height="4" rx="1.5" {...F} /><path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" /></Base>),
  calendar: (p: P) => (<Base {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><rect x="3" y="4" width="18" height="5" rx="2" {...F} /><path d="M8 2v4M16 2v4M8 14h2M14 14h2M8 18h2" /></Base>),
  moon: (p: P) => (<Base {...p}><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z" {...F} /><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z" /></Base>),
  mail: (p: P) => (<Base {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" {...F} /><path d="M2 6l10 7 10-7" /></Base>),
  linkedin: (p: P) => (<Base {...p}><rect x="2" y="2" width="20" height="20" rx="4" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 10v7" /></Base>),
  pin: (p: P) => (<Base {...p}><path d="M12 22s7-6 7-12a7 7 0 00-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" {...F} /></Base>),
  plus: (p: P) => (<Base {...p}><path d="M12 5v14M5 12h14" /></Base>),
  close: (p: P) => (<Base {...p}><path d="M6 6l12 12M18 6L6 18" /></Base>),
  eye: (p: P) => (<Base {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" {...F} /></Base>),
  check: (p: P) => (<Base {...p}><path d="M5 12l5 5 9-10" /></Base>),
};
export type IconName = keyof typeof Icons;
export function Icon({ name, ...p }: { name: IconName } & P) {
  const C = Icons[name];
  return <C {...p} />;
}
