import { deriveRecyclingEntries } from "./useRecyclingLog";

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
