/* Chapter 2 — Recognising Arguments [L2] [T1] [T2] */
RL.chapter({
  n: 2, code: 'RL2', lec: 'L2 · T1 · T2', title: `Recognising Arguments`, short: `Recognising Arguments`,
  place: `Tekka Centre`, spot: `Little India, lunch rush`, icon: 'stall', sky: 202,
  mentor: ['gautama'], mentorName: `Uncle Gautama`,
  story: [
    `Ah, a new student. Sit, sit. I am Uncle Gautama. My family has argued at this stall for three generations.`,
    `Listen to the queue. "The biryani here is the best, because the rice is cooked over charcoal." Which part is the claim? Which part is the reason?`,
    `Indicator words help: "because", "since", "therefore", "hence". But careful. Sometimes "since" only means "from the time that", and "because" only tells you what caused something.`,
    `Then we draw the argument in linear form. Brackets, colons, commas, hyphens. Diagram my passages correctly and I will send you to the MRT.`
  ],
  win: `Shiok. You found every conclusion and left out the noise. Take the Circle Line to Dhoby Ghaut.`,
  cards: [
    { t: `Two steps`, b: `**(1)** Find the claim being made: the **conclusion**.\n**(2)** Find the claims that support it or give reasons for it: the **premise set**.\n\nHolowchak: "No theory that fails to yield a testable prediction can be called scientific. The reason for this is that testability is a necessary component of a scientific theory." First sentence = conclusion, second = premise.` },
    { t: `Indicator words`, b: `**Conclusion indicators:** therefore, consequently, necessarily, hence, it follows that, for that reason, wherefore, thus, we may infer, accordingly, it must be that, so, it entails that, implies that, as a result.\n\n**Premise indicators:** because, since, for, for the reason that, as indicated by, in that, may be inferred from, as given that, seeing that, in as much as, owing to.\n\n**No indicators?** Use context and meaning: identify the conclusion, the rest is (usually) the premise set.` },
    { t: `Non-argument senses`, b: `- **since**: temporal ("Since I arrived in Singapore...") or causal ("She was chosen... since the panel judged her the best").\n- **because**: causal ("The ball fell... because of the force of gravity"). The slide calls "because" controversial.\n- **for**: causal ("He didn't say that for fear of hurting her.").\n- **thus**: effect ("My laptop crashed. Thus, I cannot submit my essay"), example ("...Thus, a 5-year-old Singaporean is not eligible"), or "in this way" ("Many scientists have argued thus").\n- **for this reason**: a **conclusion** indicator (Galen).` },
    { t: `Causal vs evidential`, b: `**Causal paraphrase:** X. The cause of X is Y.\n**Evidential paraphrase:** X. My evidence for X is Y.\n\nBrexit poll: "The Leave side is going to win, because this is what the most recent poll predicts." A poll does not cause the result, so it reads as **evidential**.\n\nBWF and Lee Chong Wei: banned "because of his doping". Doping led to the ban, so it reads as **causal**.\n\n⚠ **Salmon:** if "because" asserts a causal connection, the sentence is not an argument. If a question says "according to Salmon", apply that rule.` },
    { t: `Factual and inferential claims`, b: `**Factual claim:** some evidence or reason exists.\n**Inferential claim:** the premise set supports the conclusion.\n\n**Hurley's test:** an argument makes both claims, explicitly or implicitly.\n\nWhether something is an argument depends on the words on the page, **not on what the author meant**. The inferential claim is objective.` },
    { t: `Extended arguments`, b: `L2 definition: an argument with **either** a single premise set and conclusion **or** a cluster of interrelated arguments.\n\n**4 relations:**\n- main-subsidiary (subsidiary arguments support premises of the main one)\n- pro-con (argue for and against, select one side)\n- multiple arguments for one conclusion\n- multiple arguments for closely related conclusions` },
    { t: `Conjoint vs independent`, b: `**Conjoint:** two premises jointly support the conclusion; at least one boosts the support the other gives. Written with a **hyphen**: (1:2-3).\n\n**Independent:** each supports the conclusion on its own. Written with a **comma**: (1:2,3,4).\n\n⚠ Dr. Lee treats this as a judgement call. Read every option.` },
    { t: `Linear method`, b: `- Put each argument in brackets.\n- Write the conclusion's numeral first, then a colon, then the premises.\n- Independent premises: commas. Conjoint premises: hyphens.\n- Join multiple conclusions with &: (2&3:1).\n- Arguments at the same level go on the same line, starting with the ultimate argument.\n\nBrackets = number of arguments. Lines = number of levels. Plato: "(1) Knowledge can't be sensation. (2) If it were, we couldn't know something we aren't presently sensing." = (1:2). (2) is one conditional statement.` },
    { t: `Diagramming checklist`, b: `- Number statements in order of appearance (1 is not always the conclusion).\n- Find the final conclusion, then what directly supports it, then what supports those.\n- **Leave out** statements that give no support: concessions, background, irrelevant claims.\n- **Pronoun rule:** "she", "these groups" pointing back is not a reason to conjoin.\n- Write lines from the ultimate argument down.` },
    { t: `Incomplete arguments and charity`, b: `An **incomplete argument** omits premises. An author who intends an argument but omits the conclusion produces a **non-argument**.\n\n**Principle of charity:** reconstruct by inserting missing premises. NEVER FILL IN MISSING PREMISES UNLESS THE QUESTION TELLS YOU TO.\n\nUnstated premises are often generalisations: universal ("All F's are G") or statistical ("n% of F's are G", 0<n<100). Lisa: "Lisa is a Singaporean and at least 21. Thus, Lisa is eligible to vote." Missing: "All Singaporeans at least 21 are eligible to vote."` },
    { t: `Tutorial diagrams to know`, b: `- Welfare: (1:2-3)\n- Composites: (1:2) then (2:3)\n- War on drugs: (2:3,4); (1) is a concession\n- Brazil rain forest: (4:1-3); (2) is irrelevant\n- Relief food: (1:2) then (2:3-4)\n- Scramjet: (1:3,4) then (3:2)\n- Death row: (1:2) then (2:3-4-5-6)\n- Material success: (1:2)(2:3)(3:6,7)(6:4-5)\n- Flesh food: (9:1,8) / (1:2)(8:7) / (2:3)(7:6) / (3:4); (5) not used` },
    { t: `Argument or not?`, b: `- Mosquito bites / West Nile: **both** an illustration and an argument.\n- Fiction passage with "Consequently": argument.\n- Pace of reading: argument, conclusion first, no indicators.\n- Churchill on universities: **not** an argument; a series of claims.\n- Economics in business: argument, conclusion first.\n- Artemidorus: premise indicator "For", no conclusion indicator.\n- Galileo: "Hence" marks the conclusion; its direct premise has no indicator but is itself supported via "because".\n- Ptolemy: no indicators at all; conclusion = first sentence.` }
  ],
  quick: [
    [`"For this reason" is a premise indicator.`, false, `It is a conclusion indicator: what follows it is argued for.`],
    [`"Seeing that" is a premise indicator.`, true, `Listed among the premise indicators.`],
    [`"Accordingly" is a conclusion indicator.`, true, `Listed among the conclusion indicators.`],
    [`In "Since I arrived in Singapore, I've eaten laksa weekly", "since" is a premise indicator.`, false, `Temporal sense: "from the time that".`],
    [`Whether a passage is an argument depends on what the author intended.`, false, `It depends on the words on the page; the inferential claim is objective.`],
    [`Conjoint premises are joined with a hyphen in linear form.`, true, `Independent premises use commas.`],
    [`A pronoun pointing back is enough reason to conjoin two premises.`, false, `The pronoun rule says it is not.`],
    [`You should add missing premises whenever an argument seems incomplete.`, false, `Only when the question tells you to apply the principle of charity.`],
    [`An extended argument (L2) can be a single premise set and conclusion.`, true, `"Either a single premise-set and conclusion or a cluster of interrelated arguments."`],
    [`Two conclusions from one premise set are strictly two arguments.`, true, `Join them with &, e.g. (2&3:1).`],
    [`A concession like "Defending the war on drugs may not be fashionable" belongs in the diagram.`, false, `It gives no support, so it is left out.`],
    [`The number of brackets in a linear diagram equals the number of arguments.`, true, `And the number of lines equals the number of levels.`],
    [`A passage can be both an illustration and an argument.`, true, `The mosquito passage is both.`],
    [`An author who omits the conclusion still produces an argument.`, false, `Omitted conclusion = non-argument.`],
    [`"All Singaporeans at least 21 are eligible to vote" is a statistical generalisation.`, false, `It is universal ("All F's are G").`],
    [`The Brexit poll sentence reads naturally as evidential.`, true, `A poll does not cause the vote result; it is evidence for the prediction.`],
    [`On Salmon's rule, a causal "because" sentence is an argument.`, false, `Salmon: a causal "because" means it is not an argument.`],
    [`In the Brazil passage, the tutorial answer is (4:1-3).`, true, `(2) is irrelevant and left out.`]
  ],
  qs: [
    { id: 'c2-01', t: 'set', topic: `Diagramming`, src: `T2 1.6 I:6`, q: `"(1) The rain forest of Brazil produces oxygen for the whole world, yet (2) it yields no monetary return to that country. Given that (3) the industrialized nations consume the most oxygen, (4) those nations ought to pay Brazil an annual fee for the use of its rain forest."`,
      s: [
        [`The linear diagram (4:1-2-3) correctly depicts this passage.`, false, `It includes (2), which gives no reason why the biggest oxygen consumers ought to pay.`, 'irrelevant-stmt'],
        [`The linear diagram (4:1-3) correctly depicts this passage.`, true, `The tutorial answer. (1) and (3) only support (4) together.`],
        [`Statements (1) and (3) are independent premises.`, false, `On the tutorial answer they are conjoint (hyphen).`, 'conjoint']
      ] },
    { id: 'c2-02', t: 'mcq', topic: `Diagramming`, src: `T1 1.6 I:5`, trap: 'irrelevant-stmt', q: `"(1) Defending the war on drugs may not be fashionable, but the fact remains that (2) hardcore drugs should remain illegal. (3) As long as hardcore drugs are illegal, they are harder to get, and (4) the social stigma of being arrested deters many users." Which linear diagram is correct?`,
      o: [`(2:3,4)`, `(1:2,3,4)`, `(2:1-3-4)`, `(2:3-4)`],
      a: 0, why: `(2) is the conclusion ("the fact remains that"). (3) and (4) each give a separate reason, so commas. (1) is a concession and is left out.` },
    { id: 'c2-03', t: 'mcq', topic: `Diagramming`, src: `T1 1.6 I:2`, q: `"(1) The development of carbon-embedded plastics, otherwise called 'composits,' is an important new technology because (2) it holds the key for new aircraft and spacecraft designs. This is so because (3) these composits are not only stronger than steel but lighter than aluminium." Which is correct?`,
      o: [`(1:2) then (2:3)`, `(1:2,3)`, `(1:2-3)`, `(3:1,2)`],
      a: 0, why: `"because" makes (2) the premise of (1). "This is so because" makes (3) the premise of (2). A chain of two arguments on two lines.` },
    { id: 'c2-04', t: 'set', topic: `Diagramming`, src: `T2 1.6 I:8`, q: `"(1) Contributions to relief organizations are often wasted. (2) Food sent to war torn countries rarely reaches its destination, because (3) food distribution is controlled by the warring groups, and (4) these groups sell the food to buy weapons and ammunition."`,
      s: [
        [`(1:2) then (2:3-4) correctly depicts the passage.`, true, `The tutorial answer.`],
        [`(3) and (4) should be conjoined because "these groups" in (4) refers back to (3).`, false, `The pronoun alone is not a reason to conjoin. They are conjoined because together they explain why food does not arrive.`, 'pronoun'],
        [`The final conclusion is (1).`, true, `(2) supports (1); (3) and (4) support (2).`]
      ] },
    { id: 'c2-05', t: 'mcq', topic: `Diagramming`, src: `T2 1.6 I:9`, q: `"(1) Research leading to the development of a scramjet engine is worthwhile. (2) Commercial aircraft incorporating such an engine could cross the Pacific in as little as two hours. (3) This would relieve the fatigue of flights from New York to Tokyo. Also, (4) such an engine could power future orbiting spacecraft." Which is correct?`,
      o: [`(1:3,4) then (3:2)`, `(1:2,3,4)`, `(1:2-3,4)`, `(4:1,2,3)`],
      a: 0, why: `(3) and (4) are separate reasons for (1). (2) supports (3): a two-hour crossing is what relieves the fatigue.` },
    { id: 'c2-06', t: 'mcq', topic: `Diagramming`, src: `T2 1.6 II:3`, q: `"(1) Society values white lives more than black lives. This is clear from the fact that (2) killers of whites are much more likely to be sentenced to death than killers of blacks. (3) Of the 1788 people currently on death row, 1713 were convicted of killing a white person. Yet (4) blacks are six times more likely to be murder victims than whites are. (5) In Florida, no one has ever been executed for murdering a black person, but (6) dozens have been executed for murdering white people." Which is the tutorial answer?`,
      o: [`(1:2) then (2:3-4-5-6)`, `(1:2,3,4,5,6)`, `(1:2) then (2:3,4,5,6)`, `(2:1) then (1:3-4-5-6)`],
      a: 0, why: `(3) to (6) only show the imbalance when read together, so all four are conjoint, and together they support (2), which supports (1).` },
    { id: 'c2-07', t: 'set', topic: `Diagramming`, src: `T2 1.6 II:6`, q: `"(1) All men crave material success because (2) it serves as an insurance policy against sexual rejection. This is true because (3) women love men who are successful. (4) Both men and women want power, and (5) success is the form of power women feel most deprived of. Thus, (6) women try to achieve it vicariously through men. (7) As the 5-foot 6-inch Dustin Hoffman once put it, 'When I was in high school, women wouldn't touch me with a 10-foot pole. Now I can't keep them away with a 10-foot pole.'" The tutorial answer is (1:2) (2:3) (3:6,7) (6:4-5).`,
      s: [
        [`(4) and (5) jointly support (6).`, true, `Hence the hyphen in (6:4-5).`],
        [`(7) supports (3) independently of (6).`, true, `Hence the comma in (3:6,7).`],
        [`(1) is the final conclusion.`, true, `Everything ultimately supports (1).`],
        [`(7) is an anecdote, so it should be left out of the diagram.`, false, `The tutorial answer counts the Hoffman quote as support for (3).`]
      ] },
    { id: 'c2-08', t: 'set', topic: `Diagramming`, src: `T2 1.6 II:8`, q: `The flesh-food passage ends with "(9) Clearly, a reassessment of the whole concept of killing and eating animals is in order." The tutorial answer is (9:1,8) / (1:2)(8:7) / (2:3)(7:6) / (3:4).`,
      s: [
        [`(9) is the final conclusion.`, true, `"Clearly" introduces the claim everything leads to.`],
        [`Statement (5), about the National Academy of Science warning, appears in the tutorial answer.`, false, `(5) does not appear in the tutorial answer.`, 'irrelevant-stmt'],
        [`(4) supports (3), which supports (2), which supports (1).`, true, `One of the two chains: 4 → 3 → 2 → 1.`],
        [`The answer has four levels.`, true, `Four lines: (9:...), (1:2)(8:7), (2:3)(7:6), (3:4).`]
      ] },
    { id: 'c2-09', t: 'mcq', topic: `Indicator words`, src: `T1 Galen`, trap: 'indicator-sense', q: `Galen: "...with a multitude of observers having observed a vast array of things, many things have been found to have been observed in vain. For this reason, it is now history, which is most useful, while earlier it was one's own perception." What does "For this reason" do here?`,
      o: [`It is a premise indicator, because it contains the word "reason".`, `It is a conclusion indicator: what follows it is the conclusion.`, `It marks a causal explanation, so the passage is not an argument.`, `It means "in this way".`],
      a: 1, why: `The claim after "for this reason" is what is being argued for. The tutorial lists "For this reason" as the conclusion indicator, with no premise indicator.` },
    { id: 'c2-10', t: 'set', topic: `Indicator words`, src: `T1 Artemidorus`, q: `"Men who live an upright, moral life do not have meaningless dreams or any other irrational fantasies but rather dreams that are by all means meaningful... For their minds are not muddled by fears or by expectations but, indeed, they control the desires of their bodies."`,
      s: [
        [`The conclusion is the first sentence.`, true, `The second sentence gives the reason.`],
        [`"For" is a premise indicator here.`, true, `It introduces the reason.`],
        [`The passage contains a conclusion indicator.`, false, `The tutorial answer: conclusion indicator = none.`]
      ] },
    { id: 'c2-11', t: 'set', topic: `Indicator words`, src: `T1 Galileo`, q: `Galileo: "I say that shining objects... either because their light is refracted from the moisture that covers the pupil, or because it is reflected from the edges of the eyelids..., or for some other reason, appear to our eyes as if surrounded by new rays. Hence, these bodies look much larger than they would if they were seen by us deprived of such irradiations."`,
      s: [
        [`"Hence" is a conclusion indicator.`, true, `It introduces the final conclusion.`],
        [`The statement directly before "Hence" is introduced by a premise indicator.`, false, `The premise of the final conclusion has no premise indicator; it is itself the conclusion of a sub-argument.`],
        [`The sub-argument's premises are introduced by "because ... or because ... or for some other reason".`, true, `That is how the tutorial reads it.`]
      ] },
    { id: 'c2-12', t: 'mcq', topic: `Argument or not`, src: `T1`, q: `Churchill: "Young people at universities study to achieve knowledge and not to learn a trade. We must all learn how to support ourselves, but we must also learn how to live. We need a lot of engineers in the modern world, but we do not want a world of modern engineers." This is...`,
      o: [`an argument whose conclusion is the first sentence`, `an argument whose conclusion is the last sentence`, `not an argument: none of the sentences is offered as a reason for another`, `an argument with three conclusions`],
      a: 2, why: `The tutorial answer: a series of claims, none offered as a reason for another.` },
    { id: 'c2-13', t: 'mcq', topic: `Argument or not`, src: `T1`, trap: 'illustration', q: `"Mosquito bites are not always the harmless little irritations most of us take them to be. For example, some mosquitoes carry West Nile virus, and people who are infected can become very sick or even die." According to the tutorial, this passage is...`,
      o: [`only an illustration, so not an argument`, `both an illustration and an argument, with the first sentence as conclusion`, `an argument whose conclusion is the second sentence`, `an explanation of why mosquitoes bite`],
      a: 1, why: `The West Nile case illustrates the first sentence and also gives a reason to believe it.` },
    { id: 'c2-14', t: 'mcq', topic: `Indicator words`, src: `Original`, trap: 'indicator-sense', q: `In which sentence is "since" a premise indicator?`,
      o: [`"Since I matriculated at NUS, I have stayed at Tembusu College."`, `"Since all the seats in LT27 are taken, Ahmad must be standing at the back."`, `"She was chosen to represent the university in a debate tournament, since the selection panel judged that she was the best candidate."`, `"Since 2019, the hawker centre has opened on Sundays."`],
      a: 1, why: `In B, the full seats are a reason for believing Ahmad is standing. A and D are temporal; C is the slide's causal example.` },
    { id: 'c2-15', t: 'set', topic: `Causal vs evidential`, src: `L2 slide`, q: `On "because":`,
      s: [
        [`"The Leave side is going to win in the Brexit referendum, because this is what the most recent poll predicts" reads naturally as evidential.`, true, `A poll does not cause the vote result; it is evidence for the prediction.`],
        [`"BWF banned Lee Chong Wei for an unspecified period because of his doping" reads naturally as causal.`, true, `The doping is what led to the ban.`],
        [`According to Salmon, a "because" sentence that asserts a causal connection is an argument.`, false, `Salmon: if "because" asserts a causal connection, the sentence is not an argument.`, 'causal-because'],
        [`The paraphrase test compares "The cause of X is Y" with "My evidence for X is Y".`, true, `That is the test.`]
      ] },
    { id: 'c2-16', t: 'mcq', topic: `Indicator words`, src: `L2 slide`, trap: 'indicator-sense', q: `"My laptop's operating system crashed last night. Thus, I cannot submit my essay today." On the L2 slide, "thus" here...`,
      o: [`is a conclusion indicator`, `marks an effect, which is a non-argument sense`, `means "in this way"`, `introduces an example`],
      a: 1, why: `The slide uses this exact sentence as the "effect" sense of "thus", where it is not a conclusion indicator.` },
    { id: 'c2-17', t: 'set', topic: `Charity & generalisations`, src: `L2 slide`, q: `"Lisa is a Singaporean and at least 21 years old. Thus, Lisa is eligible for voting in Singapore general elections."`,
      s: [
        [`Taken as it stands, the passage has one premise and one conclusion.`, true, `Do not add premises unless asked.`],
        [`The argument contains the premise "All Singaporeans who are at least 21 years old are eligible for voting in Singapore general elections."`, false, `That premise is unstated. It is only part of the argument if you are told to reconstruct it with the principle of charity.`, 'charity'],
        [`If asked to apply the principle of charity, we may insert that universal generalisation as a missing premise.`, true, `That is what charity does.`],
        [`"80% of Singaporeans aged 21 and above are eligible to vote" would be a statistical generalisation.`, true, `"n% of F's are G" with 0<n<100.`]
      ] },
    { id: 'c2-18', t: 'set', topic: `Extended arguments`, src: `L2 slide`, q: `On extended arguments and linear form:`,
      s: [
        [`On the L2 definition, an extended argument can be a single premise set and conclusion.`, true, `"Either a single premise-set and conclusion or a cluster of interrelated arguments."`, 'extended'],
        [`An extended argument must contain at least two arguments.`, false, `The L2 wording allows a single premise set and conclusion.`, 'extended'],
        [`Strictly, one premise set supporting two conclusions is two arguments, written with & as one conclusion.`, true, `e.g. (2&3:1).`, 'two-conclusions'],
        [`Pro-con is one of the four relations in extended arguments.`, true, `With main-subsidiary, multiple arguments for a conclusion, multiple arguments for closely related conclusions.`]
      ] },
    { id: 'c2-19', t: 'mcq', topic: `Diagramming`, src: `L2 slide`, q: `A diagram reads: (2&3:4,7,9) on line 1, then (4:5,6)(7:8)(9:10,11) on line 2. How many arguments and levels does it show?`,
      o: [`4 arguments, 2 levels`, `2 arguments, 4 levels`, `11 arguments, 2 levels`, `5 arguments, 2 levels`],
      a: 0, why: `Brackets = number of arguments (4). Lines = number of levels (2).` },
    { id: 'c2-20', t: 'mcq', topic: `Diagramming`, src: `L2 slide`, trap: 'conjoint', q: `"(1) Getting poor people off welfare requires modifying their behaviour. (2) Most on welfare roll are high school dropouts, single parents or alcohol and drug abusers. (3) These behaviour patterns frustrate poor people's desire for getting a job and improving their lives." Why is the answer (1:2-3) rather than (1:2,3)?`,
      o: [`Because (3) uses "These", which points back to (2).`, `Because (2) on its own only describes who is on welfare; it supports (1) only together with (3).`, `Because (1) is not the conclusion.`, `Because (2) is irrelevant.`],
      a: 1, why: `(2) and (3) work together: (2) says who is on welfare, (3) says those patterns block job-seeking. The pronoun is not the reason.` },
    { id: 'c2-21', t: 'mcq', topic: `Argument or not`, src: `Cheatsheet trap`, trap: 'intention', q: `A blogger writes: "Prices at the hawker centre rose last year. Many families struggled." Which is TRUE?`,
      o: [`It is an argument because the blogger intended to show that prices caused hardship.`, `It is not an argument: no statement is presented as supporting another, and no conclusion is stated.`, `It is an argument with two conclusions.`, `It is a sound deductive argument.`],
      a: 1, why: `Whether a passage is an argument is judged objectively from the words, not from what the author meant.` },
    { id: 'c2-22', t: 'mcq', topic: `Diagramming`, src: `Original`, q: `"(1) Kai will miss the 9am lecture, because (2) the Circle Line is down. We know the line is down because (3) SMRT posted about a signalling fault on its official account." Which linear diagram is correct?`,
      o: [`(1:2) then (2:3)`, `(1:2,3)`, `(1:2-3)`, `(3:1,2)`],
      a: 0, why: `"because" makes (2) the premise of (1); the second "because" makes (3) the premise of (2). A two-level chain, like the composites passage.` },
    { id: 'c2-23', t: 'mcq', topic: `Diagramming`, src: `Original`, q: `"(1) Durians should not be brought onto MRT trains. (2) Their smell lingers in the carriage for hours. Besides, (3) their sharp husks can injure other passengers." Which linear diagram is best?`,
      o: [`(1:2,3)`, `(1:2-3)`, `(2:1,3)`, `(1:2) then (2:3)`],
      a: 0, why: `(2) and (3) each give a separate reason for (1). Neither needs the other to support the conclusion, so commas.` },
    { id: 'c2-24', t: 'mcq', topic: `Diagramming`, src: `Original`, q: `"(1) Priya must be at least 21. After all, (2) everyone who voted at the last general election was at least 21 at the time, and (3) Priya voted at the last general election." Which linear diagram is best?`,
      o: [`(1:2-3)`, `(1:2,3)`, `(2:1-3)`, `(1:3) then (3:2)`],
      a: 0, why: `Neither premise supports (1) alone: (2) says nothing about Priya, and (3) says nothing about age. Together they do, so they are conjoint.` },
    { id: 'c2-25', t: 'set', topic: `Argument or not`, src: `L2 slide`, q: `On Hurley's test and the two claims:`,
      s: [
        [`A factual claim says that some evidence or reason exists.`, true, `Course wording.`],
        [`An inferential claim says that the premise set supports the conclusion.`, true, `Course wording.`],
        [`On Hurley's view, an argument makes both claims, explicitly or implicitly.`, true, `That is Hurley's test.`],
        [`The inferential claim is about what the author privately intended.`, false, `The slide says it is objective, not about intentions.`, 'intention']
      ] },
    { id: 'c2-26', t: 'mcq', topic: `Extended arguments`, src: `L2 slide`, q: `Which is NOT one of the four relations found in extended arguments?`,
      o: [`Main-subsidiary`, `Pro-con`, `Multiple arguments for a conclusion`, `Circular support between two conclusions`],
      a: 3, why: `The four are main-subsidiary, pro-con, multiple arguments for a conclusion, and multiple arguments for closely related conclusions.` }
  ]
});
