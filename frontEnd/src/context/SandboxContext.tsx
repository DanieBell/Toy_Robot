import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Sandbox } from "../types/sandbox";
import { useCreateSandbox } from "../hooks/useCreateSandbox";

interface SandboxContextValue {
  sandbox: Sandbox | null;
  createSandbox: (width: number, height: number) => Promise<void>;
  resetSandbox: () => void;
  isCreating: boolean;
  createError: Error | null;
}

const SandboxContext = createContext<SandboxContextValue | null>(null);

export function SandboxProvider({ children }: { children: ReactNode }) {
  const [sandbox, setSandbox] = useState<Sandbox | null>(null);
  const createMutation = useCreateSandbox();

  async function createSandbox(width: number, height: number) {
    const created = await createMutation.mutateAsync({
      tableWidth: width,
      tableHeight: height,
    });
    setSandbox(created);
  }

  function resetSandbox() {
    setSandbox(null);
    createMutation.reset();
  }

  return (
    <SandboxContext.Provider
      value={{
        sandbox,
        createSandbox,
        resetSandbox,
        isCreating: createMutation.isPending,
        createError: createMutation.error,
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
