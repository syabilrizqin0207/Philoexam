/* Chapter 1 — Introduction to Effective Reasoning [L1] */
RL.chapter({
  n: 1, code: 'RL1', lec: 'L1', title: `Introduction to Effective Reasoning`, short: `Intro to ER`,
  place: `NUS Kent Ridge`, spot: `Lecture Theatre, Week 1`, icon: 'school', sky: 101,
  mentor: ['socratan'], mentorName: `Prof. Socra-Tan`,
  story: [
    `Welcome to Kent Ridge. I am Prof. Socra-Tan, and I coordinate this module. Sit anywhere, but sit with an open mind.`,
    `Before you can argue, you must know what an argument is made of: statements. Not commands, not questions, not exclamations.`,
    `And before you believe a claim, ask whether it needs evidence. Clifford said it is wrong always, everywhere and for anyone to believe anything on insufficient evidence.`,
    `Pass my first test and the Reasoning Line opens. Eleven stations across Singapore, then the Final at the end of the line.`
  ],
  win: `Good. You can tell a statement from a shout and a reason from a feeling. Next stop on the Reasoning Line: Tekka.`,
  cards: [
    { t: `Effective reasoning`, b: `Effective reasoning = **critical thinking**: skills for evaluating the accuracy of information.\n\nThe 8 skills:\n- gathering evidence\n- evaluation of evidential support\n- proper response to sentences\n- identification of arguments\n- coherence\n- avoiding erroneous reasoning\n- understanding and solving problems\n- making wise decisions` },
    { t: `Two aspects of critical thinking`, b: `**1. Critical attitude.** Components: open-mindedness, acknowledging fallibility, intellectual integrity. Aims: personal stability, conflict resolution, success in evaluating and attaining goals.\n\n**2. Normative criteria of thought.** How we _ought_ to reason. Usually independent of disciplines.\n\nTrap: wrong options in critical-attitude questions lean on absolutes ("never", "purely", "all") that are not on the slide.` },
    { t: `Statements`, b: `A **statement** (proposition) is what an **indicative** sentence says: something true or false.\n\nMany sentences, one statement: "Singapore is an island", "The Lion City is an isle" and "Singapura ialah sebuah pulau" all express one statement.\n\n**Not statements:** imperative ("Get out of the class now."), interrogative ("What is your name?"), exclamatory ("Hurray for X!").\n\nAn indicative sentence that describes feelings ("I feel awful") **is** a statement.` },
    { t: `Evidence`, b: `Evidential support is required when there are doubts about a claim's truth. **Widely held beliefs may be false**: the flat earth, the geocentric theory, phlogiston, "drink 8 glasses of water a day", "computer screens cause eye damage".\n\n**Physical evidence:** fingerprints, a blood stain, a murder weapon.\n**Verbal evidence:** a sentence that gives reason for believing another sentence.` },
    { t: `When to demand evidence`, b: `**Inappropriate:** when someone expresses or describes feelings (poems such as Blake's "A Poison Tree"), casual conversation.\n\n**Appropriate:** when reliability is essential: scientific research, criminal investigations, important decisions, weighing costs and benefits.\n\n**Trust:** we are more critical of sources we distrust (adverts, salesmen, politicians) and less critical of sources we trust (friends, teachers, scientists, newscasters). We ought to seek evidence regardless of trust when **great consequences** are involved.\n\n**Clifford's principle:** it is wrong always, everywhere and for anyone to believe anything on insufficient evidence.` },
    { t: `Arguments`, b: `An **argument** is a set of statements: a **conclusion** (what is argued for) plus a **premise set** (verbal evidence, what is argued from).\n\nThe premise set supports the conclusion by **implying** it, or by making it **more likely** without implying it.\n\n**Size rules:** no single statement can be an argument. An argument can have more than one premise but only **one** conclusion.\n\nExtended argument (L1): a cluster of related arguments.` },
    { t: `Good arguments (L1 version)`, b: `Two conditions of acceptance:\n- (1) true premises\n- (2) relevant support (the premises actually support the conclusion)\n\nCareful: L10 gives a **five**-condition list. Check which list a question uses.\n\nTwo functions of arguments: (1) persuade rationally that a statement is true; (2) extend knowledge by inferring non-obvious statements (Hawking: in an infinite universe every point can be regarded as the centre).` },
    { t: `Inference and logic`, b: `**Inference:** narrow sense = the reasoning process an argument expresses. Broad sense = inference = argument.\n\n**Logic (ordinary usage):** good arguments, either **sound** (deductive, all premises true) or **cogent** (strong inductive, all premises true).\n**Logic (technical):** deductive arguments only; the study of truth-preserving rules of inference.\n\nDeductive = premises guarantee the conclusion. Inductive = premises support it without guaranteeing it.` },
    { t: `What critical thinking covers`, b: `- formal logic with less emphasis on symbols\n- flaws other than invalidity (informal fallacies)\n- good but formally invalid arguments (inductive)\n- issues in epistemology and philosophy of language` },
    { t: `Non-evidential persuasion`, b: `**Testimonials:** positive comments, one-sided. They are **poor evidence**, not "no evidence at all".\n\n**Psychological pressure:** peer pressure, threats or fear, appeal to compassion.` },
    { t: `Trap check`, b: `- One statement, however long, is never an argument; one argument has one conclusion.\n- "Testimonials are non-evidential" overstates the slide; they are poor evidence.\n- In critical-attitude MCQs, options with "never", "purely" or "all" are usually wrong.\n- "I feel awful" is a statement. Feelings only matter for whether demanding evidence is appropriate.` }
  ],
  quick: [
    [`"Stop talking during the lecture!" expresses a statement.`, false, `It is imperative (a command), so it expresses no statement.`],
    [`An indicative sentence describing feelings expresses a statement.`, true, `It asserts something true or false about the speaker's feelings.`],
    [`One statement can be expressed by many different sentences.`, true, `"Singapore is an island" and "Singapura ialah sebuah pulau" express one statement.`],
    [`An argument can have two conclusions.`, false, `Only one conclusion per argument; two conclusions = two arguments.`],
    [`A single long conditional sentence can be an argument.`, false, `No single statement can be an argument.`],
    [`Open-mindedness is a component of the critical attitude.`, true, `With acknowledging fallibility and intellectual integrity.`],
    [`Conflict resolution is an aim of the critical attitude.`, true, `Aims: personal stability, conflict resolution, success in evaluating and attaining goals.`],
    [`Testimonials are best described as poor, one-sided evidence.`, true, `Calling them "no evidence at all" overstates the slide.`],
    [`Logic in its technical sense covers cogent inductive arguments.`, false, `Technical logic covers deductive arguments (truth-preserving rules).`],
    [`A cogent argument is a strong inductive argument with all true premises.`, true, `That is the course definition.`],
    [`Demanding evidence for the feelings in a poem is appropriate.`, false, `Expressing or describing feelings is a case where demanding evidence is inappropriate.`],
    [`Fingerprints are verbal evidence.`, false, `They are physical evidence. Verbal evidence is a sentence giving reason to believe another.`],
    [`Peer pressure is a form of psychological pressure.`, true, `So are threats/fear and appeal to compassion.`],
    [`"Is Singapore going to have a new prime minister soon?" expresses a statement.`, false, `It is interrogative.`],
    [`In the broad sense, an inference is just an argument.`, true, `Narrow sense = the reasoning process; broad sense = the argument.`],
    [`Widely held beliefs need no evidence because many people hold them.`, false, `Widely held beliefs may be false (flat earth, phlogiston).`],
    [`We ought to seek evidence regardless of trust when great consequences are involved.`, true, `Straight from the L1 slide on trust.`],
    [`Normative criteria of thought are usually independent of disciplines.`, true, `They concern how we ought to reason in general.`]
  ],
  qs: [
    { id: 'c1-01', t: 'set', topic: `Statements`, src: `GEX23 Q2`, q: `Which of the following express a statement?`,
      s: [
        [`"This question is the hardest I've ever encountered."`, true, `Indicative: it asserts something true or false about the question.`],
        [`"The pain of this breakup is so excruciating that I'm not sure if I can concentrate on preparing for the final exam."`, true, `Indicative. It describes feelings, but describing feelings in an indicative sentence still asserts something true or false.`, 'feelings'],
        [`"Stop crying over spilt milk!"`, false, `A command: imperative, so no statement.`],
        [`"Is Singapore going to have a new prime minister soon?"`, false, `A question: interrogative, so no statement.`]
      ] },
    { id: 'c1-02', t: 'mcq', topic: `Critical attitude`, src: `GEX23 Q1`, q: `Developing a critical attitude can contribute to conflict resolution because...`,
      o: [`Critical attitude is purely about self-reflection and never involves identifying fallacies committed by others.`,
        `Someone with a critical attitude can never find faults with anyone's reasoning.`,
        `People with a critical attitude will have intellectual integrity, which involves conducting argumentation in a respectful and friendly manner.`,
        `Critical attitude requires an ability to re-interpret all disagreements on any matter as misunderstandings.`],
      a: 2, trap: 'absolutes',
      why: `Intellectual integrity is a listed component of the critical attitude and conflict resolution is a listed aim, so C fits. A, B and D rely on "purely", "never" and "all", none of which is on the slide.` },
    { id: 'c1-03', t: 'mcq', topic: `Statements`, src: `Original`, q: `Which sentence expresses a statement?`,
      o: [`"What a gorgeous sunset over Marina Bay!"`, `"Please tap your card at the gantry."`, `"Is the Circle Line down again?"`, `"The Circle Line was disrupted this morning."`],
      a: 3, why: `Only D is indicative. A is exclamatory, B is imperative, C is interrogative.` },
    { id: 'c1-04', t: 'set', topic: `Statements`, src: `L1 slide`, q: `Consider: "Singapore is an island." / "The Lion City is an isle." / "Singapura ialah sebuah pulau."`,
      s: [
        [`These are three different sentences.`, true, `Different words, different languages: three sentences.`],
        [`They express three different statements.`, false, `The slide uses them as one statement expressed by different sentences.`],
        [`They express one and the same statement.`, true, `Same content, same truth value.`],
        [`Only sentences in English can express statements.`, false, `The Malay sentence expresses the same statement.`]
      ] },
    { id: 'c1-05', t: 'mcq', topic: `Statements`, src: `Original`, trap: 'feelings', q: `During a chat at the UTown food court, Mei says: "I feel awful after failing my midterm." Which is correct?`,
      o: [`It is not a statement, because it only describes feelings.`,
        `It is a statement, but in casual conversation demanding evidence for it would usually be inappropriate.`,
        `It is an exclamatory sentence, so it is not a statement.`,
        `It is an argument with one premise.`],
      a: 1, why: `It is indicative, so it expresses a statement. The "feelings" point on the slide is about when demanding evidence is inappropriate, not about whether something is a statement. One statement is never an argument.` },
    { id: 'c1-06', t: 'set', topic: `Critical attitude`, src: `L1 slide`, q: `According to the lecture, which statements about the critical attitude are correct?`,
      s: [
        [`Open-mindedness is one of its components.`, true, `Components: open-mindedness, acknowledging fallibility, intellectual integrity.`],
        [`Acknowledging fallibility is one of its components.`, true, `Listed on the slide.`],
        [`Winning every debate is one of its aims.`, false, `Aims: personal stability, conflict resolution, success in evaluating and attaining goals.`, 'absolutes'],
        [`Conflict resolution is one of its aims.`, true, `Listed on the slide.`]
      ] },
    { id: 'c1-07', t: 'set', topic: `Critical attitude`, src: `L1 slide`, q: `On the two aspects of critical thinking:`,
      s: [
        [`They are the critical attitude and normative criteria of thought.`, true, `Those are the two aspects.`],
        [`Normative criteria of thought concern how we ought to reason.`, true, `That is what "normative" means here.`],
        [`Normative criteria of thought differ completely from one discipline to the next.`, false, `The slide says they are usually independent of disciplines.`, 'absolutes']
      ] },
    { id: 'c1-08', t: 'mcq', topic: `Evidence & trust`, src: `L1 slide`, trap: 'testimonial', q: `A bubble tea chain at Bugis advertises: "10,000 happy customers say we're the best in Singapore!" Which description best fits the L1 slide?`,
      o: [`It provides no evidence at all for the claim.`, `It is poor, one-sided evidence for the claim.`, `It is a sound argument for the claim.`, `It is an appeal to force.`],
      a: 1, why: `Testimonials are one-sided, so they are poor evidence. Saying they are no evidence at all overstates the slide.` },
    { id: 'c1-09', t: 'mcq', topic: `Evidence & trust`, src: `L1 slide`, q: `"Everyone in our hall block is signing up for the overseas community project. You'll be the odd one out if you don't." This is best described as...`,
      o: [`verbal evidence that the project is worthwhile`, `peer pressure, a form of psychological pressure`, `a testimonial`, `an argument with two conclusions`],
      a: 1, why: `It pushes you to act through fear of being left out, not through reasons about the project. The slide lists peer pressure under psychological pressure.` },
    { id: 'c1-10', t: 'mcq', topic: `Evidence & trust`, src: `L1 slide`, q: `In which situation is it LEAST appropriate to demand evidence?`,
      o: [`A friend reads a poem about heartbreak at an open-mic night at the Esplanade.`, `Police investigate a theft at a void deck.`, `A team runs a clinical trial for a new vaccine.`, `A couple decides whether to apply for a BTO flat.`],
      a: 0, why: `Expressing feelings, including poems, is where demanding evidence is inappropriate. Criminal investigations, scientific research and important decisions are where it is appropriate.` },
    { id: 'c1-11', t: 'set', topic: `Evidence & trust`, src: `L1 slide`, q: `On trust and evidence:`,
      s: [
        [`We tend to be more critical of advertisements and salesmen than of friends and teachers.`, true, `The slide lists distrusted and trusted sources this way.`],
        [`We ought to seek evidence regardless of trust when great consequences are involved.`, true, `Stated on the slide.`, 'evidence-trust'],
        [`Because scientists are trustworthy, demanding evidence for their claims is never appropriate.`, false, `Scientific research is listed as a case where demanding evidence is appropriate, and "never" is not on the slide.`, 'absolutes'],
        [`Clifford's principle says it is wrong always, everywhere and for anyone to believe anything on insufficient evidence.`, true, `Word for word.`]
      ] },
    { id: 'c1-12', t: 'set', topic: `What an argument is`, src: `L1 slide`, q: `Which statements about arguments are correct according to L1?`,
      s: [
        [`A single long conditional statement can count as an argument.`, false, `No single statement can be an argument.`, 'one-statement'],
        [`An argument may have more than one premise.`, true, `The size rules allow many premises.`],
        [`An argument may have two conclusions.`, false, `Only one conclusion per argument.`, 'one-statement'],
        [`A premise set can support a conclusion by making it more likely to be true without implying it.`, true, `That is how inductive support works.`]
      ] },
    { id: 'c1-13', t: 'mcq', topic: `What an argument is`, src: `Cheatsheet trap`, trap: 'one-statement', q: `"If it rains tomorrow, the NDP rehearsal will be cancelled and the spectators will be refunded." Which is TRUE?`,
      o: [`It is an argument with two conclusions.`, `It is an argument with one premise and one conclusion.`, `It is one conditional statement, so it is not an argument.`, `It is an inductive argument.`],
      a: 2, why: `Nothing in it is offered as a reason for something else. It is one conditional statement, and one statement is never an argument.` },
    { id: 'c1-14', t: 'mcq', topic: `Logic & inference`, src: `L1 slide`, q: `In its technical (formal logic) sense, "logic" refers to...`,
      o: [`good arguments, whether sound or cogent`, `deductive arguments: the study of truth-preserving rules of inference`, `any persuasive speech`, `inductive arguments only`],
      a: 1, why: `Ordinary usage = good arguments (sound or cogent). Technical usage = deductive, truth-preserving rules.` },
    { id: 'c1-15', t: 'set', topic: `Logic & inference`, src: `L1 slide`, q: `On good arguments and logic:`,
      s: [
        [`L1 gives two conditions of acceptance: true premises and relevant support.`, true, `That is the L1 list. L10 has five.`],
        [`In ordinary usage, logic is about good arguments that are either sound or cogent.`, true, `Sound = deductive with true premises; cogent = strong inductive with true premises.`],
        [`Cogent arguments are deductive.`, false, `Cogent arguments are strong inductive arguments with all true premises.`, 'cogent-deductive'],
        [`In an inductive argument, the premises guarantee the conclusion.`, false, `Inductive premises support but do not guarantee the conclusion.`]
      ] },
    { id: 'c1-16', t: 'mcq', topic: `Logic & inference`, src: `L1 slide`, q: `Hawking: "In an infinite universe, every point can be regarded as the center, because every point has an infinite number of stars on each side of it." The slide uses this to illustrate which function of arguments?`,
      o: [`Persuading through psychological pressure`, `Extending knowledge by inferring non-obvious statements`, `Expressing feelings`, `Raising a question`],
      a: 1, why: `The two functions are to persuade rationally and to extend knowledge. Hawking's example infers a non-obvious statement.` },
    { id: 'c1-17', t: 'set', topic: `Logic & inference`, src: `L1 slide`, q: `Critical thinking, as the lecture describes it, covers:`,
      s: [
        [`formal logic with less emphasis on symbols`, true, `Listed.`],
        [`flaws apart from invalidity, i.e. informal fallacies`, true, `Listed.`],
        [`good but formally invalid arguments, i.e. inductive arguments`, true, `Listed.`],
        [`only the memorisation of logical symbols`, false, `It covers less emphasis on symbols, plus fallacies, induction, epistemology and philosophy of language.`, 'absolutes']
      ] },
    { id: 'c1-18', t: 'mcq', topic: `Logic & inference`, src: `L1 slide`, q: `"Inference" in the NARROW sense is...`,
      o: [`the argument itself`, `the reasoning process expressed by an argument`, `a piece of physical evidence`, `a widely held belief`],
      a: 1, why: `Narrow = the reasoning process. Broad = the argument.` },
    { id: 'c1-19', t: 'mcq', topic: `Evidence & trust`, src: `L1 slide`, q: `Which is verbal evidence?`,
      o: [`Fingerprints on a stolen bicycle`, `A blood stain at a void deck`, `A witness's statement: "I saw the suspect at Clementi MRT at 9pm."`, `The murder weapon`],
      a: 2, why: `Verbal evidence is a sentence that gives reason for believing another sentence. The others are physical evidence.` },
    { id: 'c1-20', t: 'set', topic: `Evidence & trust`, src: `L1 slide`, q: `On widely held beliefs:`,
      s: [
        [`The slide lists "drink 8 glasses of water a day" as a widely held belief that may not be true.`, true, `Along with the flat earth, geocentrism, phlogiston and "screens cause eye damage".`],
        [`A belief needs no evidence once most people hold it.`, false, `Widely held beliefs may be false; evidence is needed when there are doubts.`],
        [`Evidential support for an assertion is required when there are doubts about its truth.`, true, `Course wording.`]
      ] }
  ]
});
