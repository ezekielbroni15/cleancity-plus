import Link from "next/link";
import { Container } from "react-bootstrap";
import { ArrowRight, BarChart3, Recycle, ShieldCheck, Sparkles } from "lucide-react";
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
            <div className="hero-status"><span /> Live neighborhood impact</div>
            <span className="eyebrow">Interactive Waste Management Tracker</span>
            <h1>CleanCity<span>+</span></h1>
            <p className="hero-statement">Turn everyday sorting into visible city progress.</p>
            <p className="hero-description">
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
          <div className="city-pulse" aria-label="CleanCity plus impact system preview">
            <div className="city-pulse-grid" aria-hidden="true" />
            <div className="pulse-orbit pulse-orbit-one" aria-hidden="true" />
            <div className="pulse-orbit pulse-orbit-two" aria-hidden="true" />
            <div className="pulse-core" aria-hidden="true">
              <Recycle size={34} />
            </div>
            <div className="signal-node signal-node-one"><span /> Plastic</div>
            <div className="signal-node signal-node-two"><span /> Organic</div>
            <div className="signal-node signal-node-three"><span /> Glass</div>
            <div className="pulse-readout">
              <span><Sparkles aria-hidden="true" size={14} /> City signal</span>
              <strong>Every item<br />moves the city.</strong>
              <small>Live tracking / 5 waste streams</small>
            </div>
          </div>
        </Container>
      </section>
      <Container fluid="xxl" className="home-content">
        <section className="impact-strip" aria-label="CleanCity highlights">
          {highlights.map(({ label, value, icon: Icon }, index) => (
            <article key={label} className="impact-strip-item">
              <span className="impact-number">0{index + 1}</span>
              <Icon aria-hidden="true" size={20} />
              <div><strong>{value}</strong><span>{label}</span></div>
            </article>
          ))}
        </section>
        <FactGenerator />
        <section className="brief-grid">
          <article className="surface-panel">
            <span className="feature-index">01</span>
            <span className="eyebrow">Learn</span>
            <h2>Waste education</h2>
            <p>Accordion-based guidance keeps disposal tips easy to scan on mobile and desktop.</p>
            <Link href="/waste-categories" className="text-link">Open sorting guide <ArrowRight size={16} /></Link>
          </article>
          <article className="surface-panel">
            <span className="feature-index">02</span>
            <span className="eyebrow">Track</span>
            <h2>CRUD tracker</h2>
            <p>Add, edit, delete, search, sort, and visualize recycling entries from one persistent log.</p>
            <Link href="/recycling-tracker" className="text-link">View impact dashboard <ArrowRight size={16} /></Link>
          </article>
          <article className="surface-panel">
            <span className="feature-index">03</span>
            <span className="eyebrow">Commit</span>
            <h2>Pledge board</h2>
            <p>Store personal pledges locally and show a live counter for community momentum.</p>
            <Link href="/pledge" className="text-link">Make your pledge <ArrowRight size={16} /></Link>
          </article>
        </section>
      </Container>
    </main>
  );
}
