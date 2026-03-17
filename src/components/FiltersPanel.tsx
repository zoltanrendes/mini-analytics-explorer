import type { Category, FiltersState, MetricKey, Region } from "../types";

interface FiltersPanelProps {
  filters: FiltersState;
  categories: Array<Category | "All">;
  regions: Array<Region | "All">;
  onChange: (next: FiltersState) => void;
}

export function FiltersPanel({ filters, categories, regions, onChange }: FiltersPanelProps) {
  const update = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <aside className="panel filters-panel">
      <div className="panel-header">
        <h2>Filters</h2>
        <p>Explore the same dataset from different angles.</p>
      </div>

      <div className="field-group">
        <label htmlFor="chartType">Chart type</label>
        <select
          id="chartType"
          value={filters.chartType}
          onChange={(event) => update("chartType", event.target.value as FiltersState["chartType"])}
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="metric">Metric</label>
        <select
          id="metric"
          value={filters.metric}
          onChange={(event) => update("metric", event.target.value as MetricKey)}
        >
          <option value="revenue">Revenue</option>
          <option value="users">Users</option>
          <option value="orders">Orders</option>
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(event) => update("category", event.target.value as FiltersState["category"])}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="region">Region</label>
        <select
          id="region"
          value={filters.region}
          onChange={(event) => update("region", event.target.value as FiltersState["region"])}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="dateStart">From</label>
          <input
            id="dateStart"
            type="date"
            value={filters.dateStart}
            onChange={(event) => update("dateStart", event.target.value)}
          />
        </div>
        <div className="field-group">
          <label htmlFor="dateEnd">To</label>
          <input
            id="dateEnd"
            type="date"
            value={filters.dateEnd}
            onChange={(event) => update("dateEnd", event.target.value)}
          />
        </div>
      </div>
    </aside>
  );
}
