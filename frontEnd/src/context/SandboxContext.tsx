import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Direction, Sandbox } from "../types/sandbox";
import { useCreateSandbox } from "../hooks/useCreateSandbox";
import { usePlaceRobot } from "../hooks/usePlaceRobot";
import { useMoveRobot } from "../hooks/useMoveRobot";
import { useTurnRobotLeft, useTurnRobotRight } from "../hooks/useTurnRobot";
import { sandboxListQueryKey } from "../hooks/useSandboxList";

interface SandboxContextValue {
  sandbox: Sandbox | null;
  createSandbox: (width: number, height: number) => Promise<void>;
  selectSandbox: (sandbox: Sandbox) => void;
  placeRobot: (x: number, y: number, facing: Direction) => Promise<void>;
  moveRobot: () => Promise<void>;
  turnLeft: () => Promise<void>;
  turnRight: () => Promise<void>;
  resetSandbox: () => void;
  isCreating: boolean;
  createError: Error | null;
  isPlacing: boolean;
  placeError: Error | null;
  isMoving: boolean;
  moveError: Error | null;
  isTurning: boolean;
  turnError: Error | null;
}

const SandboxContext = createContext<SandboxContextValue | null>(null);

export function SandboxProvider({ children }: { children: ReactNode }) {
  const [sandbox, setSandbox] = useState<Sandbox | null>(null);
  const queryClient = useQueryClient();
  const createMutation = useCreateSandbox();
  const placeMutation = usePlaceRobot();
  const moveMutation = useMoveRobot();
  const turnLeftMutation = useTurnRobotLeft();
  const turnRightMutation = useTurnRobotRight();

  async function createSandbox(width: number, height: number) {
    const created = await createMutation.mutateAsync({
      tableWidth: width,
      tableHeight: height,
    });
    queryClient.invalidateQueries({ queryKey: sandboxListQueryKey });
    setSandbox(created);
  }

  function selectSandbox(selected: Sandbox) {
    setSandbox(selected);
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

  async function moveRobot() {
    if (!sandbox) return;

    const updated = await moveMutation.mutateAsync({ sandboxId: sandbox.id });
    setSandbox(updated);
  }

  async function turnLeft() {
    if (!sandbox) return;

    const updated = await turnLeftMutation.mutateAsync({
      sandboxId: sandbox.id,
    });
    setSandbox(updated);
  }

  async function turnRight() {
    if (!sandbox) return;

    const updated = await turnRightMutation.mutateAsync({
      sandboxId: sandbox.id,
    });
    setSandbox(updated);
  }

  function resetSandbox() {
    setSandbox(null);
    createMutation.reset();
    placeMutation.reset();
    moveMutation.reset();
    turnLeftMutation.reset();
    turnRightMutation.reset();
  }

  return (
    <SandboxContext.Provider
      value={{
        sandbox,
        createSandbox,
        selectSandbox,
        placeRobot,
        moveRobot,
        turnLeft,
        turnRight,
        resetSandbox,
        isCreating: createMutation.isPending,
        createError: createMutation.error,
        isPlacing: placeMutation.isPending,
        placeError: placeMutation.error,
        isMoving: moveMutation.isPending,
        moveError: moveMutation.error,
        isTurning: turnLeftMutation.isPending || turnRightMutation.isPending,
        turnError: turnLeftMutation.error ?? turnRightMutation.error,
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
