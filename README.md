# Mini Analytics Explorer
![App Screenshot](./screenshot.png)
A small React + TypeScript + ECharts project inspired by data-heavy UI patterns found in analytics products.

The goal was to explore how charting, filtering and tabular data interact in a real-world scenario, with a focus on clarity, consistency and simple component structure.

---

## What this project demonstrates

- Metric switching (Revenue / Users / Orders)
- Chart type switching (Bar / Line)
- Filter-driven UI (category, region, date range)
- Coordination between chart and table views
- Summary-level insights via KPI cards
- Consistent visual mapping (shared metric color config)
- Clean separation between data, config and presentation

---

## Dataset

The mock dataset is intentionally sized to feel realistic without requiring a backend:

- 3 years of monthly data
- 4 customer segments
- 3 regions
- 432 raw rows before aggregation

This allows meaningful filtering, aggregation and UI interaction patterns.

---

## Why this project

Instead of reusing existing code, I explored how analytics tools structure visualisation components and built a simplified standalone version to better understand:

- data-to-UI mapping
- filter-driven state
- reusable visual configuration
- consistency between chart elements (e.g. legend and series colours)

## Use Case

A sales manager wants to quickly understand:
- Which products generate the most revenue
- Trends over time
- Customer segmentation

Without writing SQL.

## What this project does

Mini Analytics Explorer allows:
- selecting metrics
- grouping data
- visualizing instantly

## Key Challenge Explored

Mapping UI interactions → data queries (simulated in-memory)

While this project uses a mock dataset instead of a real database,
the goal was to replicate how analytics tools translate user intent
(filters, metrics, grouping) into query logic.

## Why I built this
I wanted to understand how BI tools like Metabase work internally.

## Key Features
- simulated query builder logic (client-side)
- chart rendering
- filtering & grouping

## Technical Focus

The main focus of this project was not just visualization,
but modelling how analytics tools work internally:

- transforming user selections into query-like operations
- handling aggregation (sum, grouping)
- maintaining consistency across views (chart + table)
- separating data, configuration and presentation layers

## Architecture

Frontend (React + TypeScript)
→ State-driven query logic (filters, metrics)
→ In-memory dataset
→ ECharts for visualization

The project mimics a typical analytics pipeline without a backend:
user intent → query logic → aggregated data → visualization

## Takeaway

- analytics tools are primarily about query abstraction, not charts
- consistency across UI elements is critical for trust
- even simple datasets become complex with filtering and grouping
- designing flexible but simple data models is challenging

## Inspiration
Inspired by Metabase:
- self-service analytics
- non-technical users
- fast exploration

---

## Run locally

```bash
npm install
npm run dev
npm run test
