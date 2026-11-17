/* Chapter 4 — Meaning & Definitions 1 [L4] [T3] */
RL.chapter({
  n: 4, code: 'RL4', lec: 'L4 · T3', title: `Meaning & Definitions 1`, short: `Definitions 1`,
  place: `National Library`, spot: `Victoria Street, Level 7 reading room`, icon: 'book', sky: 404,
  mentor: ['johnson'], mentorName: `Dr. Johnson`,
  story: [
    `Shh. Welcome to the reading room. I am Dr. Johnson, and I once wrote a dictionary, so I take definitions personally.`,
    `A lexical definition reports how a word is currently used. To test one, swap the word and the definition in a sentence. If the meaning changes, the definition fails.`,
    `There are five rules and seven flaws: too broad, too narrow, circular, poorly understood terms, poor match in vagueness, poor match in emotional tone, non-essential properties.`,
    `And mind the reason clause. A correct flaw with the wrong reason is still wrong.`
  ],
  win: `Splendid. Not a single "featherless biped" got past you. Your next station is the Gardens by the Bay.`,
  cards: [
    { t: `Clarity and argumentation`, b: `Clarity affects **soundness** (judging whether a premise is true). It does **not** affect **validity** when the argument has an explicitly valid form.\n\n"If there's a cosmic force, then there's a God. There's a cosmic force. ∴ There is a God." Valid whatever "cosmic force" means, but you cannot judge the premises until it is made clear.` },
    { t: `Uses of language`, b: `- Indicative/declarative: "Washington D.C. is the capital of United States"\n- Interrogative: "What is your name?"\n- Imperative: "Submit your essay before the last class."\n- Exclamatory: "What a despicable act!"\n\nArguments mainly give reasons for an assertion; they can also raise a question, call for action or express feelings.\n\n**Emotions** have a place in life but **no place in rational argumentation**; emotional language expresses feelings rather than giving a reasoned case.` },
    { t: `Definitions`, b: `A **definition** expresses the meaning of a word or phrase using other words, and can be used interchangeably with it. "Police officer" = "a member of an organisation whose job is to keep public order and prevent and solve crime".\n\n**Lexical:** current usage. **Stipulative:** one's own usage (Chapter 5).` },
    { t: `Interchange test`, b: `A definition is incorrect if switching term and definition produces sentences with **different meanings**.\n\n"James is a bachelor" / "James is an unmarried man": same meaning, passes.\n"James is a bachelor" / "James is a happy man": different, fails.\n\n**Qualifications:**\n- Use only the intended sense ("bank" as money vs river).\n- Do **not** use sentences with the term or definition in quotes. "'Bachelor' has eight letters" is true but "'Unmarried man' has eight letters" is false; that says nothing about the definition.` },
    { t: `Rule 1: not too broad or too narrow`, b: `**Too broad (tb):** something fits the definition but not the term. "Bachelor" = "a man": some men are not bachelors.\n\n**Too narrow (tn):** something fits the term but not the definition. "Bachelor" = "an unmarried male astronaut": some bachelors are not astronauts.\n\n**Both:** "Bachelor" = "a man studying at NUS" lets in married NUS men and leaves out bachelors outside NUS.` },
    { t: `Rule 2: no circularity, no obscure terms`, b: `**Circular (ci):** uses the whole term or a same-root word. "True" = "something known to be true". "Philosopher" defined with "philosophy".\n\nUsing **one word of a multi-word phrase** is not automatically circular (2018 key).\n\n**Poorly understood terms (pu):** the definition's words are hard. "Good" = "having a positive aretaic value". A hard **term** with a plain definition is fine.` },
    { t: `Rules 3–5: vagueness, tone, essence`, b: `**Rule 3, vagueness (pv):** match the term's vagueness. "Bachelor" = "an unmarried male over 18 years old" is too precise; "bachelor" has no exact age cut-off.\n\n**Rule 4, emotional tone (pe):** match neutral/positive/negative. "Bachelor" (neutral) = "a fortunate man who never married" (positive).\n\n**Rule 5, essential properties (ne):** include only what is essential. "Bachelor" = "an unmarried man who lives on planet earth".` },
    { t: `Checklist: which flaw?`, b: `- Something fits the definition but not the term → too broad.\n- Something fits the term but not the definition → too narrow. Can be both.\n- Whole term or same-root word in the definition → circular.\n- Hard words in the definition → pu.\n- Precise cut-offs for a vague term → pv.\n- Compare tone of term vs definition. Both negative → no mismatch.\n- Accidental feature built in → ne.\n- **Check the reason in the option.** Right flaw + wrong reason = F.` },
    { t: `Tutorial answers (Gensler 3.2a)`, b: `"Answers are not exhaustive."\n- "Metaphysics" = "any sleep-inducing subject": pe, tb, tn.\n- "Human being" = "featherless biped": tb (plucked chickens), tn (a human who loses a leg).\n- "I know that P" = "I believe that P": tb (wishful thinking).\n- "I know that P" = "I believe P and P is true": still tb (lucky guess on an MCQ).\n- "Chair" = "what you sit on": tb and tn (gallery exhibit chair).\n- "Valid argument" = "argument that persuades": tb and tn.\n- "Murder" = "killing": tb (chicken, accident, police shooting).\n- "Morally wrong" = "against the law": tn (adultery) and tb (unjust law).\n- "Philosopher"/"Philosophy": circular.` },
    { t: `Trap check`, b: `- Tone compares the term with the definition. "Kleptocracy" (negative) = "leaders... stealing" (negative): no mismatch.\n- "Poorly understood terms" is about the definition's words, not the term.\n- "Too narrow because the property is essential" contradicts itself.\n- A definition can have several flaws; check each separately.\n- Vagueness is a separate rule from too broad.` }
  ],
  quick: [
    [`A definition is too broad if something fits the term but not the definition.`, false, `That is too narrow. Too broad: fits the definition but not the term.`],
    [`"Bachelor" = "a man" is too broad.`, true, `Some men are not bachelors.`],
    [`Using one word of a multi-word phrase in its definition is automatically circular.`, false, `Only the whole term or a same-root word makes it circular.`],
    [`"Poorly understood terms" concerns the words used in the definition.`, true, `A hard term with a plain definition is fine.`],
    [`"Kleptocracy" defined as "leaders stealing from the people" has a tone mismatch.`, false, `Both negative: tones match.`],
    [`"Bachelor" = "an unmarried male over 18" is a poor match in vagueness.`, true, `Too precise; "bachelor" has no exact cut-off.`],
    [`"Bachelor" = "a fortunate man who never married" has a poor match in emotional tone.`, true, `Neutral term, positive definition.`],
    [`"Bachelor" = "an unmarried man who lives on planet earth" includes a non-essential property.`, true, `Living on earth is not essential.`],
    [`Clarity affects validity when the argument has an explicitly valid form.`, false, `It affects soundness, not validity, in that case.`],
    [`Emotions have no place in rational argumentation, according to L4.`, true, `They compromise the ability to reason.`],
    [`"'Bachelor' has eight letters" is a fair sentence for the interchange test.`, false, `Never use sentences with the term or definition in quotes.`],
    [`"Human being" = "featherless biped" is too broad.`, true, `Plucked chickens fit the definition.`],
    [`"Murder" = "killing" is too narrow.`, false, `It is too broad: killing a chicken is not murder.`],
    [`"Morally wrong" = "against the law" is both too broad and too narrow.`, true, `Adultery (tn), breaking an unjust law (tb).`],
    [`"I know that P" = "I believe P and P is true" is still too broad.`, true, `A lucky guess can be a true belief without knowledge.`],
    [`A lexical definition reports current usage.`, true, `Stipulative definitions set one's own usage.`],
    [`"Too narrow because the property is essential" can be a correct criticism.`, false, `If a property is essential, including it cannot make the definition too narrow.`],
    [`Circularity covers same-root words like "philosopher" and "philosophy".`, true, `Same root = circular.`]
  ],
  qs: [
    { id: 'c4-01', t: 'set', topic: `Definition flaws`, src: `2018 Q5`, q: `The opposition leader of country X says at a rally: "Come polling day, let's vote out this kleptocratic government. We should not continue to bear the shame of supporting a government that practises 'kleptocracy at its worst'. What is kleptocracy? According to online Cambridge Dictionary, it is a society whose leaders make themselves rich and powerful by stealing from the rest of the people."`,
      s: [
        [`The definition cited has a problem of poor match in emotional tone.`, false, `"Kleptocracy" is negative and "leaders ... stealing" is negative too, so the tones match.`, 'tone-match'],
        [`The definition cited has a problem of using poorly understood terms.`, false, `"Kleptocracy" may be unfamiliar, but the definition uses easy words.`, 'pu-definition'],
        [`This is an example of ad hominem fallacy.`, false, `No irrelevant personal attack on someone's claim.`],
        [`This is an example of straw-man fallacy.`, false, `Nobody's view is represented, let alone misrepresented.`]
      ] },
    { id: 'c4-02', t: 'set', topic: `Definition flaws`, src: `2018 Q6`, q: `"Erotic art is something that elicits the sexual feelings or desires of at least one of its viewers."`,
      s: [
        [`It is too broad because medical illustrations of sexual activity are neither erotic nor artistic, though they might elicit sexual feelings or desires of at least one viewer.`, true, `Medical illustrations fit the definition but are not erotic art.`],
        [`It is too narrow because eliciting sexual feelings or desires of at least one viewer is an essential property of any erotic art.`, false, `If the property were essential, including it could not make the definition too narrow.`, 'narrow-essential'],
        [`It is too broad because a painting that everyone agrees is erotic art might not elicit the sexual feelings or desires of some viewers.`, false, `That painting is a case of the term (and still fits "at least one viewer"). Too broad needs something that fits the definition but not the term.`, 'right-flaw-wrong-reason']
      ] },
    { id: 'c4-03', t: 'mcq', topic: `Definition flaws`, src: `GEX23 Q7`, q: `"Heart attack is a disease contracted by aging organisms, which is known as myocardial infarction." This definition does NOT have the problem of being...`,
      o: [`too broad`, `too narrow`, `circular`, `one that uses poorly understood terms`],
      a: 2, why: `Too broad: arthritis is a disease of aging organisms. Too narrow: young people can have heart attacks. "Myocardial infarction" is harder than "heart attack" (pu). Neither "heart attack" nor a same-root word appears, so it is not circular.` },
    { id: 'c4-04', t: 'set', topic: `Definition flaws`, src: `GEX23 Q8`, q: `"Inflation means the general rise in prices of goods and services caused by the increase in the costs of producing long-grain rice."`,
      s: [
        [`The definition has a poor match of emotional tone.`, false, `Both term and definition are neutral.`],
        [`The definition has non-essential properties.`, true, `Being caused by the cost of long-grain rice is not essential to inflation.`],
        [`The definition is circular.`, false, `"Inflation" does not appear in the definition.`]
      ] },
    { id: 'c4-05', t: 'set', topic: `Definition flaws`, src: `T3 3.2a:6`, q: `"Human being" means "featherless biped".`,
      s: [
        [`The definition is too broad because plucked chickens are featherless bipeds.`, true, `Fits the definition, not the term.`],
        [`The definition is too narrow because a human who loses a leg in an accident is still a human.`, true, `Fits the term, not the definition.`],
        [`The definition is circular.`, false, `Neither "human" nor "being" appears.`],
        [`The definition has a poor match in emotional tone.`, false, `Both neutral.`]
      ] },
    { id: 'c4-06', t: 'set', topic: `Definition flaws`, src: `T3 3.2a:4`, q: `"Metaphysics" means "any sleep-inducing subject".`,
      s: [
        [`Poor match in emotional tone: "sleep-inducing" is negative while "metaphysics" is neutral.`, true, `Tutorial answer.`],
        [`Too broad: physics, law and history can be sleep-inducing too.`, true, `Tutorial answer.`],
        [`Too narrow: metaphysics is not sleep-inducing for some people.`, true, `Tutorial answer.`],
        [`Circular.`, false, `"Metaphysics" does not appear in the definition.`]
      ] },
    { id: 'c4-07', t: 'mcq', topic: `Definition flaws`, src: `T3 3.2a:8`, q: `"I know that P" means "I believe that P, and P is true". What is the tutorial's verdict?`,
      o: [`Correct definition`, `Still too broad: a true belief from a lucky guess in an MCQ test is not knowledge`, `Too narrow: some knowledge is false`, `Circular`],
      a: 1, why: `Without justification or warrant, a lucky true belief is not knowledge, so the definition lets in too much.` },
    { id: 'c4-08', t: 'set', topic: `Definition flaws`, src: `T3 3.2a:9, 12`, q: `Tutorial verdicts:`,
      s: [
        [`"Chair" = "what you sit on" is too broad, because you can sit on things that are not chairs.`, true, `A bench or the floor.`],
        [`"Chair" = "what you sit on" is too narrow, because a chair displayed in an art gallery is not sat on but is still a chair.`, true, `Tutorial answer.`],
        [`"Valid argument" = "argument that persuades" is too broad, because less informed people may be persuaded by an argument that is not valid.`, true, `Tutorial answer.`],
        [`"Valid argument" = "argument that persuades" is correct, because valid arguments always persuade.`, false, `A valid argument may fail to persuade an audience that misses its force or is irrational.`]
      ] },
    { id: 'c4-09', t: 'mcq', topic: `Definition flaws`, src: `T3 3.2a:13`, q: `"Murder" means "killing". The main flaw is...`,
      o: [`too narrow`, `too broad: killing a chicken for food, an accidental road death and a policeman shooting an armed burglar are not murder`, `circular`, `poor match in vagueness`],
      a: 1, why: `Many killings are not murder, so the definition lets in too much.` },
    { id: 'c4-10', t: 'set', topic: `Definition flaws`, src: `T3 3.2a:14`, q: `"Morally wrong" means "against the law".`,
      s: [
        [`Too narrow, because adultery is morally wrong but not against the law.`, true, `Fits the term, not the definition.`],
        [`Too broad, because breaking an unjust law (e.g. against free speech) is sometimes not morally wrong.`, true, `Fits the definition, not the term.`],
        [`Circular.`, false, `Neither word appears.`]
      ] },
    { id: 'c4-11', t: 'mcq', topic: `Definition flaws`, src: `T3 3.2a:15`, q: `"Philosopher" means "someone who has a degree in philosophy", and "philosophy" means "study of the great philosophers". The flaw is...`,
      o: [`too broad`, `circular: each is explained by a same-root word`, `poor match in emotional tone`, `non-essential properties only`],
      a: 1, why: `Same-root words count as circular.` },
    { id: 'c4-12', t: 'mcq', topic: `Five rules`, src: `L4 slide`, q: `"Bachelor" means "an unmarried male over 18 years old". Which rule does it break?`,
      o: [`Match the term in vagueness: it is too precise`, `Avoid circularity`, `Match emotional tone`, `Avoid poorly understood terms`],
      a: 0, why: `"Bachelor" has no exact age cut-off, so a precise cut-off is a poor match in vagueness.` },
    { id: 'c4-13', t: 'mcq', topic: `Five rules`, src: `L4 slide`, q: `"Bachelor" means "a fortunate man who never married". Which flaw?`,
      o: [`Poor match in emotional tone`, `Circular`, `Poorly understood terms`, `Poor match in vagueness`],
      a: 0, why: `"Bachelor" is neutral; "fortunate" makes the definition positive.` },
    { id: 'c4-14', t: 'set', topic: `Interchange test`, src: `L4 slide`, q: `On the interchange test:`,
      s: [
        [`If swapping term and definition produces sentences with different meanings, the definition is incorrect.`, true, `That is the test.`],
        [`"'Bachelor' has eight letters" is true but "'Unmarried man' has eight letters" is false, so "unmarried man" is a bad definition of "bachelor".`, false, `Do not use sentences with the term or definition in quotes.`, 'interchange'],
        [`Swapping the money sense of "bank" into a sentence about a riverbank misuses the test.`, true, `Use only the intended sense.`, 'interchange']
      ] },
    { id: 'c4-15', t: 'mcq', topic: `Definition flaws`, src: `Original`, q: `"'Hawker centre' means 'a place where food is sold'." The clearest flaw is...`,
      o: [`too broad: supermarkets and restaurants also fit`, `too narrow`, `circular`, `poor match in emotional tone`],
      a: 0, why: `Many things fit the definition without being hawker centres.` },
    { id: 'c4-16', t: 'mcq', topic: `Definition flaws`, src: `Original`, q: `"'Kiasu' means 'having a kiasu attitude'." The flaw is...`,
      o: [`too narrow`, `circular: it uses the whole term`, `poorly understood terms`, `non-essential property`],
      a: 1, why: `The definition repeats the term itself.` },
    { id: 'c4-17', t: 'mcq', topic: `Definition flaws`, src: `Original`, trap: 'pu-definition', q: `"'Kopi' means 'an infusion of torrefied Coffea canephora endosperm prepared in the Nanyang manner'." The most obvious flaw is...`,
      o: [`circular`, `uses poorly understood terms`, `poor match in emotional tone`, `too precise`],
      a: 1, why: `"Torrefied", "Coffea canephora" and "endosperm" are far harder than "kopi". The flaw concerns the definition's words.` },
    { id: 'c4-18', t: 'set', topic: `Definition flaws`, src: `Original`, q: `"'Chope' means 'to reserve a seat at a hawker centre by placing a packet of tissue paper on it'."`,
      s: [
        [`It is too narrow.`, true, `People also chope with umbrellas or lanyards, and chope other things.`],
        [`It includes a non-essential property.`, true, `Tissue paper is accidental to choping.`],
        [`It is circular.`, false, `"Chope" does not appear in the definition.`],
        [`It is too broad.`, false, `Anything that fits the definition is a case of choping.`]
      ] },
    { id: 'c4-19', t: 'set', topic: `Clarity & language`, src: `L4 slide`, q: `"If there's a cosmic force, then there's a God. There's a cosmic force. Therefore, there is a God."`,
      s: [
        [`The unclear term "cosmic force" does not affect the argument's validity.`, true, `The form is valid whatever "cosmic force" means.`],
        [`You cannot judge whether the premises are true until "cosmic force" is made clear.`, true, `Clarity affects soundness.`],
        [`Because "cosmic force" is unclear, the argument is invalid.`, false, `Clarity does not affect validity when there is an explicitly valid form.`]
      ] },
    { id: 'c4-20', t: 'mcq', topic: `Clarity & language`, src: `L4 slide`, q: `"What a despicable act!" uses language in which way?`,
      o: [`Indicative`, `Interrogative`, `Imperative`, `Exclamatory`],
      a: 3, why: `The L4 slide uses this as its exclamatory example.` },
    { id: 'c4-21', t: 'set', topic: `Clarity & language`, src: `L4 slide`, q: `On emotions and argument:`,
      s: [
        [`According to L4, emotions have a place in life but no place in rational argumentation.`, true, `Course wording.`],
        [`Emotional language expresses feelings rather than giving a reasoned case.`, true, `Course wording.`],
        [`Raising a question and calling for action are among the uses of arguments.`, true, `Besides the main function of giving reasons for an assertion.`]
      ] }
  ]
});
