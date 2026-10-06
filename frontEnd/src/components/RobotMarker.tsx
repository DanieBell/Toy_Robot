import type { Direction } from '../types/sandbox'
import styles from './RobotMarker.module.css'

interface RobotMarkerProps {
  facing: Direction
}

const facingClass: Record<Direction, string> = {
  North: styles.north,
  East: styles.east,
  South: styles.south,
  West: styles.west,
}

export function RobotMarker({ facing }: RobotMarkerProps) {
  return (
    <div
      className={`${styles.robot} ${facingClass[facing]}`}
      role="img"
      aria-label={`Robot facing ${facing}`}
    >
      ▲
    </div>
  )
}
