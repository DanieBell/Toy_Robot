import { useState } from "react";
import styles from "./CreateSandboxForm.module.css";

interface CreateSandboxFormProps {
  onCreate: (width: number, height: number) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: Error | null;
}

const DEFAULT_SIZE = 5;

export function CreateSandboxForm({
  onCreate,
  onCancel,
  isSubmitting = false,
  error = null,
}: CreateSandboxFormProps) {
  const [width, setWidth] = useState(DEFAULT_SIZE);
  const [height, setHeight] = useState(DEFAULT_SIZE);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (width >= 1 && height >= 1) {
      onCreate(width, height);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="table-width">Width</label>
          <input
            id="table-width"
            type="number"
            min={1}
            max={100}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="table-height">Height</label>
          <input
            id="table-height"
            type="number"
            min={1}
            max={100}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            disabled={isSubmitting}
          />
        </div>
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error.message}
        </p>
      )}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondary}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.primary}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating\u2026" : "Create"}
        </button>
      </div>
    </form>
  );
}
