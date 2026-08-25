"use client";

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ConfirmDialog({
  title = "Confirm action",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  render,
  tone = variant === "danger" ? "danger" : "primary"
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
      <Modal show={open} onHide={hide} centered dialogClassName={`confirm-dialog confirm-dialog-${tone}`}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="confirm-dialog-icon">
              {tone === "danger" ? (
                <AlertTriangle aria-hidden="true" size={20} />
              ) : (
                <CheckCircle2 aria-hidden="true" size={20} />
              )}
            </span>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
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
