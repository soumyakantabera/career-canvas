import type { IconName } from "@/components/icons";
import type { Brand } from "@/components/brand-logos";
import cvFinEN from "@/assets/docs/Soumyakanta_Bera_CV_FinancialAnalyst-FPA-CreditRisk_EN_v5.pdf.asset.json";
import cvFinIT from "@/assets/docs/Soumyakanta_Bera_CV_AnalistaFinanziario-FPA-CreditoRischio_IT_v5.pdf.asset.json";
import cvDataEN from "@/assets/docs/Soumyakanta_Bera_CV_DataAnalyst-BusinessAnalyst_EN_v5.pdf.asset.json";
import cvDataIT from "@/assets/docs/Soumyakanta_Bera_CV_AnalistaDati-BusinessAnalyst_IT_v5.pdf.asset.json";
import cvGenEN from "@/assets/docs/Bera_Soumyakanta_CV_EN.pdf.asset.json";
import cvGenIT from "@/assets/docs/Bera_Soumyakanta_CV_IT.pdf.asset.json";
import cvGenDocx from "@/assets/docs/Bera_Soumyakanta_CV_EN.docx.asset.json";
import navaro from "@/assets/docs/Scheda_progetto_Navaro_Casa_IT.pdf.asset.json";

export type Status = "done" | "progress" | "planned";
export type Color = "blue" | "orange" | "green" | "yellow";
export type TrackId = "finance" | "data" | "ba";

export const profile = {
  name: "Soumyakanta Bera",
  title: "MSc Finance & Risk Management",
  location: "Milan, Italy",
  email: "bera.soumyakanta@yahoo.com",
  phone: "+39 347 924 9860",
  linkedin: "https://linkedin.com/in/soumyakantabera",
  github: "https://github.com/soumyakantabera", // add your GitHub URL here to show the GitHub button
  openTo: "Junior roles in Milan, Turin, Bologna or remote",
};

export const stats = [
  { value: "3,055", label: "firm-years analysed in my thesis", color: "blue" as Color },
  { value: "4h → 30m", label: "budget-vs-actual pack prep time", color: "orange" as Color },
  { value: "3h → 20m", label: "ETL data prep with Power BI", color: "green" as Color },
  { value: "C1 · B1", label: "English · Italian (CLA certified)", color: "yellow" as Color },
];

export type Skill = { name: string; status: Status };
export type Track = {
  id: TrackId; title: string; roles: string; focus: number; color: Color; icon: IconName;
  pitch: string; skills: Skill[]; gaps: string[]; cv: { label: string; url: string }[];
};

export const tracks: Track[] = [
  {
    id: "finance", title: "Finance", roles: "FP&A · Controller · Credit", focus: 60, color: "blue", icon: "finance",
    pitch: "Budgeting, variance analysis, DCF and comps, credit early-warning signals.",
    skills: [
      { name: "Financial modelling (DCF, comps)", status: "done" },
      { name: "Budget vs actual / variance", status: "done" },
      { name: "KPI packs & P&L review", status: "done" },
      { name: "Due-diligence packs", status: "done" },
      { name: "Credit distress signals", status: "done" },
      { name: "SAP S/4HANA Management Accounting (SAP CO)", status: "progress" },
      { name: "Live valuation model (P2)", status: "planned" },
    ],
    gaps: ["SAP in practice", "ERP / Oracle"],
    cv: [{ label: "CV EN", url: cvFinEN.url }, { label: "CV IT", url: cvFinIT.url }],
  },
  {
    id: "data", title: "Data / BI", roles: "Data Analyst · BI Analyst", focus: 25, color: "orange", icon: "dashboard",
    pitch: "Python + Excel + Power BI pipelines that turn messy sources into decisions.",
    skills: [
      { name: "Power BI (certified)", status: "done" },
      { name: "Python (pandas, panel stats)", status: "done" },
      { name: "Automated ETL, 3 sources", status: "done" },
      { name: "Excel advanced", status: "done" },
      { name: "SQL check layer (P2)", status: "planned" },
      { name: "Navaro Casa KPI pipeline (P1)", status: "progress" },
    ],
    gaps: ["Qlik", "SAS / R", "Big data"],
    cv: [{ label: "CV EN", url: cvDataEN.url }, { label: "CV IT", url: cvDataIT.url }],
  },
  {
    id: "ba", title: "Business Analyst", roles: "Business / Process Analyst", focus: 10, color: "green", icon: "flow",
    pitch: "Requirements, as-is / to-be maps, user stories and UAT for finance processes.",
    skills: [
      { name: "Requirements & user stories", status: "progress" },
      { name: "As-is / to-be process maps", status: "progress" },
      { name: "UAT (10/10 scripted)", status: "progress" },
      { name: "Stakeholder reporting", status: "done" },
      { name: "Jira board", status: "planned" },
    ],
    gaps: ["Workshops in Italian"],
    cv: [{ label: "CV EN", url: cvDataEN.url }, { label: "CV IT", url: cvDataIT.url }],
  },
];

