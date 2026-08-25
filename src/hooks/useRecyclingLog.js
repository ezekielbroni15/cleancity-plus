"use client";

import { useMemo, useState } from "react";
import { categoryNames } from "@/data/wasteCategories";
import { useLocalStorage } from "./useLocalStorage";

const EMPTY_ENTRIES = [];

export function deriveRecyclingEntries(entries, searchTerm, sortBy, sortDirection) {
  const query = searchTerm.trim().toLowerCase();

  return [...entries]
    .filter((entry) => entry.category.toLowerCase().includes(query))
    .sort((a, b) => {
      const direction = sortDirection === "desc" ? -1 : 1;

      if (sortBy === "quantity") {
        return (a.quantity - b.quantity) * direction;
      }

      return a.category.localeCompare(b.category) * direction;
    });
}

export function getCategoryTotals(entries) {
  return categoryNames.map((category) => ({
    category,
    total: entries
      .filter((entry) => entry.category === category)
      .reduce((sum, entry) => sum + Number(entry.quantity), 0)
  }));
}

export function useRecyclingLog(initialEntries) {
  const [entries, setEntries] = useLocalStorage("cleancity-recycling-log", initialEntries ?? EMPTY_ENTRIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("category");
  const [sortDirection, setSortDirection] = useState("asc");

  const addEntry = ({ category, quantity }) => {
    const entry = {
      id: crypto.randomUUID(),
      category,
      quantity: Number(quantity),
      createdAt: new Date().toISOString()
    };
    setEntries((current) => [entry, ...current]);
  };

  const editEntry = (id, quantity) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, quantity: Number(quantity), updatedAt: new Date().toISOString() } : entry
      )
    );
  };

  const deleteEntry = (id) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  };

  const filteredEntries = useMemo(
    () => deriveRecyclingEntries(entries, searchTerm, sortBy, sortDirection),
    [entries, searchTerm, sortBy, sortDirection]
  );

  const categoryTotals = useMemo(() => getCategoryTotals(entries), [entries]);
  const totalItems = categoryTotals.reduce((sum, item) => sum + item.total, 0);
  const earnedBadges = categoryTotals.filter((item) => item.total >= 10);

  return {
    entries,
    filteredEntries,
    categoryTotals,
    totalItems,
    earnedBadges,
    addEntry,
    editEntry,
    deleteEntry,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection
  };
}
