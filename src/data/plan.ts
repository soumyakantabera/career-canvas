import type { Brand } from "@/components/brand-logos";
import type { Color, Status } from "./profile";

// Source: Career_Execution_Report_FINAL (18 Oct 2026), section 9 calendar + project specs.
export type Month = {
  id: string; label: string; range: string; status: Status; color: Color; theme: string;
  projectHours: number; applications: number;
  build: string[]; apply: string[];
  deliverable: string; tools: Brand[];
};

export const months: Month[] = [
  {
    id: "oct", label: "Oct", range: "12 - 31 Oct 2026", status: "progress", color: "yellow", theme: "Publish what I have",
    projectHours: 7, applications: 16,
    build: [
      "P0: publish 3 GitHub repositories (thesis, budget pack, ETL dashboard)",
      "README per repo: problem, data, method, result, limits, how to run",
      "3-line Italian summary + 1-page PDF per project for LinkedIn Featured",
      "Finish SAP S/4HANA Management Accounting (SAP CO) course; 30 finance words in Italian",
    ],
    apply: [
      "First targets: Affinity Petcare, DXC, KPMG",
      "Register with Michael Page, Hays, Robert Walters",
      "AlmaLaurea profile + LinkedIn update with certificates",
    ],
    deliverable: "3 public repositories + GitHub link on every CV",
    tools: ["github", "linkedin", "microsoft", "sap", "kpmg", "dxc"],
  },
  {
    id: "nov", label: "Nov", range: "Nov 2026", status: "planned", color: "green", theme: "Build P1 Navaro Casa",
    projectHours: 12, applications: 16,
    build: [
      "Run the Navaro Casa ETL (Python + SQL) end to end",
      "Understand the code: answer 10 questions on every step",
      "Trace the Excel FP&A pack: budget vs actual, price-volume-mix, cash calendar",
      "Build the Power BI report on the reconciled star schema",
    ],
    apply: ["4 tailored applications a week (2 finance, 1 data, 1 BA)", "1 agency contact a week", "2 LinkedIn messages a week to alumni"],
    deliverable: "Working Power BI report = Excel pack to the euro",
    tools: ["python", "pandas", "microsoft", "github", "indeed"],
  },
  {
    id: "dec", label: "Dec", range: "Dec 2026", status: "planned", color: "blue", theme: "Finish P1 + thesis card",
    projectHours: 11, applications: 16,
    build: [
      "Finish P1 by 19 Dec: memo in my words, GitHub, Italian one-page summary",
      "Practise the Italian pitch for Navaro Casa",
      "P3 thesis card: question, sample, method, 17.1% vs 12.6% finding, 2 charts",
      "Start Kaggle Intro + Advanced SQL (about 8 h, free)",
    ],
    apply: ["4 a week; credit ads lead with the thesis", "Agencies: finance back-office, controlling, reporting"],
    deliverable: "P1 in LinkedIn Featured + 1-page thesis card",
    tools: ["github", "ssrn", "kaggle", "linkedin", "microsoft"],
  },
  {
    id: "jan", label: "Jan", range: "Jan 2027", status: "planned", color: "orange", theme: "P2 weeks 1-4: model",
    projectHours: 13.5, applications: 16,
    build: [
      "Pick one Italian listed company + 5 listed peers",
      "Statements from the annual report, live prices via Excel Stocks + STOCKHISTORY",
      "Reclassified statements and ratios vs peers",
      "3-year forecast with 3 scenarios; SQL ratio checks",
    ],
    apply: ["Trainee and intern intakes (after the permit check)", "2027 graduate programmes (English)", "India Young Professionals ballot on GOV.UK if 30 or younger"],
    deliverable: "Live Excel model with forecast + SQL check layer",
    tools: ["microsoft", "bigquery", "kaggle", "accenture", "glassdoor"],
  },
  {
    id: "feb", label: "Feb", range: "Feb 2027", status: "planned", color: "blue", theme: "P2 weeks 5-8: value + report",
    projectHours: 16.5, applications: 16,
    build: [
      "WACC, DCF with terminal value, comparables, football field",
      "Monte Carlo (10,000 runs) + conclusions engine",
      "Python checks + 8-page Power BI report",
      "2-page credit memo; CV line added and CV tests rerun",
    ],
    apply: ["4 a week", "Jira board with P1 user stories only if BA interviews come"],
    deliverable: "P2 published: model, 8 Power BI pages, credit memo",
    tools: ["microsoft", "python", "pandas", "github", "jira"],
  },
  {
    id: "mar", label: "Mar", range: "Mar 2027", status: "planned", color: "green", theme: "Interview ready",
    projectHours: 7, applications: 16,
    build: [
      "2-minute interview stories from P1 and P2 + a mock interview",
      "Standards crib sheet: IFRS 18, IFRS vs OIC vs US GAAP (3 h)",
      "Credit crib sheet: Centrale Rischi, Basel PD / LGD / EAD (2 h)",
      "P4 credit pack only if credit interviews come",
    ],
    apply: ["4 a week", "Follow up every open process"],
    deliverable: "Rehearsed stories for every project",
    tools: ["linkedin", "indeed", "glassdoor", "microsoft"],
  },
];

