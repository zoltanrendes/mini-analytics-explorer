export type MetricKey = "revenue" | "users" | "orders";
export type ChartType = "bar" | "line";
export type Category = "SMB" | "Enterprise" | "Healthcare" | "Education";
export type Region = "UK" | "US" | "EU";

export interface DataPoint {
  date: string;
  monthLabel: string;
  category: Category;
  region: Region;
  revenue: number;
  users: number;
  orders: number;
}

export interface FiltersState {
  chartType: ChartType;
  metric: MetricKey;
  category: Category | "All";
  region: Region | "All";
  dateStart: string;
  dateEnd: string;
}
