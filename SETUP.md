# Han Yu Learning — setup and moving between devices

## Do you need all the files?

No. It depends what you want.

| What you want | Files needed |
|---|---|
| Just use it on this PC | `index.html` only |
| Install on your phone, offline, mic remembered | all five, uploaded to GitHub Pages |

`SETUP.md` (this file) is notes for you. It never needs uploading.

## What each file is for

| File | Purpose | What happens without it |
|---|---|---|
| **index.html** | The whole app — every word, all the code, the background image. This one file *is* the program. | Nothing works. |
| **manifest.json** | Tells the phone its name, icon and colours so it can be installed. | No "Add to Home Screen" option. |
| **service-worker.js** | Saves a copy on the device so it opens without a connection. | Works online only. |
| **icon-192.png** | Home screen icon. | Blank or generic icon. |
| **icon-512.png** | Splash screen when it opens. | Blank splash. |

They must sit in the **same folder** and keep their **exact names** — `index.html` refers
to the other four by name.

---

# Option A — one PC, nothing to set up

1. Save `index.html` anywhere (Desktop is fine).
2. Double-click it.

Done. Everything works **except**: the microphone asks permission every single time, and
it won't install to a phone. That's a browser rule about local files, not a bug — there
is no fix from inside the app.

---

# Option B — GitHub Pages (phone, offline, mic remembered)

Do this once. About ten minutes.

### Put the files online

1. Go to **github.com**, sign in or create a free account.
2. **+** (top right) → **New repository**.
3. Name it `hanyu`. Choose **Public** — Pages doesn't work on private free repos.
   Leave "Add a README" unticked. → **Create repository**.
4. On the empty page, click **uploading an existing file**.
5. Drag in these five, and only these five:
   `index.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`
6. **Commit changes**.
7. **Settings** (top of the repo) → **Pages** (left sidebar).
8. **Source: Deploy from a branch**. Branch **main**, folder **/ (root)**. → **Save**.
9. Wait 1–2 minutes, refresh that page. Your address appears:
   `https://YOUR-USERNAME.github.io/hanyu/`

Open it on the PC to check it loads.

### Install on the phone

1. Open that address in **Chrome** (Android) or **Safari** (iOS).
2. Tap 🎤 once → **Allow**. Remembered from now on.
3. Install:
   - **Android/Chrome:** ⋮ → *Install app*
   - **iOS/Safari:** Share → *Add to Home Screen*
4. Open it from the home screen icon.

---

# Moving your words to another PC or phone

**Read this bit — it's the part that catches people out.**

Your words, phrases, Q&A pairs and ⭐/✓ progress are **not inside `index.html`**. They
live in the browser's own storage on that one device. Copying the file to a new machine
gives you the app with an empty deck.

Browser storage is also tied to the **exact address**. So even on the *same computer*,
these are treated as completely separate and share nothing:

- `file:///C:/Users/you/Desktop/index.html`
- `https://your-name.github.io/hanyu/`
- the same file moved to a different folder

Moving from a local file to your Pages address counts as a move. Export first.

### The move — three steps

**On the old device:**

1. Open the app → **HSK Library** tab.
2. Under **Backup**, click **⬇ Export words**.
3. A `.json` file downloads. Email it to yourself, or use a USB stick or Drive.

**On the new device:**

4. Open the app (your Pages address, or `index.html`).
5. **HSK Library** tab → set the dropdown to **Import: Replace (mirror PC)**.
6. Click **⬆ Import**, choose the `.json` file, confirm the warning.

Done. The new device is now an exact copy.

### Why Replace, not Merge

- **Merge** adds anything new and leaves what's already there. Fine for topping up, but
  words you *deleted* on the old machine come back, and edits get skipped as duplicates.
- **Replace** wipes the new device and loads the file exactly as-is. That's what you want
  when the old machine is the source of truth.

Replace asks you to confirm and states the exact counts before it does anything.

### What travels, what doesn't

**Travels in that one export file:**
- My Words, My Phrases, My Q&A pairs
- Which HSK words you've added
- Your ⭐ needs-practice and ✓ learned marks

**Doesn't travel, and doesn't need to:**
- The 2,672 HSK words — built into `index.html`, already present everywhere
- Playback speed and voice choice — set once per device, takes five seconds
- Dictation round history

**Suggestion:** re-export whenever you've added a decent batch of words. It's one small
file and it doubles as your only backup — clear your browser data without one and the
words are gone.

---

# Sending an updated app to your devices

When you get a new version of `index.html`:

1. In your repo: **Add file → Upload files**, drag in the new `index.html`
   (same name overwrites it).
2. **Also open `service-worker.js` → pencil icon → change `hanyu-v1` to `hanyu-v2`** →
   commit.
3. Wait a minute, then open the app and reload **twice** — once to fetch, once to run.

Step 2 is the one people skip. The old version stays saved on the device until that
version string changes, so without it you'll upload a new build and see no difference.

Your words are untouched by an app update — they're in browser storage, not in the file.

---

# What needs a connection, even when installed

| Works offline | Needs internet |
|---|---|
| Flashcards, Dictation, Q&A, Phrases | 🎤 Pronunciation check |
| All 2,672 HSK words + search | Sentence translation |
| Your own words and progress | Stroke order for characters not yet opened |
| Playback ¹ | |

¹ Chinese voice data must be installed on the device. Android: Settings → Text-to-speech
→ install the Chinese voice. iOS: Settings → Accessibility → Spoken Content → Voices.
Test it in airplane mode before you rely on it.

Stroke-order data is saved as you go, so any character you've opened once while online
keeps working offline afterwards.

---

# Privacy

The repository is public — anyone with the address can open the app. That's fine: it
holds HSK vocabulary and code, nothing personal. **Your words and progress are never
uploaded.** They stay in your browser, on your device, and only move when you export
them yourself.
