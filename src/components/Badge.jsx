import { Award } from "lucide-react";

export default function Badge({ label = "10+ badge" }) {
  return (
    <span className="achievement-badge">
      <Award aria-hidden="true" size={16} />
      {label}
    </span>
  );
}
