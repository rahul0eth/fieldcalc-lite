# App Review notes — FieldCalc

Answers to Apple's Guideline 2.1 "Information Needed" request (Oct 15, 2026, new-developer
review). Apple asked for these in the reply **and** in App Review Information → Notes, so the
block between the rules below is what gets pasted into both.

---

**1. Screen recording**
Attached: a recording from a physical iPhone on the latest iOS, starting at app launch. It shows
the home screen, two calculators updating as values are typed, saving a result, attaching a
photo taken with the camera, the share sheet, and the Field log (viewing a photo, deleting an
entry). FieldCalc has no account registration, login, user-generated content shared with other
users, or paid content.

**2. Purpose and target audience**
FieldCalc is a calculator utility for people who work on construction sites: general
contractors, HVAC and mechanical technicians, electricians, plumbers, and site supervisors.
On a jobsite they repeatedly need quick numbers — how many cubic yards of concrete a slab
needs, how many stair risers fit a floor-to-floor height, the airflow through a duct, the
voltage drop on a wire run — and today they look them up in reference tables, spreadsheets, or
paper charts. FieldCalc puts ten of these calculations in one offline app with large,
readable results, and lets the user save a result with a site photo so measurements and
context are kept together.

**3. How to use the main features**
No login, account, sample files, or setup is required.
- Launch the app. The home screen shows ten calculators in three groups (Building, Mechanical,
  Electrical & units).
- Tap any calculator, for example **Concrete**. Results update immediately as values are typed.
- Tap **Save** to add the result to the Field log.
- Tap **Photo** to take a picture with the camera (or choose one from the library). The photo is
  attached to that result.
- Tap **Share** to send the result text through the iOS share sheet.
- Open the **Field log** tab to see saved results. Tap a photo thumbnail to view it full screen;
  tap **Delete** to remove an entry, or **Clear all** to remove everything.

**4. External services**
None. FieldCalc works entirely offline and makes no network requests. It has no server,
account system, analytics, advertising, payment processing, or AI services. All calculations run
on the device, and saved results and photos are stored only on the device. The app uses Apple
system features only: the camera and photo picker, the share sheet, and haptics.

**5. Regional differences**
None. The app functions identically in every region where it is available. Content is in
English, and calculations use US customary units, with a metric conversion calculator.

**6. Regulated industry / third-party material**
Not applicable. FieldCalc is a general-purpose calculator and does not provide services in a
regulated industry. It contains no third-party content. The app states that results are a
convenience and must be verified independently, and it makes no claim of code compliance or
engineering approval.

---

## Screen recording script (about 60 seconds)

Record on the iPhone itself: **Settings → Control Center → add Screen Recording**. Then swipe
down from the top-right corner, tap the record button, and wait for the 3-second countdown.

1. Start on the iPhone home screen and tap the **FieldCalc** icon (the recording must begin at launch)
2. On the calculator grid, scroll down slowly to show all ten, then back up
3. Tap **Concrete** → change Thickness from 4 to **6** → the yards and bag count update
4. Tap **Save** → the "Saved to field log" message appears
5. Tap **Photo** → **Take Photo** → allow camera access → take any picture → **Use Photo**
6. Tap the back arrow → scroll down → tap **Voltage Drop** → tap **Three** → change Wire size to **10 AWG**
7. Tap **Share** → the share sheet opens → swipe it away
8. Tap the **Field log** tab → tap the photo thumbnail → tap to close it
9. Tap **Delete** on one entry
10. Stop the recording from the red indicator at the top of the screen

The video lands in Photos. Keep it under about 2 minutes so it uploads easily.
