# AI use-case scorecard

Four questions, 90 seconds. Scores one piece of a business's work out of 20 and
says whether to hand it to AI, including when the honest answer is no.

Built for "AI for Business Owners | Practical Use Cases", Barcelona, Aug 21 2026.
Katya Dominguez and Andres. Lives at aifoundingtable.com.

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

1. **`FORM_ENDPOINT`** in the scorecard's script tag is `null`. Create a form at
   formspree.io and paste the endpoint it gives you in place of `null`. Until
   then the offer block does not render and the page collects nothing.

   Formspree stores and forwards. It does not send anything to the person, so
   the four examples go out by hand. The success copy says so rather than
   implying an autoresponder that does not exist.

The homepage collects nothing and has no endpoint. The waitlist points at
Katya's Luma calendar, where Follow already does the job the form would have
done, and better: Luma notifies followers itself, so a new session cannot go
out unannounced because someone forgot.

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
