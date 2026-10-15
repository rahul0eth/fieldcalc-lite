# SUBMIT TO APP STORES

**It is not a zip.** Each store takes one signed binary that the build tools produce.

| Store | File | Where it lands |
|---|---|---|
| **Apple App Store** | `.ipa` (signed **Apple Distribution**) | `release/FieldCalc-<version>-AppStore.ipa` — but you normally let `xcodebuild` upload it directly |
| **Google Play** | `.aab` (Android App Bundle, signed with the upload key) | `release/FieldCalc-<version>-GooglePlay.aab` |

Store accounts: Apple team **`H7WA789MS5`** (individual) · App Store Connect app **`6822974161`** ·
Play package **`io.github.rahul0eth.fieldcalc`**. Listing copy and screenshots: [`store/`](store/LISTING.md).

---

## Every release, both stores

1. Edit `dist/`, then copy it into both native projects:
   ```bash
   npm run sync
   ```
2. **Bump the version** — both stores reject a build number they have already seen:
   - `android/app/build.gradle` → `versionCode` (integer, +1 every upload) and `versionName`
   - `ios/App/App.xcodeproj/project.pbxproj` → `MARKETING_VERSION` and `CURRENT_PROJECT_VERSION` (+1 every upload)
   - `package.json` → `version`

---

## Apple App Store

### Build and upload (≈5 minutes, no Xcode GUI needed)

```bash
cd ios/App && xcodebuild -project App.xcodeproj -scheme App -configuration Release -destination 'generic/platform=iOS' -archivePath ../../release/FieldCalc.xcarchive CODE_SIGNING_ALLOWED=NO archive
```

```bash
xcodebuild -exportArchive -archivePath release/FieldCalc.xcarchive -exportOptionsPlist ios/ExportOptions-Upload.plist -exportPath release/upload -allowProvisioningUpdates
```

**Why archive unsigned?** A normal signed archive first signs with a *development* identity,
which needs a registered iPhone — and the team has none. App Store profiles need no devices,
so the archive is built unsigned and the export step signs it with **Apple Distribution**
(Xcode creates the certificate and profile automatically). Use `ExportOptions-AppStore.plist`
instead to get a local `.ipa` without uploading.

Xcode must be signed into the Apple ID (Xcode → Settings → Accounts).

### Then in App Store Connect

1. Wait for the build to finish processing (5–30 min) — TestFlight shows **Ready to Submit**
2. App Store tab → new version → **Build → Add Build**
3. Update screenshots or text if they changed
4. **Add for Review → Submit for Review**

Already configured and does not need repeating: privacy label (**Data Not Collected**),
age rating (**4+**), content rights, pricing (**Free**), availability (148 countries — EU
excluded until a trader-status declaration is made in Business), export compliance
(`ITSAppUsesNonExemptEncryption = false` in `Info.plist`).

**Gotchas hit on the first submission**
- "Sign-in required" under App Review Information defaults to **on**. FieldCalc has no login — leave it off.
- Screenshot size is **1206 × 2622** ("iPhone with Dynamic Island, medium display"), not 6.9″.
- The App Information page sometimes answers *"Sorry, something went wrong"* — retry Save.

---

## Google Play

### Build the signed bundle

```bash
cd android && JAVA_HOME=/usr/local/Cellar/openjdk/23.0.2/libexec/openjdk.jdk/Contents/Home ./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`. Copy it to `release/`.

Signing comes from `android/key.properties` (gitignored), which points at
`~/fieldcalc-signing/upload.jks`. **Back up `~/fieldcalc-signing/`** — its README holds the
password. Losing it means asking Google to reset your upload key before you can ship again.

### Then in Play Console

**Test and release → Internal testing → Create new release** → upload the `.aab` → roll out.

New personal developer accounts must run a **closed test with at least 12 testers for 14
continuous days** before production access is granted.

### Listing assets (all in `store/android/`)

| Asset | Size |
|---|---|
| App icon | 512 × 512 |
| Feature graphic | 1024 × 500 |
| Phone screenshots | 1080 × 1920 — exactly **9:16**; Play stores 1:2 images but leaves the listing task incomplete |

---

## Testing on simulators and emulators

**iOS:** `npm run sync`, build for the simulator, `xcrun simctl install booted <App.app>`.
For store screenshots, give the simulator a clean status bar first:

```bash
xcrun simctl status_bar booted override --time "9:41" --batteryState discharging --batteryLevel 100 --cellularBars 4 --wifiBars 3
```

**Android:** AVD `FieldCalc_API34` (Pixel 7, Android 14). Build `./gradlew assembleDebug`, then
`adb install -r app/build/outputs/apk/debug/app-debug.apk`.
