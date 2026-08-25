import { ArrowRight, SearchX } from "lucide-react";

export default function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
  icon: Icon = SearchX,
  tone = "default"
}) {
  return (
    <div className={`empty-state empty-state-${tone}`}>
      <span className="empty-state-icon">
        <Icon aria-hidden="true" size={24} />
      </span>
      <strong>{title}</strong>
      <span>{message}</span>
      {actionLabel && onAction && (
        <button type="button" className="empty-state-action" onClick={onAction}>
          {actionLabel}
          <ArrowRight aria-hidden="true" size={15} />
        </button>
      )}
    </div>
  );
}
