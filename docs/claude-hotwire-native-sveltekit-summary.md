# Hotwire Native + SvelteKit: Session Summary

## Objective

Integrate Hotwire Native (iOS) with a SvelteKit web app, using it as the native
shell around a server-rendered/hydrated SvelteKit frontend — similar to how
Hotwire Native normally wraps a Rails + Turbo app, but with SvelteKit standing
in for Rails.

This turned out to be a genuinely hard problem because Hotwire Native and Turbo
Drive were designed around a specific assumption — plain server-rendered HTML,
no client-side framework owning the DOM — that a hydrated SvelteKit app
violates. Most of this session was spent discovering that assumption the hard
way and then building around it.

---

## Part 1: Getting Turbo to load at all

**Symptom:** Native app showed a permanent loading spinner; the web page itself
loaded fine in Safari's inspector.

**Root cause:** Hotwire Native's native side polls for `window.Turbo` to exist
so it can swap in its own adapter and start receiving visit lifecycle events.
Loading `@hotwired/turbo` via a normal SvelteKit/Vite import is async — by the
time it executes, `document.readyState` can already be `'complete'`, so Turbo
never fires its own boot sequence (`turbo:load`), and native waits forever.

**Fix:** Load Turbo as a **blocking, classic `<script>` tag** referencing a
locally-hosted UMD build, placed early in `src/app.html`:

```html
<script src="%sveltekit.assets%/turbo.js"></script>
```

Confirmed via `Turbo.session.adapter` in the console — a plain `BrowserAdapter`
means native never attached; anything else means it worked.

*(A simpler alternative, discovered later: call `tick()` from Svelte, then
manually `document.dispatchEvent(new Event('turbo:load'))` once the initial
render flushes. Works for plain-Turbo setups; not needed once we moved to the
custom shim in Part 3.)*

**Side fixes along the way:**
- `static/turbo.js` should be a **symlink** to `node_modules/@hotwired/turbo/dist/turbo.es2017-umd.min.js`
  (or a `postinstall` copy script) so it doesn't silently drift from the
  installed package version.
- Several unrelated dead ends were ruled out during this phase: Xcode project
  rebuilds, HotwireNative package version drift, stale simulator/WebView
  caches, and a broken `vite.config.ts` (passing `compilerOptions`/`adapter`
  into `sveltekit()` is actually valid since SvelteKit 2.62.0 — an earlier
  claim that it wasn't was incorrect and later corrected).

---

## Part 2: SvelteKit's router fighting Turbo

**Symptom:** Navigation "worked" but had no native transition, no back button,
sudden/non-animated page swaps.

**Root cause:** SvelteKit's own client-side router was still intercepting
clicks and `popstate` events alongside Turbo. `data-sveltekit-reload` stops
SvelteKit from handling link *clicks*, but its router still listens globally
for history changes — two navigation systems fighting over the same events.

**Fix (at the time):** `data-sveltekit-reload` to hand off click handling to
Turbo. (Full `csr = false` was also tried but broke Svelte-driven interactivity
and was abandoned.)

---

## Part 3: The real architectural problem — back button freeze

**Symptom:** Forward navigation, forms, and saves all worked perfectly. The
**native back button** froze the app permanently, 100% reproducible, regardless
of auth, dev vs. production build, Vite HMR, or `csr` setting.

**Root cause (confirmed via `Turbo.session.adapter` and detailed Xcode/Safari
log comparison):** Turbo Drive's `restore` visit type tries to fetch-and-morph
DOM using its own snapshot cache. SvelteKit has already hydrated the page into
a live, framework-owned component tree. Morphing DOM underneath that hydrated
tree corrupts Turbo's own state tracking, triggering `pageInvalidated` →
a forced reload that targets the wrong URL → a permanent stall in Hotwire
Native's bridge. This is the same category of bug documented years ago when
combining Vue.js with Turbolinks — an SPA framework and Turbo Drive's DOM
model are fundamentally incompatible for restore visits.

**Fix — architectural replacement, not a patch:** Adopted (and hand-copied,
per preference to avoid depending on an unmaintained package) the approach
from **`hotwire-native-bolt`** (github.com/realprabs/hotwire-native-bolt),
which:
- Replaces `window.Turbo` with a `Proxy` implementing the same call surface
  Hotwire Native's native-injected bridge expects (`registerAdapter`,
  `navigator.startVisit`, etc.) — so native-side code is unaffected.
- **No DOM morphing at all.** `changeHistory()`, `loadCachedSnapshot()`, and
  `loadResponse()` are explicit no-ops — the source comment literally says
  *"Frameworks like sveltekit and nextjs manage their own history and
  snapshots."*
- Restore visits use the **real `history.go(delta)` browser API** (via a
  `sessionStorage`-backed restoration-identifier → history-index mapping),
  then hand rendering off to the app's own router via a `startVisitHandler`
  callback you provide.

