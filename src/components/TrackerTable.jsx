"use client";

import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Check, Edit3, Inbox, Search, SearchX, Trash2, X } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import EmptyState from "./EmptyState";

export default function TrackerTable({
  entries,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  onEdit,
  onDelete,
  totalEntries = entries.length
}) {
  const [editingId, setEditingId] = useState(null);
  const [draftQuantity, setDraftQuantity] = useState("");
  const [editError, setEditError] = useState("");

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setDraftQuantity(String(entry.quantity));
    setEditError("");
  };

  const validateDraftQuantity = () => {
    const nextQuantity = Number(draftQuantity);
    if (!Number.isInteger(nextQuantity) || nextQuantity <= 0) {
      setEditError("Use a positive whole number before saving.");
      return null;
    }
    setEditError("");
    return nextQuantity;
  };

  const requestSave = (confirm) => {
    if (validateDraftQuantity() === null) return;
    confirm();
  };

  const confirmEdit = (id) => {
    const nextQuantity = validateDraftQuantity();
    if (nextQuantity === null) return;
    onEdit(id, nextQuantity);
    setEditingId(null);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftQuantity("");
    setEditError("");
  };

  const handleEditKeyDown = (event, confirm) => {
    if (event.key === "Enter") {
      event.preventDefault();
      requestSave(confirm);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEdit();
    }
  };

  const renderEditControl = (entry) => (
    <ConfirmDialog
      title="Save quantity change?"
      message={`Update ${entry.category} from ${entry.quantity} to ${draftQuantity || "this"} item(s)?`}
      confirmLabel="Save"
      variant="primary"
      tone="primary"
      onConfirm={() => confirmEdit(entry.id)}
      render={(confirm) => (
        <Form.Control
          aria-label={`Quantity for ${entry.category}`}
          value={draftQuantity}
          onChange={(event) => setDraftQuantity(event.target.value)}
          onKeyDown={(event) => handleEditKeyDown(event, confirm)}
          className="quantity-edit"
          isInvalid={Boolean(editError)}
          aria-describedby={editError ? "tracker-edit-error" : undefined}
        />
      )}
    />
  );

  const renderActions = (entry) => {
    const isEditing = editingId === entry.id;

    if (isEditing) {
      return (
        <>
          <ConfirmDialog
            title="Save quantity change?"
            message={`Update ${entry.category} to ${draftQuantity || "this"} item(s)?`}
            confirmLabel="Save"
            variant="primary"
            tone="primary"
            onConfirm={() => confirmEdit(entry.id)}
            render={(confirm) => (
              <Button aria-label="Save edit" size="sm" variant="outline-primary" onClick={() => requestSave(confirm)}>
                <Check aria-hidden="true" size={15} />
              </Button>
            )}
          />
          <Button aria-label="Cancel edit" size="sm" variant="outline-secondary" onClick={cancelEdit}>
            <X aria-hidden="true" size={15} />
          </Button>
        </>
      );
    }

    return (
      <>
        <Button aria-label={`Edit ${entry.category}`} size="sm" variant="outline-primary" onClick={() => startEdit(entry)}>
          <Edit3 aria-hidden="true" size={15} />
        </Button>
        <ConfirmDialog
          title="Delete recycling entry?"
          message={`Remove ${entry.quantity} ${entry.category} item(s) from the tracker?`}
          confirmLabel="Delete"
          onConfirm={() => onDelete(entry.id)}
          render={(confirm) => (
            <Button aria-label={`Delete ${entry.category}`} size="sm" variant="outline-danger" onClick={confirm}>
              <Trash2 aria-hidden="true" size={15} />
            </Button>
          )}
        />
      </>
    );
  };

  return (
    <section className="surface-panel tracker-table-panel">
      <div className="table-toolbar">
        <div>
          <span className="eyebrow">Browse logs</span>
          <h2>Recycling entries</h2>
        </div>
        <div className="toolbar-controls">
          <label className="search-box">
            <Search aria-hidden="true" size={17} />
            <span className="visually-hidden">Search by category</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search category"
            />
          </label>
          <Form.Select aria-label="Sort field" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="category">Sort by category</option>
            <option value="quantity">Sort by quantity</option>
          </Form.Select>
          <Form.Select
            aria-label="Sort direction"
            value={sortDirection}
            onChange={(event) => setSortDirection(event.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </div>
      </div>
      {editError && (
        <p id="tracker-edit-error" className="field-error" role="alert">
          {editError}
        </p>
      )}
      {entries.length === 0 ? (
        <EmptyState
          icon={totalEntries > 0 ? SearchX : Inbox}
          title={totalEntries > 0 ? "No matching recycling logs." : "No recycling logs yet."}
          message={
            totalEntries > 0
              ? "Try another category search or clear the search box."
              : "Add a category and quantity to see entries here."
          }
          actionLabel={totalEntries > 0 ? "Clear search" : undefined}
          onAction={totalEntries > 0 ? () => setSearchTerm("") : undefined}
        />
      ) : (
        <>
          <div className="responsive-table">
            <Table hover responsive className="align-middle">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const isEditing = editingId === entry.id;

                  return (
                    <tr key={entry.id} className={isEditing ? "editing-row" : ""}>
                      <td>
                        <span className="category-pill">{entry.category}</span>
                      </td>
                      <td>{isEditing ? renderEditControl(entry) : entry.quantity}</td>
                      <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="table-actions">{renderActions(entry)}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="mobile-log-list" aria-label="Recycling entries mobile list">
            {entries.map((entry) => {
              const isEditing = editingId === entry.id;

              return (
                <article key={entry.id} className={`mobile-log-card ${isEditing ? "editing-row" : ""}`}>
                  <div>
                    <span className="category-pill">{entry.category}</span>
                    <time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleDateString()}</time>
                  </div>
                  <div className="mobile-log-meta">
                    <span>Quantity</span>
                    <div className="mobile-log-quantity">{isEditing ? renderEditControl(entry) : <strong>{entry.quantity}</strong>}</div>
                  </div>
                  <div className="table-actions">{renderActions(entry)}</div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
