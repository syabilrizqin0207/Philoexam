# Reason Lah!

A pixel-art study game for **GET1026 / GEK2048 Effective Reasoning** (final exam: 1pm, 30 Nov 2026, Examplify, open book).
You pick a Singaporean NUS student and ride the **Reasoning Line**, an MRT-style route with one station per lecture,
from Kent Ridge to the Final Exam Hall.

## Play

- **Easiest:** open `dist/reason-lah.html` in any browser (one self-contained file).
- **From source:** open `index.html`, or run `npm run serve` and visit http://localhost:8080.

Progress is saved in your browser (localStorage) on that device.

## What's inside

| Station | Location | Lecture |
|---|---|---|
| RL1 | NUS Kent Ridge | L1 Introduction to Effective Reasoning |
| RL2 | Tekka Centre | L2 · T1 · T2 Recognising Arguments |
| RL3 | Dhoby Ghaut Interchange | L3 · T3 Validity, Soundness & Compound Propositions |
| RL4 | National Library | L4 · T3 Meaning & Definitions 1 |
| RL5 | Gardens by the Bay | L5 · T3 Meaning & Definitions 2 |
| RL6 | Toa Payoh Void Deck | L6 · T4 Inductive & Probabilistic Reasoning |
| RL7 | Jewel Changi Airport | L7 · T4 Probability & Rationality |
| RL8 | Pulau Ubin | L8 · T5 Sample, Analogy & Causation |
| RL9 | one-north | L9 Scientific Inference |
| RL10 | Speakers' Corner | L10 Argumentation & Fallacies 1 |
| RL11 | Ang Mo Kio Kopitiam | L11 Argumentation & Fallacies 2 |
| RL12 | Final Exam Hall | Mock final (15 / 25 / 40 questions) |

Each station has:

1. **Lesson**: cards taken from the cheatsheet (definitions, checklists, tutorial answers, traps).
2. **Training**: every question for the chapter, with instant feedback and per-statement explanations.
3. **Lightning round**: 60 seconds of rapid true/false with combo multipliers.
4. **Graded test**: 10 questions in 25 minutes, marked by the professor. A **C (55%)** opens the next station.

Content: 232 exam-style questions (307 graded T/F statements, including 45 items from the 2018 and GEX23 papers),
180 lightning items, 108 lesson cards and a 79-entry trap index. The Notes button gives open-book access during exams,
as in the real paper.

### Grading

- MCQs and combination MCQs ("Only I and III") are all-or-nothing.
- T/F sets give partial credit per statement with **no penalty for wrong answers**, as the course notice says.
- Letter grades use the NUS 5-point scale with fixed bands: A+ 90, A 85, A− 80, B+ 75, B 70, B− 65, C+ 60, C 55, D+ 50, D 45, F.
- Prof. Socra-Tan's report names your weakest topics, quotes the exact trap behind each wrong answer
  (e.g. "Odds against u:f gives Pr = f/(f+u)"), flags blanks and rushing, and tells you which stations to revise.
- Wrong answers go to the **Mistake Notebook** until you get them right twice in a row.

Characters (Wei Ling, Nur Aisyah, Arjun, Marcus, Jun Jie, Kavitha) each have a perk that works only in Training
and Lightning rounds. Graded tests are perk-free. **Cram mode** in Settings opens every station at once.

## Develop

```
npm test         # validates every answer key, combination option set, trap reference and the grading maths
npm run build    # bundles everything into dist/reason-lah.html
npm run smoke    # plays through every screen in headless Chromium (needs Playwright)
```

No dependencies. Plain HTML, CSS and JavaScript; fonts load from Google Fonts with monospace fallbacks.

Questions live in `js/content/chNN.js`. A question is either an MCQ (`t: 'mcq'`, options `o`, key `a`, `why`) or a statement
set (`t: 'set'`, `s: [[text, true|false, why, trapKey?], ...]`). A set is served either as a T/F set or as a combination MCQ.
Its options are generated automatically, or fixed with `opts`.

Lecture and tutorial material wins every conflict. Past-paper keys are used as style guides, following the course notice.
This is an unofficial revision aid. All characters are fictional.
