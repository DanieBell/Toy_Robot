import { useRobotActions } from "../hooks/useRobotActions";
import type { Robot } from "../types/sandbox";
import styles from "./RobotControls.module.css";

interface RobotControlsProps {
  robot: Robot;
}

export function RobotControls({ robot }: RobotControlsProps) {
  const { move, left, right, report, isBusy } = useRobotActions();

  const disabled = !robot.isPlaced || isBusy;

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.button}
          onClick={move}
          disabled={disabled}
        >
          {isBusy ? "Working\u2026" : "Move"}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={left}
          disabled={disabled}
        >
          Left
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={right}
          disabled={disabled}
        >
          Right
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={report}
          disabled={!robot.isPlaced || isBusy}
        >
          Report
        </button>
      </div>
    </div>
  );
}
