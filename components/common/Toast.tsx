"use client";

import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToastStore, type ToastType } from "./toast-store";

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={18} />,
  error: <AlertCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const styles: Record<ToastType, string> = {
  success: "bg-(--success-dashboard) text-(--bg-primary-dashboard)",
  error: "bg-(--danger-dashboard) text-(--bg-primary-dashboard)",
  warning: "bg-(--warning-dashboard) text-(--text-primary-dashboard)",
  info: "bg-(--info-dashboard) text-(--bg-primary-dashboard)",
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[150] flex flex-col gap-3"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium shadow-lg ${styles[toast.type]}`}
        >
          {icons[toast.type]}
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="ml-2 rounded p-0.5 opacity-70 transition hover:opacity-100 hover:cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
