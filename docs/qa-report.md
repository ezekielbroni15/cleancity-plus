# CleanCity+ QA Report

## Production Checks

- `npm run lint` passed.
- `npm test -- --runInBand` passed with 6 test suites and 10 tests.
- `npm run build` passed with all app routes prerendered successfully.

## Responsive Matrix

Checked Home, Waste Categories, Recycling Tracker, and Pledge at these viewport widths:

- Phone: 390px
- Tablet: 768px
- Laptop: 1366px
- TV: 1920px

All checked routes had a main landmark, labelled visible form controls, reachable interactive controls, and no horizontal overflow.

## Interaction Flows

- Tracker validation shows an error before invalid entries are added.
- Adding 12 Glass items updates the table, chart, and 10+ badge state.
- Editing the Glass quantity opens the shared confirmation dialog and saves the updated quantity.
- Deleting the Glass entry opens the shared confirmation dialog and shows feedback after deletion.
- Submitting a pledge adds it to the pledge list and keeps the character count linked to the textarea.

## Screenshot Evidence

- `docs/screenshots/home-laptop.png`
- `docs/screenshots/tracker-chart-badge.png`
- `docs/screenshots/tracker-edit-confirm.png`
- `docs/screenshots/tracker-delete-confirm.png`
- `docs/screenshots/tracker-after-delete.png`
- `docs/screenshots/pledge-submitted.png`
- `docs/screenshots/responsive-phone.png`
- `docs/screenshots/responsive-tablet.png`
- `docs/screenshots/responsive-laptop.png`
- `docs/screenshots/responsive-tv.png`
