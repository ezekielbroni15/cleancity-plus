"use client";

import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Plus } from "lucide-react";
import { categoryNames } from "@/data/wasteCategories";

export default function TrackerForm({ onAdd }) {
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    const numericQuantity = Number(quantity);

    if (!category) nextErrors.category = "Choose a waste category before adding an item.";
    if (quantity === "") nextErrors.quantity = "Quantity is required.";
    else if (Number.isNaN(numericQuantity)) nextErrors.quantity = "Quantity must be a number.";
    else if (!Number.isInteger(numericQuantity)) nextErrors.quantity = "Quantity must be a whole number.";
    else if (numericQuantity === 0) nextErrors.quantity = "Quantity must be greater than 0.";
    else if (numericQuantity < 0) nextErrors.quantity = "Quantity cannot be negative.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onAdd({ category, quantity: Number(quantity) });
    setCategory("");
    setQuantity("");
    setErrors({});
  };

  return (
    <Form className="surface-panel tracker-form" onSubmit={submit} noValidate>
      <div>
        <span className="eyebrow">Log recycled items</span>
        <h2>Add a new entry</h2>
      </div>
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" role="alert">
          Fix the highlighted fields to continue.
        </Alert>
      )}
      <Form.Group controlId="tracker-category">
        <Form.Label>Waste category</Form.Label>
        <Form.Select value={category} onChange={(event) => setCategory(event.target.value)} isInvalid={Boolean(errors.category)}>
          <option value="">Select category</option>
          {categoryNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="tracker-quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          inputMode="numeric"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          isInvalid={Boolean(errors.quantity)}
          placeholder="Example: 4"
        />
        <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="icon-button">
        <Plus aria-hidden="true" size={18} />
        Add item
      </Button>
    </Form>
  );
}
