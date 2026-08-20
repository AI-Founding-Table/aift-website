# AI use-case scorecard

Four questions, 90 seconds. Scores one piece of a business's work out of 20 and
says whether to hand it to AI, including when the honest answer is no.

Built for "AI for Business Owners | Practical Use Cases", Barcelona, Aug 21 2026.
Katya Dominguez and Andres. Lives at aifoundingtable.com.

## Pages

    /                          waitlist homepage
    /ai-readiness-scorecard/   the four-question scorecard
    style.css                  shared design, edit here not per page

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

## Editing

Questions, options and result bands are the `QUESTIONS` and `BANDS` arrays at
the top of the script. Everything else is derived from them, including the
rubric display and the weakest-link diagnosis. Adding an option or changing
wording means editing one array entry.
