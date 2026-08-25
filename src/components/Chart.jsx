"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3 } from "lucide-react";
import EmptyState from "./EmptyState";

export default function Chart({ data }) {
  const hasData = data.some((item) => item.total > 0);

  return (
    <section className="surface-panel chart-panel">
      <div>
        <span className="eyebrow">Live visualization</span>
        <h2>Totals by category</h2>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 18, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(16, 26, 38, 0.1)" />
            <XAxis dataKey="category" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "rgba(22, 199, 183, 0.08)" }} />
            <Bar dataKey="total" name="Items recycled" radius={[8, 8, 0, 0]} fill="#16c7b7" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="chart-empty" role="status">
          <div className="ghost-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <EmptyState
            icon={BarChart3}
            tone="chart"
            title="No chart data yet"
            message="Your category totals will appear as soon as you add recycled items."
          />
        </div>
      )}
    </section>
  );
}
