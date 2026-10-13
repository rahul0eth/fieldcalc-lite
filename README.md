# FieldCalc Lite

**Useful math. Zero clutter.**

A fast, installable, offline-capable web app for everyday construction, MEP, and site-work
calculations. No accounts, no backend, no tracking, no API keys. Every value you type stays
in your own browser.

Built as plain HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

---

## What it does

Four calculators that recalculate as you type, plus a local history of your recent results.

| Calculator | Inputs | Outputs |
|---|---|---|
| **Area & Volume** | Length, width, height/depth, units (feet or inches) | Area in ft², volume in ft³ |
| **Slope** | Rise, run | Percent grade, angle in degrees |
| **Round Duct Airflow** | Diameter (in), velocity (FPM) | Airflow in CFM, duct area in ft² |
| **Pressure Conversion** | Inches water column | Pascals, psi |

### Formulas

```
Area      = length × width                      (inches converted to feet first)
Volume    = length × width × height
Grade %   = rise ÷ run × 100
Angle °   = atan2(rise, run) × 180 ÷ π
CFM       = velocity × π × (diameter_ft)² ÷ 4   where diameter_ft = diameter_in ÷ 12
Pascals   = in. w.c. × 249.0889
PSI       = in. w.c. × 0.0360912
```

Invalid and zero-run inputs are handled explicitly — the app never displays `NaN` or `Infinity`.
A zero run is reported as vertical with an undefined grade rather than a divide-by-zero result.

### Recent results

Each completed calculation is saved to browser `localStorage` (key `fieldcalc.recents.v1`,
12 entries max). Nothing is transmitted anywhere. **Clear saved results** erases them.
Filling several fields in one calculator coalesces into a single entry rather than stacking.

---

## Local testing

No build, no install, no npm. Serve the `dist/` folder over HTTP:

```bash
python3 -m http.server 4178 --directory dist
```

Then open <http://localhost:4178>.

You must use a real HTTP server rather than opening `index.html` directly from the
filesystem — service workers and the web manifest do not run from `file://`.

To verify PWA behavior: load the page once, stop the server, then reload. The app should
still open and calculate, served from the service worker cache.

---

## Free deployment with Cloudflare Pages

The app is already static, so there is no build command.

1. Sign in at <https://dash.cloudflare.com> (free account).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorize GitHub and select the `fieldcalc-lite` repository.
4. Configure the build:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `dist`
   - **Root directory:** `/`
5. **Save and Deploy.**

You get a `https://<project>.pages.dev` URL in about a minute, HTTPS included. Every later
push to `main` redeploys automatically. HTTPS matters: service workers and the install
prompt only work on HTTPS or `localhost`.

### Alternative: GitHub Pages

`.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on every push to `main`.
Enable it once under **Settings → Pages → Build and deployment → Source: GitHub Actions**.

---

## Repository layout

```
fieldcalc-lite/
├── README.md
├── LICENSE                     MIT
├── .gitignore
├── capacitor.config.ts         for future iOS/Android packaging; unused by the web app
├── .github/workflows/deploy.yml
└── dist/                       the entire deployable app
    ├── index.html              markup, styles, and logic in one file
    ├── manifest.webmanifest    PWA metadata
    ├── sw.js                   service worker, cache-first offline
    └── icon.svg                app icon
```

`dist/` is self-contained and dependency-free. It is both the deploy target for Cloudflare
Pages and the `webDir` for Capacitor, so the same files ship to web, iOS, and Android.

---

## Roadmap

1. **Supabase authentication and cloud-saved calculation sets** — optional sign-in so saved
   results follow you between devices and job sites.
2. **Capacitor packaging for iOS and Android** — native App Store and Google Play builds
   from this same `dist/` folder.
3. **RevenueCat lifetime Pro purchase and Restore Purchases** — one-time unlock for an
   expanded calculator set.
4. **AI-assisted inspection-note or checklist feature** — turn field observations into
   structured notes and checklists.

Authentication, payments, accounts, analytics, and AI are deliberately absent from v0.1.

---

## Disclaimer

FieldCalc Lite is a convenience tool. Verify design and code calculations independently.

It makes no claim of code compliance, engineering approval, or design suitability for any
purpose. Results are unverified arithmetic from the values you enter. Any engineering, code,
or life-safety decision must be reviewed and confirmed by a qualified professional against
the applicable codes and standards for your jurisdiction and project.

---

## License

MIT — see [LICENSE](LICENSE).
