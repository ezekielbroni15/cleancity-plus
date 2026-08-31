"use client";

import { Accordion, Container } from "react-bootstrap";
import { ArrowDown, CircleCheckBig } from "lucide-react";
import { wasteCategories } from "@/data/wasteCategories";

export default function WasteCategoriesPage() {
  return (
    <main id="main-content" className="page-shell" tabIndex={-1}>
      <Container fluid="xxl">
        <header className="page-header atlas-header">
          <div>
            <span className="eyebrow">Material atlas / 05 streams</span>
            <h1>Waste<br />Categories</h1>
          </div>
          <div className="atlas-intro">
            <p>Use these quick rules to keep recyclable streams clean, useful, and moving in the right direction.</p>
            <a href="#category-guide" className="circle-link" aria-label="Go to category guide"><ArrowDown size={20} /></a>
          </div>
        </header>
        <section id="category-guide" className="atlas-layout">
          <aside className="atlas-index" aria-label="Waste stream index">
            <span className="eyebrow">Stream index</span>
            {wasteCategories.map((category, index) => (
              <div key={category.name} style={{ "--accent": category.accent }}>
                <span>0{index + 1}</span><strong>{category.name}</strong>
              </div>
            ))}
          </aside>
          <Accordion defaultActiveKey="0" className="category-accordion">
            {wasteCategories.map((category, index) => (
              <Accordion.Item eventKey={String(index)} key={category.name} style={{ "--accent": category.accent }}>
                <Accordion.Header>
                  <span className="accordion-number">0{index + 1}</span>
                  <span className="accordion-dot" />
                  <span className="accordion-name">{category.name}</span>
                  <span className="accordion-summary">{category.summary}</span>
                </Accordion.Header>
                <Accordion.Body>
                  <p>{category.summary}</p>
                  <ul>
                    {category.tips.map((tip) => (
                      <li key={tip}><CircleCheckBig aria-hidden="true" size={18} /> <span>{tip}</span></li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </section>
      </Container>
    </main>
  );
}
