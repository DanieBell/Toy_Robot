import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ActionLog } from "../components/ActionLog";
import { CommandInput } from "../components/CommandInput";
import { Modal } from "../components/Modal";
import { PlaceRobotForm } from "../components/PlaceRobotForm";
import { RobotControls } from "../components/RobotControls";
import { SandboxList } from "../components/SandboxList";
import { TableGrid } from "../components/TableGrid";
import { useSandbox } from "../context/SandboxContext";
import type { Direction } from "../types/sandbox";
import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: SandboxPage,
});

function SandboxPage() {
  const { sandbox, placeRobot, isPlacing, placeError } = useSandbox();
  const [pendingCell, setPendingCell] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function handleCellClick(x: number, y: number) {
    setPendingCell({ x, y });
  }

  async function handleConfirm(facing: Direction) {
    if (!pendingCell) return;

    try {
      await placeRobot(pendingCell.x, pendingCell.y, facing);
      setPendingCell(null);
    } catch {
      // error surfaced via placeError
    }
  }

  function handleCancel() {
    setPendingCell(null);
  }

  if (!sandbox) {
    return (
      <div className={styles.landing}>
        <SandboxList />
      </div>
    );
  }

  return (
    <div className={styles.sandbox}>
      <h1 className={styles.title}>
        Sandbox ({sandbox.table.width}×{sandbox.table.height})
      </h1>
      <div className={styles.controlsContainer}>
        <RobotControls robot={sandbox.robot} />
      </div>

      <div className={styles.commandContainer}>
        <CommandInput />
      </div>

      <div className={styles.workspace}>
        <ActionLog entries={sandbox.log} />
        <div className={styles.gridContainer}>
          <TableGrid
            table={sandbox.table}
            robot={sandbox.robot}
            onCellClick={handleCellClick}
          />
        </div>
      </div>

      <Modal
        open={pendingCell != null}
        title="Place Robot"
        onClose={handleCancel}
      >
        {pendingCell && (
          <PlaceRobotForm
            x={pendingCell.x}
            y={pendingCell.y}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            isSubmitting={isPlacing}
            error={placeError}
          />
        )}
      </Modal>
    </div>
  );
}
