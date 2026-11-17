/* Chapter 9 — Scientific Inference [L9] */
RL.chapter({
  n: 9, code: 'RL9', lec: 'L9', title: `Scientific Inference`, short: `Scientific Inference`,
  place: `one-north`, spot: `Biopolis lab, late at night`, icon: 'flask', sky: 909,
  mentor: ['popper'], mentorName: `Dr. Popper`,
  story: [
    `You found my lab. Good. I am Dr. Popper, and I have a confession: no amount of data proves a hypothesis.`,
    `Ohm says I = V/R. My rival's Mho hypothesis fits the same readings at 1 volt and 2 volts. Only at 3 volts do they disagree. That is a crucial experiment.`,
    `A failed prediction refutes a hypothesis, validly. A successful prediction only confirms it. Infinitely many hypotheses fit any finite data.`,
    `So how do we choose? Simplicity and coherence, but only all else being equal. A refuted hypothesis is out, however simple it is.`
  ],
  win: `Your hypothesis survived every test I threw at it. Provisionally. Next: Speakers' Corner.`,
  cards: [
    { t: `Ohm's law`, b: `I ∝ V; I = kV; **I = V/R** (current = voltage / resistance).\n\n**Current (amp):** electrons through a cross-section per second.\n**Voltage (volt):** what causes the flow; difference in electric potential energy per unit charge.\n**Resistance (ohm):** hindrance to flow. Longer wire = more; thicker = less; depends on material.` },
    { t: `Inference from data`, b: `With R = 10 ohms: V = 1 gives I = 0.1; V = 2 gives I = 0.2, as I = V/R predicts.\n\nSample projection: "All examined voltage-resistance-current cases follow Ohm's law. A large and varied group of such cases has been examined. ∴ All such cases follow Ohm's law."` },
    { t: `Mho and the crucial experiment`, b: `**Mho:** I = (1/R)(V² − 2V + 2). With R = 10: V = 1 → 0.1; V = 2 → 0.2. Same as Ohm.\nAt V = 3: Mho predicts (9 − 6 + 2)/10 = **0.5**; Ohm predicts **0.3**.\n\n**Crucial experiment:** eliminate one of two competing hypotheses when the result fits one rather than the other. The ammeter reads 0.3 amp: Ohm wins, Mho loses.` },
    { t: `Refuting a hypothesis`, b: `If H and C, then O\nC\nNot-O\n∴ Not-H\n\n(H = hypothesis h is true; C = condition c holds; O = the experiment yields o.) This form is **valid**.\n\nConfirming (If H then O; O; ∴ H) is **not valid**: it affirms the consequent.` },
    { t: `Infinitely many alternatives`, b: `I = (1/R)V + (V−1)(V−2)...(V−n)x fits all n data points for any natural number x, because the product is 0 at each tested V.\n\nClass exercise: data x = 1..4, y = 2, 4, 6, 8. H: y = 2x. AH: y = 2x + (x−1)(x−2)(x−3)(x−4)z.\n- AH is infinitely many hypotheses (one per z).\n- Same predictions for x = 1..4 (a bracket is 0).\n- At x = 5: H says 10; AH says 10 + 24z. Observing 10 refutes AH.\n- Add (x−5), ..., (x−n) and AH agrees up to n. Data alone never single out y = 2x.` },
    { t: `Simplicity and coherence`, b: `**Simplicity:** all else being equal, the simplest hypothesis is most likely to be true (Ohm is simpler than Mho).\n\n**Coherence:** all else being equal, a theory that fits better with established background beliefs is more likely to be true.\n\n**Important point:** whether scientific beliefs can be justified by data via induction depends not just on data but also on **inductive criteria**.` },
    { t: `Hypothesis checklist`, b: `- Does a new result contradict a hypothesis's prediction? Then it is refuted (valid form).\n- Results that fit a hypothesis do not prove it.\n- Choose among the survivors by simplicity and coherence, only "all else being equal".\n- A refuted hypothesis is out, however simple.` },
    { t: `Trap check`, b: `- "Proved" by an experiment means proof in the **ordinary** sense (inductive), not the technical sense (sound).\n- If a later counterexample cannot be explained away, reject the claim and say the opposite has been proved; you cannot keep both.\n- Lab L (y = 3x²): a simple hypothesis that fails new data is refuted; that does not disprove "simplicity is evidence of truth"; H1 that clashes with old data is refuted too.` }
  ],
  quick: [
    [`If H then O; not O; therefore not H is valid.`, true, `Refutation form.`],
    [`If H then O; O; therefore H is valid.`, false, `Affirming the consequent.`],
    [`At V = 3 and R = 10, Ohm's law predicts 0.3 amp.`, true, `I = V/R.`],
    [`At V = 3 and R = 10, Mho predicts 0.5 amp.`, true, `(9 − 6 + 2)/10.`],
    [`Data that fit a hypothesis prove it.`, false, `Infinitely many hypotheses fit finite data.`],
    [`The simplicity criterion applies only all else being equal.`, true, `Keep the qualifier.`],
    [`A refuted hypothesis should be kept if it is the simplest.`, false, `A refuted hypothesis is out.`],
    [`Coherence: a theory fitting background beliefs is more likely true, all else being equal.`, true, `Course wording.`],
    [`A longer wire has less resistance.`, false, `Longer = more resistance; thicker = less.`],
    [`A crucial experiment eliminates one of two competing hypotheses.`, true, `Course wording.`],
    [`"Proved" by experiment usually means the technical sense of proof.`, false, `Ordinary sense: a good inductive argument.`],
    [`Justifying scientific beliefs depends on data and on inductive criteria.`, true, `The lecture's important point.`],
    [`AH: y = 2x + (x−1)(x−2)(x−3)(x−4)z predicts 10 + 24z at x = 5.`, true, `4 × 3 × 2 × 1 = 24.`],
    [`AH and H make different predictions for x = 1 to 4.`, false, `Same predictions: one bracket is 0.`]
  ],
  qs: [
    { id: 'c9-01', t: 'set', topic: `Proof & refutation`, src: `2018 Q17`, q: `"From an experiment in which we observed the values of acceleration experienced by trolleys of various masses, it has been proved that acceleration is always inversely proportional to mass when force is constant."`,
      opts: [[0], [1, 2], [1, 3], [0, 3]],
      s: [
        [`The word "proved" here reflects a concept of "proof" in its technical sense.`, false, `Technical proof is a sound deductive argument. Going from limited observations to "always" is a sample projection: inductive.`, 'proved-ordinary'],
        [`The word "proved" reflects "proof" in its ordinary sense, assuming the five conditions of a good argument are all met.`, true, `Ordinary proof = a good argument, which can be inductive.`, 'proved-ordinary'],
        [`If future scientists encounter a counterexample that cannot be explained away, we ought to reject this sentence and accept that it has been proved that acceleration is not always inversely proportional to mass.`, true, `Once the opposite is proved, we can no longer claim the original was proved.`, 'proved-refuted'],
        [`If that happens, we have to retain this sentence and add that the opposite has been proved.`, false, `"A proved P and B refuted P" is contradictory.`, 'proved-refuted']
      ] },
    { id: 'c9-02', t: 'set', topic: `Simplicity & coherence`, src: `GEX23 Q17`, q: `"The simplest hypothesis that fits with all the observed results of an experiment carried out in Lab L is y = 3x². Scientists in Lab L then adopted this hypothesis and designed a further experiment to test a large set of new values of x. The results in the new experiment fit only with two of the original competing alternative hypotheses, H1 and H2. However, H1 is incompatible with some of the results in the original experiment."`,
      s: [
        [`The criterion of simplicity requires that they stick to y = 3x².`, false, `y = 3x² no longer fits the data, so it is refuted. Simplicity applies only all else being equal.`, 'simplicity'],
        [`This disproves the claim that simplicity is evidence of truth.`, false, `The criterion never said the simplest is always true, only most likely when all else is equal.`, 'simplicity'],
        [`This does NOT show that H1 is most likely to be true.`, true, `H1 clashes with the original results, so it is refuted too.`]
      ] },
    { id: 'c9-03', t: 'mcq', topic: `Crucial experiments`, src: `L9 slide`, q: `With R = 10 ohms, Ohm (I = V/R) and Mho (I = (1/R)(V² − 2V + 2)) both give 0.1 at V = 1 and 0.2 at V = 2. What do they predict at V = 3?`,
      o: [`Ohm 0.3, Mho 0.3`, `Ohm 0.3, Mho 0.5`, `Ohm 0.5, Mho 0.3`, `Ohm 0.3, Mho 0.9`],
      a: 1, why: `Ohm: 3/10 = 0.3. Mho: (9 − 6 + 2)/10 = 0.5. Reading 0.3 amp eliminates Mho.` },
    { id: 'c9-04', t: 'mcq', topic: `Proof & refutation`, src: `L9 slide`, q: `"If Ohm's law is true and a 3V battery is used with a 10-ohm resistor, the ammeter reads 0.3 amp. A 3V battery is used with a 10-ohm resistor. The ammeter does not read 0.3 amp. ∴ Ohm's law is false." This argument is...`,
      o: [`invalid: it affirms the consequent`, `valid: it is the form for refuting a hypothesis`, `inductive: it is a sample projection`, `invalid: it denies the antecedent`],
      a: 1, why: `If H and C, then O; C; not-O; ∴ not-H. Valid.` },
    { id: 'c9-05', t: 'mcq', topic: `Proof & refutation`, src: `L9 / Supp`, trap: 'fit-not-proof', q: `"If Ohm's law is true, the ammeter reads 0.3 amp at 3V and 10 ohms. It reads 0.3 amp. ∴ Ohm's law is true." This argument is...`,
      o: [`valid`, `invalid: confirming a prediction affirms the consequent`, `sound`, `a crucial experiment that proves Ohm's law`],
      a: 1, why: `If H then O; O; ∴ H is not a valid form. Confirmation never proves a hypothesis.` },
    { id: 'c9-06', t: 'set', topic: `Alternative hypotheses`, src: `L9 class exercise`, q: `Data: x = 1, 2, 3, 4 with y = 2, 4, 6, 8. H: y = 2x. AH: y = 2x + (x−1)(x−2)(x−3)(x−4)z, where z is any positive integer.`,
      s: [
        [`AH contains infinitely many hypotheses, one for each value of z.`, true, `z = 1, 2, 3, ...`],
        [`H and AH make the same predictions for the current data.`, true, `At x = 1..4 one bracket is 0.`],
        [`At x = 5, AH predicts y = 10 + 24z.`, true, `(4)(3)(2)(1)z = 24z.`],
        [`However much data we collect, empirical evidence alone can single out y = 2x.`, false, `Adding factors (x−5)...(x−n) keeps AH matching. Criteria like simplicity do part of the work.`, 'fit-not-proof']
      ] },
    { id: 'c9-07', t: 'set', topic: `Simplicity & coherence`, src: `L9 slide`, q: `On choosing between hypotheses:`,
      s: [
        [`All else being equal, the simplest hypothesis is most likely to be true.`, true, `Simplicity criterion.`],
        [`All else being equal, a theory that fits better with established background beliefs is more likely to be true.`, true, `Coherence criterion.`],
        [`The simplest hypothesis should be kept even if new data refute it.`, false, `A refuted hypothesis is out, however simple.`, 'simplicity'],
        [`Whether scientific beliefs can be justified by data via induction depends also on inductive criteria.`, true, `The lecture's important point.`]
      ] },
    { id: 'c9-08', t: 'mcq', topic: `Crucial experiments`, src: `L9 slide`, q: `What is a crucial experiment?`,
      o: [`An experiment that proves a hypothesis true`, `An experiment whose result fits one of two competing hypotheses rather than the other, eliminating one`, `Any experiment with a large sample`, `An experiment that confirms both hypotheses`],
      a: 1, why: `Course definition.` },
    { id: 'c9-09', t: 'mcq', topic: `Proof & refutation`, src: `L9 slide`, q: `"All examined voltage-resistance-current cases follow Ohm's law. A large and varied group of such cases has been examined. ∴ All such cases follow Ohm's law." What form is this?`,
      o: [`Statistical syllogism`, `Sample-projection syllogism`, `Analogy syllogism`, `Modus ponens`],
      a: 1, why: `Examined sample → whole population, with a large and varied sample.` },
    { id: 'c9-10', t: 'mcq', topic: `Proof & refutation`, src: `Original`, q: `"If the Wolbachia hypothesis is true and Wolbachia mosquitoes are released in Tampines, dengue cases there will fall by half. The mosquitoes were released in Tampines. Dengue cases did not fall by half. So the Wolbachia hypothesis is false." (Fictional scenario.) This argument is...`,
      o: [`valid: the refutation form`, `invalid: denying the antecedent`, `inductive: a sample projection`, `invalid: affirming the consequent`],
      a: 0, why: `If H and C, then O; C; not-O; ∴ not-H. Valid. Whether it is sound depends on the premises.` },
    { id: 'c9-11', t: 'set', topic: `Ohm's law`, src: `L9 slide`, q: `On electricity basics:`,
      s: [
        [`A longer wire has more resistance.`, true, `Course wording.`],
        [`A thicker wire has more resistance.`, false, `Thicker = less resistance.`],
        [`Voltage is what causes the flow of electrons.`, true, `Course wording.`],
        [`Ohm's law can be written I = V/R.`, true, `Current = voltage / resistance.`]
      ] },
    { id: 'c9-12', t: 'mcq', topic: `Alternative hypotheses`, src: `L9 slide`, q: `Why does I = (1/R)V + (V−1)(V−2)...(V−n)x fit all n data points for any natural number x?`,
      o: [`Because x is always zero`, `Because the product is 0 at each tested V`, `Because R cancels out`, `Because Ohm's law is false`],
      a: 1, why: `At each tested V one bracket is 0, so the extra term vanishes.` }
  ]
});
