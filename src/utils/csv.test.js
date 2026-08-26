import { buildTrackerCsv } from "./csv";

test("buildTrackerCsv escapes tracker rows for download", () => {
  const csv = buildTrackerCsv([
    {
      category: 'Plastic "Bottles"',
      quantity: 3,
      createdAt: "2026-08-26T00:00:00.000Z"
    }
  ]);

  expect(csv).toContain('"Category","Quantity","Created At","Updated At"');
  expect(csv).toContain('"Plastic ""Bottles""","3","2026-08-26T00:00:00.000Z",""');
});
