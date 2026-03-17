import { useMemo, useState } from "react";
import { DataTable } from "./components/DataTable";
import { FiltersPanel } from "./components/FiltersPanel";
import { MetricChart } from "./components/MetricChart";
import { SummaryCards } from "./components/SummaryCards";
import { mockData } from "./data/mockData";
import type { FiltersState } from "./types";
import {
  aggregateByMonth,
  averageMetric,
  filterData,
  formatMetric,
  metricLabel,
  percentChange,
  sumMetric,
} from "./utils/analytics";
import { Legend } from "./components/Legend";

const defaultFilters: FiltersState = {
  chartType: "bar",
  metric: "revenue",
  category: "All",
  region: "All",
  dateStart: "2023-01-01",
  dateEnd: "2025-12-01",
};

const categoryOptions = ["All", "SMB", "Enterprise", "Healthcare", "Education"] as const;
const regionOptions = ["All", "UK", "US", "EU"] as const;

export default function App() {
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  const filteredRows = useMemo(() => filterData(mockData, filters), [filters]);
  const aggregatedRows = useMemo(() => aggregateByMonth(filteredRows), [filteredRows]);

  const summaryItems = useMemo(() => {
    const total = sumMetric(aggregatedRows, filters.metric);
    const average = averageMetric(aggregatedRows, filters.metric);
    const change = percentChange(aggregatedRows, filters.metric);

    return [
      {
        label: `Total ${metricLabel(filters.metric)}`,
        value: formatMetric(total, filters.metric),
        helper: `${aggregatedRows.length} monthly points in view`,
      },
      {
        label: `Average monthly ${metricLabel(filters.metric).toLowerCase()}`,
        value: formatMetric(average, filters.metric),
        helper: `Across ${filters.category} / ${filters.region} filters`,
      },
      {
        label: "Period change",
        value: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
        helper: "From first visible month to last visible month",
      },
    ];
  }, [aggregatedRows, filters]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Mini Analytics Explorer</h1>
          <p className="subtitle">
            A small React + TypeScript + ECharts project for exploring data-heavy UI patterns.
          </p>
        </div>
      </header>

      <main className="layout-grid">
        <FiltersPanel
          filters={filters}
          categories={[...categoryOptions]}
          regions={[...regionOptions]}
          onChange={setFilters}
        />

        <section className="content-column">
          <SummaryCards items={summaryItems} />
          <MetricChart
            data={aggregatedRows}
            metric={filters.metric}
            chartType={filters.chartType}
          />
          <Legend items={[
            { name: "Revenue", color: "#3b82f6" },
            { name: "Users", color: "#10b981" },
          ]} />
          <DataTable rows={aggregatedRows} metric={filters.metric} />
        </section>
      </main>
    </div>
  );
}
