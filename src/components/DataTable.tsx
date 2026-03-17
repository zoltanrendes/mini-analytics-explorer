import type { MetricKey } from "../types";
import type { AggregatedPoint } from "../utils/analytics";
import { formatMetric } from "../utils/analytics";

interface DataTableProps {
  rows: AggregatedPoint[];
  metric: MetricKey;
}

export function DataTable({ rows, metric }: DataTableProps) {
  return (
    <section className="panel table-panel">
      <div className="panel-header">
        <h2>Underlying data</h2>
        <p>Aggregated monthly values behind the chart.</p>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Users</th>
              <th>Orders</th>
              <th>Primary metric</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.date}>
                <td>{row.monthLabel}</td>
                <td>{formatMetric(row.revenue, "revenue")}</td>
                <td>{formatMetric(row.users, "users")}</td>
                <td>{formatMetric(row.orders, "orders")}</td>
                <td>{formatMetric(row[metric], metric)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
