import { useState } from "react";
import type { Direction } from "../types/sandbox";
import { parsePlaceCommand } from "../utils/parsePlaceCommand";
import styles from "./CommandInput.module.css";

interface CommandInputProps {
  onPlace: (x: number, y: number, facing: Direction) => Promise<void>;
  disabled?: boolean;
}

export function CommandInput({ onPlace, disabled = false }: CommandInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = parsePlaceCommand(value);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setIsSubmitting(true);
    try {
      await onPlace(result.command.x, result.command.y, result.command.facing);
      setValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place robot.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="command-input" className={styles.label}>
          Command
        </label>
        <input
          id="command-input"
          type="text"
          className={styles.input}
          placeholder="PLACE X,Y,DIRECTION"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled || isSubmitting}
          autoComplete="off"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={disabled || isSubmitting || value.trim() === ""}
        >
          {isSubmitting ? "Sending\u2026" : "Run"}
        </button>
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
