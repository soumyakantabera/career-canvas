import { siAccenture, siAnthropic, siCoursera, siGithub, siGlassdoor, siGoogle, siGooglebigquery, siIndeed, siJira, siKaggle, siPandas, siPython, siSap, siSsrn } from "simple-icons";

// Official brand marks. Simple Icons where published; LinkedIn & Microsoft use their official
// public marks (Simple Icons dropped them at the brands' request). Brands without a public SVG
// (CFI, LSEG, Bocconi, AWS) use a neutral wordmark tile instead of an imitation logo.
export type Brand = "github" | "linkedin" | "google" | "sap" | "anthropic" | "coursera" | "microsoft" | "ssrn" | "cfi" | "lseg" | "bocconi" | "aws" | "kaggle" | "python" | "jira" | "accenture" | "indeed" | "glassdoor" | "pandas" | "bigquery" | "kpmg" | "dxc";

const LINKEDIN =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const simple = { github: siGithub, google: siGoogle, sap: siSap, anthropic: siAnthropic, coursera: siCoursera, ssrn: siSsrn, kaggle: siKaggle, python: siPython, jira: siJira, accenture: siAccenture, indeed: siIndeed, glassdoor: siGlassdoor, pandas: siPandas, bigquery: siGooglebigquery } as const;
const words: Partial<Record<Brand, { t: string; c: string }>> = {
  cfi: { t: "CFI", c: "#0B3B6E" },
  lseg: { t: "LSEG", c: "#001EFF" },
  bocconi: { t: "Bocconi", c: "#003A70" },
  aws: { t: "aws", c: "#232F3E" },
  kpmg: { t: "KPMG", c: "#00338D" },
  dxc: { t: "DXC", c: "#5F249F" },
};
export const brandName: Record<Brand, string> = {
  github: "GitHub", linkedin: "LinkedIn", google: "Google", sap: "SAP", anthropic: "Anthropic", coursera: "Coursera",
  microsoft: "Microsoft", ssrn: "SSRN", cfi: "Corporate Finance Institute", lseg: "LSEG", bocconi: "Bocconi University", aws: "Amazon Web Services", kaggle: "Kaggle", python: "Python", jira: "Jira", accenture: "Accenture", indeed: "Indeed", glassdoor: "Glassdoor", pandas: "pandas", bigquery: "BigQuery", kpmg: "KPMG", dxc: "DXC Technology",
};

/** mono = render in currentColor (for use on coloured buttons); otherwise official colours. */
export function BrandLogo({ brand, size = 24, mono = false }: { brand: Brand; size?: number; mono?: boolean }) {
  const label = `${brandName[brand]} logo`;
  if (brand === "linkedin")
    return <svg role="img" aria-label={label} viewBox="0 0 24 24" width={size} height={size}><path d={LINKEDIN} fill={mono ? "currentColor" : "#0A66C2"} /></svg>;
  if (brand === "microsoft")
    return (
      <svg role="img" aria-label={label} viewBox="0 0 23 23" width={size} height={size}>
        <path fill={mono ? "currentColor" : "#F25022"} d="M1 1h10v10H1z" /><path fill={mono ? "currentColor" : "#7FBA00"} d="M12 1h10v10H12z" />
        <path fill={mono ? "currentColor" : "#00A4EF"} d="M1 12h10v10H1z" /><path fill={mono ? "currentColor" : "#FFB900"} d="M12 12h10v10H12z" />
      </svg>
    );
  const s = simple[brand as keyof typeof simple];
  if (s) return <svg role="img" aria-label={label} viewBox="0 0 24 24" width={size} height={size}><path d={s.path} fill={mono ? "currentColor" : `#${s.hex}`} /></svg>;
  const w = words[brand]!;
  return (
    <svg role="img" aria-label={label} viewBox="0 0 48 24" height={size} width={size * 2}>
      <text x="24" y="17" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize={w.t.length > 4 ? 11 : 15} fill={mono ? "currentColor" : w.c}>{w.t}</text>
      {brand === "aws" && <path d="M12 20q12 5 24 0" stroke={mono ? "currentColor" : "#FF9900"} strokeWidth="2" fill="none" strokeLinecap="round" />}
    </svg>
  );
}
