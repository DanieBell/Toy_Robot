import { useSandbox } from "../context/SandboxContext";
import { useToast } from "../context/ToastContext";
import { formatReport } from "../utils/formatReport";

export function useRobotActions() {
  const {
    sandbox,
    placeRobot,
    moveRobot,
    turnLeft,
    turnRight,
    isMoving,
    isTurning,
  } = useSandbox();
  const { showToast } = useToast();

  async function run(action: () => Promise<void>, fallback: string) {
    try {
      await action();
    } catch (err) {
      showToast(err instanceof Error ? err.message : fallback);
    }
  }

  function report() {
    if (!sandbox?.robot.isPlaced) {
      showToast("Place the robot before reporting.");
      return;
    }
    showToast(formatReport(sandbox.robot), "info");
  }

  return {
    place: (x: number, y: number, facing: Parameters<typeof placeRobot>[2]) =>
      run(() => placeRobot(x, y, facing), "Failed to place robot."),
    move: () => run(moveRobot, "Move failed."),
    left: () => run(turnLeft, "Turn failed."),
    right: () => run(turnRight, "Turn failed."),
    report,
    showToast,
    isBusy: isMoving || isTurning,
  };
}
