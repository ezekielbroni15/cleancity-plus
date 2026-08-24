"use client";

import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Check, Edit3, Search, Trash2, X } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

export default function TrackerTable({
  entries,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  onEdit,
  onDelete
}) {
  const [editingId, setEditingId] = useState(null);
  const [draftQuantity, setDraftQuantity] = useState("");
  const [editError, setEditError] = useState("");

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setDraftQuantity(String(entry.quantity));
    setEditError("");
  };

  const confirmEdit = (id) => {
    const nextQuantity = Number(draftQuantity);
    if (!Number.isInteger(nextQuantity) || nextQuantity <= 0) {
      setEditError("Use a positive whole number before saving.");
      return;
    }
    onEdit(id, nextQuantity);
    setEditingId(null);
    setEditError("");
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
      {editError && <p className="field-error">{editError}</p>}
      {entries.length === 0 ? (
        <div className="empty-state">
          <strong>No matching recycling logs yet.</strong>
          <span>Add a category and quantity to see entries here.</span>
        </div>
      ) : (
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
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <span className="category-pill">{entry.category}</span>
                  </td>
                  <td>
                    {editingId === entry.id ? (
                      <Form.Control
                        aria-label={`Quantity for ${entry.category}`}
                        value={draftQuantity}
                        onChange={(event) => setDraftQuantity(event.target.value)}
                        className="quantity-edit"
                      />
                    ) : (
                      entry.quantity
                    )}
                  </td>
                  <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="table-actions">
                      {editingId === entry.id ? (
                        <>
                          <ConfirmDialog
                            title="Save quantity change?"
                            message={`Update ${entry.category} to ${draftQuantity || "this"} item(s)?`}
                            confirmLabel="Save"
                            variant="primary"
                            onConfirm={() => confirmEdit(entry.id)}
                            render={(confirm) => (
                              <Button aria-label="Save edit" size="sm" variant="outline-primary" onClick={confirm}>
                                <Check aria-hidden="true" size={15} />
                              </Button>
                            )}
                          />
                          <Button aria-label="Cancel edit" size="sm" variant="outline-secondary" onClick={() => setEditingId(null)}>
                            <X aria-hidden="true" size={15} />
                          </Button>
                        </>
                      ) : (
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
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </section>
  );
}
