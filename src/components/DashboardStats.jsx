import { Activity, Award, Layers3, Target } from "lucide-react";

const icons = {
  totalEntries: Activity,
  activeCategories: Layers3,
  earnedBadges: Award,
  leadingCategory: Target
};

export default function DashboardStats({ stats }) {
  return (
    <section className="dashboard-stats" aria-label="Recycling dashboard statistics">
      {stats.map((stat) => {
        const Icon = icons[stat.key] || Activity;

        return (
          <article key={stat.key} className="stat-card">
            <span className="stat-icon">
              <Icon aria-hidden="true" size={19} />
            </span>
            <div>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.help}</small>
            </div>
          </article>
        );
      })}
    </section>
  );
}
