import { useEffect, useRef } from "react";
import styles from "./ActionLog.module.css";

interface ActionLogProps {
  entries: string[];
}

export function ActionLog({ entries }: ActionLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [entries.length]);

  return (
    <div className={styles.column}>
      <section className={styles.log} aria-label="Action log">
        <h2 className={styles.heading}>Action Log</h2>
        <div className={styles.scroll} ref={scrollRef}>
          {entries.length === 0 ? (
            <p className={styles.empty}>No actions yet.</p>
          ) : (
            <ol className={styles.list}>
              {entries.map((entry, index) => (
                <li key={index} className={styles.entry}>
                  {entry}
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </div>
  );
}
