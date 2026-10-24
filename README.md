# Free Sudoku

An offline Sudoku game: a PWA that also ships as an Android app through Capacitor.

- 20,000 bundled puzzles (5,000 each for Easy, Medium, Hard, Expert) from the public-domain
  [Sudoku Exchange Puzzle Bank](https://github.com/grantm/sudoku-exchange-puzzle-bank).
- After the first visit, the service worker caches the app and every puzzle file, so it works with no connection.
- Notes, undo, hints, mistake highlighting, a pausable timer, best times per level, and auto-saved progress.

## Web (PWA)

```bash
npm install
npm run dev       # development server
npm run build     # production build in dist/
npm run preview   # serve dist/ (the service worker only runs in a build)
```

Deploy `dist/` to any static host served over HTTPS.

## Android

Requires the Android SDK. Gradle 9.5 is pinned in `android/gradle/wrapper` so the build runs on Java 25
(the JDK bundled with current Android Studio).

```bash
npm run android:sync   # build the web app and copy it into android/
npm run android:open   # open in Android Studio to run or make a signed release
npm run android:apk    # or build a debug APK: android/app/build/outputs/apk/debug/app-debug.apk
```

Set `JAVA_HOME` if Gradle can't find a JDK, e.g.
`export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"`.

## Puzzles

`public/puzzles/<level>.txt` holds one puzzle per line (81 digits, `0` = empty). To regenerate them,
download the four bank files and run:

```bash
node scripts/pack-puzzles.mjs path/to/bank
```

Expert uses the bank's "diabolical" puzzles with ratings up to 7.0. Harder ones need forcing chains.

## Icons

`public/icon.svg` is the source. Regenerate with `npx pwa-assets-generator --preset minimal-2023 public/icon.svg`
(web) and `npx capacitor-assets generate --android` (Android, from `assets/icon-only.png`).
