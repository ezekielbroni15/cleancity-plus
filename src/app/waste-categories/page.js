"use client";

import { Accordion, Container } from "react-bootstrap";
import { wasteCategories } from "@/data/wasteCategories";

export default function WasteCategoriesPage() {
  return (
    <main id="main-content" className="page-shell" tabIndex={-1}>
      <Container fluid="xxl">
        <header className="page-header">
          <span className="eyebrow">Sorting guide</span>
          <h1>Waste Categories</h1>
          <p>Use these quick rules to keep recyclable streams clean and useful.</p>
        </header>
        <Accordion defaultActiveKey="0" className="category-accordion">
          {wasteCategories.map((category, index) => (
            <Accordion.Item eventKey={String(index)} key={category.name}>
              <Accordion.Header>
                <span className="accordion-dot" style={{ "--accent": category.accent }} />
                {category.name}
              </Accordion.Header>
              <Accordion.Body>
                <p>{category.summary}</p>
                <ul>
                  {category.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </main>
  );
}
