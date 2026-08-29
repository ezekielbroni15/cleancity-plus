# CleanCity+

CleanCity+ is an interactive waste management tracker built with Next.js and React. It helps users learn waste categories, log recycling activity, visualize progress, earn category badges, and make personal recycling pledges.

## Tech Stack

- Next.js App Router and React client components
- React-Bootstrap for layout, accordions, cards, forms, modals, and tables
- Recharts for live recycling data visualization
- Custom React hooks for localStorage persistence and app logic
- Jest and React Testing Library for core behavior tests

## Features

- Home page with a responsive hero, key recycling stats, and a no-repeat random fact generator.
- Waste Categories page with React-Bootstrap accordion content loaded from `src/data/wasteCategories.js`.
- Recycling Tracker with create, read, update, delete, confirmation dialogs, validation, localStorage persistence, search, sort, badges, and a Recharts bar chart.
- Pledge page with validated pledge submission, localStorage persistence, and a live total counter.
- Stretch features: persisted dark mode, tracker CSV export, animated badge unlocks, dashboard statistics, PWA metadata, app icons, and an offline fallback.
- Empty states for tracker logs, filtered search results, chart data, and pledges.
- Accessible labels, keyboard-reachable controls, focus-visible styles, live feedback messages, and a skip link.

## Architecture

- `src/components`: focused UI pieces such as `TrackerForm`, `TrackerTable`, `Chart`, `PledgeForm`, and `ConfirmDialog`.
- `src/hooks`: reusable logic for persistence, recycling logs, and pledges.
- `src/data`: static facts and category guidance.
- `src/utils`: reusable utility functions such as tracker CSV generation.
- `src/app`: Next.js routes for Home, Waste Categories, Recycling Tracker, and Pledge.
- `public`: installable app assets, manifest, service worker, and offline fallback.

The tracker keeps filtering, sorting, totals, CRUD actions, and persistence in `useRecyclingLog`, so the table component only renders the already-prepared data. Pledges follow the same pattern through `usePledges`, and both features share the generic `useLocalStorage` hook.

## Data Flow

1. `useLocalStorage` works like `useState`, but stores updates under a named localStorage key.
2. `useRecyclingLog` owns tracker entries, CRUD actions, search, sort, category totals, dashboard stats, and badge eligibility.
3. `usePledges` owns pledge persistence and exposes the derived pledge count.
4. UI components receive prepared data and callbacks as props, keeping rendering separate from business logic.

## Advanced Pattern

This project uses the render-prop option through `ConfirmDialog`. The component manages its own modal open and close state, then gives callers a `confirm` function through `render`. The same dialog is reused for deleting a tracker entry and confirming an edit save, which keeps important actions consistent without hard-coding the dialog to one table action.

## Validation and Error Handling

- Tracker category must come from the fixed waste-category list.
- Tracker quantity must be a positive whole number, with separate messages for missing, non-numeric, decimal, zero, and negative input.
- Pledge text is required, limited to 280 characters, and includes a live character count.
- The chart shows a friendly placeholder state when there is no recycling data yet.

## Responsive and Accessibility Notes

The layout is designed for phone, tablet, laptop, and large-screen widths. Forms use visible labels, compact controls reflow at mobile widths, tracker rows switch to mobile cards on small screens, and interactive controls have keyboard focus styles. The app also includes a skip link, labelled confirmation dialogs, live toast feedback, and polite character-count updates.

## PWA and Offline Support

CleanCity+ includes a web app manifest, SVG app icons, production service-worker registration, and an offline fallback page. The service worker caches core routes and static assets so the installed app can still present a useful offline screen if the network drops.

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

Current test coverage proves localStorage persistence, tracker validation, recycling search and sort logic, empty totals/dashboard behavior, no-repeat facts, pledge validation, pledge trimming, and CSV escaping.

## Final Submission Checklist

- GitHub repository with the complete source code.
- Live demo deployed on Vercel or Netlify.
- Screenshots or GIFs showing tracker add/edit/delete, chart updates, badge unlock, and pledge submission. Current screenshots are saved in `docs/screenshots`.
- Passing lint, tests, and production build before submission.

## QA Evidence

See `docs/qa-report.md` for the latest production checks, responsive matrix, interaction flow notes, and screenshot list.
