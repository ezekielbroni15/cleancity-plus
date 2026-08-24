"use client";

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmDialog({
  title = "Confirm action",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  render
}) {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  const confirm = () => {
    onConfirm?.();
    hide();
  };

  return (
    <>
      {render(show)}
      <Modal show={open} onHide={hide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={hide}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={confirm}>
            {confirmLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
