import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Direction, Sandbox } from "../types/sandbox";
import { useCreateSandbox } from "../hooks/useCreateSandbox";
import { usePlaceRobot } from "../hooks/usePlaceRobot";

interface SandboxContextValue {
  sandbox: Sandbox | null;
  createSandbox: (width: number, height: number) => Promise<void>;
  placeRobot: (x: number, y: number, facing: Direction) => Promise<void>;
  resetSandbox: () => void;
  isCreating: boolean;
  createError: Error | null;
  isPlacing: boolean;
  placeError: Error | null;
}

const SandboxContext = createContext<SandboxContextValue | null>(null);

export function SandboxProvider({ children }: { children: ReactNode }) {
  const [sandbox, setSandbox] = useState<Sandbox | null>(null);
  const createMutation = useCreateSandbox();
  const placeMutation = usePlaceRobot();

  async function createSandbox(width: number, height: number) {
    const created = await createMutation.mutateAsync({
      tableWidth: width,
      tableHeight: height,
    });
    setSandbox(created);
  }

  async function placeRobot(x: number, y: number, facing: Direction) {
    if (!sandbox) return;

    const updated = await placeMutation.mutateAsync({
      sandboxId: sandbox.id,
      x,
      y,
      facing,
    });
    setSandbox(updated);
  }

  function resetSandbox() {
    setSandbox(null);
    createMutation.reset();
    placeMutation.reset();
  }

  return (
    <SandboxContext.Provider
      value={{
        sandbox,
        createSandbox,
        placeRobot,
        resetSandbox,
        isCreating: createMutation.isPending,
        createError: createMutation.error,
        isPlacing: placeMutation.isPending,
        placeError: placeMutation.error,
      }}
    >
      {children}
    </SandboxContext.Provider>
  );
}

export function useSandbox(): SandboxContextValue {
  const value = useContext(SandboxContext);
  if (!value) {
    throw new Error("useSandbox must be used within a SandboxProvider");
  }
  return value;
}
