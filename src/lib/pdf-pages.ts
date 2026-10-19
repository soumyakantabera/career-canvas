// PDFs in public/files are pre-rendered to JPG pages in public/files/pages/<name>-<n>.jpg
// (pdftoppm), because iframe PDF embeds fail on GitHub Pages and most phones.
// Keep page counts in sync when a PDF is replaced.
const pageCounts: Record<string, number> = {
  "Bera_Soumyakanta_CV_EN": 1,
  "Bera_Soumyakanta_CV_IT": 1,
  "Scheda_progetto_Navaro_Casa_IT": 1,
  "Soumyakanta_Bera_CV_AnalistaDati-BusinessAnalyst_IT_v5": 1,
  "Soumyakanta_Bera_CV_AnalistaFinanziario-FPA-CreditoRischio_IT_v5": 1,
  "Soumyakanta_Bera_CV_DataAnalyst-BusinessAnalyst_EN_v5": 1,
  "Soumyakanta_Bera_CV_FinancialAnalyst-FPA-CreditRisk_EN_v5": 1,
};

/** Returns page image URLs for a local PDF, or null for anything else (falls back to iframe). */
export function pdfPages(url: string): string[] | null {
  const m = url.match(/^(.*\/files\/)([^/]+)\.pdf$/i);
  if (!m) return null;
  const n = pageCounts[decodeURIComponent(m[2]!)];
  if (!n) return null;
  return Array.from({ length: n }, (_, i) => `${m[1]}pages/${m[2]}-${i + 1}.jpg`);
}
