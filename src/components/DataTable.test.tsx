import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "./DataTable";

describe("DataTable", () => {
  it("renders the monthly rows and formats the selected primary metric", () => {
    render(
      <DataTable
        metric="users"
        rows={[
          {
            date: "2024-01-01",
            monthLabel: "Jan 2024",
            revenue: 120000,
            users: 12500,
            orders: 3100,
          },
          {
            date: "2024-02-01",
            monthLabel: "Feb 2024",
            revenue: 132000,
            users: 14100,
            orders: 3300,
          },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Underlying data" })).toBeInTheDocument();
    expect(screen.getByText("Jan 2024")).toBeInTheDocument();
    expect(screen.getByText("Feb 2024")).toBeInTheDocument();

    const januaryRow = screen.getByText("Jan 2024").closest("tr");
    expect(januaryRow).not.toBeNull();

    if (!januaryRow) {
      throw new Error("Expected January row to exist");
    }

    const januaryCells = within(januaryRow).getAllByRole("cell");

    expect(januaryCells[1]).toHaveTextContent("£120,000");
    expect(januaryCells[2]).toHaveTextContent("12,500");
    expect(januaryCells[3]).toHaveTextContent("3,100");
    expect(januaryCells[4]).toHaveTextContent("12,500");
  });
});
