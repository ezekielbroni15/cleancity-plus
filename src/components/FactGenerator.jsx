"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { Quote, Shuffle } from "lucide-react";
import { facts } from "@/data/facts";

export default function FactGenerator() {
  const [factIndex, setFactIndex] = useState(0);

  const nextFact = () => {
    if (facts.length <= 1) return;

    let nextIndex = factIndex;
    while (nextIndex === factIndex) {
      nextIndex = Math.floor(Math.random() * facts.length);
    }
    setFactIndex(nextIndex);
  };

  return (
    <section className="fact-panel" aria-live="polite">
      <div className="fact-mark" aria-hidden="true"><Quote size={28} /></div>
      <div className="fact-content">
        <span className="eyebrow">Did You Know?</span>
        <p>{facts[factIndex]}</p>
      </div>
      <Button className="fact-button" onClick={nextFact} aria-label="New fact">
        <Shuffle aria-hidden="true" size={18} />
      </Button>
    </section>
  );
}
