# FieldCalc

**Useful math. Zero clutter.**

Ten fast field calculators for construction, MEP, and site work, plus a photo field log.
No account, no ads, no tracking — every value and photo stays on the device, and it works offline.

One codebase ships three ways:

| | Status | Link |
|---|---|---|
| **Web / PWA** | Live | https://rahul0eth.github.io/fieldcalc-lite/ |
| **iOS** | Submitted, waiting for App Review | App Store ID `6822974161` · [apps.apple.com/app/id6822974161](https://apps.apple.com/app/id6822974161) once approved |
| **Android** | Signed bundle ready; Play listing in progress | Package `io.github.rahul0eth.fieldcalc` |

> **Releasing an update?** Read **[SUBMIT-TO-APP-STORES.md](SUBMIT-TO-APP-STORES.md)** —
> exactly which file each store takes (it is not a zip) and the commands that build it.
> Everything submitted to the stores is versioned in **[store/](store/LISTING.md)**.

---

## Calculators

| Group | Calculator | Inputs → outputs |
|---|---|---|
| Building | **Area & Volume** | length, width, height in ft or in → ft², ft³ |
| | **Concrete** | length, width, thickness, waste % → yd³, 80-lb bags |
| | **Slope** | rise, run → % grade, angle |
| | **Stairs** | total rise, max riser → riser count, riser height |
| Mechanical | **Round Duct Airflow** | diameter (in), velocity (FPM) → CFM, duct area |
| | **Rect → Round Duct** | width, height (in) → equivalent round diameter, aspect ratio |
| | **Pressure Conversion** | in. w.c. → Pa, psi |
| | **Pipe Volume** | inside diameter (in), length (ft) → gallons, water weight |
| Electrical & units | **Voltage Drop** | phase, Cu/Al, wire size, supply V, load A, one-way ft → volts, % |
| | **Feet-Inches → Metric** | ft, in → mm, m |

### Formulas

```
Area / volume     inches ÷ 12 first; A = L × W; V = A × H
Concrete          ft³ = L × W × (T ÷ 12) × (1 + waste); yd³ = ft³ ÷ 27; bags = ⌈ft³ ÷ 0.6⌉ (80-lb bag ≈ 0.6 ft³)
Slope             grade = rise ÷ run × 100; angle = atan2(rise, run)
Stairs            risers = ⌈total rise ÷ max riser⌉; riser height = total rise ÷ risers
Duct airflow      CFM = FPM × π × (D/12)² ÷ 4
Rect → round      De = 1.30 × (a·b)^0.625 ÷ (a + b)^0.25         (Huebscher)
Pressure          Pa = in. w.c. × 249.0889; psi = in. w.c. × 0.0360912
Pipe volume       gal = π × (D/12)² ÷ 4 × L × 7.48052; lb = gal × 8.34
Voltage drop      VD = k × K × I × L ÷ CM   k = 2 (1Φ) or √3 (3Φ); K = 12.9 Cu / 21.2 Al Ω·cmil/ft
Length            mm = (ft × 12 + in) × 25.4
```

Zero, blank, and negative inputs are handled explicitly; the app never shows `NaN` or
`Infinity`. A zero run is reported as vertical with an undefined grade.

### Field log

**Save** stores a one-line result; **Photo** opens the camera (or photo library) and attaches
the picture to the result; **Share** opens the native share sheet. Results live in
`localStorage`; photos are downscaled to 1280 px and kept in IndexedDB, because localStorage's
~5 MB cap would fill after a few. Deleting an entry deletes its photo. Max 100 entries.

---

## How it's built

Plain HTML, CSS, and JavaScript in one file — [`dist/index.html`](dist/index.html). No
framework, no build step. [Capacitor 8](https://capacitorjs.com) wraps the same `dist/` folder
as the iOS and Android apps, with three official plugins:

| Plugin | Why |
|---|---|
| `@capacitor/keyboard` | `resize: 'native'` — otherwise iOS scrolls the web view under the keyboard, `position: sticky` stops pinning, and the header slides behind the status bar |
| `@capacitor/share` | Native share sheet (falls back to Web Share, then clipboard) |
| `@capacitor/haptics` | A light tap on save and share |

The camera uses a plain `<input type="file" capture>`, which opens the OS camera on both
platforms with no plugin.

**Old Android WebView compatibility.** Android's System WebView can lag far behind Chrome, so
the CSS avoids flexbox `gap` (Chrome 84+), the `inset` shorthand (87+), and bare `dvh` (108+).
All three were caught on a real Android emulator, not in a desktop browser.

## Develop

```bash
npm start
```

Serves `dist/` at <http://localhost:4178>. After editing `dist/`, copy it into both native projects:

```bash
npm run sync
```

Then open a native project:

```bash
npm run ios
```

```bash
npm run android
```

| Tool | Version | Note |
|---|---|---|
| Node | 22+ (`.nvmrc`) | Capacitor CLI requirement |
| JDK | 21–23 | JDK 17 fails (`invalid source release: 21`); JDK 25 is too new for this Gradle (`class file major version 69`) |
| Xcode | 26+ | plus the iOS simulator runtime (`xcodebuild -downloadPlatform iOS`) |

## Repository layout

```
dist/                     the app — the only code you edit (web, iOS, and Android all ship this)
  index.html              markup, styles, logic
  privacy.html            privacy policy (store requirement)
  support.html            support page (App Store requirement)
  sw.js, manifest.webmanifest, icons
ios/                      Xcode project; ExportOptions-*.plist for App Store archive/upload
android/                  Android Studio project; release signing reads android/key.properties
assets/                   1024 px icon + splash sources (npm run assets regenerates every size)
store/                    exactly what was submitted: screenshots, feature graphic, listing copy
release/                  built .ipa / .aab (gitignored — rebuilt per release)
.github/workflows/        deploys dist/ to GitHub Pages on every push to main
```

**Not in the repo, on purpose:** the Android upload key lives in `~/fieldcalc-signing/`
and `android/key.properties` is gitignored. Back that folder up — without it you cannot ship
Android updates.

## Roadmap

1. Supabase sign-in and cloud-synced field logs
2. RevenueCat lifetime Pro unlock with Restore Purchases
3. AI-assisted inspection notes from field-log photos
4. More calculators — fan laws, ductulator friction, conduit fill

## Disclaimer

FieldCalc is a convenience tool. Verify design and code calculations independently. It makes
no claim of code compliance, engineering approval, or design suitability. Any engineering,
code, or life-safety decision must be confirmed by a qualified professional against the codes
and standards that apply to your jurisdiction and project.

## License

MIT — see [LICENSE](LICENSE).
