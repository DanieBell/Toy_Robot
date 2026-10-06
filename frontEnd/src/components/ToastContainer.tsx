import type { Toast } from "../context/ToastContext";
import styles from "./ToastContainer.module.css";

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.container} aria-live="assertive">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`${styles.toast} ${styles[toast.variant]}`}
          onClick={() => onDismiss(toast.id)}
          role="alert"
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
