import type { Category, DataPoint, Region } from "../types";

const categories: Category[] = ["SMB", "Enterprise", "Healthcare", "Education"];
const regions: Region[] = ["UK", "US", "EU"];
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function seededNoise(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pad(num: number): string {
  return String(num).padStart(2, "0");
}

export function generateMockData(): DataPoint[] {
  const output: DataPoint[] = [];

  for (let year = 2023; year <= 2025; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      const date = `${year}-${pad(month + 1)}-01`;
      const monthLabel = `${monthNames[month]} ${year}`;

      categories.forEach((category, categoryIndex) => {
        regions.forEach((region, regionIndex) => {
          const seed = year * 100 + month * 10 + categoryIndex * 3 + regionIndex;
          const seasonality = 1 + Math.sin((month / 11) * Math.PI * 2) * 0.15;
          const trend = 1 + (year - 2023) * 0.18 + month * 0.015;
          const categoryMultiplier = [0.8, 1.45, 1.1, 0.95][categoryIndex];
          const regionMultiplier = [1.0, 1.35, 0.9][regionIndex];
          const randomness = 0.88 + seededNoise(seed) * 0.24;

          const revenue = Math.round(
            35000 * seasonality * trend * categoryMultiplier * regionMultiplier * randomness
          );
          const users = Math.round(
            900 * seasonality * trend * (0.85 + categoryMultiplier * 0.25) * (0.9 + regionMultiplier * 0.1) * randomness
          );
          const orders = Math.round(
            220 * seasonality * trend * (0.75 + categoryMultiplier * 0.3) * regionMultiplier * randomness
          );

          output.push({
            date,
            monthLabel,
            category,
            region,
            revenue,
            users,
            orders,
          });
        });
      });
    }
  }

  return output;
}

export const mockData = generateMockData();
