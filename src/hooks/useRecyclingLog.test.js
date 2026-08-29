import { deriveRecyclingEntries, getCategoryTotals, getDashboardStats } from "./useRecyclingLog";

test("useRecyclingLog search and sort logic returns filtered sorted entries", () => {
  const entries = [
    { id: "1", category: "Plastic", quantity: 4 },
    { id: "2", category: "Paper", quantity: 11 },
    { id: "3", category: "Glass", quantity: 7 },
    { id: "4", category: "Plastic", quantity: 15 }
  ];

  const result = deriveRecyclingEntries(entries, "pla", "quantity", "desc");

  expect(result).toEqual([
    { id: "4", category: "Plastic", quantity: 15 },
    { id: "1", category: "Plastic", quantity: 4 }
  ]);
});

test("useRecyclingLog dashboard stats summarize entries and badges", () => {
  const entries = [
    { id: "1", category: "Plastic", quantity: 12 },
    { id: "2", category: "Glass", quantity: 4 }
  ];
  const totals = getCategoryTotals(entries);
  const earnedBadges = totals.filter((item) => item.total >= 10);
  const stats = getDashboardStats(entries, totals, earnedBadges);

  expect(stats).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ key: "totalEntries", value: 2 }),
      expect.objectContaining({ key: "activeCategories", value: 2 }),
      expect.objectContaining({ key: "earnedBadges", value: 1 }),
      expect.objectContaining({ key: "leadingCategory", value: "Plastic" })
    ])
  );
});

test("getCategoryTotals includes every waste category and handles empty data", () => {
  const totals = getCategoryTotals([]);
  const stats = getDashboardStats([], totals, []);

  expect(totals).toHaveLength(5);
  expect(totals.every((item) => item.total === 0)).toBe(true);
  expect(stats).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ key: "totalEntries", value: 0 }),
      expect.objectContaining({ key: "activeCategories", value: 0 }),
      expect.objectContaining({ key: "earnedBadges", value: 0 }),
      expect.objectContaining({ key: "leadingCategory", value: "None yet" })
    ])
  );
});

test("deriveRecyclingEntries does not mutate the original list while sorting", () => {
  const entries = [
    { id: "1", category: "Glass", quantity: 2 },
    { id: "2", category: "Paper", quantity: 8 }
  ];

  const result = deriveRecyclingEntries(entries, "", "category", "desc");

  expect(result.map((entry) => entry.category)).toEqual(["Paper", "Glass"]);
  expect(entries.map((entry) => entry.category)).toEqual(["Glass", "Paper"]);
});
