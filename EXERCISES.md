# SDET Interview Exercises

This project includes an intentional bug-hunt mode for candidates.

## Start exercise mode

1. Run:
   - Open `standalone/index.html?mode=exercise` directly in browser
2. Optional local dev server:
   - `npm.cmd run dev`
   - then open `http://localhost:5173/?mode=exercise`

## Candidate tasks

1. Fix subtotal precision bug.
   - Expected: subtotal keeps cents (e.g. `75.98`), not rounded down.
2. Fix remove-item bug.
   - Expected: clicking remove on a row removes exactly that row.
3. Fix customization state bug.
   - Expected: changing shirt color resets selected logo/icon.
4. Fix flaky Cypress test.
   - Replace fixed `cy.wait(250)` with a stable wait strategy.

## Tests

- Standard regression suite:
  - `npm.cmd run test:e2e`
- Exercise suite (contains intentional failures/flaky behavior):
  - `npm.cmd run test:e2e:exercise`
- Candidate scaffold suite (skipped TODO tests):
  - `npm.cmd run test:e2e:scaffold`

## Files candidates will likely touch

- `standalone/app.js`
- `cypress/e2e/interview-exercises.cy.js`
- `cypress/e2e/interview-candidate-scaffold.cy.js`
- `cypress/page-objects/shopPage.js`
