# CleanCity+

CleanCity+ is an interactive waste management tracker built with Next.js and React. It helps users learn waste categories, log recycling activity, visualize progress, earn category badges, and make personal recycling pledges.

## Features

- Home page with a responsive hero, key recycling stats, and a no-repeat random fact generator.
- Waste Categories page with React-Bootstrap accordion content loaded from `src/data/wasteCategories.js`.
- Recycling Tracker with create, read, update, delete, confirmation dialogs, validation, localStorage persistence, search, sort, badges, and a Recharts bar chart.
- Pledge page with validated pledge submission, localStorage persistence, and a live total counter.
- Required tests for localStorage persistence, form validation, and recycling search/sort logic.

## Architecture

- `src/components`: focused UI pieces such as `TrackerForm`, `TrackerTable`, `Chart`, `PledgeForm`, and `ConfirmDialog`.
- `src/hooks`: reusable logic for persistence, recycling logs, and pledges.
- `src/data`: static facts and category guidance.
- `src/app`: Next.js routes for Home, Waste Categories, Recycling Tracker, and Pledge.

The tracker keeps filtering, sorting, totals, CRUD actions, and persistence in `useRecyclingLog`, so the table component only renders the already-prepared data. Pledges follow the same pattern through `usePledges`, and both features share the generic `useLocalStorage` hook.

## Advanced Pattern

This project uses the render-prop option through `ConfirmDialog`. The component manages its own modal open and close state, then gives callers a `confirm` function through `render`. The same dialog is reused for deleting a tracker entry and confirming an edit save, which keeps important actions consistent without hard-coding the dialog to one table action.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

## Quality Checks

```bash
npm run lint
npm test
npm run build
```
