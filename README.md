# Arevei Restaurant

A responsive restaurant concept built with React 18, React Router 7, Vite and native CSS. Includes menu search/category filters, light/dark themes, mobile navigation, and Firestore-backed reservation and newsletter requests.

## Run locally

Use Node **22.12+** (verified with Node 24) and npm.

```sh
npm ci
npm start
```

Open `http://127.0.0.1:5173`. The website works without Firebase; sample dishes render immediately and submission controls explain that the services are unavailable.

```sh
npm test              # 23 regression tests
npm run build         # production files in dist/
npm run preview       # preview dist/ on port 4173
npm run test:browser  # production checks in headless Chrome
npm audit
```

The browser check requires Chrome, defaults to its Windows installation path, and accepts `CHROME_PATH` for another Chrome/Chromium executable. It uses a temporary profile, serves `dist/` locally, and writes screenshots to ignored `artifacts/`. Build before running it. It verifies the default, unconfigured website; real backend operations are covered by mocked unit tests.

## Connect Firebase for development

1. Copy `.env.example` to `.env.local` and fill all four `VITE_FIREBASE_*` values from your Firebase web app configuration.
2. Create a Firestore database. Validate the supplied `firestore.rules` using the Firebase emulator or console rules simulator before deploying them to your own project. No rules or data have been deployed by this change.
3. Restart Vite after changing environment variables. Production environment values must be provided when building.
4. Optionally create `menu` documents with `name`, `desc`, `category` (`appetizer`, `main`, `dessert`), and a nonnegative numeric `price`. `image` may be a local `/assets/` URL or an HTTPS URL; `imageAlt` is optional. Invalid records are discarded; an empty or unavailable live menu falls back to sample dishes.

Reservations are written to `reservations` with `status: "requested"` and a server timestamp. They **do not reserve inventory, send an email, or confirm a table**. Staff must review requests in Firebase and contact guests. Newsletter requests are stored in `newsletter`; no email delivery service is connected.

Firebase web configuration is exposed in the browser by design. Never put private server credentials in `VITE_*` variables. The supplied rules deny client reads/updates/deletes of guest data and validate create fields. They still allow anonymous creates; production needs abuse protection, a validated staff workflow, and a retention policy. See [the audit](docs/AUDIT.md).

## Images and deployment

Optimized JPGs are in `public/assets/images/web/`; original photos are preserved. On Windows, regenerate copies with:

```powershell
./scripts/optimize-images.ps1
```

Deploy `dist/` at a site's root, with unknown page routes rewritten to `index.html`. Host with HTTPS and appropriate security headers. This project has not been deployed. Verify the restaurant's address, hours, currency, dishes, allergens, photography rights and contact details before launch.

## Migration from the previous setup

- `npm start`, `npm test`, and `npm run build` still work; development now uses port **5173**, and deploy output changed from **build/** to **dist/**.
- Firebase configuration moved from hardcoded placeholders to `VITE_FIREBASE_*` build environment variables. Old `REACT_APP_*` variables are not used.
- The HTML entry is now root `index.html`; JSX entry/context files use `.jsx`. Styling is native CSS; Tailwind and unused animation/3D packages were removed.
- Tests now use Vitest. `npm test -- --watchAll=false` is no longer necessary; `npm test` runs once.
- The old worker is retired to prevent obsolete cache responses. Offline caching is not provided.
- The gRPC override applies a patched compatible 1.x release to Firebase's Node dependency. Revisit it when Firebase updates its own pinned range.
