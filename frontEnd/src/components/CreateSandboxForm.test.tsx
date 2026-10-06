import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateSandboxForm } from "./CreateSandboxForm";

describe("CreateSandboxForm", () => {
  it("submits the entered dimensions", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(<CreateSandboxForm onCreate={onCreate} onCancel={vi.fn()} />);

    const width = screen.getByLabelText("Width");
    const height = screen.getByLabelText("Height");

    await user.clear(width);
    await user.type(width, "8");
    await user.clear(height);
    await user.type(height, "6");
    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(onCreate).toHaveBeenCalledWith(8, 6);
  });

  it("defaults to a 5x5 table", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(<CreateSandboxForm onCreate={onCreate} onCancel={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(onCreate).toHaveBeenCalledWith(5, 5);
  });

  it("calls onCancel without creating when Cancel is clicked", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();
    const onCancel = vi.fn();

    render(<CreateSandboxForm onCreate={onCreate} onCancel={onCancel} />);

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalledOnce();
    expect(onCreate).not.toHaveBeenCalled();
  });
});
