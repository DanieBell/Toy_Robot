import { useState } from "react";
import type { Direction } from "../types/sandbox";
import { DIRECTIONS } from "../types/sandbox";
import styles from "./PlaceRobotForm.module.css";

interface PlaceRobotFormProps {
  x: number;
  y: number;
  onConfirm: (facing: Direction) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  error?: Error | null;
}

export function PlaceRobotForm({
  x,
  y,
  onConfirm,
  onCancel,
  isSubmitting = false,
  error = null,
}: PlaceRobotFormProps) {
  const [facing, setFacing] = useState<Direction | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (facing != null) {
      onConfirm(facing);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.position}>
        Place robot at ({x}, {y})
      </p>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Facing direction</legend>
        <div className={styles.options}>
          {DIRECTIONS.map((direction) => (
            <button
              key={direction}
              type="button"
              className={`${styles.directionButton} ${facing === direction ? styles.selected : ""}`}
              aria-pressed={facing === direction}
              onClick={() => setFacing(direction)}
              disabled={isSubmitting}
            >
              {direction}
            </button>
          ))}
        </div>
      </fieldset>
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
          disabled={facing == null || isSubmitting}
        >
          {isSubmitting ? "Placing\u2026" : "Confirm"}
        </button>
      </div>
    </form>
  );
}
