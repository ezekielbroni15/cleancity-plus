import { MessageSquareHeart } from "lucide-react";
import EmptyState from "./EmptyState";

export default function PledgeList({ pledges }) {
  return (
    <section className="surface-panel pledge-list">
      <span className="eyebrow">Community board</span>
      <h2>Recent pledges</h2>
      {pledges.length === 0 ? (
        <EmptyState icon={MessageSquareHeart} title="No pledges yet." message="Be the first person to add one." />
      ) : (
        <div className="pledge-stack">
          {pledges.map((pledge) => (
            <article key={pledge.id} className="pledge-card">
              <p>{pledge.text}</p>
              <time dateTime={pledge.createdAt}>{new Date(pledge.createdAt).toLocaleString()}</time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
