import { useSandbox } from "../context/SandboxContext";
import { useToast } from "../context/ToastContext";
import type { Robot } from "../types/sandbox";
import { formatReport } from "../utils/formatReport";
import styles from "./RobotControls.module.css";

interface RobotControlsProps {
  robot: Robot;
}

export function RobotControls({ robot }: RobotControlsProps) {
  const { moveRobot, turnLeft, turnRight, isMoving, isTurning } = useSandbox();
  const { showToast } = useToast();

  const disabled = !robot.isPlaced;
  const busy = isMoving || isTurning;

  async function handleMove() {
    try {
      await moveRobot();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Move failed.");
    }
  }

  async function handleLeft() {
    try {
      await turnLeft();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Turn failed.");
    }
  }

  async function handleRight() {
    try {
      await turnRight();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Turn failed.");
    }
  }

  function handleReport() {
    if (!robot.isPlaced) {
      return;
    }
    showToast(formatReport(robot), "info");
  }

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.button}
          onClick={handleMove}
          disabled={disabled || busy}
        >
          {isMoving ? "Moving\u2026" : "Move"}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={handleLeft}
          disabled={disabled || busy}
        >
          Left
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={handleRight}
          disabled={disabled || busy}
        >
          Right
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={handleReport}
          disabled={disabled || busy}
        >
          Report
        </button>
      </div>
    </div>
  );
}
