import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Legend } from "./Legend";

describe("Legend", () => {
  it("renders each legend item label", () => {
    render(
      <Legend
        items={[
          { name: "Revenue", color: "#3b82f6" },
          { name: "Users", color: "#10b981" },
        ]}
      />,
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("applies the provided marker colors", () => {
    const { container } = render(
      <Legend
        items={[
          { name: "Revenue", color: "#3b82f6" },
          { name: "Users", color: "#10b981" },
        ]}
      />,
    );

    const markers = container.querySelectorAll("div[style*='border-radius: 50%']");

    expect(markers).toHaveLength(2);
    expect(markers[0]).toHaveStyle({ background: "#3b82f6" });
    expect(markers[1]).toHaveStyle({ background: "#10b981" });
  });
});
