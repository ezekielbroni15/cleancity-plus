"use client";

import { Container } from "react-bootstrap";
import PledgeForm from "@/components/PledgeForm";
import PledgeList from "@/components/PledgeList";
import { usePledges } from "@/hooks/usePledges";

export default function PledgePage() {
  const { pledges, addPledge, pledgeCount } = usePledges();

  return (
    <main id="main-content" className="page-shell" tabIndex={-1}>
      <Container fluid="xxl">
        <header className="page-header pledge-hero">
          <div>
            <span className="eyebrow">Cleaner habits / Shared momentum</span>
            <h1>Make it<br />a promise.</h1>
            <p>Write one clear commitment that moves better recycling behavior from intention into action.</p>
          </div>
          <div className="total-chip pledge-total">
            <strong>{pledgeCount}</strong>
            <span>promises in motion</span>
          </div>
        </header>
        <section className="pledge-layout">
          <PledgeForm onAdd={addPledge} />
          <PledgeList pledges={pledges} />
        </section>
      </Container>
    </main>
  );
}
