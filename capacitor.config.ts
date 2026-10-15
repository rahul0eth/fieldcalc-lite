import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Permanent once published. Reverse of rahul0eth.github.io, a domain we control.
  appId: 'io.github.rahul0eth.fieldcalc',
  appName: 'FieldCalc',
  webDir: 'dist',
  plugins: {
    // Resize the web view above the keyboard instead of scrolling it underneath.
    // With scrolling, iOS stops honoring position:sticky and the header slides
    // up behind the status bar while typing.
    Keyboard: { resize: 'native' },
  },
};

export default config;
