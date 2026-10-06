import { useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { CreateSandboxForm } from "../components/CreateSandboxForm";
import { Modal } from "../components/Modal";
import { useSandbox } from "../context/SandboxContext";
import styles from "./mainLayout.module.css";

export function MainLayout() {
  const { sandbox, createSandbox, resetSandbox, isCreating, createError } =
    useSandbox();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleCreate(width: number, height: number) {
    try {
      await createSandbox(width, height);
      setIsModalOpen(false);
    } catch {
      // error surfaced via createError
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          Toy Robot
        </Link>
        <div className={styles.actions}>
          {sandbox ? (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={resetSandbox}
            >
              Reset
            </button>
          ) : (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setIsModalOpen(true)}
            >
              Create Sandbox
            </button>
          )}
        </div>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>

      <Modal open={isModalOpen} title="New Sandbox" onClose={handleCloseModal}>
        <CreateSandboxForm
          onCreate={handleCreate}
          onCancel={handleCloseModal}
          isSubmitting={isCreating}
          error={createError}
        />
      </Modal>
    </div>
  );
}
