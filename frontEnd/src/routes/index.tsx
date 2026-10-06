import { createFileRoute } from "@tanstack/react-router";
import { TableGrid } from "../components/TableGrid";
import { useSandbox } from "../context/SandboxContext";
import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: SandboxPage,
});

function SandboxPage() {
  const { sandbox } = useSandbox();

  if (!sandbox) {
    return (
      <div className={styles.empty}>
        <p>
          No sandbox yet. Use “Create Sandbox” in the top right to get started.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.sandbox}>
      <h1 className={styles.title}>
        Sandbox ({sandbox.table.width}×{sandbox.table.height})
      </h1>
      <div className={styles.gridContainer}>
        <TableGrid table={sandbox.table} robot={sandbox.robot} />
      </div>
    </div>
  );
}
