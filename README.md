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

1. **`FORM_ENDPOINT`** near the top of the script tag on both pages is `null`.
   While it is null, neither page collects anything: the scorecard hides its
   email block, and the homepage falls back to two mailto links that do work
   today. Point it at a form endpoint (Formspree, Buttondown, a Vercel function)
   and the forms appear. Whoever owns that endpoint owns the list.

2. **Vercel Web Analytics**, switched on in the Vercel dashboard. The script tag
   is already in the page and is inert until then. Without it there is no way to
   tell a failed launch from a quiet week, which is the exact failure the
   scorecard teaches.

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

Checked at 320, 375, 768, 1280 and 1920, with the 1.4.12 text-spacing overrides
applied: no horizontal scrolling, no clipping, no target under 24px.

## Editing

Questions, options and result bands are the `QUESTIONS` and `BANDS` arrays at
the top of the script. Everything else is derived from them, including the
rubric display and the weakest-link diagnosis. Adding an option or changing
wording means editing one array entry.
