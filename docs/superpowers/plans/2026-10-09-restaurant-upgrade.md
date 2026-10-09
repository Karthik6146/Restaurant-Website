# Arevei website upgrade implementation plan

**Goal:** Improve the existing restaurant concept's design, navigation, menu discovery, accessibility and form reliability without inventing a real restaurant identity.
**Architecture:** Preserve React and the existing Firebase integration. Share navigation and footer across pages, use local menu content when Firebase is unconfigured, and only report form success after a database write. Replace retired build tooling and unused CSS/animation dependencies after the dependency audit demonstrated their maintenance risk.
**Tech stack:** React 18, patched React Router 7 and Firebase 12, native CSS, Vite 7, Vitest 4.

## Scope and acceptance criteria
- Preserve existing public routes; add a useful unknown-route page.
- Responsive ivory/green design, keyboard navigation, focus indicators, reduced motion and working dark theme.
- Search and category filters work together; local menu renders without a network request when Firebase is unconfigured.
- Reservation date/time/name/party validation, explicit unavailable/loading/error/success states. No personal data in logs or local storage.
- Newsletter cannot falsely claim subscription; gift card purchase controls cannot be inert.
- Remove duplicate footer, unrelated map, invented award claims, missing icons and broken service-worker cache behavior.
- Keep placeholder business details visibly identified; no deployment or external writes.

## Tasks
- [x] Shared layout: `src/App.jsx`, `src/index.css`, theme context/toggle, routes, HTML/manifest/icon. Verify mobile navigation, routes and storage failure.
- [x] Discovery: Home/Menu/About/Specials, shared menu content, menu components and image fallback. Verify search, filters and missing-image states.
- [x] Forms: BookingForm/ReservationForm/NewsletterSignup, Firebase config and Firestore rules. Verify unavailable, validation, successful write, rejection and duplicate-submit behavior with mocked Firebase.
- [x] Secondary pages: gift cards/careers/group dining; align theme and explicitly identify unavailable services.
- [x] Verification: production build, Vitest regressions, dependency audit and browser checks where browser tooling is available. Document findings and remaining launch requirements in `docs/AUDIT.md` and setup in README.

## Review focus
1. No Firebase credentials: render local menu immediately and disable submission with explanation.
2. Expired dates and time slots: reject before writing.
3. Firebase rejects: retain fields and offer a retry, no success claim.
4. Small screens and keyboard: reachable navigation, labels and no overflow.
5. Placeholder identity: no unverified awards, real-location map or false booking confirmation.
