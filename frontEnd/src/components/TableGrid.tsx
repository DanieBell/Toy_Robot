import type { Robot, Table } from "../types/sandbox";
import { RobotMarker } from "./RobotMarker";
import styles from "./TableGrid.module.css";

interface TableGridProps {
  table: Table;
  robot: Robot;
}

export function TableGrid({ table, robot }: TableGridProps) {
  const rows: number[] = [];
  for (let y = table.height - 1; y >= 0; y--) {
    rows.push(y);
  }

  const cols: number[] = [];
  for (let x = 0; x < table.width; x++) {
    cols.push(x);
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
              className={`${styles.cell} ${hasRobot ? styles.occupied : ""}`}
              role="gridcell"
              aria-label={`Cell ${x}, ${y}${hasRobot ? " (robot)" : ""}`}
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
