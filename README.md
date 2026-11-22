# Land Lah!

A pixel-art study system for **RE2702 Land Law** (final: **Tuesday 24 Nov 2026, 9–11 am, Biz2 05-11**, open book,
Section A 20 MCQs × 3 marks + Section B one 40-mark case study). Same engine and look as Reason Lah! below,
re-themed as a survey-plan blueprint: ten **lots** (one per chapter) and the **Exam Hall**.

## Use it

- **Offline:** open `dist/land-lah.html` in any browser. One self-contained file; progress saves in that browser.
- **Print now:** `dist/RE2702-exam-pack.pdf` is the Exam Pack plus a one-pager for every lot (A4, two columns, 10 pages).
- **Where I fell short** (`dist/RE2702-where-i-fell-short.pdf`, 26 pages): a learning essay built from your own Land Lah!
  record (every MCQ and quick-fire fact you got wrong, your scores per lot, the patterns behind them), the key learning
  points per lot, and every case in the course with its facts, holding and a finished "quote it" sentence applied to a
  course fact pattern (papers/quotes.mjs).
- **Section B guide** (`dist/RE2702-section-b-guide.pdf`, 20 pages): how the case study is marked and timed, an issue
  spotter, 24 topics each with a sample question and a full model answer in ILAC (one Issue, Law, Application and
  Conclusion block per issue, then advice to each party; papers/topics.mjs), 10 narrative essay plans, and the
  past-year case studies mapped to the model answers.
- Rebuild the papers with `npm run build:papers` (each is capped at 30 pages). To refresh your record from a newer save,
  add `-- --record path/to/save.json` (the app's synced `landlah` document, or a save exported from the browser).
- **From source:** open `landlah/index.html`.
- **Host it (e.g. Netlify):** `node scripts/build-landlah.mjs --site site` writes `site/` (index.html + audio/);
  drag that folder onto app.netlify.com/drop. Claude-only features (AI marking, Claude voices, sync) need the claude.ai artifact.

## What's inside

| Lot | Place | Lectures | Topic |
|---|---|---|---|
| 1 | Kampong Lorong Buangkok | L1 · L2 | Legal system, land, fixtures, title |
| 2 | Chancery Lane | L3 | Law and equity, Equity's Darling |
| 3 | Sunny Avenue | L4 | Covenants |
| 4 | Tai Seng Industrial Estate | L5 | Easements, support, licences |
| 5 | Raffles Place | L5 | Mortgages |
| 6 | Orchard Road | L6 | Leases and licences |
| 7 | Sentosa Cove | L7 · L8 | Co-ownership and trusts |
| 8 | Punggol | L9 | Sale and purchase: the contract |
| 9 | Newton · Land Registry | L10 | Torrens, caveats, stamp duty |
| 10 | Toa Payoh | L11 · L12 | Agency and estate agency |

Each lot starts with a **video lesson**: a 3–5 minute narrated, animated lesson (title card, diagrams that draw
themselves as the story is told, side-by-side comparisons, case cards stamped HELD, trap warnings, a recap) with two
true/false **quick checks** that pause the video until you answer. When it ends, a 5-question **checkpoint** starts on
its own (it pulls in MCQs you have got wrong before), then the **graded test** (10 MCQs, 25 min, /30). Then
**training** with per-option explanations, a 60-second **lightning round**, **case drills**, and the original
**lesson cards** for reading.

- **Narration:** every lesson is pre-recorded in a natural British male voice (the open-source Kokoro-82M neural
  voice "bm_george", British pronunciation), one MP3 per lot in `landlah/audio/`, so it sounds the same on every device, phones and Safari
  included, and offline. The animation follows the recording line by line (`landlah/js/content/voice.js` holds each
  line's start and end). The Voice menu also offers the four Claude voices (Buttery, Airy, Glassy, Rounded; claude.ai
  artifact on desktop Chrome/Edge only), the browser's own voice, and captions only. Captions always show the words.
  Space plays/pauses, ← → change scene, T/F answers a quick check. The video is drawn live in the page, not an MP4.
- **Re-recording** after editing a script in `landlah/js/content/videos.js`:
  `node scripts/export-narration.mjs > narration.json && python3 scripts/record-voice.py narration.json MODEL_DIR`
  (MODEL_DIR holds `kokoro-v1.0.onnx` and `voices-v1.0.bin` from the kokoro-onnx GitHub release `model-files-v1.0`).
  A lesson whose script no longer matches its recording falls back to the other voices until it is re-recorded.
- **Explainer videos for your weak spots:** on *My cheat sheet*, "Explain it in a video" has Claude script a short
  narrated explainer for that one concept, from your notes only, then sends you to drill it.

- **151 MCQs** in the practice paper's style (single best answer and "(i) and (iii)" combinations), including the
  paper's own four MCQs with their answers. 149 lightning items, 77 named traps, 29 case studies.
- **Case studies** are written in a workspace (facts beside the answer box, ILAC skeleton, authority bank, timer)
  and marked point by point against a marking scheme. The keyword marker scales marks down for thin answers;
  you then adjust each point against the model answer. In the claude.ai artifact, **Prof. Borough (Claude)** can mark
  each part and can write new questions in the prof's style.
- **Exam Hall:** six fixed mock papers (no MCQ repeats across papers) plus a random paper. Full 2-hour sitting,
  Section A only, or Section B only. Paste is blocked in Section B, as in the real paper.
- **Automatic cheat sheet (My cheat sheet):** every MCQ, case-study point and lightning fact you get wrong is grouped
  into a concept card that rebuilds after each attempt: the rule and the trap, the matching rule from your notes, what to
  remember, and the cases and sections to cite (looked up in the case guide). Each results screen shows what was just
  added. A concept is mastered after two right answers in a row. Drill any concept, print or save the sheet, and in the
  claude.ai artifact ask Claude to condense it to one page. The sheet builder adds the Exam Pack and lot one-pagers.
- **3-day plan** with deep links, and searchable open-book notes with an A–Z case index.

Grading: 3 marks per MCQ, all or nothing, no penalty assumed. Letter grades use fixed bands for feedback only.
Points marked **[check]** come from the source notes and need confirming against the lecture slides.

```
npm run test:land    # answer keys, combinations, traps, marking schemes (every model answer must pass its own scheme), mock papers, concept cards
npm run build:land   # bundles landlah/ into dist/land-lah.html
npm run smoke:land   # plays every screen in headless Chromium at desktop and phone widths
```

---

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
