/* Chapter 3 — Validity, Soundness & Compound Propositions [L3] [T3] */
RL.chapter({
  n: 3, code: 'RL3', lec: 'L3 · T3', title: `Validity, Soundness & Compound Propositions`, short: `Validity & Connectives`,
  place: `Dhoby Ghaut Interchange`, spot: `Circle Line control room`, icon: 'train', sky: 303,
  mentor: ['boole'], mentorName: `Uncle Boole`,
  story: [
    `Mind the platform gap! I am Uncle Boole. I run the signals here: green means true, red means false.`,
    `Every signal is a statement, and every junction is a connective: "not", "and", "or", "if... then", "if and only if".`,
    `A valid argument is a track with no wrong turn: if every premise is green, the conclusion cannot be red. But a valid track can still start from a false station. Then it is not sound.`,
    `Solve my junctions. Watch the negated conditionals. Most passengers derail there.`
  ],
  win: `Every signal green. You can tell valid from sound and you never deny an antecedent. Next stop: the National Library.`,
  cards: [
    { t: `Valid, sound, deductive`, b: `**Valid (deductive):** the conclusion **cannot be false if all the premises are true**. "All humans are mortal. Socrates is human. ∴ Socrates is mortal."\n\nStatements are true or false. Arguments are valid or invalid. Validity is a relation between premise set and conclusion: **truth-preserving**.\n\n**Sound** = valid + **all** premises true. "If someone is a human, that person is a woman. Our logic teacher is a human. ∴ Our logic teacher is a woman." Valid but unsound.` },
    { t: `Inductive and cogent`, b: `**Inductive:** premises support or confirm the conclusion without implying it. Inductive arguments are **invalid**. "Most who live in France speak French. Pierre lives in France. This is all we know. ∴ Pierre speaks French."\n\n**Strong:** the premise set makes the conclusion probable to a sufficient degree.\n**Cogent:** strong + all premises true (Gensler: "reliable").\n\nValid/sound are for deductive arguments. Strong/cogent are for inductive ones.` },
    { t: `Truth-value combinations`, b: `- All premises true, conclusion true: can be valid (then sound).\n- All premises true, conclusion false: **never** valid.\n- Some premise false, conclusion true: can be valid ("All cats are fish. All fish are mammals. ∴ All cats are mammals.").\n- Some premise false, conclusion false: can be valid ("All police officers in the UK carry firearms. Wang Yen is a policeman in the UK. ∴ Wang Yen carries firearms.").` },
    { t: `Connectives`, b: `- **not** ~ : negation; opposite value.\n- **and** · : conjunction; true when both conjuncts true.\n- **or** ∨ : disjunction; true when at least one disjunct true.\n- **if...then** ⊃ : material conditional; false **only** when the antecedent is true and the consequent false.\n- **iff** ≡ : biconditional; true when both parts have the same value.\n\n"I went to Paris iff I went to Quebec" is true if I went to both or to neither.` },
    { t: `Truth table`, b: `P Q | P·Q | P∨Q | P⊃Q | P≡Q\n0 0 | 0 | 0 | 1 | 1\n0 1 | 0 | 1 | 1 | 0\n1 0 | 0 | 1 | 0 | 0\n1 1 | 1 | 1 | 1 | 1\n\nFalse antecedent: conditional true. True consequent: conditional true. Work from the innermost brackets out. "It is not the case that..." negates everything after it.` },
    { t: `Equivalences`, b: `- (P⊃Q) = ~(P·~Q) = (~Q⊃~P)\n- **~(P⊃Q) = (P·~Q)**: a negated conditional gives two facts.\n- **~(P·Q)** = "not both" = (~P∨~Q). It does **not** give ~P alone.\n- ~(P∨Q) = (~P·~Q)\n- (P⊃Q) = (~P∨Q)` },
    { t: `Valid forms`, b: `- If P then Q. P. ∴ Q (modus ponens)\n- If P then Q. Not Q. ∴ Not P (modus tollens)\n- If P then Q. If Q then R. ∴ If P then R (Iran/Persian Gulf)\n- If H and C, then O. C. Not O. ∴ Not H (refuting a hypothesis)\n- All F's are G. x is F. ∴ x is G\n- ~(P·Q). P. ∴ ~Q (Fido)\n- P∨Q. ~P. ∴ Q (disjunctive syllogism)` },
    { t: `Invalid forms`, b: `- If P then Q. Not P. ∴ Not Q: **denying the antecedent**. "If you get an A, the dean will praise you. You don't get an A. ∴ The dean won't praise you." The dean might praise you for something else.\n- If P then Q. Q. ∴ P: **affirming the consequent**. "If it rained, the road is wet. The road is wet. ∴ It rained." A burst pipe could wet the road.\n- If (E·~M) then T. ~T. ∴ M: only "not both E and ~M" follows (laptop, 2018 Q3).` },
    { t: `Checklist: valid or invalid?`, b: `- Ignore whether premises and conclusion are actually true.\n- Suppose all premises true. Try to build a scenario where the conclusion is false.\n- Possible = invalid. Impossible = valid.\n- Symbolise: letter each simple statement, find the main connective, rewrite negated compounds, plug in what the premises fix.\n- No explicit form? Look for a hidden definitional premise.\n- Then: sound = valid + every premise true.` },
    { t: `Valid because of meanings`, b: `Some arguments are deductive because of what their words mean (T3 3.1):\n- "John is Mary's brother. ∴ Mary has a brother."\n- "Black swans live in Australia. ∴ Not all swans are white."\n- "The meeting began at 11am and ended at 2pm. ∴ It lasted three hours."\n- "Four tickets per senior, 150 seniors. ∴ 600 tickets."\n- "Joe's costs are $3,200; he charges $50 a print. ∴ He must sell at least 64."\n- "Art has an imagined object; sport lacks one. ∴ Sport is not art."\n\nValid arguments give **no new information about the world**, but they are not trivial: m and n even ⇒ m+n even needs a proof.` },
    { t: `Trap check`, b: `- "Soundness depends **solely** on X" is false: it also needs every premise true.\n- Same passage, different conclusion: can switch deductive ↔ inductive (gene passage).\n- "(as it is)" asserts the antecedent → modus ponens.\n- Valid ≠ sound (Kyiv/Moscow).\n- ~(P⊃Q) gives P true **and** Q false (Bennu).\n- "Not both" + one part true → deny the other part (eating out).\n- Odd-sounding can still be valid (Fido).\n- Never call a deductive argument "cogent".` }
  ],
  quick: [
    [`A valid argument can have all true premises and a false conclusion.`, false, `That combination is exactly what validity rules out.`],
    [`A valid argument can have false premises and a false conclusion.`, true, `Wang Yen / UK firearms is valid with a false premise and false conclusion.`],
    [`A sound argument can have a false conclusion.`, false, `Sound = valid + all premises true, so the conclusion must be true.`],
    [`"If P then Q" is false only when P is true and Q is false.`, true, `Only T⊃F is false.`],
    [`A conditional with a false antecedent is true.`, true, `Row 1 and 2 of the truth table.`],
    [`~(P⊃Q) is equivalent to P·~Q.`, true, `A negated conditional gives P true and Q false.`],
    [`~(P·Q) lets you infer ~P.`, false, `"Not both" gives (~P∨~Q), never ~P alone.`],
    [`If P then Q; not P; therefore not Q is valid.`, false, `Denying the antecedent: invalid.`],
    [`If P then Q; Q; therefore P is valid.`, false, `Affirming the consequent: invalid.`],
    [`If P then Q; not Q; therefore not P is valid.`, true, `Modus tollens.`],
    [`P or Q; not P; therefore Q is valid.`, true, `Disjunctive syllogism.`],
    [`Inductive arguments are invalid.`, true, `Their premises support without implying the conclusion.`],
    [`A deductive argument can be cogent.`, false, `Cogent applies only to inductive arguments.`],
    [`P≡Q is true when P and Q are both false.`, true, `Same truth value, so true.`],
    [`P∨Q is false only when both disjuncts are false.`, true, `At least one true makes it true.`],
    [`(P⊃Q) is equivalent to (~Q⊃~P).`, true, `Contrapositive.`],
    [`Every valid argument has an explicitly valid form.`, false, `Many, not all. Some are valid because of meanings.`],
    [`Valid arguments give new information about the world.`, false, `Assuming usual meanings they give none, though they need not be trivial.`]
  ],
  qs: [
    { id: 'c3-01', t: 'set', topic: `Validity & soundness`, src: `2018 Q1`, q: `"If all actions are determined by a series of prior events, then our actions cannot be free. All actions are causally influenced by some prior events. For example, your choice of food at lunch is influenced by your taste and preferences, advertisements, peers... Therefore, our actions cannot be free."`,
      opts: [[0], [0, 1], [1, 2], [2, 3]],
      s: [
        [`Whether this is a valid argument depends solely on whether "being causally influenced" is equivalent to "being determined".`, true, `If they are equivalent, the form is If P then Q, P, so Q (valid). If not, the premises talk about different things.`],
        [`Whether this is a sound argument depends solely on whether "being causally influenced" is equivalent to "being determined".`, false, `Soundness also needs every premise to be true.`, 'solely'],
        [`This is a sample-projection argument.`, false, `No sample-projection form.`],
        [`This is a statistical syllogism.`, false, `No "N% of A's are B" premise.`]
      ] },
    { id: 'c3-02', t: 'set', topic: `Deductive vs inductive`, src: `2018 Q2`, q: `"(1) The effect of a gene is a property of the gene in interaction with the recent history of its local surroundings in the embryo. (2) If the effect of a gene is its property in interaction with the recent history of its local surroundings in the embryo, then a gene at one local surrounding will have a totally different effect from the same gene in a different local surrounding. (3) A gene turned on in cells at the base of the spinal cord in the third week of development will have a totally different effect from the same gene turned on in cells of the shoulder in the sixteenth week."`,
      s: [
        [`This is a deductive argument if (3) is the conclusion.`, true, `P, If P then Q, so R (a case of Q). If (1) and (2) are true, (3) cannot be false.`],
        [`This is an inductive argument if (1) is the conclusion.`, true, `If P then Q, an instance of Q, so P. A true consequent supports but does not force the antecedent.`, 'switch-conclusion']
      ] },
    { id: 'c3-03', t: 'set', topic: `Deductive vs inductive`, src: `2018 Q4`, q: `"If it is true (as it is) that the whole point of justifying inductive inference is to show that inductive inference is truth-conducive, then any attempts to justify inductive inference by using inductive inference will not work (since whether inductive inference can yield truth is in question). Thus, it's clear that one cannot justify inductive inference with inductive inference."`,
      s: [
        [`This is not an argument.`, false, `"Thus" introduces the conclusion; the first sentence is the premise set.`],
        [`This is a deductive argument.`, true, `"(as it is)" asserts P, giving If P then Q, P, so Q.`, 'as-it-is'],
        [`This is an inductive argument.`, false, `It is deductive.`],
        [`The conclusion might be false even if this is a sound argument.`, false, `A sound argument is valid with all true premises, so its conclusion cannot be false.`]
      ] },
    { id: 'c3-04', t: 'mcq', topic: `Validity & soundness`, src: `GEX23 Q5`, trap: 'valid-sound', q: `"Everyone who has visited Kyiv must have been to Moscow. Angie visited Kyiv a month before Ukraine was invaded by Russia. Therefore, Angie must have been to Moscow." Which is TRUE?`,
      o: [`This is a valid argument.`, `This is an inductive argument.`, `This is a sound argument.`, `This is a cogent argument.`],
      a: 0, why: `All F's are G, x is F, so x is G: valid. It is deductive, so B and D are wrong. The first premise is false, so it is not sound.` },
    { id: 'c3-05', t: 'set', topic: `Compound propositions`, src: `GEX23 Q6`, q: `"It is not the case that if asteroid Bennu has an outside chance of hitting the earth within the next 300 years and a sample of materials had been scooped up from this asteroid by the Osiris-Rex spacecraft then Nasa landed the sample of this asteroid in a capsule that came down in the West Desert of Utah."`,
      s: [
        [`We can deductively infer that a sample of materials had been scooped up from the asteroid by Osiris-Rex.`, true, `~((B·S)⊃N) gives (B·S) true and N false. So S is true.`, 'neg-cond'],
        [`We can deductively infer that Nasa didn't land the sample in a capsule in the West Desert of Utah.`, true, `N is false.`, 'neg-cond'],
        [`We can only infer the previous statement if another premise is added.`, false, `No extra premise is needed: a negated conditional gives both facts.`, 'neg-cond']
      ] },
    { id: 'c3-06', t: 'mcq', topic: `Compound propositions`, src: `GEX23 Q24`, trap: 'not-both', q: `"It is not the case both that everyone should cut down on eating out and that if many people eat out frequently then food prices will continue to rise. Food prices will continue to rise." What can you deductively infer?`,
      o: [`Many people eat out frequently.`, `It is not the case that many people eat out frequently.`, `Everyone should cut down on eating out.`, `It is not the case that everyone should cut down on eating out.`],
      a: 3, why: `Premise 1: ~(E·(M⊃F)). F is true, so (M⊃F) is true. Then E cannot also be true, so ~E. Nothing follows about M.` },
    { id: 'c3-07', t: 'set', topic: `Validity & soundness`, src: `GEX23 Q25`, q: `"It is not the case both that Fido is a mammal and not a rabbit. Fido is not a rabbit. Therefore, Fido is not a mammal."`,
      s: [
        [`The argument is invalid.`, false, `~(M·~R) and ~R: if M were true, M·~R would be true, contradicting premise 1. So ~M is forced: valid.`, 'odd-but-valid'],
        [`The argument is valid.`, true, `The conclusion cannot be false when both premises are true.`, 'odd-but-valid'],
        [`The argument is cogent.`, false, `It is deductive, so "cogent" does not apply.`, 'cogent-deductive']
      ] },
    { id: 'c3-08', t: 'set', topic: `Compound propositions`, src: `2018 Q3`, q: `"If your laptop runs Windows 10 version 1803 and does not run McAfee antivirus, then Toshiba Health Monitor will work."`,
      opts: [[0], [1], [0, 2], [0, 1, 2, 3]],
      s: [
        [`From this statement we cannot deductively infer that "If your laptop runs both Windows 10 version 1803 and McAfee antivirus, then Toshiba Health Monitor will not work".`, true, `"E and M" makes the antecedent (E·~M) false. Inferring ~T from that is denying the antecedent.`, 'deny-ant'],
        [`From this statement we can deductively infer that "If your laptop runs Windows 10 version 1709 rather than version 1803, then Toshiba Health Monitor will not work".`, false, `Again denying the antecedent.`, 'deny-ant'],
        [`If premise 2 is "Your laptop runs Windows 10 version 1803 and does not run McAfee antivirus", it follows deductively that "Toshiba Health Monitor will work".`, true, `Modus ponens.`],
        [`If premise 2 is "Toshiba Health Monitor will not work", it follows deductively that "Your laptop runs McAfee antivirus".`, false, `Modus tollens only gives "not both 1803 and no McAfee". The laptop might simply not run 1803.`, 'not-both']
      ] },
    { id: 'c3-09', t: 'mcq', topic: `Compound propositions`, src: `Original`, q: `"If the NEA declares a dengue cluster in Bukit Batok and the void deck has stagnant water, then fogging will be carried out. Fogging was not carried out. The NEA declared a dengue cluster in Bukit Batok." What can be deductively inferred?`,
      o: [`The void deck has stagnant water.`, `The void deck does not have stagnant water.`, `The NEA did not declare a dengue cluster.`, `Nothing about the void deck follows.`],
      a: 1, why: `((D·S)⊃F) and ~F give ~(D·S) by modus tollens. With D true, S must be false.` },
    { id: 'c3-10', t: 'mcq', topic: `Compound propositions`, src: `Original`, trap: 'neg-cond', q: `"It is not the case that if Wei Ling revises at the Central Library, she will pass." What follows deductively?`,
      o: [`Wei Ling does not revise at the Central Library.`, `Wei Ling revises at the Central Library and she will not pass.`, `Wei Ling will pass only if she does not revise at the library.`, `Nothing follows without another premise.`],
      a: 1, why: `~(P⊃Q) = P·~Q. The conditional is false only when the antecedent is true and the consequent false.` },
    { id: 'c3-11', t: 'mcq', topic: `Compound propositions`, src: `Original`, q: `Let P be true, Q false and R true. Which compound is FALSE?`,
      o: [`~(P·Q)⊃R`, `(P⊃Q)∨~R`, `(P≡Q)⊃R`, `Q⊃~R`],
      a: 1, why: `P⊃Q is T⊃F = false; ~R is false; false ∨ false = false. A: ~(F) = T, T⊃T = T. C: F⊃T = T. D: F⊃F = T.` },
    { id: 'c3-12', t: 'mcq', topic: `Compound propositions`, src: `L3 slide`, q: `When is "If I take the Circle Line, I will be late" false?`,
      o: [`Only when I don't take the Circle Line.`, `Only when I take the Circle Line and I am not late.`, `Whenever I am late.`, `Only when I don't take the Circle Line and I am late.`],
      a: 1, why: `A material conditional is false only when the antecedent is true and the consequent is false.` },
    { id: 'c3-13', t: 'mcq', topic: `Compound propositions`, src: `Original`, trap: 'not-both', q: `"It is not the case both that Lau Pa Sat is open and that it is raining." From this premise ALONE, what follows?`,
      o: [`Lau Pa Sat is not open.`, `It is not raining.`, `At least one of "Lau Pa Sat is open" and "it is raining" is false.`, `Lau Pa Sat is not open and it is not raining.`],
      a: 2, why: `~(P·Q) = ~P∨~Q: not both. You cannot get ~P alone or ~Q alone without a further premise.` },
    { id: 'c3-14', t: 'set', topic: `Validity & soundness`, src: `L3 slide`, q: `On truth values and validity:`,
      s: [
        [`An argument with all true premises and a false conclusion can be valid.`, false, `Never. That combination shows the argument is invalid.`, 'tp-fc'],
        [`An argument with a false premise and a false conclusion can be valid.`, true, `The UK firearms example.`, 'tp-fc'],
        [`A sound argument can have a false conclusion.`, false, `Valid + all premises true guarantees a true conclusion.`],
        [`A valid argument can have false premises and a true conclusion.`, true, `"All cats are fish. All fish are mammals. ∴ All cats are mammals."`]
      ] },
    { id: 'c3-15', t: 'mcq', topic: `Argument forms`, src: `L3 Argument 2`, trap: 'deny-ant', q: `"If you get an A in effective reasoning, the dean will praise you. You don't get an A in effective reasoning. Therefore, the dean won't praise you." This argument is...`,
      o: [`valid, by modus tollens`, `invalid: it denies the antecedent`, `valid, by modus ponens`, `invalid: it affirms the antecedent`],
      a: 1, why: `If P then Q, not P, so not Q is invalid. The dean might praise you for something else.` },
    { id: 'c3-16', t: 'mcq', topic: `Argument forms`, src: `Supp`, trap: 'deny-ant', q: `"If it rained, the road along Orchard is wet. The road along Orchard is wet. So it rained." This argument is...`,
      o: [`valid, because the premises are true`, `invalid: it affirms the consequent`, `valid, by modus tollens`, `sound`],
      a: 1, why: `If P then Q, Q, so P is invalid. A burst pipe could wet the road.` },
    { id: 'c3-17', t: 'set', topic: `Argument forms`, src: `L3 / T3`, q: `Which arguments are valid?`,
      s: [
        [`"Either the tutorial is at UTown or at AS1. It is not at UTown. So it is at AS1."`, true, `Disjunctive syllogism.`],
        [`"If Americans pursue their present policies in the Persian Gulf, they will antagonize the leaders of Iran. If the leaders of Iran are antagonized, they will start a war. So, if Americans pursue their present policies in the Persian Gulf, the leaders of Iran will start a war."`, true, `If P then Q, If Q then R, so If P then R.`],
        [`"If you get an A, the dean will praise you. The dean doesn't praise you. So you don't get an A."`, true, `Modus tollens (L3 Argument 1).`],
        [`"If the hawker centre is closed, Ah Seng eats at home. Ah Seng eats at home. So the hawker centre is closed."`, false, `Affirming the consequent.`, 'deny-ant']
      ] },
    { id: 'c3-18', t: 'set', topic: `Valid by meaning`, src: `T3 3.1`, q: `Which arguments are deductive because of the meanings of their words (a hidden definitional premise)?`,
      s: [
        [`"John is Mary's brother. Therefore, Mary has a brother."`, true, `If y is x's brother, x has a brother.`, 'hidden-definition'],
        [`"The Student Council meeting began at 11am and ended at 2pm. Thus, the Council meeting lasted three hours."`, true, `Duration = end − beginning (same day, no break).`, 'hidden-definition'],
        [`"Four tickets to the graduation ceremony are reserved for each graduating senior. There are 150 graduating seniors. So 600 graduation tickets are reserved for seniors."`, true, `Total = persons × tickets each.`, 'hidden-definition'],
        [`"Most who live in France speak French. Pierre lives in France. This is all we know. Therefore, Pierre speaks French."`, false, `Inductive: "most" supports but does not imply.`]
      ] },
    { id: 'c3-19', t: 'mcq', topic: `Validity & soundness`, src: `L3 slide`, trap: 'valid-sound', q: `"If someone is a human, then that person is a woman. Our logic teacher is a human. Therefore, our logic teacher is a woman." This argument is...`,
      o: [`valid and sound`, `valid but unsound`, `invalid but sound`, `cogent`],
      a: 1, why: `If P then Q, P, so Q is valid. The first premise is false, so it is unsound.` },
    { id: 'c3-20', t: 'set', topic: `Deductive vs inductive`, src: `L3 slide`, q: `On key terms:`,
      s: [
        [`Truth applies to statements; validity applies to arguments.`, true, `A statement is true or false; an argument is valid or invalid.`],
        [`Every valid argument has an explicitly valid form.`, false, `Many, not all. Some are valid because of meanings.`],
        [`Assuming usual meanings, valid arguments give no new information about the world.`, true, `L3 slide.`],
        [`Because valid arguments give no new information, they are trivial.`, false, `The link can be non-obvious: m and n even ⇒ m+n even needs a proof.`]
      ] },
    { id: 'c3-21', t: 'mcq', topic: `Compound propositions`, src: `L3 slide`, q: `"I went to Paris iff I went to Quebec" is true when...`,
      o: [`I went to Paris but not Quebec`, `I went to at least one of them`, `I went to both or to neither`, `I went to Quebec but not Paris`],
      a: 2, why: `A biconditional is true when both parts have the same truth value.` },
    { id: 'c3-22', t: 'mcq', topic: `Valid by meaning`, src: `T3 3.1`, q: `"Joe paid $3,000 to have five hundred copies of his drawing printed and $200 to rent space. Since he is charging only $50 for each print, he will need to sell at least sixty-four of them to recover his costs." This argument is...`,
      o: [`inductive, because sales are uncertain`, `deductive, given what "recover costs" means: 50n ≥ 3,200 gives n ≥ 64`, `invalid, because it has no explicit form`, `a statistical syllogism`],
      a: 1, why: `Revenue must be at least costs ($3,200). With $50 a print, n ≥ 64 follows necessarily.` }
  ]
});
