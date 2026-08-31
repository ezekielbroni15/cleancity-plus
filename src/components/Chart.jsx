"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3 } from "lucide-react";
import EmptyState from "./EmptyState";

export default function Chart({ data }) {
  const hasData = data.some((item) => item.total > 0);

  return (
    <section className="surface-panel chart-panel" aria-labelledby="category-total-chart-title">
      <div>
        <span className="eyebrow">Live visualization</span>
        <h2 id="category-total-chart-title">Totals by category</h2>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 18, right: 12, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="impactBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dfff4f" />
                <stop offset="100%" stopColor="#26e6c8" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 8" vertical={false} stroke="rgba(113, 136, 130, 0.2)" />
            <XAxis dataKey="category" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "rgba(38, 230, 200, 0.06)" }} contentStyle={{ borderRadius: 6, border: "1px solid rgba(113, 136, 130, .2)" }} />
            <Bar dataKey="total" name="Items recycled" radius={[4, 4, 0, 0]} fill="url(#impactBar)" animationDuration={900} />
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
