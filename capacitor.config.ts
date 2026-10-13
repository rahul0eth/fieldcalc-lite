import type { CapacitorConfig } from '@capacitor/cli';

// Not used by the web app. Here so `npx cap add ios|android` works later
// without restructuring anything: dist/ is already a complete static bundle.
const config: CapacitorConfig = {
  appId: 'com.fieldcalc.lite',
  appName: 'FieldCalc Lite',
  webDir: 'dist',
};

export default config;
