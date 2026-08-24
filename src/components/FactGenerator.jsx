"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { Shuffle } from "lucide-react";
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
      <span className="eyebrow">Did You Know?</span>
      <p>{facts[factIndex]}</p>
      <Button className="icon-button" onClick={nextFact}>
        <Shuffle aria-hidden="true" size={17} />
        New fact
      </Button>
    </section>
  );
}
