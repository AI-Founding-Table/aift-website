# Scorecard examples email

Sent by an automation, not on subscribe. Only people who finished the scorecard
should get it, because only they were promised it.

`api/subscribe.js` enrols them by passing `automation_ids` when it creates the
subscription, so the split needs no segments and no tags. Somebody who signs up
on beehiiv directly is never enrolled and never sees this. Set up:

1. In beehiiv, build an automation whose trigger is **API**.
2. Its first email is this copy. `scorecard-examples.html` is it, built out.
3. Copy the automation id and set `BEEHIIV_SCORECARD_AUTOMATION_ID` in Vercel.

Until that variable is set, nothing is enrolled and nobody gets these examples,
which means the gate is promising something it does not deliver. That is the
one state here worth avoiding.

**Subject:** Two that worked, two that did not

**Preview text:** Four use cases, scored, with the actual numbers.

---

You scored one piece of your work. Here are four of ours, scored the same way,
with what actually happened after.

The two failures are the useful ones.

## 11 out of 20. A website copy rewrite.

Happens 1. Costs 4. Noticed 4. Written down 2.

Produced in an afternoon, and it was good. Used once. The work does not recur,
so nothing was built on top of it and no time was saved after that first
afternoon. High value per round is not enough on its own.

## 14 out of 20. A scheduled job with no failure check.

Happens 5. Costs 3. Noticed 2. Written down 4.

It produced a recurring internal summary, until it stopped. Nobody noticed for
weeks, because a day with no output looks exactly like a quiet day. It scored
well on everything except the one question that mattered.

## 16 out of 20. Client call recordings turned into a question set.

Happens 4. Costs 4. Noticed 4. Written down 4.

A client asked for work outside the service list. Rather than price something
unfamiliar, the call recordings became a specific set of questions that got at
what they actually needed. Repeatable across clients, and it led to larger paid
projects. Strong candidates often hide in work you are not billing for.

## 19 out of 20. A written context layer that every tool reads.

Happens 5. Costs 5. Noticed 4. Written down 5.

The business's own facts, offers, processes and voice, written once in plain
files and read by every AI process instead of retyped per task. 7.137 billion
tokens over three months, about 96% of them cache reads. Consistent output, and
a lower running cost, because the same context gets read rather than rebuilt.

---

Three of those four are ordinary work. The one that scored highest is not a
clever tool. It is a document.

Score another one whenever you like. Most people's second guess is better than
their first, because the first is usually the task they find most annoying
rather than the one that costs the most.

**[Score another task]**

Katya and Andres

---

## Notes

The subject names the failures rather than the wins. Everyone promises case
studies that worked, so two that did not is the part nobody else sends.

The score lines are compact on purpose. Everyone reading this has just answered
those four questions, so they need no legend.

"Three of those four are ordinary work. The one that scored highest is not a
clever tool. It is a document." That sentence is the whole argument, and it
sets up the next session without naming a date that will move.

This used to be the welcome email and did both jobs at once. It does not any
more. The welcome email sets expectations for everybody; this one keeps a
promise made to a smaller group. Two jobs, two emails.
