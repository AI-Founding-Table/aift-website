# Working on this repo

Read this before changing anything. It exists because most of what makes this
site good is invisible in the diff, and easy to undo by accident.

## What this is

The AI Founding Table website. Live at aifoundingtable.com on Vercel.

    /                          homepage
    /ai-readiness-scorecard/   the four-question scorecard
    /four-examples/            what the scorecard trades an address for
    style.css                  shared design for every page
    api/subscribe.js           the only server-side code

Static HTML, CSS and vanilla JS, plus one Vercel function. No build step, no
framework, no dependencies, no package.json. Vercel serves the folder as-is,
folder names become URLs, and anything in `api/` becomes an endpoint.

Keep it that way. If you find yourself adding a bundler, a framework or a
dependency, stop and ask.

`api/subscribe.js` exists for one reason: beehiiv's API needs a Bearer token,
and a token in a static page is a token anybody can read. It reads
`BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` from the environment. Never put
a key in a page, and never add a second endpoint without the same reason.

`/four-examples/` is what the gate trades an address for. It is `noindex` on
purpose: it should not be the top result for someone who never took the
scorecard. Do not add it to the nav, and do not link it from a public page.

The emails live in `brand/emails/`. The welcome email goes to everybody and
says only what the list is for. `scorecard-examples.md` is the same content as
that page in email form, kept but not sent, since automations need the Scale
plan and the page delivers instantly. Do not fold the examples back into the
welcome email: one sets expectations for everyone, the other keeps a promise
made to a smaller group.

**beehiiv drops custom fields that do not already exist, and still answers
200.** The endpoint sends `scorecard_total`, `scorecard_answers` and
`scorecard_verdict`. Unless all three exist under Audience > Custom Fields in
beehiiv, the subscriber is created and the scores vanish with no error
anywhere. Confirmed by reading a subscriber back and finding
`custom_fields: []` after a successful call. If you add a field to the payload,
create it in beehiiv first, then read one subscriber back to check it landed.
A 200 from this API is not evidence the data was stored.

## Run it

    python3 -m http.server 4321

Then http://localhost:4321. A `file://` open mostly works, but query strings
and the shareable-result links need a real server.

That serves the static files only. `/api/subscribe` will 404, so the gate's
failure path is what you will see. To exercise the real endpoint use
`vercel dev`, or stub `window.fetch` in the console.

## Things that must not change silently

These have escaped into the world. Changing them breaks something out there
that you cannot see from here.

- **`/ai-readiness-scorecard/`**. People have shared this path.
- **The `?s=3542` result format.** Four digits, 1 to 5, one per question in
  order. Shared links carry it. Changing the questions, their order, or the
  1-to-5 scale silently changes what every previously shared link says.
- **Analytics event names**: `start`, `gate-view`, `lead`, `gate-fail`, `done`,
  `shared-view`, `share`, `follow`, `whatsapp`. Renaming one orphans its
  history in Vercel.
- **Section anchors** `#who`, `#scorecard`, `#sessions`, `#contact`. The last
  one is labelled Join in the nav, because the block invites people in rather
  than listing contact details. The id stayed `contact` so existing links keep
  working. Contact details live in the footer.

## The rule behind the whole thing

The scorecard teaches that the dangerous failure is the silent one: a day with
no output looks exactly like a quiet day. The site is not allowed to commit the
error it teaches.

In practice:

- **Never ship a form that discards what it collects.**
- **Never promise what the plumbing does not do.**
- **Failure paths say they failed.** If the subscribe call fails, the score is
  shown anyway with a note saying the sign-up did not go through, and a
  `gate-fail` event is counted. Withholding the result would punish someone for
  our outage, and swallowing the error would hide a broken API key behind what
  looks like poor conversion. Do not replace either with a silent catch.
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

## The gate

`GATE` at the top of the scorecard's script decides whether the email is asked
for before the score. It is one line because this is a conversion question, not
an architecture one, and `start` against `gate-view` against `lead` is what
should settle it rather than an argument.

Deep-linked results (`?s=`) skip the gate on purpose. The person who shared it
already gave an address, and gating their recipient would kill the sharing that
brings people here in the first place.

The gate is asked once per session. Scoring a second task does not ask again.

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