export type Project = {
  id: string; title: string; summary: string; detail: string; track: TrackId[]; status: Status;
  when: string; icon: IconName; color: Color; progress?: number;
  links?: { label: string; url: string; kind: "link" | "github" | "pdf" | "download" }[];
  embed?: string;
};

export const projects: Project[] = [
  {
    id: "thesis", title: "Inventory Buildup as an Early-Warning Signal", status: "done", when: "Published · SSRN",
    summary: "279 listed firms, 14 countries, 13 sectors. Power BI Stress Score dashboard.",
    detail: "MSc thesis using Python, Excel and FactSet on 3,055 firm-years. Panel statistics show 17.1% vs 12.6% margin-distress incidence for firms with abnormal inventory buildup.",
    track: ["finance", "data"], icon: "book", color: "blue",
    links: [{ label: "Read on SSRN", url: "https://doi.org/10.2139/ssrn.7082778", kind: "link" }],
  },
  {
    id: "bva", title: "Budget-vs-Actual Pack", status: "done", when: "Independent project",
    summary: "12 KPIs. Prep time cut from about 4 hours to 30 minutes.",
    detail: "A repeatable monthly variance pack in Excel with KPI summaries and commentary blocks ready for management review.",
    track: ["finance"], icon: "ledger", color: "yellow",
  },
  {
    id: "etl", title: "Automated ETL + Power BI KPIs", status: "done", when: "Independent project",
    summary: "3 sources, 10 metrics. Data prep from about 3 hours to under 20 minutes.",
    detail: "Python/Power Query pipeline merging three sources into a clean model, feeding a Power BI dashboard with 10 KPIs.",
    track: ["data"], icon: "database", color: "orange",
  },
  {
    id: "p1", title: "P1 · Navaro Casa FP&A + ETL", status: "progress", when: "Nov - mid Dec 2026", progress: 35,
    summary: "ETL, KPIs, Excel FP&A pack, close checklist and a full BA trail.",
    detail: "Starter built and tested (61/61 audit, UAT 10/10). My remaining part is about 19 hours in November.",
    track: ["finance", "data", "ba"], icon: "flow", color: "green",
    links: [{ label: "Project sheet (IT)", url: navaro.url, kind: "pdf" }],
    embed: navaro.url,
  },
  {
    id: "p3", title: "P3 · Thesis Card", status: "planned", when: "Dec 2026",
    summary: "A one-page visual card of the thesis findings for recruiters.",
    detail: "About 4 hours. Turns the thesis into a shareable one-pager.",
    track: ["finance"], icon: "book", color: "yellow",
  },
  {
    id: "p2", title: "P2 · Live Valuation of an Italian Listed Company", status: "planned", when: "Jan - Feb 2027",
    summary: "Live Excel model + 8 Power BI pages + SQL/Python check layer.",
    detail: "30 hours with weekly gates. Live data via Excel Stocks + STOCKHISTORY (Borsa Italiana), 11 Excel tabs, beta regression, Monte Carlo and sensitivity.",
    track: ["finance", "data"], icon: "finance", color: "blue",
  },
];

