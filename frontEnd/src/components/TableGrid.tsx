import type { Robot, Table } from "../types/sandbox";
import { RobotMarker } from "./RobotMarker";
import styles from "./TableGrid.module.css";

interface TableGridProps {
  table: Table;
  robot: Robot;
  onCellClick?: (x: number, y: number) => void;
}

export function TableGrid({ table, robot, onCellClick }: TableGridProps) {
  const rows: number[] = [];
  for (let y = table.height - 1; y >= 0; y--) {
    rows.push(y);
  }

  const cols: number[] = [];
  for (let x = 0; x < table.width; x++) {
    cols.push(x);
  }

  const isClickable = onCellClick != null;

  function handleKeyDown(x: number, y: number, e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCellClick?.(x, y);
    }
  }

  return (
    <div
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat(${table.width}, 3.5rem)` }}
      role="grid"
      aria-label={`${table.width} by ${table.height} table`}
    >
      {rows.map((y) =>
        cols.map((x) => {
          const hasRobot = robot.isPlaced && robot.x === x && robot.y === y;
          return (
            <div
              key={`${x}-${y}`}
              className={`${styles.cell} ${hasRobot ? styles.occupied : ""} ${isClickable ? styles.clickable : ""}`}
              role="gridcell"
              aria-label={`Cell ${x}, ${y}${hasRobot ? " (robot)" : ""}`}
              tabIndex={isClickable ? 0 : undefined}
              onClick={isClickable ? () => onCellClick(x, y) : undefined}
              onKeyDown={
                isClickable ? (e) => handleKeyDown(x, y, e) : undefined
              }
            >
              {hasRobot && robot.facing != null && (
                <RobotMarker facing={robot.facing} />
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
