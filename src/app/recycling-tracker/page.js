"use client";

import { useState } from "react";
import { Container } from "react-bootstrap";
import Badge from "@/components/Badge";
import Chart from "@/components/Chart";
import FeedbackToast from "@/components/FeedbackToast";
import TrackerForm from "@/components/TrackerForm";
import TrackerTable from "@/components/TrackerTable";
import { useRecyclingLog } from "@/hooks/useRecyclingLog";

export default function RecyclingTrackerPage() {
  const log = useRecyclingLog();
  const [notice, setNotice] = useState("");

  const showNotice = (message) => {
    setNotice("");
    window.setTimeout(() => setNotice(message), 0);
  };

  const addEntry = (entry) => {
    log.addEntry(entry);
    showNotice(`${entry.quantity} ${entry.category} item(s) added.`);
  };

  const editEntry = (id, quantity) => {
    const current = log.entries.find((entry) => entry.id === id);
    log.editEntry(id, quantity);
    showNotice(`${current?.category || "Entry"} updated to ${quantity} item(s).`);
  };

  const deleteEntry = (id) => {
    const current = log.entries.find((entry) => entry.id === id);
    log.deleteEntry(id);
    showNotice(`${current?.category || "Entry"} removed from the tracker.`);
  };

  return (
    <main className="page-shell">
      <Container fluid="xxl">
        <header className="page-header tracker-header">
          <div>
            <span className="eyebrow">Impact dashboard</span>
            <h1>Recycling Tracker</h1>
            <p>Track items by category and unlock badges when totals cross 10 items.</p>
          </div>
          <div className="total-chip">
            <strong>{log.totalItems}</strong>
            <span>items recycled</span>
          </div>
        </header>

        <section className="summary-grid" aria-label="Category badge progress">
          {log.categoryTotals.map((item) => (
            <article key={item.category} className="summary-card">
              {item.total >= 10 && <Badge label="10+ earned" />}
              <span>{item.category}</span>
              <strong>{item.total}</strong>
              <small>{item.total >= 10 ? "Badge unlocked" : `${10 - item.total} item(s) to badge`}</small>
              <div className="progress-track">
                <span style={{ width: `${Math.min((item.total / 10) * 100, 100)}%` }} />
              </div>
            </article>
          ))}
        </section>

        <section className="tracker-layout">
          <TrackerForm onAdd={addEntry} />
          <Chart data={log.categoryTotals} />
        </section>

        <TrackerTable
          entries={log.filteredEntries}
          searchTerm={log.searchTerm}
          setSearchTerm={log.setSearchTerm}
          sortBy={log.sortBy}
          setSortBy={log.setSortBy}
          sortDirection={log.sortDirection}
          setSortDirection={log.setSortDirection}
          onEdit={editEntry}
          onDelete={deleteEntry}
          totalEntries={log.entries.length}
        />
        <FeedbackToast message={notice} show={Boolean(notice)} onClose={() => setNotice("")} />
      </Container>
    </main>
  );
}
