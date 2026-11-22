// Paper 1: "Where I fell short". The analysis, learning points and quote lines are written here; the mistakes,
// scores and case facts are pulled in by scripts/build-papers.mjs from papers/record.json and the app's data.
// [check] marks a point your own notes flag as unconfirmed: verify it against the lecture slides.
export default {
  title: 'RE2702 Land Law: Where I Fell Short',
  subtitle: 'A learning essay built from every question I got wrong, with every case in the course set out so I can quote it in the final',

  intro: [
    'This essay is written from your own record in Land Lah!, not from a generic syllabus. Every mistake below is a question you actually answered wrongly, every pattern is counted from those answers, and every case in the course is set out with its facts, its holding and a sentence you can adapt in the exam. The final is open book, but copy and paste is disabled, so the quote lines are written to be read and retyped quickly.',
    'The headline is encouraging. Your graded tests sit between 80% and 100% in every lot, and you answered 18 of the 20 quick checks inside the video lessons correctly. The marks you are still losing come from a small number of habits, and they repeat across topics. Fix the habits and the marks come back everywhere at once.',
    'Two numbers matter most. Mock Paper 1 Section A came out at 65% (39/60), well below your lot-by-lot scores, because a mixed paper removes the topic label that tells you which rules apply. And you have not yet written a full 40-mark Section B answer under time: the two case studies you attempted were marked by the keyword checker, which is generous. Part C of the companion paper is built to close that gap.'
  ],

  patterns: [
    { head: '1. Co-ownership and trusts is your weakest topic by a distance', tone: 'bad', body: [
      'Lot 7 accounts for 13 of your MCQ mistakes, more than any other lot, and every one of them is still open. They are not random: they cluster on the order of the inquiry (actual intention first, presumptions last), on who bears the burden of proving a resulting trust, and on which events sever a joint tenancy. You also missed the practice paper\'s own Question 1 on the resulting trust burden twice. This is the lecturer\'s question style, and the same point can return in Section B as the Zen and Belle story did in the past-year paper.',
      'Fix: learn the sequence as a script. Legal title (s 53(1) LTA, joint tenants by default), then beneficial title (actual intention, Patricia Khoo scenario, then the presumptions), then severance (three statutory steps, Williams v Hensman, by law), then survivorship and the Will.'
    ] },
    { head: '2. In "(i) to (iv)" questions you keep misjudging statement (iv)', tone: 'warn', body: [
      'Of the {SETS} combination questions you missed, {IV} went wrong on statement (iv), and in most of those (iv) was true and you treated it as false. Typical examples: "a civil claim for trespass must be proved on a balance of probabilities" (true), "stamp duty on an exercised OTP is payable within 14 days" (true), "a sublease for the whole remaining term takes effect as an assignment" (true), "the right must not amount to exclusive possession of the garden" (true).',
      'This looks like a reading habit rather than a knowledge gap: by the fourth statement you expect a trick and mark it false. Fix: before you look at the options, write T or F beside each statement on your rough paper, judging each one alone. Then find the option that matches. Never let the options tell you what (iv) must be.'
    ] },
    { head: '3. You grab the general rule and miss the exception the question is built on', tone: 'warn', body: [
      'Many misses share one shape: the question is built on an exception to a true general rule, and the attractive option states the general rule. Weight suggests a chattel, but purpose made the garden fountain a fixture (D\'Eyncourt v Gregory). Every building is land, but custom made the Malay stilt house a chattel (Kiah). Trade fixtures are the tenant\'s, but only during the lease or soon after. A licence is personal, but a constructive trust can bind a buyer (Ashburn Anstalt). An agent\'s authority ends on incapacity, but a Lasting Power of Attorney survives it.',
      'Fix: when an option states a broad rule with "always", "never" or "every", ask which fact in the question is there to defeat it.'
    ] },
    { head: '4. Procedure in the right order', tone: 'warn', body: [
      'You missed the forfeiture question about Gabby and the students three times. The right answer depends on order: is there a right to forfeit (an express re-entry clause, because s 93 LTA covers only registered leases), then which procedure (s 18 CLPA notice for a non-rent breach, s 18A for rent), then waiver. The same discipline is needed for the mortgagee\'s power of sale (arisen: all three conditions; exercisable: any one s 25 trigger, which you also missed in Lightning) and for statutory severance (declare, serve, register).'
    ] },
    { head: '5. The fundamentals are worth more than they look', body: [
      'Lot 1 has 12 MCQ mistakes and 8 quick-fire misses, and your first Lot 1 graded test is recorded at 0% before you recovered to 100%. The misses are definitions: Lord Wilberforce\'s four features of a proprietary right (you missed this three times in MCQs and twice in Lightning, each time accepting "registration" as a feature), the bundle of rights, ratio versus obiter, civil versus criminal standards, arbitration versus mediation. These are cheap marks in Section A and useful opening lines in Section B.'
    ] },
    { head: '6. Agency is fragile under pressure', body: [
      'Your Lot 10 graded test was 80%, but your checkpoint after the video was 20%, the lowest checkpoint you recorded. Your misses are on remedies and authority: a bribe is held on constructive trust and a dishonest agent forfeits commission (FHR, Andrews v Ramsay), ratification relates back, promoters are personally liable for a company that does not yet exist (Kelner v Baxter), and dual agency without consent is a breach. Agency is a likely Section B part (KFM and the Lees both sit in your materials), so this needs one more full pass.'
    ] }
  ],

  strengths: [
    'Law and equity (Lot 2): 100% on the graded test and 100% on the checkpoint. You understand Equity\'s Darling and the Torrens twist.',
    'Mortgages, leases, co-ownership and sale (Lots 5 to 8): 90% on each graded test. Your errors there are specific and fixable.',
    'Torrens (Lot 9): 94% in training. Your misses are on the safety nets (rectification against a proprietor in possession, the Assurance Fund), not on indefeasibility itself.',
    'You watched every video lesson and answered 18 of 20 quick checks correctly, and the Ong (20/20) and Punggol (10/10) case studies show you know which authorities to reach for.'
  ],
  howToUse: [
    'Read Part A once, then go lot by lot. In each lot read "Where you fell short" first, then the learning points, then the cases.',
    'Red-bordered boxes are mistakes still open; green ones you have since fixed. Statements marked "you misjudged" are the ones you got wrong in a combination question.',
    'Each case ends with a "Quote it" sentence. Adapt the second half to your facts. Bold the case name when you type it, as the lecturer asks.',
    'Red [check] marks come from your own notes: the point is unconfirmed, so check it against the slides before relying on it.',
    'Bring this printout to the hall. Part C is your one-page checklist.'
  ],

  lots: {
    1: {
      diag: [
        'Lot 1 is where you lost the most cheap marks. The pattern is clear: when an option sounds like a true general statement, you take it, even where the question is built on an exception or mixes in a rule from another lot. The Ainsworth question shows it best. You accepted "registration on the Certificate of Title" as one of Lord Wilberforce\'s features of a proprietary right three times. Registration belongs to Lot 9 (Torrens); the definition in Lot 1 has nothing to do with it.',
        'On fixtures, you missed the garden fountain (purpose can outweigh weight) and the Malay stilt house (custom), and in Lightning you called a bungalow on pillars a chattel and said a tenant can remove trade fixtures years after leaving. On the legal system, Lightning shows you mixing the civil and criminal standards and treating a mediator\'s view as binding. None of these is hard. All of them are definitions that you must state exactly.'
      ],
      learn: [
        ['A proprietary right has four features, and registration is not one', ['In **National Provincial Bank v Ainsworth** Lord Wilberforce said a right is proprietary only if it is (1) definable, (2) identifiable by third parties, (3) capable in its nature of assumption by third parties, and (4) has some degree of permanence or stability. A proprietary right binds people other than the original parties; a personal right binds only the person who granted it. Whether the right is *registered* is a separate question about protection under the Land Titles Act. Use this test whenever you must say whether a right binds a buyer (covenants, licences, leases, contract rights).']],
        ['Ownership is a bundle of rights', ['Ownership is a collection of separable rights: to possess, use, exclude, enjoy income and transfer. The owner can hand out parts of the bundle: a lease gives possession, an easement gives a limited use, a mortgage gives security, and the owner keeps the rest. That is why one piece of land can carry several interests held by different people at once.']],
        ['Land, estate, title: the three layers', ['The State owns all land and grants estates (an estate in perpetuity, or a lease of 99 or 999 years) under the doctrine of tenures and estates. The Certificate of Title proves who holds the estate. An estate in perpetuity can be sold, mortgaged and leased like any estate. As a 99-year lease runs down its value falls (lease decay), and lenders and CPF lend less.']],
        ['Fixtures: run both tests, then say which one decided it', ['Start with *quicquid plantatur solo, solo cedit*. Under **Holland v Hodgson** ask (1) the degree of annexation (fixed: presumed fixture; resting on its own weight: presumed chattel) and (2) the object or purpose (permanent improvement of the land, or enjoyment of the item). Purpose now carries the greater weight: statues resting on their own weight were fixtures because they completed the design of the house (**D\'Eyncourt v Gregory**). If the item *is* the building, skip the tests: it is part and parcel of the land (**Elitestone v Morris**), unless local custom treats a removable house as a chattel (**Kiah bte Hanapiah v Sam**). Fixtures pass on a sale unless the contract excludes them (s 6 CLPA).']],
        ['Tenant\'s fixtures have a time window', ['A tenant may remove trade, ornamental and domestic fixtures during the lease or within a short time after, making good any damage (**Fisher v Dixon**; **Spyers v Phillipson**). Once the tenant gives up possession, items left behind belong to the landlord (**BP Refinery v Amazon** [check]). In the Ravi question the shelves were left behind when he returned the keys, so they had passed to the landlord by 25 April.']],
        ['A financier loses to the landowner once the item is a fixture', ['An engine on hire-purchase that was fixed to land went with the land to a later mortgagee without notice (**Hobson v Gorringe**). The hire-purchase company keeps only a personal claim against the hirer. In the Omega question, the bank without notice took the bolted press.']],
        ['Airspace and subsoil', ['The owner holds the airspace reasonably necessary for ordinary use and enjoyment (s 2 LTA). A low intrusion, even an 8-inch sign, is trespass (**Kelsen v Imperial Tobacco**), and so is a crane jib over the roof (**Anchor Brewhouse**). An aircraft at a reasonable height is not (**Bernstein v Skyviews**). Below ground, Singapore limits ownership to the depth reasonably necessary or, if the title is silent, 30 m below the Singapore Height Datum (s 3B State Lands Act). **Bocardo v Star Energy** states the English rule, not the Singapore one.']],
        ['The legal system points you keep losing', ['Only the **ratio** of a higher court in the same hierarchy binds; obiter dicta, and all English decisions, are persuasive. The Court of Appeal is the final court (Privy Council appeals ended in 1994). Civil claims are brought by the injured party and proved on a **balance of probabilities**; criminal cases are brought by the Public Prosecutor and proved **beyond reasonable doubt**. **Arbitration** is a private tribunal whose award binds; **mediation** is assisted negotiation that binds only once the parties sign a settlement.']]
      ],
      quotes: {
        'National Provincial Bank v Ainsworth': 'In **National Provincial Bank v Ainsworth** Lord Wilberforce held that a proprietary right must be definable, identifiable by third parties, capable of assumption by third parties and have some permanence. The right here [is / is not] proprietary because ...',
        'Bernstein v Skyviews': 'Under **Bernstein v Skyviews** an owner controls only the airspace needed for the ordinary use and enjoyment of the land, so a flight at a reasonable height is no trespass; here the [drone / aircraft] at [height] is [within / above] that zone.',
        'Kelsen v Imperial Tobacco': 'In **Kelsen v Imperial Tobacco** a sign projecting about 8 inches over the claimant\'s shop was a trespass and an injunction issued; a low intrusion such as [the signboard] is likewise a trespass.',
        'Anchor Brewhouse v Berkley House': 'In **Anchor Brewhouse v Berkley House** crane jibs swinging over neighbouring land were a trespass and an injunction was granted, which supports [the owner] against [the developer].',
        'Bocardo v Star Energy': '**Bocardo v Star Energy** treats deep drilling as trespass in England, but in Singapore s 3B State Lands Act limits subsoil ownership to the depth reasonably necessary or 30 m below the Singapore Height Datum.',
        'Holland v Hodgson': 'Under **Holland v Hodgson** the court asks the degree of annexation and the object of annexation; here [item] is [fixed / resting on its own weight] and its purpose is [to improve the land / for its own enjoyment].',
        "People's Park Chinatown v Chief Assessor": '**People\'s Park Chinatown v Chief Assessor** applied the Holland v Hodgson tests in Singapore [check facts], so the two-test approach governs [item] here.',
        'Elitestone v Morris': 'In **Elitestone v Morris** a bungalow resting on pillars without foundations was part and parcel of the land; where the item is the building itself, the two tests do not apply.',
        'Kiah bte Hanapiah v Sam': 'In **Kiah bte Hanapiah v Sam** a removable Malay stilt house was held to be a chattel on the strength of local custom, an exception to the rule in Elitestone.',
        "D'Eyncourt v Gregory": 'In **D\'Eyncourt v Gregory** statues resting on their own weight were fixtures because their purpose was to complete the design of the house; purpose outweighs weight, so [item] passes with the land.',
        'Botham v TSB': '**Botham v TSB** treated towel rails and soap dishes as chattels but items built into the structure as fixtures; [item] is closer to [which category].',
        'Fisher v Dixon': 'Under **Fisher v Dixon** and **Spyers v Phillipson** a tenant may remove trade, ornamental and domestic fixtures during the term or soon after, making good any damage.',
        'BP Refinery v Amazon': 'Items a tenant leaves behind after giving up possession belong to the landlord (**BP Refinery v Amazon** [check]), so [tenant] has lost the right to remove [items].',
        'Hobson v Gorringe': 'In **Hobson v Gorringe** an engine on hire-purchase that became a fixture passed to a mortgagee without notice; [financier] keeps only a personal claim against [hirer].'
      }
    },

    2: {
      diag: [
        'Lot 2 is a strength: you scored 100% on both the graded test and the checkpoint. Your few misses are at the edges. You treated specific performance as available "as of right" like damages. You hesitated on what a buyer owns between contract and completion. And you were unsure that mere knowledge of an unregistered interest is not fraud on registered land.',
        'You also took one question on the clean-hands maxim, which you have since fixed. The thread linking these misses is remedies and the Torrens twist, both of which reappear in Lots 8 and 9.'
      ],
      learn: [
        ['Why equity exists and how fusion works', ['The common law was rigid: no writ, no remedy, and the remedy was money. Petitions went to the Lord Chancellor, whose Court of Chancery decided by conscience. Where law and equity conflict, equity prevails (**Earl of Oxford\'s Case**). Singapore fused only the **administration** of law and equity (s 3 Civil Law Act): one court applies both, and the doctrines stay distinct.']],
        ['Legal rights bind everyone; equitable rights bind everyone except Equity\'s Darling', ['Equity\'s Darling is a bona fide purchaser of the **legal estate** for **value** **without notice** (actual, constructive or imputed). Four boxes: good faith, value (a gift is not value), the legal estate (a buyer with only a contract fails here), and no notice (**Pilcher v Rawlins** [check]).']],
        ['Damages are a right; equitable remedies are discretionary', ['Damages follow proof of breach, limited by remoteness (**Hadley v Baxendale**); a fixed sum is valid as liquidated damages only if it is a genuine pre-estimate, otherwise it is a void penalty (**Dunlop v New Garage**). Specific performance, injunctions, rescission and rectification are discretionary and can be refused for unclean hands, delay or where damages suffice. A buyer who refused to complete when the market fell and then demanded performance when it rose was refused for unclean hands (**Lee Christina v Lee Eunice**).']],
        ['Equity treats as done what ought to be done', ['Once there is a valid, specifically enforceable contract for the sale of land, the buyer owns the land in equity and the seller holds the legal title as a bare trustee until completion (conversion; **Lysaght v Edwards**). A written agreement for a lease is treated as the lease in equity if specific performance is available (**Walsh v Lonsdale**).']],
        ['The Torrens twist', ['On registered land the register replaces most of the notice inquiry. Knowing of an unregistered interest is not, of itself, fraud (s 47(2) LTA). An equitable owner such as Hana must protect herself by caveat, or prove actual dishonesty under s 46(2)(a), to defeat a registered buyer.']]
      ],
      quotes: {
        "Earl of Oxford's Case": 'Since the **Earl of Oxford\'s Case** (1615), where law and equity conflict, equity prevails; s 3 Civil Law Act keeps that rule while fusing only the administration of the two.',
        'Walsh v Lonsdale': 'Under **Walsh v Lonsdale** a specifically enforceable agreement for a lease is treated in equity as a lease, so [tenant] holds an equitable lease although no deed was executed.',
        'Hadley v Baxendale': 'Damages cover loss arising naturally from the breach or within both parties\' contemplation (**Hadley v Baxendale**), so [the head of loss] is [recoverable / too remote].',
        'Dunlop Pneumatic Tyre v New Garage': 'A fixed sum is enforceable only as a genuine pre-estimate of loss; one out of all proportion is a void penalty (**Dunlop v New Garage**; applied to default interest in **Hong Leong**).',
        'Pilcher v Rawlins': 'A bona fide purchaser of the legal estate for value without notice takes free of prior equitable interests (**Pilcher v Rawlins** [check]); [buyer] fails that test because [no legal estate / no value / notice].',
        'Tulk v Moxhay': 'In **Tulk v Moxhay** Chancery restrained a buyer who bought with notice of a promise to keep Leicester Square open: equity binds a purchaser with notice of a restrictive covenant.'
      }
    },

    3: {
      diag: [
        'You scored 80% on the Lot 3 graded test and your misses are narrow. One was a "NOT" question: you did not spot that a successor need not have *agreed* to be bound under **Tulk v Moxhay**. That is the whole point of the doctrine: equity binds him because buying with notice and ignoring the restriction is unconscionable.',
        'The other was the building scheme: forty houses sold by one developer with mutual covenants for every plot is the textbook scheme, not privity or Halsall v Brizell. You have since fixed the common-law burden question (it never passes).'
      ],
      learn: [
        ['Classify first: positive or negative, by what compliance costs', ['A covenant is positive if it requires action or money (to repair, maintain, pay) and negative if it restrains use (no business use, no building above two storeys). Look at substance, not wording: "not to allow the roof to fall into disrepair" is positive because complying costs money.']],
        ['Original parties: privity of contract settles it', ['Between the original covenantor and covenantee the covenant is a contract, and the covenantor stays liable after selling. A non-party cannot sue on it (**Tweddle v Atkinson**). In the Leong question, Mrs Leong v Gabby is decided on privity: no running rules are needed.']],
        ['Burden: never at law; negative only in equity', ['The burden does not run at common law (**Austerberry v Oldham**), and the House of Lords refused to change that for positive covenants (**Rhone v Stephens**). In equity a negative burden runs (**Tulk v Moxhay**) if the covenant is negative in substance, touches and concerns benefited land nearby, was intended to bind successors, and the successor has notice. On registered land, entry on the Certificate of Title gives notice. Remedy: injunction.']],
        ['Benefit: easier to pass', ['At law the benefit passes if the covenant touches and concerns the land, the covenantee held the legal estate, the parties intended it to pass and the claimant holds a legal estate (**Swift v Combined English Stores**). In equity it passes by annexation (**Federated Homes**, a statutory route in England [check Singapore equivalent]), express assignment, or a building scheme (**Elliston v Reacher**: common seller, plots laid out with common restrictions for the benefit of all, bought on that footing).']],
        ['Getting round the positive-burden rule', ['Sue the original covenantor and rely on a chain of indemnity covenants; use benefit and burden where the successor takes a linked benefit such as using the road he must pay for (**Halsall v Brizell**); or rely on statutory schemes such as strata management corporations.']]
      ],
      quotes: {
        'Tweddle v Atkinson': 'Only a party to a contract can enforce it (**Tweddle v Atkinson**), so between [covenantor] and [covenantee], the original parties, the covenant is enforced as a contract.',
        'Austerberry v Oldham Corporation': 'The burden of a positive covenant does not run at common law (**Austerberry v Oldham**), so [successor] is not bound by the promise to [repair / maintain].',
        'Rhone v Stephens': 'In **Rhone v Stephens** the House of Lords confirmed that a positive covenant to repair a roof did not bind a later owner and refused to change the rule; the [repair / maintenance] covenant here binds only [original covenantor].',
        'Tulk v Moxhay': 'Under **Tulk v Moxhay** the burden of a negative covenant runs in equity to a successor with notice who did not promise anything himself; covenant [(ii)] is negative, benefits [retained land] and is on the CT, so [successor] is bound.',
        'P&A Swift Investments v Combined English Stores': 'The benefit passes at law where the covenant touches and concerns the land (**P&A Swift v Combined English Stores**); [the covenant] relates to the use and value of [dominant land], not to the person.',
        'Federated Homes v Mill Lodge': 'In **Federated Homes v Mill Lodge** the benefit was annexed to the land by statute (English LPA s 78) [check Singapore equivalent], so it passes to each later owner of [dominant land].',
        'Halsall v Brizell': 'Under **Halsall v Brizell** a person who takes the benefit of a facility must bear the burden tied to it, so [successor], who uses [the road], must pay [the contribution].',
        'Elliston v Reacher': 'Where a common seller laid out an estate with mutual restrictions for the benefit of all plots, a building scheme lets any plot owner enforce them against any other (**Elliston v Reacher** [check slides]).'
      }
    },

    4: {
      diag: [
        'Your graded test was 80% but your checkpoint dipped to 60%. The misses all sit in the same corner: what binds a buyer. You missed twice that a contractual licence binds a buyer only if conscience requires a constructive trust (**Ashburn Anstalt**). In the garden question you misjudged statement (iv), that the right must not amount to exclusive possession (it is test 4 of Re Ellenborough Park, and it is true).',
        'You also missed the question about a house with a right of way that became two flats. **Graham v Philcox** says alteration ends or limits the easement only if it substantially increases the use.'
      ],
      learn: [
        ['The four tests, one fact per test', ['Under **Re Ellenborough Park**: (1) a dominant and a servient tenement; (2) the right accommodates the dominant land rather than benefiting a person or business (**Hill v Tupper** fails here); (3) different owners; (4) capable of forming the subject matter of a grant: definite, within the nature of easements, and no exclusive possession or ouster (**Copeland v Greenhalf**: storage; **Batchelor v Marlow**: all-day parking). In an answer give one fact for each test and name the weak one.']],
        ['Creation and ending', ['Easements are created expressly (deed, noted on the CT), by implication on a sale of part (necessity, common intention, **Wheeldon v Burrows**: continuous and apparent, necessary for reasonable enjoyment, in use), or in equity by a specifically enforceable agreement. They end by unity of ownership, release, abandonment, or an alteration of the dominant land that substantially increases the burden (**Graham v Philcox**).']],
        ['Support: land, then buildings', ['Every landowner has a natural right of support for land from adjoining soil, and a cause of action arises when damage happens (**Backhouse v Bonomi**). The English line protects buildings only through an easement of support acquired by long use (**Dalton v Angus**). In Singapore, **Xpress Print v Monocrafts** held that the neighbour owes a duty to support the claimant\'s property including buildings. Add negligence for a lack of monitoring. Printwell v Costco turns on this.']],
        ['A licence is permission, not property', ['A bare licence is revocable and binds nobody else (**Wood v Leadbitter**). A contractual licence is governed by its terms and may be enforced by injunction (**Winter Garden**; **Errington**). A licence by estoppel arises from a promise, reliance and detriment (**Inwards v Baker**). A licence binds a buyer only where the buyer\'s conscience is affected so that a constructive trust arises, for example where he agreed to honour it (**Ashburn Anstalt v Arnold**).']]
      ],
      quotes: {
        'Re Ellenborough Park': 'Under **Re Ellenborough Park** an easement needs a dominant and servient tenement, a right that accommodates the dominant land, different owners, and a right capable of grant; here [right] satisfies [tests] but [fails / passes] test [n] because ...',
        'Hill v Tupper': 'A right that benefits a person\'s business rather than the land is no easement (**Hill v Tupper**), so [right] fails the accommodation test.',
        'Copeland v Greenhalf': 'In **Copeland v Greenhalf** storing vehicles on a strip of land amounted to possession and could not be an easement; [storage right] likewise amounts to ouster.',
        'Batchelor v Marlow': 'In **Batchelor v Marlow** a right to park all day on weekdays left the owner with no reasonable use and was not an easement; [parking right] fails for the same reason, though a narrower right might pass.',
        'Phipps v Pears': 'There is no easement to be protected from the weather (**Phipps v Pears**); courts recognise new negative easements sparingly.',
        'Dyce v Hay': 'The categories of easement are not closed, but new ones are admitted with care (**Dyce v Hay**).',
        'Wheeldon v Burrows': 'On a sale of part, quasi-easements that are continuous and apparent, necessary for reasonable enjoyment and in use pass to the buyer (**Wheeldon v Burrows**), so [buyer] may claim [the right].',
        'Graham v Philcox': 'Under **Graham v Philcox** altering the dominant land ends or limits an easement only if it substantially increases the use, so converting [the house] into [flats] leaves the right of way intact unless use grows substantially.',
        'Backhouse v Bonomi': 'Support for land is a natural right, and the cause of action arises when damage occurs (**Backhouse v Bonomi**).',
        'Dalton v Angus': 'In England a building needs an easement of support acquired by long use (**Dalton v Angus**), but Singapore goes further in **Xpress Print**.',
        'Xpress Print v Monocrafts': 'In **Xpress Print v Monocrafts** the Court of Appeal held that a neighbour who removes soil without sufficient alternative support breaches a duty owed to the adjoining property, including its buildings; [Costco] breached that duty when ...',
        'Wood v Leadbitter': 'A bare licence that grants no interest is revocable, leaving a claim in damages at most (**Wood v Leadbitter**), so [licensee] cannot insist on staying.',
        'Inwards v Baker': 'Where the owner promised a right, the claimant relied on it and suffered detriment, equity may make the licence irrevocable (**Inwards v Baker**; and see **Errington v Errington** for a contractual licence that could not be revoked while the couple paid).',
        'Ashburn Anstalt v Arnold': 'A contractual licence is personal and binds a buyer only where his conscience is affected so that a constructive trust arises (**Ashburn Anstalt v Arnold**), for example if [buyer] agreed to honour it.'
      }
    },

    5: {
      diag: [
        'Mortgages went well: 90% on the graded test. Your two persistent misses are about who must prove what. Under **BOM v BOK** the borrower first shows an infirmity that the lender exploited, and only then does the burden shift to the lender to show the deal was fair. Keep it apart from the English "morally reprehensible" threshold in **Multiservice Bookbinding**, which is the trap option.',
        'In the Zen question you doubted that Zen\'s experience makes **Knightsbridge** relevant to a nine-year postponement. It does: sophisticated borrowers are held to long postponements. In Lightning you thought all three s 25 CLPA triggers must occur before sale. Any one of them makes the power exercisable; it is the three "arisen" conditions that are cumulative.'
      ],
      learn: [
        ['Start every clogs question with the borrower', ['Ask who the borrower is: an individual or a company, advised or not, vulnerable or not. Courts protect the vulnerable (**Hong Leong**: elderly illiterate sisters) and hold commercial parties to their bargain (**Knightsbridge**; **Fiscal Consultants**; **Citicorp v Wee Ah Kee** [check]). Then classify each term: postponement, option, collateral advantage, penalty. Then ask whether it makes redemption illusory or the bargain oppressive. Then give the remedy.']],
        ['The categories and their cases', ['**Postponement**: void if redemption becomes illusory (**Fairclough v Swan Brewery**), valid between commercial parties (**Knightsbridge**). **Option to buy** given to the lender as part of the deal: void (**Samuel v Jarrah Timber**; **Jones v Morgan** [check]). **Collateral advantage**: valid if it is a separate bargain that ends on redemption and is not unfair (**Kreglinger**); a long tie can fail as restraint of trade (**Esso v Harper\'s Garage**). **Default interest**: void as a penalty if out of all proportion to the greatest conceivable loss (**Hong Leong**: 18% against 5.5% to 6.75%; "industry practice" rejected). **Unconscionability** in Singapore: **BOM v BOK**.']],
        ['The lender\'s remedies, in order', ['A registered charge gives no inherent right to possession; after default the mortgagee may enter after one month\'s notice (s 75 LTA). The power of sale has **arisen** when all three conditions are met (mortgage by deed, money due, no exclusion) and becomes **exercisable** on any one s 25 CLPA trigger: (a) notice to pay and three months\' default, (b) interest one month in arrears, (c) breach of another term. Proceeds go to prior incumbrances, costs, the debt, later mortgagees, then the borrower (s 26(3) CLPA; s 74 LTA). Foreclosure needs a court order; the court may order sale instead (s 30 CLPA; **Palk**).']],
        ['The duty on sale', ['The mortgagee must act in good faith and take reasonable care to obtain the best price reasonably obtainable (**Cuckmere Brick**), but need not wait for a better market (**China & South Sea Bank**). A sale to its own subsidiary without advertising, at well below valuation, is the classic breach.']],
        ['A lease granted after the mortgage', ['A mortgagor in possession may grant an occupation lease of up to 3 years unless the deed excludes it (s 23 CLPA), and such a lease binds the mortgagee because it is authorised by law (s 89(1) LTA). Otherwise a later lease binds the bank only if the mortgage authorises it or the bank consents. A lease made before the mortgage binds the bank. Gabby\'s 24-month student lease is the exam example.']]
      ],
      quotes: {
        'Fairclough v Swan Brewery': 'In **Fairclough v Swan Brewery** a postponement until six weeks before a lease expired was void because redemption was illusory; here [postponement] [does / does not] leave [borrower] something worth redeeming.',
        'Knightsbridge Estates v Byrne': 'In **Knightsbridge Estates v Byrne** a 40-year postponement between commercial, advised parties was valid; [borrower], a [sophisticated investor], is held to [the lock-in].',
        'Fiscal Consultants v Asia Commercial Finance': '**Fiscal Consultants v Asia Commercial Finance** upheld an early redemption charge between commercial parties [check facts]; the charge here is valid unless wholly disproportionate.',
        'Esso Petroleum v Harper': 'In **Esso v Harper\'s Garage** a 21-year solus tie was an unreasonable restraint of trade and the linked postponement fell with it, while a 4.5-year tie stood.',
        'Samuel v Jarrah Timber': 'An option for the lender to buy the mortgaged property, granted as part of the loan, is void as a clog (**Samuel v Jarrah Timber**), so [lender] cannot exercise the option over [property].',
        'Jones v Morgan': 'A later option can still be treated as part of the original mortgage deal and fall as a clog (**Jones v Morgan** [check]).',
        'Citicorp v Wee Ah Kee': 'Between sophisticated commercial parties the clog rule has declining force (**Citicorp v Wee Ah Kee** [check]).',
        'Kreglinger v New Patagonia Meat': 'In **Kreglinger** a collateral option to buy sheepskins was valid because it was a separate bargain that did not stop redemption; [the tied insurance] is likewise valid unless unfair.',
        'Multiservice Bookbinding v Marden': 'English law strikes down a term only for morally reprehensible conduct (**Multiservice Bookbinding v Marden**), a higher bar than Singapore\'s test in **BOM v BOK**.',
        'BOM v BOK': 'Under **BOM v BOK** the claimant must show an infirmity that the other party exploited; the burden then shifts to that party to show the transaction was fair. [Borrower] [can / cannot] show such an infirmity because ...',
        'Hong Leong Finance v Tan Gin Huay': 'In **Hong Leong Finance v Tan Gin Huay** 18% default interest against contract rates of 5.5% to 6.75% was a penalty, out of all proportion to the lender\'s greatest conceivable loss, and "industry practice" was no answer; [rate] here is [higher / comparable].',
        'China & South Sea Bank v Tan Soon Gin': 'A mortgagee may choose when to sell and need not wait for a better market (**China & South Sea Bank v Tan Soon Gin**).',
        'Cuckmere Brick v Mutual Finance': 'Under **Cuckmere Brick v Mutual Finance** the mortgagee must take reasonable care to obtain the true market value; selling [without advertising / to its subsidiary] at [price] breaches that duty.',
        'Palk v Mortgage Services': 'In **Palk v Mortgage Services** the court ordered sale at the borrower\'s request in a falling market; s 30 CLPA gives [borrower] the same route.',
        'Tan Hin Choon v Ban Hin Lee Bank': 'A mortgagee in possession must account for the rents it receives and use due diligence (**Tan Hin Choon v Ban Hin Lee Bank**; **OUB v Chua Kok Kay** [check]), so [bank] may collect the students\' rent but must credit it to the debt.'
      }
    },

    6: {
      diag: [
        'Leases is where procedure tripped you. You missed the Gabby forfeiture question three times, so it is the single most repeated mistake in your record. Gabby must first find an express re-entry clause, because s 93 LTA implies one only for registered leases. Then, for a non-rent breach, she must serve a s 18 CLPA notice asking for a remedy. Changing the locks, or using the rent procedure in s 18A, is wrong. You also missed that s 18A lets a tenant in rent arrears pay the arrears and costs into court and keep the lease.',
        'Two combination misses were again on statement (iv). "A lease must be in writing whatever its length" is false. "A sublease of the whole remaining term takes effect as an assignment" is true (**Milmo v Carreras**). Your checkpoint and training scores here were both 60%, so this lot deserves a second pass.'
      ],
      learn: [
        ['Lease or licence: exclusive possession for a term at a rent', ['A lease needs exclusive possession, a term certain and (usually) rent, whatever the label (**Street v Mountford**, endorsed in Singapore in **Goh Cin Chye**). Sham clauses the parties never meant to operate are ignored (**Antoniades v Villiers**); separate agreements at different times give no joint tenancy (**AG Securities v Vaughan**). Retained keys do not by themselves defeat exclusive possession; ask why they were kept (**Aslan v Murphy** [check]). Services needing unrestricted access point to a licence (**Abbeyfield**; **Marchant v Charters**). Exceptions: no intention to create legal relations, family arrangements (**Errington**), service occupancy.']],
        ['Certainty of term', ['The maximum duration must be certain from the start. "For the duration of the war" (**Lace v Chantler**) and "until the land is required for road widening" (**Prudential**) are void as leases, though paying and accepting a yearly rent creates a yearly periodic tenancy. A fixed-term lease ends with its term; a notice to quit cannot end it early unless there is a break clause.']],
        ['Formalities', ['A legal lease needs a deed (s 53(1) CLPA), except a lease of 7 years or less at a rack rent. A lease over 7 years of registered land must be registered (s 87 LTA). A contract for a lease must be in signed writing to be enforced (s 6(d) Civil Law Act). A defective lease can still be an equitable lease under **Walsh v Lonsdale**, but an equitable lease must be caveated to survive a registered buyer.']],
        ['Who can sue whom after assignment', ['The original landlord and tenant stay bound in **privity of contract** for the whole term (**City of London v Fell**). The current landlord and the current tenant are bound in **privity of estate** by covenants that touch and concern the land (**Spencer\'s Case**; s 10 and s 11 CLPA pass them with the reversion). A "sublease" for the whole remaining term is an assignment (**Milmo v Carreras**). Whenever you write privity of estate, add privity of contract.']],
        ['Quiet enjoyment and the tenant\'s self-help', ['The landlord impliedly covenants not to interfere substantially with the tenant\'s possession or derogate from the grant, judged by what both contemplated at the grant. The landlord does not underwrite profitability, the tenant takes the premises as found (caveat lessee), and a clause barring set-off works (**OUE v Three Sixty**). A tenant who withholds rent under a no-set-off lease is in breach: pay, then sue for damages. Making a business slightly costlier is no derogation (**Cold Storage**).']],
        ['Forfeiture in three steps', ['(1) A right to forfeit: an express re-entry clause, or s 93 LTA for a registered lease. (2) Procedure: s 18 CLPA for non-rent breaches (a notice stating the breach, asking for a remedy if it is capable of remedy, and for compensation; the tenant may seek relief), s 18A for rent (the tenant may pay arrears and costs into court and keep the lease). (3) Waiver: accepting rent with knowledge of the breach waives forfeiture for that breach (**Expert Clothing** [check holding]). For rent also consider distress under the Distress Act (up to 12 months\' rent).']]
      ],
      quotes: {
        'Street v Mountford': 'In **Street v Mountford** the House of Lords held that exclusive possession for a term at a rent creates a tenancy whatever the label ("a fork is a fork"); [occupier] has exclusive possession of [rooms] for [term] at [rent], so this is a lease.',
        'Goh Cin Chye v Peck Teck Kian Realty': 'Singapore follows **Street v Mountford** (**Goh Cin Chye v Peck Teck Kian Realty** [check facts]).',
        'Errington v Errington': 'A family arrangement can be a contractual licence rather than a tenancy (**Errington v Errington**).',
        'Antoniades v Villiers': 'A clause the parties never intended to operate is a sham and is ignored (**Antoniades v Villiers**), while separate agreements made at different times give no joint tenancy (**AG Securities v Vaughan**).',
        'Aslan v Murphy': 'Retained keys do not by themselves negate exclusive possession; the question is why they were kept (**Aslan v Murphy** [check]).',
        'Abbeyfield v Woods': 'Where the owner provides services that require unrestricted access, the occupier is a lodger with a licence (**Abbeyfield v Woods**; **Marchant v Charters**).',
        'Lace v Chantler': 'A lease must have a term certain from the start; a lease "for the duration of the war" was void (**Lace v Chantler**).',
        'Prudential Assurance v London Residuary': 'A lease until the land is needed for road widening is void for uncertainty, although rent paid and accepted creates a yearly tenancy (**Prudential Assurance v London Residuary**).',
        'City of London Corporation v Fell': 'The original tenant remains liable in privity of contract for the whole contractual term (**City of London v Fell**), so [landlord] can also sue [original tenant] for [assignee]\'s rent.',
        "Spencer's Case": 'Under **Spencer\'s Case** covenants that touch and concern the land bind an assignee in privity of estate, so [landlord] can sue [assignee] on the rent covenant.',
        'Milmo v Carreras': 'A sublease that covers the whole of the sublessor\'s remaining term takes effect as an assignment (**Milmo v Carreras**).',
        'Cold Storage v MCST Chancery Court': 'An act that merely makes the tenant\'s business more costly is no derogation from grant (**Cold Storage v MCST Chancery Court**).',
        'OUE v Three Sixty Degree': 'In **OUE v Three Sixty Degree** the Court of Appeal read the lease as a commercial contract: a clause barring set-off was effective, the landlord did not underwrite profitability and the tenant took the premises as found, so withholding rent justified re-entry.',
        'Expert Clothing v Hillgate House': 'Accepting rent with knowledge of a breach waives the right to forfeit for that breach (**Expert Clothing v Hillgate House** [check holding]).',
        'Winter Garden Theatre v Millennium': 'A contractual licence is not revocable at will and may be protected by injunction (**Winter Garden Theatre v Millennium**; **Hurst v Picture Theatres**).',
        'Co-operative Insurance v Argyll Stores': 'The court will not order a tenant to keep trading (**Co-operative Insurance v Argyll Stores**); the landlord\'s remedy is damages.'
      }
    },

    7: {
      diag: [
        'This is your weakest lot. Thirteen MCQs are recorded as missed, all of them still open, and your first graded test here is recorded at 0% before you recovered to 90%. Your misses cover almost every step of the co-ownership story, which tells you the steps are not yet in a fixed order in your head.',
        'You reversed the burden of proving a resulting trust: you missed the practice paper\'s Question 1 twice, and in Lightning you rejected the statement that the payer must prove the trust. You missed that the first step is to look for actual intention, before any presumption (Mdm Wee). You placed Patricia Khoo\'s scenario 2 wrongly. You were unsure that unequal contributions produce a 90:10 resulting trust and end survivorship (Ken and Lily). You doubted that business partners hold as tenants in common in equity, and that sale in lieu of partition weighs the relationship, the use and the prejudice.',
        'You also missed the formality for an express trust of land (signed writing), the four unities, and the point that a Will cannot sever. The two Lightning misses (who proves the trust; when statutory severance takes effect) you have since fixed. Treat the sequence in the learning points as a script and write it out from memory twice before the exam.'
      ],
      learn: [
        ['Step 1: how is the legal title held?', ['Co-owners named in an instrument hold as **joint tenants** unless it describes them as tenants in common (s 53(1) LTA); words such as "in equal shares" create a tenancy in common. A joint tenancy needs the four unities: **possession, interest, title and time** (PITT). A tenancy in common needs only unity of possession. On a joint tenant\'s death the interest vanishes and the survivors take the whole (**Shafeeg v Fatimah** [check facts]); a Will cannot pass it because survivorship operates first.']],
        ['Step 2: who owns the benefit? Actual intention first', ['Singapore asks first for the transferor\'s actual intention at the time of the transfer: a gift, an express trust, a sale (**Goh Swee Fang**; **Sitiawah Bee**). Presumptions are a last resort (**Patricia Khoo v Khoo Gaik Pin**). For gratuitous joint names Patricia Khoo gives four scenarios: (1) immediate benefit intended, so a joint tenancy in equity; (2) B to take what is left on A\'s death, so a resulting trust for A until death; (3) no benefit intended, so a resulting trust; (4) evidence unclear, so the presumptions. The newest authority puts the transferor\'s intention first again (**Wong Mei Lee Millie v Jake Ngor** [2026] SGCA 27).']],
        ['Step 3: the presumptions, and who carries the burden', ['A person who pays for property put in another\'s name is presumed not to intend a gift, so a resulting trust arises (**Dyer v Dyer**; **Westdeutsche**). The **legal burden lies on the person asserting the trust**: the payer must prove it (**Lau Siew Kim**). Its extent is fixed by contributions at acquisition; mortgage repayments count only if the parties\' plan treated them as contributions (**Chan Yuen Lan**). The presumption of advancement (parent to child, husband to wife) can rebut it, and its strength depends on the relationship at the time of the transfer (**Lau Siew Kim**). A later quarrel carries little weight. The older rule gives no presumption of advancement between unmarried partners. A proven common intention at acquisition can override the presumed shares (**Chan Yuen Lan**; **DOP v DOO**: 83.7:16.3 contributions, equal shares).']],
        ['Express trusts of land need writing; implied trusts do not', ['A declaration of trust of land must be in signed writing (s 7 Civil Law Act [check]); resulting and constructive trusts are exempt. A sister claiming an oral declaration must therefore argue a resulting or constructive trust instead.']],
        ['Step 4: severance, and what does not sever', ['**Statute**: (1) a declaration in the approved form, (2) served on every other joint tenant, (3) registered (s 53(5), (6) LTA). Severance takes effect only on registration (**Chan Lung Kien v Chan Shwe Ching** [2018], overruling **Diaz v Diaz**). **Equity** (**Williams v Hensman**): acting on one\'s own share (sale, mortgage, lease, a specifically enforceable contract, a writ of seizure and sale), mutual agreement, or a mutual course of dealing. **By law**: bankruptcy, unlawful killing (**Re K**), a divorce judgment. **Does not sever**: a Will, a unilateral oral statement, failed negotiations (**Burgess v Rawnsley**). Equity also treats business partners as tenants in common: survivorship has no place in business (**Malayan Credit v Jack Chia-MPH**).']],
        ['Ending co-ownership, and divorce', ['Co-ownership ends by survivorship, joint sale, partition or sale in lieu of partition. The court orders sale where it is necessary or expedient, weighing the relationship, the state and use of the property and the prejudice to each owner (**Abu Bakar v Jawahir**; **Chiam Heng Luan** [check each]). An occupier can offer to buy the other out. On divorce, s 112 Women\'s Charter divides matrimonial assets; it is for spouses only, so unmarried partners must use trust law.']]
      ],
      quotes: {
        'Shafeeg v Fatimah': 'On the death of a joint tenant the interest passes by survivorship and does not pass under the Will (**Shafeeg v Fatimah** [check facts]), so [deceased]\'s Will leaving "all my property" passes nothing in [the property].',
        'Diaz v Diaz': 'Statutory severance needs a declaration in the approved form, service on every joint tenant and registration, and takes effect only on registration (**Chan Lung Kien v Chan Shwe Ching** [2018], overruling **Diaz v Diaz**); [co-owner] died before registration, so the joint tenancy was not severed.',
        'Williams v Hensman': 'Under **Williams v Hensman** a joint tenancy is severed in equity by acting on one\'s own share, by mutual agreement or by a mutual course of dealing; [act] here [is / is not] such an act.',
        'Burgess v Rawnsley': 'Negotiations that never produce a concluded agreement do not sever (**Burgess v Rawnsley**).',
        'Re K': 'A person who unlawfully kills a co-owner cannot benefit by survivorship: the killing severs the joint tenancy (**Re K**).',
        'Malayan Credit v Jack Chia-MPH': 'Equity treats business partners registered as joint tenants as tenants in common because "the right of survivorship has no place in business" (**Malayan Credit v Jack Chia-MPH**).',
        'Dyer v Dyer': 'Under **Dyer v Dyer** the trust of a legal estate results to the person who advances the purchase money, so [payer] is presumed to keep the beneficial interest.',
        'Goh Swee Fang v Tiah Juah Kim': 'The court first looks for the transferor\'s actual intention, and applies the presumptions only if none can be found (**Goh Swee Fang v Tiah Juah Kim**; **Sitiawah Bee v Rosiyah**).',
        'Westdeutsche Landesbank v Islington LBC': 'Lord Browne-Wilkinson\'s statement in **Westdeutsche Landesbank v Islington** explains the presumed resulting trust where a person pays for property vested in another or in joint names.',
        'Pettitt v Pettitt': 'The presumption of advancement carries little weight today (**Pettitt v Pettitt**, Lord Diplock).',
        'Lau Siew Kim v Yeo Guan Chye Terence': 'In **Lau Siew Kim v Yeo Guan Chye Terence** the Court of Appeal held that the person asserting a resulting trust bears the burden of proving it, that its extent is fixed at acquisition, and that the strength of the presumption of advancement depends on the relationship at the time of the transfer.',
        'Chan Yuen Lan v See Fong Mun': 'Under **Chan Yuen Lan v See Fong Mun** unequal contributions give a presumed resulting trust in those proportions unless a common intention shows otherwise, and mortgage repayments count only if the parties\' plan treated them as contributions.',
        'Patricia Khoo v Khoo Gaik Pin': 'Under **Patricia Khoo v Khoo Gaik Pin** presumptions are a last resort; on gratuitous joint names the court asks whether an immediate benefit, a benefit on death, or no benefit was intended. The text "[words]" points to scenario [1 / 2 / 3].',
        'Wong Mei Lee Millie v Jake Ngor': 'The Court of Appeal in **Wong Mei Lee Millie v Jake Ngor** [2026] SGCA 27 put the transferor\'s intention first: where the registration was intended, there is no resulting trust.',
        'DOP v DOO': 'Unequal contributions do not decide the shares where a common intention at acquisition is proved (**DOP v DOO** [2025]: 83.7:16.3 contributions, held equally).'
      }
    },

    8: {
      diag: [
        'Sale and purchase is solid: 90% on the graded test. Your checkpoint was 60%, though, and two points keep slipping. On the OTP you twice judged false the statement that stamp duty on an exercised OTP is payable within 14 days. It is true, and it is one of the numbers that appear in MCQs.',
        'You also missed the requisitions question, where the reply revealed that 25% of the frontage might be acquired. "Subject to satisfactory replies to requisitions" gives the buyer a conditional exit, and a loss of that size is something a reasonable buyer would find unsatisfactory.'
      ],
      learn: [
        ['Formation: offer, acceptance, intention', ['A quoted price is an invitation to treat (**Harvey v Facey**); a counter-offer kills the offer (**Hyde v Wrench**); acceptance must mirror the offer (**Neale v Merrett**); family promises lack intention to create legal relations (**Balfour v Balfour**).']],
        ['"Subject to contract": state both Court of Appeal cases, then choose', ['The phrase is not conclusive, but it creates a strong presumption that the parties do not intend to be bound until a formal contract, and only strong context rebuts it (**Norwest Holdings v Newport Mining** [2011] SGCA 42). The court looks at all the circumstances and the objective evidence, and can find a binding contract despite the label (**OCBC Capital Investment v Wong Hua Choon** [2012] SGCA 54). The old strict view is **Tai Tong Realty v Galstaun**. Repeated labels, a promised OTP and no signed paper point to no contract (the Punggol facts).']],
        ['Writing and part performance', ['No action on a contract for the sale of land unless it, or a memorandum of it, is in writing and signed by the party sued (s 6(d) Civil Law Act; your slide cites s 6A(d) [check]). Emails can satisfy it and a typed name can be a signature (**Joseph Mathew**; **SM Integrated Transware**). Part performance can save an oral contract if the claimant\'s acts are unequivocally referable to it (**Maddison v Alderson**; **Hu Lee Impex**).']],
        ['The option to purchase', ['To the buyer an OTP is an irrevocable offer, and the seller cannot withdraw during the option period; the contract arises on exercise (**Spiro v Glencrown**). Exercise must follow the OTP strictly, in manner and time (**JT Chanrai**: missing the step to sign the formal agreement cost the 10% deposit). A deposit of about 10% is earnest money and can be forfeited (**Linggi Plantations**). Stamp duty on an exercised OTP is payable within 14 days. An option fee is paid against a signed OTP; a "goodwill deposit" is not one.']],
        ['Remedies, conversion and misrepresentation', ['After a valid contract the buyer is owner in equity and bears the risk (**Lysaght v Edwards**). Specific performance is the usual remedy for land, but it is discretionary (**EC Investment v Ridout Residence**) and can be refused for unclean hands (**Lee Christina**). Misrepresentation: an untrue statement of fact that induced the contract; fraudulent (**Derry v Peek**), negligent (s 2(1) Misrepresentation Act), innocent (s 2(2)). Requisitions: "subject to satisfactory replies" gives a conditional exit (**Chu Yik Man**; **Sheriffa** [check holdings]).']]
      ],
      quotes: {
        'Harvey v Facey': 'A reply stating a price is an invitation to treat, not an offer (**Harvey v Facey**).',
        'Hyde v Wrench': 'A counter-offer rejects and ends the original offer (**Hyde v Wrench**).',
        'Neale v Merrett': 'An acceptance that changes the terms is no acceptance (**Neale v Merrett**).',
        'Balfour v Balfour': 'Domestic arrangements are presumed not to be intended as contracts (**Balfour v Balfour**).',
        'Spiro v Glencrown Properties': 'An OTP is an irrevocable offer that the seller cannot withdraw during the option period, and the contract arises when the buyer exercises it (**Spiro v Glencrown**); [buyer] exercised on [date], so a contract arose then.',
        'JT Chanrai v Consolidated Hotels': 'Exercise must comply strictly with the OTP: in **JT Chanrai v Consolidated Hotels** the buyer who failed to sign the formal agreement in time lost the 10% deposit.',
        'Linggi Plantations v Jagatheesan': 'A deposit of about 10% is earnest money that can be forfeited on default (**Linggi Plantations v Jagatheesan**); a larger sum risks being a penalty.',
        'Lysaght v Edwards': 'Once there is a valid contract the buyer is owner in equity and the seller a bare trustee (**Lysaght v Edwards**).',
        'Tai Tong Realty v Galstaun': 'The older strict view treated "subject to contract" as conclusive (**Tai Tong Realty v Galstaun**), but Singapore now looks at all the circumstances.',
        'Norwest Holdings v Newport Mining': 'In **Norwest Holdings v Newport Mining** [2011] SGCA 42 the Court of Appeal held that "subject to contract" creates a strong presumption that the parties do not intend to be bound until a formal contract is made, rebutted only by strong context; here [the repeated label / promised OTP] supports that presumption.',
        'OCBC Capital Investment Asia v Wong Hua Choon': 'In **OCBC Capital Investment v Wong Hua Choon** [2012] SGCA 54 the Court of Appeal found a binding oral contract despite the label, looking at all the circumstances; unlike that case, [facts] here point [towards / away from] an intention to be bound.',
        'RTS Flexible Systems v Molkerei': 'A contract can be inferred from conduct even under a "subject to contract" letter (**RTS Flexible Systems v Molkerei Müller**).',
        'Joseph Mathew v Singh Chiranjeev': 'Emails can satisfy s 6(d) and a typed name can be a signature (**Joseph Mathew v Singh Chiranjeev**; **SM Integrated Transware v Schenker**); WhatsApp messages arguably follow [check].',
        'Maddison v Alderson': 'Part performance requires acts by the claimant that are unequivocally referable to the contract (**Maddison v Alderson**; **Hu Lee Impex v Lim Aik Seng**); [paying a deposit / renovating with the owner\'s knowledge] [is / is not] enough.',
        'Lee Christina v Lee Eunice': 'Specific performance was refused to a buyer who rejected the title and then sought to enforce when the market rose (**Lee Christina v Lee Eunice**: unclean hands).',
        'EC Investment Holding v Ridout Residence': 'Specific performance is not automatic: the court considers the adequacy of damages, hardship and conduct (**EC Investment Holding v Ridout Residence**).',
        'Derry v Peek': 'Fraud requires a false statement made knowingly, without belief in its truth, or recklessly (**Derry v Peek**).'
      }
    },

    9: {
      diag: [
        'Torrens is mostly secure: 94% in training and 80% on the graded test. Your misses are on the safety nets around indefeasibility. You missed the Assurance Fund question: the Fund pays only for loss caused by the Registrar\'s or staff\'s omission, mistake or misfeasance, and a stranger\'s forgery alone does not trigger it. You missed twice that s 160(2) bars rectification against a proprietor in possession unless he was party or privy to the fraud, omission or mistake.',
        'In the caveats combination you misjudged three of the four statements. That suggests the caveat sections are not yet memorised as a list: s 115 (an existing interest), Salbiah (no bare money claim), s 121 (five years), s 128 (compensation). You have since fixed the ABSD question, the practice paper\'s Question 4: the higher rate applies.'
      ],
      learn: [
        ['Registration is the source of title', ['An unregistered instrument passes no estate (s 45 LTA). A person who becomes registered proprietor holds free of unregistered interests, subject to overriding interests and the s 46(2) exceptions (s 46(1)). Singapore follows **immediate indefeasibility** (**Frazer v Walker**): even a forged instrument gives a good title to an innocent registered purchaser. Compare the older deferred view (**Gibbs v Messer**) and the root of title (**Breskvar v Wall**).']],
        ['Fraud means actual dishonesty by the proprietor or his agent', ['s 46(2)(a): title is defeasible for fraud or forgery to which the proprietor or his agent was a party. Fraud means actual dishonesty, not carelessness (**Assets Co v Mere Roihi**); deliberately shutting one\'s eyes after suspicion is aroused counts (**Waimiha**); a clerk\'s carelessness is not wilful blindness, and a third party\'s fraud does not count (**UOB v Bebe**). Knowledge of an unregistered interest is not of itself fraud (s 47(2); **Bahr v Nicolay**), but a promise never meant to be kept is (**Loke Yew**; contrast **Ho Kon Kim**). Only a **purchaser** (good faith and value, s 4) is protected; a donee takes no better title than his transferor (s 46(3); **Chan Wai Leen**).']],
        ['The safety nets, and their limits', ['**Rectification** (s 160): the court may correct the register for fraud, omission or mistake, but not against a proprietor in possession unless he was party or privy to it (s 160(2)). **Assurance Fund** (ss 151, 155): compensation for loss caused by the Registrar\'s or staff\'s omission, mistake or misfeasance; in **Bebe** staff failed to notice a cancelled CT. A forger acting alone does not trigger it. The owner can always sue the wrongdoer.']],
        ['Caveats, section by section', ['**s 115**: any person claiming an interest in land may lodge a caveat; the interest must exist when it is lodged (**Asiatic Enterprises**), and a bare contractual right to money is not enough (**Salbiah v Micro Credit**). **s 119**: effective from lodgment, blocking conflicting dealings. **s 120**: 30 days to get a court order once a dealing is lodged. **s 121**: lapses after 5 years. **s 124**: undertaking or security. **s 127**: removal; open with s 127(1) (any reason, caveator shows cause) or s 127(2) (vexatious, frivolous or not in good faith) and say why. Disputed facts go to **American Cyanamid**: a serious question, then the balance of convenience (**Eng Mee Yong**). **s 128**: compensation for a caveat lodged wrongfully or without reasonable cause.']],
        ['Stamp duty and ABSD', ['Stamp duty on an exercised OTP is payable within 14 days. ABSD (slide figures; confirm current IRAS rates): citizens 0% / 20% / 30%, PRs 5% / 30% / 35%, foreigners 60%. For joint buyers of different profiles the **higher** rate applies to the whole purchase; rates are never averaged. SSD: 12%, 8%, 4%, then nil.']]
      ],
      quotes: {
        'Gibbs v Messer': '**Gibbs v Messer** reflected the older deferred view, under which a forged instrument gave no good root [check facts]; Singapore instead follows Frazer v Walker.',
        'Frazer v Walker': 'Singapore follows immediate indefeasibility (**Frazer v Walker**): a registered purchaser takes a good title even under a forged instrument, so [innocent proprietor]\'s title is indefeasible.',
        'Breskvar v Wall': 'Registration is the source of title, not merely a record of it (**Breskvar v Wall**; s 45 LTA).',
        'Assets Co v Mere Roihi': 'Fraud under s 46(2)(a) means actual dishonesty, not negligence (**Assets Co v Mere Roihi**).',
        'Waimiha Sawmilling v Waione Timber': 'Deliberately shutting one\'s eyes to avoid learning the truth is dishonesty (**Waimiha Sawmilling v Waione Timber**); [proprietor], warned that [facts], chose not to inquire.',
        'UOB v Bebe bte Mohammad': 'In **UOB v Bebe bte Mohammad** [2006] SGCA 30 the Court of Appeal held that fraud must be the registered proprietor\'s own actual dishonesty or his agent\'s; a third party\'s fraud does not count and a clerk\'s carelessness is not wilful blindness, so [bank]\'s mortgage stands.',
        'Loke Yew v Port Swettenham': 'A promise to honour an interest made with no intention of keeping it is actual fraud (**Loke Yew v Port Swettenham**).',
        'Bahr v Nicolay': 'Registering with notice of an unregistered interest is not of itself fraud (**Bahr v Nicolay**; s 47(2) LTA).',
        'Ho Kon Kim v Lim Gek Kim Betsy': 'A later broken promise is not fraud unless the proprietor never meant to keep it (**Ho Kon Kim v Lim Gek Kim Betsy**).',
        'Mahidon Nichiar v Dawood': 'Only a purchaser for value in good faith is protected: a donee or a mistaken transferee takes no better title than his transferor (s 46(3); **Mahidon Nichiar v Dawood**; **Chan Wai Leen v Ho Dat Khoon** [2024]).',
        'Salbiah v Micro Credit': 'A bare contractual right to receive money is not a caveatable interest (**Salbiah v Micro Credit**), so [claimant]\'s caveat should be removed.',
        'Asiatic Enterprises v UOB': 'The caveator\'s interest must exist when the caveat is lodged (**Asiatic Enterprises v UOB**).',
        'Eng Mee Yong v Letchumanan': 'On a removal application the court asks whether there is a serious question to be tried and then weighs the balance of convenience; vague or contradictory claims fail (**Eng Mee Yong v Letchumanan**, applying **American Cyanamid**).',
        'Tan Soo Leng David': 'Compensation under s 128 needs a caveat lodged wrongfully or without reasonable cause and a foreseeable loss (**Tan Soo Leng David**; **Ho Soo Fong v Standard Chartered**).'
      }
    },

    10: {
      diag: [
        'Agency is the lot that collapses under pressure. Your checkpoint score was 20%, the lowest you recorded anywhere, and seven MCQs are missed. The misses split three ways.',
        'Remedies: a bribe is held on constructive trust and the dishonest agent forfeits commission (**FHR**; **Andrews v Ramsay**), and Hippisley protects only an honest agent. Authority: ratification relates back to the time of the act; promoters are personally liable for a company not yet formed (**Kelner v Baxter**); a Lasting Power of Attorney survives incapacity. Conflicts: acting for both sides and taking two commissions without consent is a breach.',
        'In Lightning you also thought effective cause decides commission under the CEA exclusive form. It does not: Clause 6 makes commission payable on any binding sale within the validity period.'
      ],
      learn: [
        ['Two relationships: principal and agent, principal and third party', ['An agent acts for a principal and can bind him to third parties. Agency arises expressly or by conduct. Ratification adopts an unauthorised act and **relates back** to when it was done (**Bolton v Lambert**; **Fitzmaurice v Bayley** [check]), but a company cannot ratify a contract made before it existed, so the promoters are liable (**Kelner v Baxter**). Agency ends by agreement, performance, revocation, death, insolvency or loss of capacity; a **Lasting Power of Attorney** is designed to survive incapacity.']],
        ['Authority: actual, then apparent', ['Actual authority is what the principal expressly or impliedly allowed. Apparent authority arises from a representation by the principal, reliance by the third party, and authority the principal could have given (**Freeman & Lockyer**); an agent cannot create his own apparent authority (**Armagas v Mundogas**). An agent who claims authority he lacks is liable for breach of warranty of authority (**Collen v Wright**). An estate agent\'s listing statements are usually within authority, so the seller is bound by them.']],
        ['The agent is a fiduciary', ['Duties: obey lawful instructions, use reasonable care and skill, act in good faith, disclose material information and every offer, avoid conflicts, make no secret profit, and do not deal with the principal\'s property for oneself or a connected person without full disclosure and consent (**McPherson v Watt**). A trade custom unknown to the principal is no defence (**Hippisley v Knee Bros**; the KFM question).']],
        ['Remedies for secret profits and bribes: list them', ['(1) **Account** for the profit. (2) **Constructive trust**: a bribe or secret commission is held on trust for the principal, who can claim it and what it bought (**FHR v Cedar Capital**; **AG for Hong Kong v Reid**). (3) **Rescind** the contract with the third party who paid the bribe. (4) **Forfeit commission** where the agent acted dishonestly (**Andrews v Ramsay**); an honest agent who took undisclosed discounts accounts for them but keeps his commission (**Hippisley**). (5) **Damages** for loss. Then say which fit the facts, and add a CEA complaint in one line.']],
        ['Commission: read the agreement first', ['Under the CEA **exclusive** form (up to 3 months, with a 3-month tail), Clause 6 makes commission payable on any binding sale in the validity period, whoever found the buyer; effective cause is irrelevant. Under a **non-exclusive** arrangement the agent must be the effective cause (**Grandhome v Ng Kok Eng**): commission promised, agent engendered the buyer\'s interest, offer conveyed, sale to the same buyer at about the same price within a short time. Then test for a break in the chain: a time gap, a price change, someone else persuading the buyer. A commission-only agent earns nothing unless the sale happens (**Luxor v Cooper**). The CEA rules also ban taking commission from both sides without consent.']]
      ],
      quotes: {
        'Freeman & Lockyer v Buckhurst Park Properties': 'Apparent authority arises from the principal\'s representation, the third party\'s reliance and authority the principal could have given (**Freeman & Lockyer v Buckhurst Park**), so [principal] is bound by [agent]\'s [act].',
        'Armagas v Mundogas': 'An agent cannot create his own apparent authority; the representation must come from the principal (**Armagas v Mundogas**).',
        'Kelner v Baxter': 'Promoters who contract for a company not yet incorporated are personally liable, and the company cannot later ratify (**Kelner v Baxter**).',
        'Collen v Wright': 'An agent who claims authority he does not have is liable for breach of warranty of authority (**Collen v Wright**).',
        'Bolton v Lambert': 'Ratification relates back to the time of the unauthorised act (**Bolton v Lambert**; **Fitzmaurice v Bayley** [check]), so [owner] is bound by the OTP as if authorised when it was granted.',
        'Hippisley v Knee Brothers': 'In **Hippisley v Knee Brothers** an agent who kept trade discounts had to account for them, since a custom unknown to the principal is no defence, but kept his commission because he acted honestly; [agent] must likewise account for [discount].',
        'Andrews v Ramsay': 'An agent who takes a secret commission from the other side must account for it and forfeits his own commission (**Andrews v Ramsay** [check exact holding]).',
        'McPherson v Watt': 'An agent may not sell to himself or a connected person without full disclosure and consent (**McPherson v Watt**), so [agent]\'s failure to disclose that [buyer] is his [relative] is a breach.',
        'Attorney General for Hong Kong v Reid': 'A bribe is held on constructive trust for the principal, who may claim the property bought with it and its increase in value (**AG for Hong Kong v Reid**).',
        'FHR European Ventures v Cedar Capital Partners': 'In **FHR European Ventures v Cedar Capital** [2014] UKSC 45 a secret commission received by an agent was held on constructive trust for the principal; [agent] holds the [$ amount] on trust for [principal] [check Singapore adoption].',
        'Luxor (Eastbourne) v Cooper': 'A commission-only agent earns nothing unless the sale actually takes place (**Luxor v Cooper**).',
        'Grandhome v Ng Kok Eng': 'Under **Grandhome v Ng Kok Eng** a non-exclusive agent earns commission only as the effective cause of the sale; [agent] engendered the buyer\'s interest and conveyed the offer, but [time gap / price change / another agent] [breaks / does not break] the chain.'
      }
    }
  },

  rules: [
    'Write T or F beside every statement in a combination question before you look at the options. Judge (iv) on its own merits.',
    'When an option says "always", "never" or "every", find the fact in the question that is there to defeat it.',
    'Lord Wilberforce\'s four features: definable, identifiable, capable of assumption, permanence. Never registration.',
    'Resulting trust: the person who asserts it proves it. Actual intention first, presumptions last.',
    'Severance: declare, serve, register. Nothing severs until registration. A Will never severs.',
    'Forfeiture: right to forfeit (express clause unless registered), then s 18 or s 18A, then waiver.',
    'Power of sale: all three conditions to arise, any one s 25 trigger to exercise.',
    'Torrens: whose fraud? the proprietor\'s or his agent\'s. Rectification never against an innocent proprietor in possession. The Assurance Fund needs Registry error.',
    'Agency: list the five bribe remedies; exclusive form = Clause 6, not effective cause; ratification relates back.',
    'Section B: every named party gets a conclusion, every authority is bolded, every issue is its own ILAC block.'
  ],

  numbers: [
    ['Subsoil depth if the title is silent', '30 m below the Singapore Height Datum (s 3B State Lands Act)'],
    ['Lease needing no deed', '7 years or less at a rack rent (s 53(1) CLPA)'],
    ['Lease that must be registered', 'Over 7 years (s 87 LTA)'],
    ['Mortgagor\'s lease binding the bank', 'Up to 3 years (s 23 CLPA; s 89(1) LTA)'],
    ['Mortgagee entry', 'After one month\'s notice (s 75 LTA)'],
    ['Power of sale exercisable', 'Interest 1 month in arrears; or notice plus 3 months\' default; or another breach (s 25 CLPA)'],
    ['s 18A possession order for rent', 'At least 4 weeks'],
    ['Distress', 'Up to 12 months\' rent'],
    ['OTP deposit / option fee', 'About 10% / about 1%'],
    ['Stamp duty on exercised OTP', 'Within 14 days'],
    ['Caveat lapse / notice after dealing', '5 years (s 121) / 30 days (s 120)'],
    ['ABSD (slide figures)', 'Citizen 0/20/30%; PR 5/30/35%; foreigner 60%; mixed buyers: higher rate'],
    ['Exclusive agency', 'Up to 3 months, with a 3-month tail'],
    ['AML records', 'At least 5 years']
  ],

  closing: [
    'You are closer than your weakest scores suggest. Most of what you got wrong is a definition stated loosely, an exception missed, or a statement read through the lens of the options. Those are the cheapest marks to win back. Spend the most time on Lot 7, then Lots 10 and 6, and sit one timed 40-mark case study using the companion paper before the exam.'
  ]
};
