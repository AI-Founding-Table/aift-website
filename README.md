# AI Founding Table

The website. Live at aifoundingtable.com.

A room of business owners in Barcelona working out where AI earns its place.
Katya Dominguez and Andres.

The scorecard is one page of it: four questions, 90 seconds, scoring one piece
of a business's work out of 20 and saying whether to hand it to AI, including
when the honest answer is no. Built for "AI for Business Owners | Practical Use
Cases", Aug 21 2026.

**Working on this repo, human or agent? Read [AGENTS.md](AGENTS.md) first.**

## Pages

    /                          homepage: who it is for, scorecard, sessions, contact
    /ai-readiness-scorecard/   the four-question scorecard
    style.css                  shared design, edit here not per page

The homepage is one page with anchor navigation, not routes. When there is a
second resource alongside the scorecard, the nav item and the section heading
both become Resources and it can move to its own page. One item is not a
library, so it is named for what it actually is until then.

The scorecard gets the wordmark and two links, not the full nav. It is a
single-task page and a full nav there is an invitation to abandon the quiz.

Static files, no build step, no dependencies, no framework. Vercel serves the
folder as-is with no configuration, and folder names become the URL paths.

## Running it locally

    python3 -m http.server 4321

Then open http://localhost:4321. A plain `file://` open mostly works, but query
strings and the shareable-result links need a real server.

## Two things to switch on before this goes public

1. **Two environment variables in Vercel**, under Settings > Environment
   Variables:

       BEEHIIV_API_KEY         from beehiiv, Settings > API
       BEEHIIV_PUBLICATION_ID  looks like pub_xxxxxxxx-xxxx-...

2. **An automation that sends the four examples**, and its id in Vercel as
   `BEEHIIV_SCORECARD_AUTOMATION_ID`. Build it in beehiiv with the trigger set
   to **API**, its first email being `brand/emails/scorecard-examples.html`,
   then copy the id across.

   `api/subscribe.js` passes that id as `automation_ids`, so only people who
   finished the scorecard are enrolled. Somebody who subscribes on beehiiv
   directly never is. Until the variable is set nobody receives the examples,
   and the gate is collecting addresses for something that never arrives.

3. **Three custom fields in beehiiv**, under Audience > Custom Fields:

       scorecard_total     integer
       scorecard_answers   string
       scorecard_verdict   string

   The endpoint already sends all three. beehiiv discards custom fields it does
   not recognise and still returns 200, so until they exist the scores are
   thrown away with no error on either side.

   Until both are set, `api/subscribe.js` returns 503, the scorecard shows the
   score with a note saying the sign-up did not go through, and every attempt
   counts a `gate-fail`. So a missing key is visible in the numbers rather than
   looking like nobody signed up.

The homepage collects nothing itself. It points at the WhatsApp community, at
Katya's Luma calendar, and at two email addresses. Luma notifies followers on
its own, so a new session cannot go out unannounced because someone forgot.

Vercel Web Analytics is on. Events: `start` and `done` on the scorecard,
`shared-view` when a shared link opens on a result, `share`, `lead` on a
submission, and `follow` on the homepage. `start` against `done` is the
completion rate, and `done` against `shared-view` keeps shared links from
inflating it.

## How it works

Four questions, one per screen, scored 1 to 5. The result gives the total, a
banded verdict, the weakest-scoring question by name, and the full 1 to 5 rubric
for each question with the chosen answer marked.

Answers are encoded in the URL as `?s=3542`, so a shared link opens on that
person's result instead of a cold start screen.

Question 3 is deliberately counterintuitive. It asks whether a wrong answer
would be *noticed*, not how bad it would be. An automation that quietly stops
working is the failure mode being taught: a day with no output looks exactly
like a quiet day.

## Accessibility

Targets WCAG 2.2 AA. What that meant in practice:

- Contrast is checked, not eyeballed. Every token in `style.css` carries its
  measured ratio in a comment. `--line` is decorative rules only. Control
  borders use `--edge`, which clears the 3:1 in 1.4.11.
- Each question is a `fieldset` with a `legend`, so the five options are
  announced as one labelled group.
- Arrow keys move and check a radio at the same time. Auto-advancing on every
  change would fling a keyboard user through the form, so the page tracks the
  input mode: pointer users get the auto-advance, keyboard users get a Next
  button. Answering advances the page, so the hint says so before it happens
  (3.2.2).
- Focus moves to the new question's legend on advance, and to the verdict
  heading when the result appears.
- Every interactive target is at least 24 by 24 (2.5.8).
- Inputs have real labels above them, never a placeholder standing in.
- All motion sits behind `prefers-reduced-motion: no-preference`, with a reduce
  block that switches off animation and transition.
- The mobile drawer is a modal `<dialog>`, not a hand-rolled panel. The platform
  supplies the focus trap, Escape to close, inerting of the page behind it, and
  focus returning to the toggle. What is left in script is opening it, mirroring
  the state onto `aria-expanded`, closing on a link or backdrop click, and
  closing it if the viewport widens past the toggle.
- Share and Score another task are `<button>`s, not links with a button role, so
  Space works as well as Enter.

Checked at 320, 375, 768, 1280 and 1920, with the 1.4.12 text-spacing overrides
applied: no horizontal scrolling, no clipping, no target under 24px.

## Editing

Questions, options and result bands are the `QUESTIONS` and `BANDS` arrays at
the top of the script. Everything else is derived from them, including the
rubric display and the weakest-link diagnosis. Adding an option or changing
wording means editing one array entry.
