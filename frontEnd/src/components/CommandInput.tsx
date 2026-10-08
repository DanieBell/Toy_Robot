import { useState } from "react";
import { useRobotActions } from "../hooks/useRobotActions";
import { parseCommand } from "../utils/parseCommand";
import styles from "./CommandInput.module.css";

export function CommandInput() {
  const { place, move, left, right, report, showToast } = useRobotActions();
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const result = parseCommand(value);
    setValue("");

    if (!result.success) {
      showToast(result.error);
      return;
    }

    const command = result.command;

    if (command.type === "report") {
      report();
      return;
    }

    setIsSubmitting(true);
    try {
      switch (command.type) {
        case "place":
          await place(command.x, command.y, command.facing);
          break;
        case "move":
          await move();
          break;
        case "left":
          await left();
          break;
        case "right":
          await right();
          break;
      }
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
          placeholder="PLACE X,Y,DIRECTION | MOVE | LEFT | RIGHT | REPORT"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isSubmitting || value.trim() === ""}
        >
          {isSubmitting ? "Sending\u2026" : "Run"}
        </button>
      </div>
    </form>
  );
}
