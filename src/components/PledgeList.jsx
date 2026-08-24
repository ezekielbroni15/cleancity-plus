export default function PledgeList({ pledges }) {
  return (
    <section className="surface-panel pledge-list">
      <span className="eyebrow">Community board</span>
      <h2>Recent pledges</h2>
      {pledges.length === 0 ? (
        <div className="empty-state">
          <strong>No pledges yet.</strong>
          <span>Be the first person to add one.</span>
        </div>
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
