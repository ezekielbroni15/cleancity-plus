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
        <header className="page-header tracker-header">
          <div>
            <span className="eyebrow">Cleaner habits</span>
            <h1>Pledge</h1>
            <p>Write a simple promise that supports better recycling behavior.</p>
          </div>
          <div className="total-chip pledge-total">
            <strong>{pledgeCount}</strong>
            <span>total pledges</span>
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
