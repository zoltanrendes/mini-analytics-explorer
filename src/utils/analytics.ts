import type { DataPoint, FiltersState, MetricKey } from "../types";

export interface AggregatedPoint {
  date: string;
  monthLabel: string;
  revenue: number;
  users: number;
  orders: number;
}

export function filterData(data: DataPoint[], filters: FiltersState): DataPoint[] {
  return data.filter((item) => {
    const inCategory = filters.category === "All" || item.category === filters.category;
    const inRegion = filters.region === "All" || item.region === filters.region;
    const inDateRange = item.date >= filters.dateStart && item.date <= filters.dateEnd;
    return inCategory && inRegion && inDateRange;
  });
}

export function aggregateByMonth(data: DataPoint[]): AggregatedPoint[] {
  const map = new Map<string, AggregatedPoint>();

  data.forEach((item) => {
    const existing = map.get(item.date);
    if (existing) {
      existing.revenue += item.revenue;
      existing.users += item.users;
      existing.orders += item.orders;
      return;
    }

    map.set(item.date, {
      date: item.date,
      monthLabel: item.monthLabel,
      revenue: item.revenue,
      users: item.users,
      orders: item.orders,
    });
  });

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function sumMetric(points: AggregatedPoint[], metric: MetricKey): number {
  return points.reduce((total, point) => total + point[metric], 0);
}

export function averageMetric(points: AggregatedPoint[], metric: MetricKey): number {
  if (points.length === 0) {
    return 0;
  }
  return Math.round(sumMetric(points, metric) / points.length);
}

export function percentChange(points: AggregatedPoint[], metric: MetricKey): number {
  if (points.length < 2) {
    return 0;
  }

  const first = points[0][metric];
  const last = points[points.length - 1][metric];

  if (first === 0) {
    return 0;
  }

  return ((last - first) / first) * 100;
}

export function formatMetric(value: number, metric: MetricKey): string {
  if (metric === "revenue") {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return new Intl.NumberFormat("en-GB").format(value);
}

export function metricLabel(metric: MetricKey): string {
  const labels: Record<MetricKey, string> = {
    revenue: "Revenue",
    users: "Users",
    orders: "Orders",
  };

  return labels[metric];
}
