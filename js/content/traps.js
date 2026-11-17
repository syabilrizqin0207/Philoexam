/* Trap index: the professor quotes these when a wrong answer matches a known trap.
   ch = the chapter to revise. Sources: cheatsheet Section C and the per-chapter trap indexes. */
(function (RL) {
  'use strict';
  var T = function (key, ch, text) { RL.TRAPS[key] = { ch: ch, text: text }; };

  T('feelings', 1, 'An indicative sentence that describes feelings still expresses a statement. "Feelings" only matters for whether demanding evidence is appropriate.');
  T('one-statement', 1, 'One statement, however long, is never an argument, and an argument has exactly one conclusion.');
  T('absolutes', 1, 'Options built on "never", "purely", "all" or "solely" are usually wrong unless the slide itself says so.');
  T('testimonial', 1, 'Testimonials are poor, one-sided evidence. Calling them "no evidence at all" overstates the slide.');
  T('evidence-trust', 1, 'We ought to seek evidence regardless of how much we trust a source when great consequences are involved.');

  T('charity', 2, 'Never insert a missing premise unless the question asks you to apply the principle of charity.');
  T('causal-because', 2, 'A causal "because" explains why an event happened. On Salmon\'s rule that is not an argument. Run the causal/evidential paraphrase test.');
  T('intention', 2, 'Whether a passage is an argument is judged objectively from the words on the page, not from what the author intended.');
  T('indicator-sense', 2, 'Indicator words have non-argument senses: "since" can be temporal or causal; "thus" can mark an effect, an example or mean "in this way". "For this reason" is a conclusion indicator.');
  T('pronoun', 2, 'A pronoun pointing back to an earlier sentence is not, by itself, a reason to conjoin two premises.');
  T('irrelevant-stmt', 2, 'A correct diagram leaves out statements that give no support (concessions, background, irrelevant claims). Including one makes the diagram wrong.');
  T('conjoint', 2, 'Conjoint (hyphen) means one premise boosts the other\'s support; independent (comma) means each supports the conclusion on its own.');
  T('two-conclusions', 2, 'Strictly, n conclusions means n arguments. Join them with & into a single conclusion, e.g. (2&3:1).');
  T('extended', 2, 'On the L2 definition an extended argument can be a single premise set and conclusion, or a cluster of interrelated arguments.');
  T('illustration', 2, 'Illustration and argument are not exclusive. The mosquito passage is both.');

  T('solely', 3, '"Soundness depends solely on X" is false: soundness needs validity AND every premise true.');
  T('tp-fc', 3, 'All-true premises with a false conclusion is never valid. False premises with a false conclusion can still be valid.');
  T('switch-conclusion', 3, 'The same passage can be deductive with one conclusion and inductive with another.');
  T('as-it-is', 3, 'A parenthetical "(as it is)" asserts the antecedent, which turns the passage into If P then Q, P, so Q.');
  T('neg-cond', 3, '~(P⊃Q) = P·~Q. A negated conditional gives you two facts at once: the antecedent is true and the consequent is false.');
  T('not-both', 3, '~(P·Q) means "not both". It never gives you ~P alone or ~Q alone; you need a further premise.');
  T('deny-ant', 3, 'Denying the antecedent and affirming the consequent are invalid forms.');
  T('cogent-deductive', 3, '"Strong" and "cogent" apply only to inductive arguments; "valid" and "sound" only to deductive ones.');
  T('valid-sound', 3, 'Valid does not mean sound. Validity is about form; soundness also needs all premises true.');
  T('odd-but-valid', 3, 'An argument that sounds odd can still be valid. Validity is about form, not plausibility.');
  T('hidden-definition', 3, 'Some arguments are deductive because of the meanings of their words (a hidden definitional premise), even without an explicit valid form.');

  T('right-flaw-wrong-reason', 4, 'A correct flaw with the wrong reason is FALSE. Always check the reason clause.');
  T('phrase-circular', 4, 'Using one word of a multi-word phrase is not automatically circular. Using the whole term or a same-root word is.');
  T('pu-definition', 4, '"Poorly understood terms" is about the words in the definition, not about the term being defined.');
  T('tone-match', 4, 'Tone compares the term with the definition. A negative term with a negative definition is no mismatch.');
  T('narrow-essential', 4, '"Too narrow because the property is essential" contradicts itself.');
  T('broad-vs-narrow', 4, 'Too broad: something fits the definition but not the term. Too narrow: something fits the term but not the definition.');
  T('vague-separate', 4, 'Vagueness is a separate rule about precision, not about the size of the class. "Too broad" does not imply a vagueness mismatch.');
  T('interchange', 4, 'Interchange test: use only the intended sense, and never use sentences with the term or definition in quotation marks.');

  T('lp-definition', 5, 'Logical positivism counts sentences that are true by definition as meaningful.');
  T('lp-instruments', 5, 'For logical positivists, detection with scientific instruments or theory is not observation.');
  T('lp-strict', 5, 'On a stricter verifiability criterion, universal generalisations over infinite populations are meaningless.');
  T('pr-choice', 5, 'For pragmatism, a practical difference to experience OR to what one ought to choose is enough for meaning.');
  T('lexical-stipulative', 5, 'Lexical definitions report current usage; stipulative definitions set one\'s own usage.');

  T('odds-against', 6, 'Odds against are u:f, so Pr = f/(f+u). Odds against 11:23 means Pr = 23/34, not 11/34.');
  T('stat-vs-stereo', 6, 'A statistical syllogism (N% of A are B; x is A) is not a false stereotype (some members, so all members).');
  T('extra-info', 6, 'Further information about x can change how well the premise set supports the conclusion.');
  T('indep-vs-mutex', 6, 'Independent events (AND rule: multiply) are not the same as mutually exclusive events (OR rule: add).');
  T('conditional-pct', 6, '"N% of those with X have Y" is a conditional probability, Pr(Y|X). Check claims to the decimal.');
  T('overlap', 6, 'For "or" with overlapping events, add and then subtract Pr(A·B).');

  T('exactly-50', 7, 'Exactly 50% is not "more than 50%".');
  T('lecture-numbers', 7, 'Use the numbers in the question, not the numbers from the lecture example.');
  T('fair-odds', 7, 'Mathematically fair betting odds = odds against your winning = (n−f) to f.');
  T('eu-signs', 7, 'In expected utility, multiply every outcome by its probability and keep the signs; losses are negative.');
  T('catastrophe', 7, 'Catastrophic consequences do not make probability irrelevant. Expected utility still weighs them by probability.');
  T('ambiguity-eu', 7, 'If a statement is ambiguous and neither reading gives a reason to affirm it, treat it as false.');
  T('interpretations', 7, 'Frequentist = observed frequencies; classical = possible outcomes; subjectivist = actual confidence; rational credence = ideally rational confidence.');

  T('too-precise', 8, 'A sample projection should conclude "probably roughly N%", not an exact figure.');
  T('agreement-once', 8, 'Mill\'s method of agreement needs the effect to occur more than once.');
  T('inseparable', 8, 'If two factors always appear together and are never separated, no Mill\'s method can be applied.');
  T('variation-common', 8, 'The method of variation\'s conclusion includes the option that some C caused both.');
  T('deny-causal', 8, 'Pointing to cases where A occurred without B, to deny that A necessarily causes B, is the method of disagreement.');
  T('contrapositive', 8, 'A one-way "All F are G" plus its contrapositive is not "iff", so it does not set up Mill\'s agreement.');
  T('relevance-analogy', 8, 'In analogies, judge relevance against the conclusion: relevant similarities strengthen, relevant differences weaken, trivial ones are irrelevant.');
  T('unseen-method', 8, 'Do not name a method that the passage never shows anyone using.');
  T('either-method', 8, 'Several tutorial answers accept "agreement (or difference)". Do not reject an option just because the other method also fits.');

  T('simplicity', 9, 'Simplicity only applies "all else being equal". A hypothesis refuted by the data is out, however simple.');
  T('fit-not-proof', 9, 'Data that fit a hypothesis do not prove it; infinitely many hypotheses fit any finite data set.');
  T('proved-ordinary', 9, '"Proved" by an experiment means proof in the ordinary sense (a good inductive argument), not the technical sense (a sound argument).');

  T('proved-refuted', 10, '"A proved P and B refuted P" is contradictory. Say "A attempted to prove P but B refuted P".');
  T('passion-reason', 10, 'A passionate argument that still gives reasons is not an appeal to emotion.');
  T('irrelevant-premise', 10, 'An irrelevant premise is not "beside the point". That fallacy needs the conclusion to be irrelevant to the issue.');
  T('equivocation', 10, 'Watch for one key word used in two senses: that is the fallacy of ambiguity.');
  T('good-vs-persuasive', 10, 'Good arguments may fail to persuade, and bad arguments may persuade.');

  T('instance-involves', 11, '"Is an instance of" needs an explicit argument with that structure. "Involves/assumes" is a weaker claim.');
  T('distributive', 11, 'If the property distributes to every part (an entire salary), whole-to-part reasoning is valid, not a fallacy.');
  T('bias-reasonable', 11, 'Bias, therefore "X is not fully reasonable in holding P", is the non-fallacious form of ad hominem.');
  T('genetic-reject', 11, 'The genetic fallacy needs a belief accepted or dismissed because of its origin. A "genetic mutation" is a word trap.');
  T('pros-only', 11, 'An argument for a choice that lists only advantages (and mocks critics) commits the pro-con fallacy.');
  T('authority-ok', 11, 'Expert + consensus of authorities + "there is a presumption that P" is the non-fallacious appeal to authority.');
  T('complex-q', 11, 'A complex question presupposes something not yet granted. A question that merely uses the word "complex" is not one.');
  T('forced-conclusion', 11, 'If the premises guarantee the conclusion, the argument is deductive, even when it moves from parts to a whole.');
  T('weighed', 11, 'Weighing strengths against a relevant weakness is neither the pro-con fallacy nor a fallacious ad hominem.');
  T('stereotype-source', 11, 'False stereotype rests on isolated cases or inadequate data. A generalisation not drawn from some members is not a false stereotype.');
})(window.RL);
