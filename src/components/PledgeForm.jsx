"use client";

import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Send } from "lucide-react";

const LIMIT = 280;

export default function PledgeForm({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError("Pledge text is required.");
      return;
    }
    if (trimmed.length > LIMIT) {
      setError(`Keep your pledge under ${LIMIT} characters.`);
      return;
    }

    onAdd(trimmed);
    setText("");
    setError("");
  };

  return (
    <Form className="surface-panel pledge-form" onSubmit={submit} noValidate>
      <span className="eyebrow">Personal commitment</span>
      <h2>Make a pledge</h2>
      {error && (
        <Alert variant="danger" role="alert">
          {error}
        </Alert>
      )}
      <Form.Group controlId="pledge-text">
        <Form.Label>Your pledge</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          maxLength={LIMIT + 40}
          value={text}
          onChange={(event) => setText(event.target.value)}
          isInvalid={Boolean(error)}
          aria-describedby="pledge-character-count"
          placeholder="I will sort my household waste every week..."
        />
        <div id="pledge-character-count" className={`char-count ${text.length > LIMIT ? "over" : ""}`} aria-live="polite">
          {text.length}/{LIMIT}
        </div>
      </Form.Group>
      <Button type="submit" className="icon-button">
        <Send aria-hidden="true" size={17} />
        Submit pledge
      </Button>
    </Form>
  );
}
