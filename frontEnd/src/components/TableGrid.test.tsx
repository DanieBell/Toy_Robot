import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Robot, Table } from "../types/sandbox";
import { TableGrid } from "./TableGrid";

const table: Table = { width: 3, height: 2 };

describe("TableGrid", () => {
  it("renders a cell for every position on the table", () => {
    const robot: Robot = { isPlaced: false, x: null, y: null, facing: null };

    render(<TableGrid table={table} robot={robot} />);
    expect(screen.getAllByRole("gridcell")).toHaveLength(6);
  });

  it("shows the robot in its placed cell facing the given direction", () => {
    const robot: Robot = { isPlaced: true, x: 1, y: 0, facing: "East" };

    render(<TableGrid table={table} robot={robot} />);

    const marker = screen.getByRole("img", { name: "Robot facing East" });
    expect(marker).toBeInTheDocument();
  });

  it("does not render a robot marker when the robot is unplaced", () => {
    const robot: Robot = { isPlaced: false, x: null, y: null, facing: null };

    render(<TableGrid table={table} robot={robot} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
