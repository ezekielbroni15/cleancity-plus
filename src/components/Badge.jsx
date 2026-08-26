import { Award } from "lucide-react";

export default function Badge({ label = "10+ badge" }) {
  return (
    <span className="achievement-badge">
      <span className="badge-orbit" aria-hidden="true" />
      <span className="badge-spark badge-spark-one" aria-hidden="true" />
      <span className="badge-spark badge-spark-two" aria-hidden="true" />
      <Award aria-hidden="true" size={16} />
      {label}
    </span>
  );
}
