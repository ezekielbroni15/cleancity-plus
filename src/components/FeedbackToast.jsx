"use client";

import { Toast, ToastContainer } from "react-bootstrap";
import { CheckCircle2 } from "lucide-react";

export default function FeedbackToast({ message, show, onClose }) {
  return (
    <ToastContainer className="feedback-toast-wrap" position="bottom-end" aria-live="polite" aria-atomic="true">
      <Toast show={show} onClose={onClose} delay={2400} autohide bg="dark">
        <Toast.Body className="feedback-toast-body" role="status">
          <CheckCircle2 aria-hidden="true" size={18} />
          <span>{message}</span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
