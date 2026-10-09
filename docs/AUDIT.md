# Arevei website audit and upgrade

Reviewed on **9 October 2026**. Scope: all source files, public assets/configuration, routes, form flows, dependencies and runtime pages. No production site or database was modified.

## Research

The repository uses the Arevei brand but has no deployment URL. Searches for the brand and project owner did not establish a verified public restaurant site. The original source contained placeholder addresses, phone numbers and unsupported award claims. This is treated as a restaurant concept; real business facts were not invented.

The upgrade applies these findings:

- Make the menu, reservations, hours and location easy to discover, and prioritize mobile access. [OpenTable's restaurant website guide](https://www.opentable.com/restaurant-solutions/resources/restaurant-website-creation/)
- Use explicit labels for form controls and visible error feedback. [W3C form labels](https://www.w3.org/WAI/tutorials/forms/labels/), [W3C form error guidance](https://design-system.w3.org/styles/form-errors.html)
- Enforce database permissions and validation independently of the browser. [Firebase rules](https://firebase.google.com/docs/firestore/security/get-started), [Firebase data validation](https://firebase.google.com/docs/rules/data-validation)
- Replace the retired Create React App setup. [React's retirement announcement](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), [Vite setup](https://vite.dev/guide/), [Vite environment variables](https://vite.dev/guide/env-and-mode.html), [Vitest](https://vitest.dev/guide/)

## Fixed issues

| Finding | Change |
| --- | --- |
| Mobile users could not navigate between pages | Responsive menu with expanded state, Escape dismissal and keyboard focus handling |
| Transparent header, theme control overlap and inconsistent backgrounds | Shared ivory/forest design, legible sticky header, inline theme control and both themes across pages |
| Duplicate home footer and many links to nonexistent pages | One shared footer; only supported routes; useful 404 page |
| Page changes retained old scroll position and generic title | Route-specific titles, scroll reset and main-content focus; visitor section anchor |
| Booking did nothing beyond logging guest data | Validated Firestore request flow, pending/error/success states and duplicate-submit guard; no PII logs |
| Newsletter claimed success without storing anything | Consent required; only persisted requests produce success; unavailable state when unconfigured |
| Gift card buttons were inert; contact/map/awards were unverified | Explicit planned-service states; removed unrelated map, invented awards and placeholder contact links |
| Firebase initialized with placeholder keys and delayed the menu | Environment configuration, no initialization when absent, immediate usable sample menu |
| Remote menu content could crash rendering | Schema validation, safe image URLs, fallback data and accessible empty states |
| Menu was difficult to browse | Responsive dish grid with combined ingredient search and category filters |
| Image component stayed invisible if loading failed | Native lazy loading, stable image boxes and accessible image-error fallback |
| Large original photos and 19.6 MB autoplay video hurt loading | No autoplay video; 1200px web image copies, 14,061,347 → 1,796,538 bytes (87.2% smaller); originals preserved |
| Theme storage exceptions could crash the app | Graceful storage handling; theme still works when storage is blocked |
| Service worker referenced nonexistent assets and could serve stale files | Unregister the app's worker; retirement worker deletes only its legacy cache |
| Missing favicon and incorrectly declared image icons | Real SVG favicon/manifest icon and restaurant-specific metadata |
| Retired tooling and vulnerable dependency lockfile | Vite/Vitest migration; patched Router/Firebase; removed unused CSS, animation and 3D dependencies; patched gRPC 1.x override |

## Verification

- `npm test`: **23 tests passed** across four files. Includes invalid dates/party sizes, combined search/filters, malformed remote content, no-config behavior, duplicate submits, persistence failures, consent, image fallback and blocked theme storage.
- `npm run build`: successful Vite production build. Initial application JavaScript is about **69.5 KB gzipped**. Firebase is split into on-demand chunks; the Firestore chunk exceeds Vite's 500 KB uncompressed size advisory, but the default unconfigured site does not download it.
- `npm run test:browser`: nine routes (eight pages and a 404), four widths (**320, 768, 1024, 1440px**) in both themes; menu search/filters, mobile navigation/Escape, route focus, theme persistence, form labels, reduced motion and unavailable submission controls. Chrome reports no page exceptions, error-level console messages, failed HTTP responses or broken loaded images.
- `npm audit`: **0 known vulnerabilities**, down from **109** in the original lockfile. Final dependency report is generated in ignored `artifacts/dependency-audit.json`. Advisory data can change; rerun before release.
- Previews: `artifacts/desktop.png`, `artifacts/mobile.png`, `artifacts/desktop-dark.png`. Originals and optimized photography were visually inspected.

## Remaining launch requirements

1. **Business identity:** verify the location/timezone, opening hours, currency, contact channels, menu prices/allergens and image usage rights. Sample menu/hour labels remain deliberately visible.
2. **Backend activation:** configure your Firebase app and verify rules in an emulator/simulator. The rules file is a proposed policy, not deployed or emulator-tested. Real Firestore writes were not attempted; tests mock Firebase to avoid creating guest data.
3. **Abuse protection:** anonymous creates are permitted by the supplied rules, with field allowlists/length/type limits and no client access to saved guest data. Add server-side rate limits and bot/App Check protection before opening publicly. Client validation is a UX check; the server must enforce real dates, capacity and availability.
4. **Staff operation:** requests require staff review and confirmation. No notifications, table inventory locking, payments, newsletter delivery, unsubscribe endpoint or administration UI is implemented. Define handling/retention and newsletter unsubscribe before sending campaigns.
5. **Time and network behavior:** current slot logic uses the guest's local timezone and sample hours with 90 minutes before closing. Configure venue timezone and real service rules for launch. Firestore writes may remain pending on an interrupted connection; success is shown only after acknowledgement.
6. **Hosting:** deploy `dist/`, configure SPA route rewrites, HTTPS/security headers, verified SEO/social details, and production smoke tests. No deployment was authorized or performed.
7. **Coverage limits:** verified with headless Chrome and DOM/unit tests; Safari/Firefox, assistive technology, a full WCAG/axe audit, live backend integration and load testing were not performed. The application no longer has the CRA ESLint build step; Vite compilation and behavioral tests are the current checks.

## Removed code

Unreferenced custom cursor, old hero/story/testimonial carousels, parallax scene, image-only table map, time picker and unused button were removed after caller searches. The old reservation component/page imports remain small aliases to the real booking implementation. The original video and full-resolution photographs remain available as source assets; they are no longer requested by the homepage.
