/* Chapter 5 — Meaning & Definitions 2 [L5] [T3] */
RL.chapter({
  n: 5, code: 'RL5', lec: 'L5 · T3', title: `Meaning & Definitions 2`, short: `Definitions 2 & Meaning`,
  place: `Gardens by the Bay`, spot: `Cloud Forest dome, in the mist`, icon: 'supertree', sky: 505,
  mentor: ['ayer', 'james'], mentorName: `Madam Verity & Mr. Will James`,
  story: [
    `Madam Verity: "A sentence is meaningful only if it is true by definition, or if some observation could in principle verify it. Unaided senses only. No microscopes."`,
    `Mr. Will James: "Nonsense, Verity. A sentence is meaningful if its truth or falsity would make a practical difference to someone: to what they experience, or to what they ought to choose."`,
    `Madam Verity: "Then your theory lets in every metaphysical claim under this dome."`,
    `Mr. Will James: "And yours throws out electrons and DNA. Student, settle our quarrel. Tell us, sentence by sentence, who calls what meaningful."`
  ],
  win: `Both of them nod, which has never happened before. The next stop is a void deck in Toa Payoh.`,
  cards: [
    { t: `Stipulative definitions`, b: `A **stipulative** definition specifies one's own usage, meant to differ from current usage; often for technical terms. "Pure water" = "H2O with bacteria level less than x"; legal definitions of "death".\n\n**Rules for stipulating:**\n- use clear, widely understood terms\n- avoid circularity\n- fit the intended use\n- help us understand a subject` },
    { t: `Meaning by examples`, b: `If meanings could only be explained by definitions, there would be an **infinite regress**: every definition uses words that need defining. So some words must be explained by **examples**, e.g. "green" by pointing to green objects. Examples are especially useful for abstract terms.` },
    { t: `Logical positivism (LP)`, b: `**Verifiability criterion of meaning:** a sentence is meaningful just in case it is **true by definition** OR its truth/falsity is **at least in principle verifiable by observable evidence** (you can think of an observable situation that shows it true or false).\n\n**Observation** = perception unaided by instruments that change the power and limits of human senses (e.g. a microscope).` },
    { t: `Problems for LP`, b: `**Problem 1:** much of theoretical science would be meaningless. Theories about unobservables (electrons, DNA) fail the test. On a **stricter** version, universal generalisations over **infinite populations** (f = ma) are meaningless too, since no finite set of observations verifies them.\n\n**Problem 2:** the LP theory is inconsequential (slide wording).\n\nLooser LP: "All ravens are black" can be meaningful because seeing a blue raven would falsify it.` },
    { t: `Pragmatism (PR)`, b: `An **empirical** sentence is meaningful just in case its truth/falsity could make a **practical difference** to someone: a difference to what one would **experience** OR to what one **ought to choose**.\n\nHedonism ("only pleasure is worth pursuing in life") is meaningful because it changes what one ought to choose.\n\nWeak spot: counts many metaphysical and religious claims as meaningful.` },
    { t: `Making distinctions`, b: `Distinguishing senses of a word helps evaluate truth and soundness. Is "some beliefs are indubitable" true? It depends on whether "indubitable beliefs" means beliefs **no humans** doubt, or beliefs **no rational humans** doubt.` },
    { t: `Checklist: meaningful on LP? on PR?`, b: `**LP:**\n- True by definition? Meaningful.\n- Can you imagine an observable situation (unaided senses, public testing in the tutorial) that shows it true or false? Meaningful.\n- Only instruments/theory can test it (counting atoms)? Not observation for LP.\n- Universal claim over an infinite population? Meaningless on stricter LP.\n\n**PR:**\n- Could its truth or falsity change someone's experience OR what someone ought to choose? Meaningful.` },
    { t: `Tutorial answers (Gensler 3.4a)`, b: `- "The clock is fast": LP meaningful (compare with other clocks); PR meaningful.\n- "Five-foot-long blue ants in my bedroom": both meaningful.\n- "Nothing is real": LP meaningless (match between experience and reality unobservable); PR meaningful (changes what I ought to believe/choose).\n- "At noon all lengths double": no observation proves it, but it could be shown false in one way, so meaningful in a sense on LP; its truth makes no practical difference.\n- "Manuel will have conscious experiences after death": LP meaningless if evidence must be public; PR meaningful.\n- "God exists": positivists say meaningless (challenge: imagine God appearing); PR meaningful.` },
    { t: `LP vs PR at a glance`, b: `**Test.** LP: true by definition or in principle verifiable by observation. PR: truth/falsity makes a practical difference (experience or choice).\n\n**Scope.** LP: any sentence. PR: empirical sentences.\n\n**Weak spot.** LP: theoretical science, infinite generalisations, inconsequential. PR: counts many metaphysical and religious claims meaningful.` },
    { t: `Trap check`, b: `- LP counts sentences **true by definition** as meaningful (Covid fatality rate > 50% ⇒ more than half died).\n- Counting atoms with theory/instruments is **not** LP observation.\n- Stricter LP: the hydrogen statement over infinitely many atoms is meaningless.\n- Looser LP: "All ravens are black" can be meaningful, but a claim about atoms detectable only by instruments still is not.\n- Studocu says LP excludes ethical statements. Not on the slides; do not rely on it.` }
  ],
  quick: [
    [`On LP, a sentence true by definition is meaningful.`, true, `"True by definition OR verifiable."`],
    [`For LP, looking through a microscope counts as observation.`, false, `Observation is unaided by instruments that change the limits of the senses.`],
    [`On a stricter LP, universal generalisations over infinite populations are meaningless.`, true, `No finite set of observations verifies them.`],
    [`On PR, a sentence is meaningful if its truth could change what someone ought to choose.`, true, `Experience OR choice.`],
    [`Hedonism is meaningless on PR.`, false, `It changes what one ought to choose, so it is meaningful.`],
    [`"Nothing is real" is meaningful on LP, according to the tutorial.`, false, `Meaningless on LP; meaningful on PR.`],
    [`"The clock is fast" is meaningful on both LP and PR.`, true, `Publicly testable; makes a practical difference.`],
    [`A stipulative definition reports current usage.`, false, `That is lexical. Stipulative sets one's own usage.`],
    [`Some words must be explained by examples, to avoid an infinite regress.`, true, `L5 slide.`],
    [`PR's criterion is stated for empirical sentences.`, true, `LP's covers any sentence.`],
    [`LP makes much of theoretical science meaningless.`, true, `Problem 1 for LP.`],
    [`"God exists" is meaningful on PR.`, true, `It makes a difference to religious experience and choices.`],
    [`Positivists say "God exists" is meaningful.`, false, `They say it is meaningless.`],
    [`"Pure water = H2O with bacteria level below x" is a stipulative definition.`, true, `Slide example.`],
    [`A stipulative definition should use clear, widely understood terms.`, true, `Rule 1 for stipulating.`],
    [`"Manuel will be conscious after his death" is meaningless on LP if evidence must be public.`, true, `Only Manuel could perceive it.`]
  ],
  qs: [
    { id: 'c5-01', t: 'set', topic: `Logical positivism`, src: `2018 Q7`, q: `"For all hydrogen atoms, every gram of hydrogen contains 6.02 × 10^23 atoms." Suppose there are infinitely many hydrogen atoms.`,
      opts: [[0], [0, 1], [0, 2], [2]],
      s: [
        [`Setting aside whether a hydrogen atom is observable, this statement is meaningless according to a logical positivism that assumes a stricter version of the verifiability criterion.`, true, `A stricter criterion makes every universal generalisation over an infinite population meaningless.`, 'lp-strict'],
        [`If scientists can count the number of hydrogen atoms in a gram of hydrogen using theory/instruments, it follows that this sentence is meaningful according to a version of logical positivism that does not assume a stricter verifiability criterion.`, false, `Counting with theory and instruments is not observation for logical positivists.`, 'lp-instruments'],
        [`If "all ravens are black" is meaningful according to a particular version of logical positivism, then this statement about hydrogen is also meaningful according to that version, assuming that hydrogen atoms can only be detected by scientific instruments.`, false, `A blue raven could be seen; hydrogen atoms cannot be perceived by unaided senses, so no imagined observation can falsify the hydrogen claim.`, 'lp-instruments']
      ] },
    { id: 'c5-02', t: 'mcq', topic: `Logical positivism`, src: `GEX23 Q9`, trap: 'lp-definition', q: `"If the historical fatality rate of Covid-19 in period x and place y is greater than 50% then more than half of those who contracted Covid-19 in period x and place y did not survive." On logical positivism, this sentence is...`,
      o: [`meaningless, because no observation is needed to confirm it`, `meaningful, because it is true by definition`, `meaningless, because it is a conditional`, `meaningful only if someone actually counts the deaths`],
      a: 1, why: `A fatality rate above 50% just means more than half died. LP counts sentences true by definition as meaningful.` },
    { id: 'c5-03', t: 'set', topic: `LP vs PR verdicts`, src: `T3 3.4a:2, 3`, q: `Tutorial verdicts:`,
      s: [
        [`"The clock is fast" is meaningful on LP, because we can test it publicly by comparing it with other clocks that agree with each other.`, true, `Tutorial answer.`],
        [`"The clock is fast" is meaningful on PR.`, true, `It makes a practical difference to what one can observe.`],
        [`"There are five-foot-long blue ants in my bedroom" is meaningless on LP because such ants do not exist.`, false, `Meaningful: we could measure the ants and check their colour. Falsity is not meaninglessness.`],
        [`"There are five-foot-long blue ants in my bedroom" is meaningful on PR.`, true, `Their existence would make a difference to one's experiences.`]
      ] },
    { id: 'c5-04', t: 'set', topic: `LP vs PR verdicts`, src: `T3 3.4a:4`, q: `"Nothing is real."`,
      s: [
        [`It is meaningless on LP, read as "our experiences don't correspond to reality", because that match or mismatch cannot be observed.`, true, `Tutorial answer.`],
        [`It is meaningful on PR, because it makes a difference to what one ought to believe and choose.`, true, `Tutorial answer.`, 'pr-choice'],
        [`It is meaningless on both theories.`, false, `PR counts it meaningful.`]
      ] },
    { id: 'c5-05', t: 'set', topic: `LP vs PR verdicts`, src: `T3 3.4a:10, 12`, q: `On the tutorial answers:`,
      s: [
        [`"Manuel will continue to have conscious experiences after his physical death" is meaningless on LP if "observable evidence" means public evidence.`, true, `Only Manuel could perceive it.`],
        [`The same sentence is meaningful on PR.`, true, `It affects Manuel's own experiences and present choices.`],
        [`Logical positivists themselves say that "God exists" is meaningless.`, true, `Though one might challenge this by imagining God appearing as a visible person.`],
        [`"God exists" is meaningless on PR, because no one can observe God.`, false, `PR asks about practical difference: worship, how to treat others, religious experience.`]
      ] },
    { id: 'c5-06', t: 'mcq', topic: `LP vs PR verdicts`, src: `T3 3.4a:6`, q: `"At noon all lengths, distances, and velocities in the universe will double." On PR, the tutorial says...`,
      o: [`its truth would make a huge practical difference`, `its truth could make no practical difference`, `it is true by definition`, `it is meaningful because instruments could detect it`],
      a: 1, why: `Every measuring standard doubles too, so its truth could make no practical difference. Whether its falsity could depends on how it is false.` },
    { id: 'c5-07', t: 'mcq', topic: `Stipulative definitions`, src: `L5 slide`, q: `"In this report, 'pure water' means H2O with a bacteria level less than x." This is...`,
      o: [`a lexical definition`, `a stipulative definition`, `a circular definition`, `a definition by example`],
      a: 1, why: `It sets the author's own technical usage, which is what a stipulative definition does.` },
    { id: 'c5-08', t: 'set', topic: `Stipulative definitions`, src: `L5 slide`, q: `Rules for a good stipulative definition:`,
      s: [
        [`Use clear, widely understood terms.`, true, `Rule 1.`],
        [`Avoid circularity.`, true, `Rule 2.`],
        [`It must match current usage exactly.`, false, `That is the job of a lexical definition. A stipulative one is meant to differ from current usage.`, 'lexical-stipulative'],
        [`Stipulate one that helps us understand a subject.`, true, `Rule 4.`]
      ] },
    { id: 'c5-09', t: 'mcq', topic: `Meaning by examples`, src: `L5 slide`, q: `Why must some words be explained by examples rather than definitions?`,
      o: [`Because examples are always more precise`, `Because otherwise there would be an infinite regress of definitions`, `Because logical positivists require it`, `Because definitions are always circular`],
      a: 1, why: `Every definition uses words that would themselves need defining.` },
    { id: 'c5-10', t: 'set', topic: `Logical positivism`, src: `L5 slide`, q: `On logical positivism:`,
      s: [
        [`For LP, observation means perception unaided by instruments that change the power and limits of human senses.`, true, `A microscope does not count.`],
        [`Counting atoms with scientific instruments counts as LP observation.`, false, `Instrument-based detection is not observation.`, 'lp-instruments'],
        [`One problem for LP is that much of theoretical science would be meaningless.`, true, `Electrons, DNA.`],
        [`On a looser LP, "All ravens are black" can be meaningful even with infinitely many ravens, because seeing a blue raven would falsify it.`, true, `The looser reading in 2018 Q7.`]
      ] },
    { id: 'c5-11', t: 'mcq', topic: `Pragmatism`, src: `L5 slide`, trap: 'pr-choice', q: `Why does pragmatism count hedonism ("only pleasure is worth pursuing in life") as meaningful?`,
      o: [`It is true by definition.`, `It can be verified with unaided senses.`, `Its truth or falsity makes a difference to what one ought to choose.`, `Most people believe it.`],
      a: 2, why: `PR: a practical difference to experience OR to what one ought to choose is enough.` },
    { id: 'c5-12', t: 'mcq', topic: `Making distinctions`, src: `L5 slide`, q: `Whether "some beliefs are indubitable" is true depends on whether "indubitable beliefs" means...`,
      o: [`beliefs held by most people, or beliefs held by experts`, `beliefs no humans doubt, or beliefs no rational humans doubt`, `true beliefs or false beliefs`, `beliefs about the past or about the future`],
      a: 1, why: `That is the slide's example of making distinctions.` },
    { id: 'c5-13', t: 'set', topic: `LP vs PR verdicts`, src: `Original`, q: `"A family of three-metre-tall otters lives under the bridge at Bishan Park."`,
      s: [
        [`It is meaningful on LP.`, true, `You can imagine walking there and seeing (or not seeing) such otters with unaided senses.`],
        [`It is meaningful on PR.`, true, `Its truth would make a difference to what you experience at Bishan Park.`],
        [`It is meaningless on LP because it is almost certainly false.`, false, `A false sentence can still be meaningful. Verifiable in principle is enough.`]
      ] },
    { id: 'c5-14', t: 'mcq', topic: `Logical positivism`, src: `Original`, q: `A logical positivist must say "Electrons exist" is meaningless. What does the lecture call this?`,
      o: [`A strength: it clears away metaphysics`, `A problem: much of theoretical science would be meaningless`, `Irrelevant: electrons are true by definition`, `Proof that pragmatism is wrong`],
      a: 1, why: `LP Problem 1: theories that postulate unobservable entities fail the test.` },
    { id: 'c5-15', t: 'mcq', topic: `Stipulative definitions`, src: `Original`, trap: 'lexical-stipulative', q: `An essay says: "In this essay, I use 'heartlander' to mean any resident of an HDB town completed after 1980." This is...`,
      o: [`a lexical definition`, `a stipulative definition`, `a definition by example`, `an argument`],
      a: 1, why: `It sets the author's own usage, different from current usage.` },
    { id: 'c5-16', t: 'set', topic: `Pragmatism`, src: `L5 slide`, q: `Comparing LP and PR:`,
      s: [
        [`PR's criterion is stated for empirical sentences.`, true, `LP's covers any sentence.`],
        [`A weak spot of PR is that it counts many metaphysical and religious claims meaningful.`, true, `Comparison table.`],
        [`LP counts a sentence meaningful only if it has actually been verified.`, false, `"At least in principle verifiable" is enough, as is being true by definition.`],
        [`The slide also says the LP theory is inconsequential.`, true, `LP problem 2.`]
      ] }
  ]
});
