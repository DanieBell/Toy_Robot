import { useState } from "react";
import { useSandbox } from "../context/SandboxContext";
import { useToast } from "../context/ToastContext";
import { useDeleteSandbox } from "../hooks/useDeleteSandbox";
import { useSandboxList } from "../hooks/useSandboxList";
import type { Sandbox } from "../types/sandbox";
import { Modal } from "./Modal";
import styles from "./SandboxList.module.css";

function describeRobot(sandbox: Sandbox): string {
  const { robot } = sandbox;
  if (!robot.isPlaced) {
    return "Not placed";
  }
  return `${robot.x}, ${robot.y}, ${robot.facing?.toUpperCase()}`;
}

export function SandboxList() {
  const { data: sandboxes, isLoading, error } = useSandboxList();
  const { selectSandbox } = useSandbox();
  const { showToast } = useToast();
  const deleteMutation = useDeleteSandbox();
  const [pendingDelete, setPendingDelete] = useState<Sandbox | null>(null);

  async function confirmDelete() {
    if (!pendingDelete) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(pendingDelete.id);
      setPendingDelete(null);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to delete sandbox.",
      );
    }
  }

  if (isLoading) {
    return <p className={styles.message}>Loading sandboxes…</p>;
  }

  if (error) {
    return (
      <p className={styles.message} role="alert">
        Could not load sandboxes.
      </p>
    );
  }

  if (!sandboxes || sandboxes.length === 0) {
    return (
      <p className={styles.message}>
        No sandboxes yet. Use "Create Sandbox" to get started.
      </p>
    );
  }

  return (
    <>
      <table className={styles.table}>
        <caption className={styles.caption}>Existing sandboxes</caption>
        <thead>
          <tr>
            <th scope="col">Table</th>
            <th scope="col">Robot (X, Y, Facing)</th>
            <th scope="col" className={styles.actionsHeader}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sandboxes.map((sandbox) => (
            <tr key={sandbox.id}>
              <td>
                {sandbox.table.width} × {sandbox.table.height}
              </td>
              <td>{describeRobot(sandbox)}</td>
              <td className={styles.actions}>
                <button
                  type="button"
                  className={styles.enterButton}
                  onClick={() => selectSandbox(sandbox)}
                >
                  Enter
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => setPendingDelete(sandbox)}
                  aria-label="Delete sandbox"
                  title="Delete sandbox"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={pendingDelete != null}
        title="Delete Sandbox"
        onClose={() => setPendingDelete(null)}
      >
        {pendingDelete && (
          <div className={styles.confirm}>
            <p className={styles.confirmText}>
              Delete the {pendingDelete.table.width} ×{" "}
              {pendingDelete.table.height} sandbox? This cannot be undone.
            </p>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setPendingDelete(null)}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.confirmDeleteButton}
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting\u2026" : "Delete"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
