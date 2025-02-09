export const tableHeaders: { key: string; label: string; width?: string }[] = [
  { key: "feature", label: "", width: "40%" },
  { key: "furfy", label: "FURFY", width: "20%" },
  { key: "vacuumCleaner", label: "VACUUM CLEANER", width: "20%" },
  { key: "lintRollers", label: "LINT ROLLERS", width: "20%" },
];

export type TableRow = {
  [key in (typeof tableHeaders)[number]["key"]]: string | boolean;
};

export const tableData: TableRow[] = [
  { feature: "Effectiveness", furfy: "5/5", vacuumCleaner: "2/5", lintRollers: "1/5" },
  { feature: "Reusable", furfy: true, vacuumCleaner: true, lintRollers: false },
  { feature: "Power not required", furfy: true, vacuumCleaner: false, lintRollers: true },
  { feature: "Easy to clean", furfy: true, vacuumCleaner: false, lintRollers: false },
  { feature: "Lifetime value", furfy: true, vacuumCleaner: false, lintRollers: false },
  { feature: "Robust", furfy: true, vacuumCleaner: true, lintRollers: false },
];