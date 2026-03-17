import ReactECharts from "echarts-for-react";
import { metricColors } from "./Legend/constants";
import type { ChartType, MetricKey } from "../types";
import type { AggregatedPoint } from "../utils/analytics";
import { formatMetric, metricLabel } from "../utils/analytics";

interface MetricChartProps {
  data: AggregatedPoint[];
  metric: MetricKey;
  chartType: ChartType;
}

export function MetricChart({ data, metric, chartType }: MetricChartProps) {
  const option = {
    tooltip: {
      trigger: "axis",
      valueFormatter: (value: number) => formatMetric(value, metric),
    },
    grid: {
      left: 16,
      right: 16,
      top: 24,
      bottom: 24,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.monthLabel),
      axisLabel: {
        rotate: 35,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: number) => {
          if (metric === "revenue") {
            return `£${Math.round(value / 1000)}k`;
          }
          return `${Math.round(value)}`;
        },
      },
    },
    series: [
      {
        name: metricLabel(metric),
        type: chartType,
        smooth: chartType === "line",
        itemStyle: {
          color: metricColors[metric],
        },
        lineStyle: chartType === "line" ? {
          color: metricColors[metric],
        } : undefined,
        areaStyle: chartType === "line" ? {
          color: metricColors[metric],
          opacity: 0.18,
        } : undefined,
        data: data.map((item) => item[metric]),
      },
    ],
  };

  return (
    <section className="panel chart-panel">
      <div className="panel-header row-space">
        <div>
          <h2>{metricLabel(metric)} trend</h2>
          <p>Monthly view across the filtered dataset.</p>
        </div>
      </div>
      <ReactECharts option={option} style={{ height: 420 }} />
    </section>
  );
}
