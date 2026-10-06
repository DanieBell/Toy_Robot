import { useState } from "react";
import { useSandbox } from "../context/SandboxContext";
import { useToast } from "../context/ToastContext";
import { formatReport } from "../utils/formatReport";
import { parseCommand } from "../utils/parseCommand";
import styles from "./CommandInput.module.css";

export function CommandInput() {
  const { sandbox, placeRobot, moveRobot, turnLeft, turnRight } = useSandbox();
  const { showToast } = useToast();
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const result = parseCommand(value);

    if (!result.success) {
      showToast(result.error);
      setValue("");
      return;
    }

    const command = result.command;

    if (command.type === "report") {
      if (!sandbox?.robot.isPlaced) {
        showToast("Place the robot before reporting.");
        return;
      }
      showToast(formatReport(sandbox.robot), "info");
      setValue("");
      return;
    }

    setIsSubmitting(true);
    try {
      switch (command.type) {
        case "place":
          await placeRobot(command.x, command.y, command.facing);
          break;
        case "move":
          await moveRobot();
          break;
        case "left":
          await turnLeft();
          break;
        case "right":
          await turnRight();
          break;
      }
      setValue("");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Command failed.");
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