**SvelteKit-side wiring implemented:**
- `src/lib/hotwire/` — the five source files copied verbatim.
- `src/entry-bridge.ts` — single build entry point: imports the hotwire
  module (sets `window.Turbo`/`window.HotwireNavigator` first), then boots
  Stimulus + `@joemasilotti/bridge-components`.
- Bundled with `esbuild --bundle --format=iife` into a single blocking
  `static/hotwire-bridge.js` (same early-loading requirement as Part 1, and
  the same **IIFE-not-ESM** requirement — a first attempt using Vite's
  default ESM output silently failed to execute as a classic script).
- `setStartVisitHandler` calls SvelteKit's `goto()`.
- A capture-phase `document` click listener calls `event.preventDefault()`
  before SvelteKit's own bubble-phase router listener runs, then proposes the
  visit to native via `visitProposedToLocation()`.
- A `restore`-specific guard (borrowed from a related reference project,
  `sk-hotwire-native-demo`) falls back to `history.back()` when the proposed
  restore location doesn't match `window.location` yet — covers an edge case
  in the library's own history-index fallback logic.

**Result:** Forward navigation, back button, and repeated stop/restart cycles
all became reliable.

---

## Part 4: Bridge Components (native UI elements)

Wired up `@hotwired/stimulus` + `@joemasilotti/bridge-components` inside the
same `entry-bridge.ts` bundle (critical: **one shared bundle, one entry
point** — keeping Stimulus and the hotwire shim in separately-loaded scripts
risked each creating its own competing `window.HotwireNative` instance).

A `<button data-controller="bridge--button">` now renders and functions as a
real native button via the bridge protocol.

---

## Part 5: Modal presentation & path configuration

**Symptom:** A page correctly opened as a native modal (`context: "modal"` in
`hotwire-native-bolt/path-configuration.json`), but submitting a form and
redirecting to a page with `context: "default"` left the modal displayed —
the redirect target never appeared.

**Root cause:** Modals run in a **separate WKWebView** from the main
navigation stack. Dismissing a modal and handing off to the main stack's
(different) WebView is something native handles automatically for plain
Turbo apps, but requires the visit to be explicitly bracketed as a **form
submission** for native to execute the handoff correctly.

**Fix:** Call `formSubmissionStarted(action)` / `formSubmissionFinished(action)`
around the redirect handling in the form's submission handler, in addition to
`visitProposedToLocation()`:

```ts
const submissionHandler: SubmitFunction = async ({ action }) => {
  return async ({ result }) => {
    if (result.type !== 'redirect') { await applyAction(result); return; }
    const url = new URL(result.location, window.location.origin);
    if (!window.HotwireNavigator.canNavigate(url)) { await goto(result.location); return; }
    window.HotwireNavigator.formSubmissionStarted(action);
    window.HotwireNavigator.visitProposedToLocation(url, { action: 'advance' });
    window.HotwireNavigator.formSubmissionFinished(action);
  };
};
```

This resolved the modal-dismiss case cleanly — no hard-navigation fallback
needed after all.

**Also clarified:** `action: 'advance'` vs `'replace'` only affects the
**history stack** (whether "back" returns to the previous screen or skips it),
not the immediate visual result — which is why early tests using `clear_all`
presentation showed no visible difference between the two (a stack-clearing
presentation dominates regardless of `action`).

---

## Key technical gotchas worth remembering

1. **Anything native needs to detect (`window.Turbo`, `window.HotwireNavigator`)
   must load as a blocking classic script, bundled as IIFE — not ESM, not an
   async/dynamic import.** This bit us twice (once for Turbo, once for the
   custom shim) via the same underlying race.
2. **`esbuild` needs `--outdir` for multiple entry points; use one entry file
   that imports the others** to get a single combined output.
3. **`beforeNavigate`/`afterNavigate` must be called during Svelte component
   initialization** (e.g. in `+layout.svelte`), not from a plain module like
   `hooks.client.ts` — calling them there caused silent, hard-to-diagnose
   breakage elsewhere in the app.
4. **A capture-phase (`{ capture: true }`) click listener** is what lets code
   run and `preventDefault()` before SvelteKit's own bubble-phase router
   listener — standard DOM API, not anything unusual, but load-bearing here.
5. **`Turbo.session.adapter` in the console is a fast diagnostic** for "is
   native actually attached" — `BrowserAdapter` means no.
6. **Vite preview defaults to port 4173**, not 5173 — worth double-checking
   `rootURL` in `SceneDelegate.swift` whenever switching between dev/preview.
7. Hand-copying a small, well-understood dependency (rather than depending on
   an unmaintained npm package) paid off directly — it's what made diagnosing
   the modal/form-submission issue possible at all, since the actual source
   was readable rather than a black box.
