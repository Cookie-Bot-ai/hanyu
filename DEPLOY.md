# Putting Han Yu Learning on GitHub Pages

This gives you a real `https://` address, which is what unlocks the two things a local
file can't do:

- **The microphone permission sticks.** Grant it once, never asked again.
- **The app installs to your home screen and works offline**, because service workers
  are blocked on `file://` entirely.

## The five files

All five go in the **same folder**, at the top level of the repository:

| File | What it does |
|---|---|
| `index.html` | The app. Renamed from `Han_Yu_Learning.html` — GitHub Pages serves `index.html` automatically, so you get a clean URL with no filename. |
| `manifest.json` | Makes it installable: name, icons, standalone display, colours. |
| `service-worker.js` | Caches everything for offline use. |
| `icon-192.png` | Home screen icon. |
| `icon-512.png` | Splash screen / app switcher icon. |

Don't rename any of them. `index.html` references the other four by exact name.

## Steps

1. Go to **github.com** and sign in (or create a free account).
2. Click **+** in the top right → **New repository**.
3. Name it — for example `hanyu`. **Set it to Public.** Pages doesn't work on private
   repos on the free plan. Don't tick "Add a README".
4. Click **Create repository**.
5. On the empty repo page, click **uploading an existing file**.
6. Drag in all five files. Click **Commit changes**.
7. Go to **Settings** (top of the repo) → **Pages** (left sidebar).
8. Under **Source**, choose **Deploy from a branch**. Branch: **main**, folder: **/ (root)**.
   Click **Save**.
9. Wait one to two minutes. Refresh the Pages settings screen; your URL appears at the top:

   ```
   https://YOUR-USERNAME.github.io/hanyu/
   ```

## On your phone

1. Open that URL in **Chrome** (Android) or **Safari** (iOS).
2. Tap 🎤 once and **Allow** the microphone. This time it's remembered.
3. Install it:
   - **Android/Chrome:** ⋮ menu → *Install app* / *Add to Home screen*
   - **iOS/Safari:** Share button → *Add to Home Screen*
4. Open it from the home screen. It runs full-screen with no browser bar.

## Sending updates from your PC

When you get a new version of the file:

1. Rename it to `index.html`.
2. In the repo, click the existing `index.html` → pencil icon → delete the contents →
   paste the new file. Or drag the new file in via **Add file → Upload files**;
   same name overwrites it.
3. **Open `service-worker.js` and bump the version**, e.g. `hanyu-v1` → `hanyu-v2`.

   That third step matters. The old version stays cached until this string changes, so
   without it you'll keep seeing the previous build and assume the upload failed.
4. Wait a minute, then reload the app twice — once to fetch the update, once to run it.

## What still needs a connection

The service worker caches the app and the libraries, so most of it works on a plane.
These don't, and can't:

- **Pronunciation check** — the browser streams audio to a speech server.
- **Sentence translation** — a live API call.
- **Stroke-order data** for characters you've never opened before. It's fetched per
  character and cached as you go, so anything you've practised once while online keeps
  working offline afterwards.

Flashcards, Dictation, Q&A, Phrases, the full HSK library and all your saved words work
offline once installed.

## A note on privacy

The repository is public, which means anyone with the URL can open the app. That's fine —
it ships with HSK vocabulary only. **Your own words, phrases, Q&A pairs and progress are
never in the repository.** They live in your browser's local storage on your own device.
Use Export / Import in the Word Library to move them between machines.
