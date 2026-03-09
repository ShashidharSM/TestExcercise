# SDET Interview Website

Client-side React app for SDET interview exercises.

Primary delivery is a **standalone website** in `standalone/`:
- no build step required to run the website
- React is fetched directly in-browser from CDN
- all app logic is client-side

Features:
- Login page (credentials loaded from local JSON)
- Shopping cart with sample items
- Conditional shirt customization options shown in a table after color selection
- Cypress E2E tests using Page Object Model

## Run website (standalone)

Open this file directly in browser:

`standalone/index.html`

No `npm install` is needed to use the website itself.

## Optional: run with Vite (developer mode)

```bash
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:5173`.

## Test user

- Username: `candidate1`
- Password: `Pass123!`

## Cypress

```bash
npm.cmd install
npm.cmd run test:e2e
```

or interactive runner:

```bash
npm.cmd run test:e2e:open
```

## Interview exercise mode

Run standalone app with:

`standalone/index.html?mode=exercise`

Exercise mode introduces intentional bugs for candidates to debug.

Run the targeted exercise tests:

```bash
npm.cmd run test:e2e:exercise
```

Run candidate scaffold tests (skipped placeholders to fill in):

```bash
npm.cmd run test:e2e:scaffold
```

See full instructions in `EXERCISES.md`.
