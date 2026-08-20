# Working on this repo

Read this before changing anything. It exists because most of what makes this
site good is invisible in the diff, and easy to undo by accident.

## What this is

The AI Founding Table website. Live at aifoundingtable.com on Vercel.

    /                          homepage
    /ai-readiness-scorecard/   the four-question scorecard
    style.css                  shared design for every page

Static HTML, CSS and vanilla JS. No build step, no framework, no dependencies,
no package.json. Vercel serves the folder as-is and folder names become URLs.
Open a file in a browser and it works.

Keep it that way. If you find yourself adding a bundler, a framework or a
dependency, stop and ask. The whole site is three files.

## Run it

    python3 -m http.server 4321

Then http://localhost:4321. A `file://` open mostly works, but query strings
and the shareable-result links need a real server.

## Things that must not change silently

These have escaped into the world. Changing them breaks something out there
that you cannot see from here.

- **`/ai-readiness-scorecard/`**. People have shared this path.
- **The `?s=3542` result format.** Four digits, 1 to 5, one per question in
  order. Shared links carry it. Changing the questions, their order, or the
  1-to-5 scale silently changes what every previously shared link says.
- **Analytics event names**: `start`, `done`, `shared-view`, `share`, `lead`,
  `follow`. Renaming one orphans its history in Vercel.
- **Section anchors** `#who`, `#scorecard`, `#sessions`, `#contact`.

## The rule behind the whole thing

The scorecard teaches that the dangerous failure is the silent one: a day with
no output looks exactly like a quiet day. The site is not allowed to commit the
error it teaches.

In practice:

- **Never ship a form that discards what it collects.** `FORM_ENDPOINT` is
  `null` on purpose when there is nowhere to send an address, and the email
  block does not render at all rather than accepting input and dropping it.
- **Never promise what the plumbing does not do.** Formspree stores and
  forwards; it does not email the person. So the success copy says a human will
  send it, not "check your inbox".
- **Failure paths say they failed.** The send handler has a visible error state
  and an address to fall back to. Do not replace it with a silent catch.
- **Keep the counters.** `start` against `done` is the completion rate. Without
  them a launch that nobody finishes is indistinguishable from a quiet week.

## Voice

No em dashes. Not the character, not `&mdash;`. Comma, colon, parentheses, or a
new sentence. Check every string before calling a change done, including
comments and commit messages.

Banned words: robust, seamless, comprehensive, leverage, utilize, ensure,
streamline, foster, harness, unleash, elevate, landscape, realm, ecosystem,
journey, cornerstone, tailored, bespoke, holistic, delve, cutting-edge,
innovative, dynamic, transformative.

Short sentences. Concrete nouns and numbers. Active voice. No throat-clearing
openers, no "it's not just X, it's Y", no generic closers. If a sentence would
survive being deleted, delete it.

Copy on the homepage is drawn from the published Luma event listing so the site
and the event page say the same thing. If the listing changes, this should too.

## Design

Derived from the event covers: near-black ground, a hairline frame,
letterspaced gold caps, a Didone display with one line dropped to gold.
Playfair Display over Geist, both from Google Fonts.

- **All tokens live in `style.css`.** Never hardcode a colour in a page.
- **One accent.** Gold. There is no second accent colour.
- **Everything is square.** No border radius anywhere. Do not introduce one.
- **One theme.** The site is dark. There is no light mode and no section
  inverts.

Colour tokens carry their measured contrast ratio in a comment. If you add or
change one, measure it, do not eyeball it. `--line` is for decorative rules
only and fails 3:1 by design; the border of any real control uses `--edge`.

## Accessibility

Targets WCAG 2.2 AA. Do not regress these:

- Questions are `fieldset` with `legend`. Not divs.
- Focus is visible on everything. `:focus-visible` with a gold ring. The only
  exception is `[tabindex="-1"]` headings we move focus to programmatically.
- Every interactive target is at least 24 by 24.
- Inputs have real labels above them. Never a placeholder standing in for one.
- All motion sits behind `prefers-reduced-motion: no-preference`.
- The mobile drawer is a modal `<dialog>`. That is deliberate: the platform
  gives the focus trap, Escape, inerting and focus return. Do not replace it
  with a div and hand-rolled JS.
- **Arrow keys move and check a radio at the same time.** That is why the
  scorecard tracks input mode and only auto-advances for pointer users. If you
  touch the advance logic, test with the keyboard, not just the mouse.

Verify at 320, 375, 768, 1280 and 1920. Check for horizontal overflow, targets
under 24px, unlabelled controls and heading jumps. The scorecard result view
needs checking with the offer block forced visible, since it is hidden by
default.

## Editing the scorecard

`QUESTIONS` and `BANDS` at the top of the script are the whole thing. The
rubric display, the weakest-link diagnosis and the scoring all derive from
them. Adding an option or rewording one means editing one array entry.

Four questions, not six. The value is that it takes 90 seconds.

Question 3 is deliberately counterintuitive and its wording needs watching. It
asks whether a wrong answer would be *noticed*, not how bad it would be.

The result must stay willing to say "this is not an AI problem". That honesty
is the entire differentiator. Do not soften the low bands.

## Events

The homepage embeds Katya's Luma calendar rather than listing dates. It updates
itself. Do not replace it with hardcoded events, and do not "fix" a date you
think is wrong here; fix it in Luma.

## Commits

Conventional Commits: `type(scope): subject`. Imperative, lowercase, no
trailing period, 72 characters or fewer. Body wrapped at 72, saying why, and
stating what stayed the same. One logical change per commit.