export const roadmap: { title: string; when: string; hours: string; status: Status; color: Color; icon: IconName; progress?: number }[] = [
  { title: "P0 · Publish profile & projects", when: "Oct 2026", hours: "7 h", status: "progress", color: "yellow", icon: "link", progress: 60 },
  { title: "SAP S/4HANA CO certificate", when: "Oct 2026 - Jan 2027", hours: "ongoing", status: "progress", color: "blue", icon: "gear", progress: 25 },
  { title: "P1 · Navaro Casa", when: "Nov - mid Dec", hours: "19 h", status: "progress", color: "green", icon: "flow", progress: 35 },
  { title: "P3 · Thesis card", when: "Dec 2026", hours: "4 h", status: "planned", color: "yellow", icon: "book" },
  { title: "P2 · Live valuation", when: "Jan - Feb 2027", hours: "30 h", status: "planned", color: "blue", icon: "finance" },
  { title: "Interview prep", when: "Mar 2027", hours: "7 h", status: "planned", color: "orange", icon: "calendar" },
  { title: "Italian B1 → B2 practice", when: "Weekly", hours: "ongoing", status: "planned", color: "green", icon: "language" },
];

export const certificates: { name: string; issuer: string; status: Status; color: Color; brands: Brand[] }[] = [
  { name: "Financial Analysis & Modeling", issuer: "CFI", brands: ["cfi"], status: "done", color: "blue" },
  { name: "Power BI Data Analyst", issuer: "Microsoft · Coursera", brands: ["microsoft","coursera"], status: "done", color: "yellow" },
  { name: "Google Data Analytics", issuer: "Google", brands: ["google"], status: "done", color: "green" },
  { name: "Microsoft Excel", issuer: "Microsoft", brands: ["microsoft"], status: "done", color: "green" },
  { name: "8 Finance Essentials", issuer: "LSEG", brands: ["lseg"], status: "done", color: "blue" },
  { name: "Private Equity & VC", issuer: "Bocconi", brands: ["bocconi"], status: "done", color: "orange" },
  { name: "QuickSight · Cloud Practitioner", issuer: "AWS", brands: ["aws"], status: "done", color: "orange" },
  { name: "Building with the Claude API", issuer: "Anthropic", brands: ["anthropic"], status: "done", color: "yellow" },
  { name: "Business & Financial Modeling (Decision-Making & Scenarios)", issuer: "Wharton · Coursera", brands: ["coursera"], status: "progress", color: "orange" },
  { name: "SAP S/4HANA Management Accounting (SAP CO)", issuer: "SAP", brands: ["sap"], status: "progress", color: "blue" },
];

export const documents: { title: string; sub: string; url: string; icon: IconName; color: Color; ext: string }[] = [
  { title: "Finance CV", sub: "English · FP&A / Credit", url: cvFinEN.url, icon: "cv", color: "blue", ext: "PDF" },
  { title: "CV Finanza", sub: "Italiano · FP&A / Credito", url: cvFinIT.url, icon: "cv", color: "blue", ext: "PDF" },
  { title: "Data / BA CV", sub: "English", url: cvDataEN.url, icon: "cv", color: "orange", ext: "PDF" },
  { title: "CV Dati / BA", sub: "Italiano", url: cvDataIT.url, icon: "cv", color: "orange", ext: "PDF" },
  { title: "General CV", sub: "English · agencies", url: cvGenEN.url, icon: "cv", color: "green", ext: "PDF" },
  { title: "CV generale", sub: "Italiano · agenzie", url: cvGenIT.url, icon: "cv", color: "green", ext: "PDF" },
  { title: "General CV (Word)", sub: "English · no photo", url: cvGenDocx.url, icon: "download", color: "yellow", ext: "DOCX" },
  { title: "Navaro Casa sheet", sub: "Project one-pager (IT)", url: navaro.url, icon: "pdf", color: "yellow", ext: "PDF" },
];

export const defaultActions = [
  "Check university Microsoft 365 + SAP Learning Hub expiry",
  "LinkedIn Sitting A",
  "Update Indeed profile (20 min)",
  "Set job alerts from keyword list",
  "2-3 applications a day (Affinity Petcare, KPMG, DXC first)",
  "Email agencies (Randstad, Adecco, Hays, Michael Page)",
  "Visit patronato",
  "P0 published by 31 Oct",
];

export const privateNotes = [
  { label: "Permit", value: "Study permit until Mar 2027 - convertible outside quotas with a contract" },
  { label: "Salary answer", value: "EUR 26-30k gross" },
  { label: "Weekly budget", value: "About 10 h for search + projects" },
  { label: "Don't claim", value: "SAP in practice, ERP, Oracle, Qlik, SAS, R, Zucchetti, big data" },
];
