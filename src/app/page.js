import Link from "next/link";
import { Container } from "react-bootstrap";
import { ArrowRight, BarChart3, Recycle, ShieldCheck } from "lucide-react";
import FactGenerator from "@/components/FactGenerator";

const highlights = [
  { label: "Waste streams", value: "5", icon: Recycle },
  { label: "Badge target", value: "10+", icon: ShieldCheck },
  { label: "Live charts", value: "Real-time", icon: BarChart3 }
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero-section">
        <Container fluid="xxl" className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Interactive Waste Management Tracker</span>
            <h1>CleanCity+</h1>
            <p>
              Learn how to sort waste, log recycling activity, watch your impact grow, and make a public pledge for
              cleaner neighborhoods.
            </p>
            <div className="hero-actions">
              <Link href="/recycling-tracker" className="primary-link">
                Start tracking
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link href="/waste-categories" className="secondary-link">
                Explore categories
              </Link>
            </div>
          </div>
          <div className="impact-console" aria-label="CleanCity plus impact summary">
            {highlights.map(({ label, value, icon: Icon }) => (
              <div key={label} className="metric-tile">
                <Icon aria-hidden="true" size={21} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
            <div className="scan-card">
              <div className="scan-line" />
              <span>Sorting signal</span>
              <strong>Clean, dry, separated</strong>
            </div>
          </div>
        </Container>
      </section>
      <Container fluid="xxl" className="home-content">
        <FactGenerator />
        <section className="brief-grid">
          <article className="surface-panel">
            <span className="eyebrow">Learn</span>
            <h2>Waste education</h2>
            <p>Accordion-based guidance keeps disposal tips easy to scan on mobile and desktop.</p>
          </article>
          <article className="surface-panel">
            <span className="eyebrow">Track</span>
            <h2>CRUD tracker</h2>
            <p>Add, edit, delete, search, sort, and visualize recycling entries from one persistent log.</p>
          </article>
          <article className="surface-panel">
            <span className="eyebrow">Commit</span>
            <h2>Pledge board</h2>
            <p>Store personal pledges locally and show a live counter for community momentum.</p>
          </article>
        </section>
      </Container>
    </main>
  );
}
