/* Open-book reference pages: attack plan, fallacy table, exam rules (cheatsheet Sections A–C). */
(function (RL) {
  'use strict';
  RL.ref.rules = [
    `Final: 1pm, 30 Nov 2026, on Examplify. Open book (printed or handwritten only). T/F sets and/or MCQs.`,
    `Be guided by the latest lecture and tutorial material. Past-year keys may contain errors and earn no bonus marks if they mislead you.`,
    `In a T/F set each statement earns partial credit with no penalty for wrong answers, so judge every statement on its own and never leave one blank.`
  ];
  RL.ref.attack = [
    [`Spot the topic`, `Match the stem's words to a chapter (see the map below).`],
    [`Find whose view`, `"According to Hurley / Salmon / Gensler / logical positivism / pragmatism" = answer inside that view.`],
    [`Circle absolutes`, `solely, only, must, necessarily, never, exactly, all, more than, at least, "is an instance of" vs "involves".`],
    [`Judge each statement`, `T/F sets: each item separately, no penalty. Check the reason clause too ("X because Y" is F if Y is the wrong reason).`],
    [`Combination MCQs`, `Find one item you are sure is F, strike every option containing it, then decide the rest.`],
    [`Don't over-read`, `No charity unless asked. Don't assume facts not stated ("this is all we know"). Lecture/tutorial beats past keys.`]
  ];
  RL.ref.map = [
    [`statement, sentence, critical attitude, evidence, testimonial`, 1],
    [`argument?, conclusion, premise, indicator, because/since/thus, linear diagram, conjoint, charity, Hurley, Salmon`, 2],
    [`valid, sound, deductively infer, if...then, not both, it is not the case that, cogent vs sound`, 3],
    [`definition, too broad/narrow, circular, tone, vagueness, essential, interchange test`, 4],
    [`stipulative, meaningful, logical positivism, pragmatism, verifiable, true by definition`, 5],
    [`inductive, P-/C-inductive, statistical syllogism, odds, probability, given, without replacement`, 6],
    [`mutually exclusive, fair betting odds, expected utility/cost, frequentist/classical/subjectivist, believe if >50%`, 7],
    [`sample, examined, roughly, analogy, strengthen/weaken, Mill, cause, correlation`, 8],
    [`hypothesis, simplicity, coherence, crucial experiment, Ohm, alternative hypotheses`, 9],
    [`good argument, proof, proved/refuted, circular, ambiguous, emotion, beside the point, straw man, crowd, opposition`, 10],
    [`genetic, ignorance, post hoc, part-whole, authority, ad hominem, pro-con, black-and-white, stereotype, force, complex question`, 11]
  ];
  /* [name, how to spot it, cue words, gets confused with] */
  RL.ref.fallacies = [
    [`Circular`, `Conclusion (or something assuming it) used as a premise`, `because it is; can't happen so impossible`, `Complex question; ambiguous`],
    [`Ambiguous`, `Key word shifts meaning between premise and conclusion`, `good, law, competitive, fine`, `False stereotype; circular`],
    [`Appeal to emotion`, `Feelings replace a reasoned case`, `traitor, shame, how can you`, `Passionate arguments that still give reasons`],
    [`Beside the point`, `Conclusion irrelevant to the issue debated`, `people are discussing X... someone argues Y`, `Irrelevant premise; straw man`],
    [`Straw man`, `Opponent's view misrepresented, then attacked`, `so what P is really saying is`, `Beside the point; ad hominem`],
    [`Appeal to the crowd`, `True because most people believe it`, `most people, everyone thinks`, `Authority; sample projection`],
    [`Opposition`, `False because opponent/enemy believes it`, `our enemies think`, `Ad hominem; crowd`],
    [`Genetic`, `Belief accepted/dismissed because its origin is explained`, `result of a need; comes from`, `Ad hominem; the word "gene"`],
    [`Appeal to ignorance`, `No proof ∴ false; no disproof ∴ true`, `no one has proved / disproved`, `Burden-of-proof talk with real evidence`],
    [`Post hoc`, `Caused because it came after`, `before, after, every time... then`, `Mill's agreement/variation`],
    [`Part-whole`, `Every part → whole, or whole → every part`, `every individual... as a whole`, `False stereotype; distributive cases`],
    [`Appeal to authority`, `Not an expert, no consensus, or "must be true"`, `says, according to, must be true`, `Non-fallacious form (expert + consensus + presumption)`],
    [`Ad hominem`, `Person's irrelevant trait ∴ P false`, `he is a..., hypocrite`, `Non-fallacious form (bias → not fully reasonable); genetic`],
    [`Pro-con`, `Decision made on one side only`, `reasons for us, reasons against them`, `Black-and-white; beside the point`],
    [`Black-and-white`, `Only two extremes assumed`, `either... or; must be`, `Pro-con`],
    [`False stereotype`, `Some members → all members`, `people from group X are`, `Statistical syllogism; sample projection`],
    [`Appeal to force`, `Threats or intimidation`, `or you'll be fired`, `Appeal to emotion`],
    [`Complex question`, `Trick question presupposing something doubtful`, `still, again, which do you prefer`, `Circular`]
  ];
})(window.RL);