// Work streams across the 6 months. start/end are indexes into `months` (0 = Oct ... 5 = Mar).
// projectId links to an entry in profile.projects so the bar can open that project's popup.
export type PlanProject = {
  id: string; name: string; deliverable: string; hours: string; color: Color; status: Status;
  start: number; end: number; tools: Brand[]; projectId?: string;
};

export const planProjects: PlanProject[] = [
  { id: "p0", name: "P0 · Publish profile", deliverable: "3 public GitHub repos + link on every CV", hours: "7 h", color: "yellow", status: "progress", start: 0, end: 0, tools: ["github", "linkedin"] },
  { id: "sap", name: "SAP S/4HANA CO", deliverable: "SAP CO certificate finished", hours: "ongoing", color: "blue", status: "progress", start: 0, end: 3, tools: ["sap"] },
  { id: "p1", name: "P1 · Navaro Casa", deliverable: "Power BI report = Excel pack to the euro", hours: "19 h", color: "green", status: "progress", start: 1, end: 2, tools: ["python", "pandas", "microsoft"], projectId: "p1" },
  { id: "p3", name: "P3 · Thesis card", deliverable: "1-page visual card of the thesis findings", hours: "4 h", color: "yellow", status: "planned", start: 2, end: 2, tools: ["ssrn"], projectId: "p3" },
  { id: "sql", name: "SQL (Kaggle)", deliverable: "Intro + Advanced SQL, about 8 h free", hours: "8 h", color: "orange", status: "planned", start: 2, end: 3, tools: ["kaggle"] },
  { id: "p2", name: "P2 · Live valuation", deliverable: "Excel model + 8 Power BI pages + credit memo", hours: "30 h", color: "blue", status: "planned", start: 3, end: 4, tools: ["microsoft", "python", "bigquery"], projectId: "p2" },
  { id: "p4", name: "P4 · Credit pack", deliverable: "Only if credit interviews come", hours: "on demand", color: "orange", status: "planned", start: 5, end: 5, tools: ["linkedin"] },
  { id: "prep", name: "Interview prep", deliverable: "Rehearsed 2-minute stories per project", hours: "7 h", color: "green", status: "planned", start: 5, end: 5, tools: ["linkedin"] },
  { id: "apps", name: "Applications", deliverable: "4 tailored applications every week", hours: "~96 total", color: "orange", status: "progress", start: 0, end: 5, tools: ["indeed", "glassdoor", "linkedin"] },
];

export const totals = {
  projectHours: months.reduce((a, m) => a + m.projectHours, 0),
  applications: months.reduce((a, m) => a + m.applications, 0),
};

export const weeklyRhythm: { label: string; time: string; color: Color }[] = [
  { label: "4 tailored applications", time: "2 h", color: "blue" },
  { label: "Project or course work", time: "3.5 h", color: "orange" },
  { label: "Agency contact + 2 LinkedIn messages", time: "30 min", color: "green" },
  { label: "Sunday log and review", time: "10 min", color: "yellow" },
];

