import { useState } from "react";
import styles from "./CreateSandboxForm.module.css";

interface CreateSandboxFormProps {
  onCreate: (width: number, height: number) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: Error | null;
}

const DEFAULT_SIZE = 5;
const MIN_SIZE = 1;
const MAX_SIZE = 20;

function isValidSize(value: number): boolean {
  return Number.isInteger(value) && value >= MIN_SIZE && value <= MAX_SIZE;
}

export function CreateSandboxForm({
  onCreate,
  onCancel,
  isSubmitting = false,
  error = null,
}: CreateSandboxFormProps) {
  const [width, setWidth] = useState(DEFAULT_SIZE);
  const [height, setHeight] = useState(DEFAULT_SIZE);

  const isValid = isValidSize(width) && isValidSize(height);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isValid) {
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
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            disabled={isSubmitting}
          />
          {!isValidSize(width) && (
            <span className={styles.fieldError} role="alert">
              Must be {MIN_SIZE}–{MAX_SIZE}
            </span>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="table-height">Height</label>
          <input
            id="table-height"
            type="number"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            disabled={isSubmitting}
          />
          {!isValidSize(height) && (
            <span className={styles.fieldError} role="alert">
              Must be {MIN_SIZE}–{MAX_SIZE}
            </span>
          )}
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
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Creating\u2026" : "Create"}
        </button>
      </div>
    </form>
  );
}
