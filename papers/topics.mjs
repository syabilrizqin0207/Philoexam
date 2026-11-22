// Paper 2, Part B: every Section B topic with a sample question and a full model answer in ILAC.
// Each answer block is one issue: i = issue, l = law, a = application, c = conclusion.
// Fact patterns come from the past-year paper, the sample questions and the Q&A bank. [check] = confirm on the slides.
export default [
  {
    title: 'Fixtures, chattels and the tenant\'s right to remove', lots: 'Lot 1', weight: 'High',
    signals: ['A tenant or seller removes machinery, shelves, air-conditioners, a chandelier or a garden ornament.', 'A financier claims a hire-purchase item that has been bolted to the land.', 'A house that "rests on" pillars or stilts.'],
    issues: ['Fixture or chattel, item by item.', 'Who owns each fixture now.', 'Whether the tenant may still remove trade, ornamental or domestic fixtures.', 'Remedy.'],
    q: 'Ravi leased a shop from Mdm Sim for 5 years. He installed (a) glass display cabinets bolted to the floor, (b) a neon sign bolted to the shopfront, (c) a free-standing walk-in chiller resting on its own weight and (d) a decorative chandelier hung from the ceiling. The lease ended on 30 June and Ravi handed back the keys that day. He came back on 11 July to remove the items. Mdm Sim says everything is hers. Advise Ravi.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether each item is a fixture or a chattel.',
        l: ['What is fixed to the land becomes part of it (*quicquid plantatur solo, solo cedit*). **Holland v Hodgson** asks (1) the degree of annexation: an item fixed to the land is presumed a fixture, and one resting on its own weight a chattel; and (2) the object of annexation: whether it was put there for the permanent improvement of the land or for the better enjoyment of the item itself. The object now carries the greater weight (**D\'Eyncourt v Gregory**), and Singapore applies both tests (**People\'s Park Chinatown v Chief Assessor** [check facts]).'],
        a: ['(a) The cabinets are bolted down, so the presumption is a fixture, but their purpose is to display Ravi\'s stock rather than to improve the shop, and they unbolt cleanly. They are trade fixtures. (b) The neon sign is bolted to the shopfront and advertises Ravi\'s business: also a trade fixture. (c) The chiller rests on its own weight and serves Ravi\'s trade, so the presumption of a chattel is not displaced. (d) The chandelier is attached by wiring. Its purpose is decorative, so it is an ornamental fixture.'],
        c: 'The chiller is a chattel. The cabinets, sign and chandelier are tenant\'s fixtures (trade and ornamental).' },
      { i: 'Whether Ravi may still remove the fixtures after the lease ended.',
        l: ['A tenant may remove trade, ornamental and domestic fixtures during the lease or within a short time after it ends, making good any damage caused (**Fisher v Dixon**; **Spyers v Phillipson**). Fixtures left behind after the tenant gives up possession belong to the landlord (**BP Refinery v Amazon** [check]).'],
        a: ['Ravi handed back the keys on 30 June and returned eleven days later. He had given up possession, so the landlord\'s position is strong: the items were left on her land when the tenancy ended. Ravi will argue that he came back within a short time and that Mdm Sim has suffered no loss. That argument is weak, because the right to remove is tied to the tenant\'s possession, and once he surrendered the shop without removing them the fixtures passed with the reversion. The chiller is different: as a chattel it never became part of the land, so Ravi may collect it at any time.'],
        c: 'Ravi probably cannot remove the cabinets, sign or chandelier. He can recover the chiller.' }
    ],
    advice: 'Ravi should collect the chiller at once and ask Mdm Sim to agree, in writing, to his removing the fixtures; in future he must remove trade fixtures before giving up possession and make good the damage.',
    traps: ['Treating weight as decisive: purpose can outweigh it.', 'Running the two tests on a building: say it is part and parcel of the land, then mention custom (Kiah).', 'Forgetting the tenant\'s time window and the duty to make good.'],
    vary: [['The lease says all fixtures stay', 'The lease governs; no right to remove.'], ['A hire-purchase company claims the bolted cabinets', 'Hobson v Gorringe: once a fixture, it goes with the land to a landlord or buyer without notice.']]
  },
  {
    title: 'Airspace and subsoil', lots: 'Lot 1', weight: 'Medium',
    signals: ['Crane jibs, drones, signs or aircraft over the land.', 'Ground anchors or a basement under it.'],
    issues: ['How far the owner\'s land reaches up and down.', 'Whether each intrusion is a trespass.', 'Remedies.'],
    q: 'A developer\'s tower crane swings its jib 40 m above Mrs Tan\'s bungalow. A blogger flies a drone at 25 m over her garden to photograph it. The developer\'s basement uses ground anchors that extend 12 m into the soil under her land. Advise Mrs Tan.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether the crane jib and the drone trespass on Mrs Tan\'s airspace.',
        l: ['Land includes the airspace reasonably necessary for its use and enjoyment (**s 2 LTA**). An intrusion into the lower airspace needed for ordinary use is a trespass, however small (**Kelsen v Imperial Tobacco**: a sign of about 8 inches), and crane jibs swinging over a neighbour\'s land have been restrained by injunction (**Anchor Brewhouse v Berkley House**). Above that level the air is free, so an aircraft at a reasonable height does not trespass (**Bernstein v Skyviews**).'],
        a: ['The drone hovers at 25 m to photograph a garden. That is close to the house and within the space an owner needs for ordinary use and privacy, so, unlike the aircraft in Bernstein, trespass is arguable. The crane is harder. Anchor Brewhouse supports Mrs Tan, because the jib repeatedly swings over her land. The developer will reply, relying on Bernstein, that 40 m is far above what a bungalow needs. A court is likely to treat a jib that oversails the house repeatedly as an intrusion she may restrain, but the height makes this the weakest of her claims.'],
        c: 'Mrs Tan has a reasonable claim against the drone operator and an arguable claim against the developer for the crane.' },
      { i: 'Whether the ground anchors trespass on Mrs Tan\'s subsoil.',
        l: ['In Singapore an owner\'s subsoil extends only to the depth reasonably necessary for use and enjoyment or, where the title is silent, 30 m below the Singapore Height Datum (**s 3B State Lands Act**). **Bocardo v Star Energy** gives the English owner the strata below, but that is not the Singapore rule.'],
        a: ['The anchors are 12 m below her land, well within the 30 m depth. They were placed without her consent, so they are a trespass. Because the anchors are permanent, she can seek an injunction requiring their removal, or negotiate a payment for a right to keep them.'],
        c: 'The anchors are a trespass, and this is Mrs Tan\'s strongest claim.' }
    ],
    advice: 'Mrs Tan should seek an injunction or a licence fee for the anchors, demand that the drone stop, and ask the developer to slew the jib away from her house or pay an oversailing fee.',
    traps: ['Citing Bocardo as the Singapore rule.', 'Saying every overflight is trespass.', 'Forgetting the remedy.']
  },
  {
    title: 'Equitable interests and later buyers: Equity\'s Darling and the register', lots: 'Lots 2, 6, 9', weight: 'High (supports other topics)',
    signals: ['A lease or sale agreed in writing but no deed and no registration.', 'A buyer who "knew" of someone\'s claim.', 'No caveat lodged.'],
    issues: ['Legal or equitable interest?', 'Does it bind the later buyer?', 'What is left for the loser.'],
    q: 'Hana signed a "Tenancy Agreement" with Ms Goh to lease Ms Goh\'s shop for 9 years. No deed was made and nothing was registered. Hana took possession and paid rent. Ms Goh then sold the shop to Dev, who knew Hana was in occupation, paid full value and registered the transfer. Dev says Hana must leave. Advise Hana.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether Hana holds a legal or an equitable lease.',
        l: ['A legal lease needs a deed (**s 53(1) CLPA**), except a lease of 7 years or less at a rack rent, and a lease of more than 7 years of registered land must be registered (**s 87 LTA**). Equity treats a specifically enforceable agreement for a lease as the lease itself (**Walsh v Lonsdale**). A contract for a lease must be in signed writing (**s 6(d) Civil Law Act**).'],
        a: ['The lease is for 9 years, so it is outside the 7-year exception and needs both a deed and registration. It has neither, so Hana has no legal lease. But the agreement is in signed writing, and she took possession and paid rent, so specific performance would be available. Under Walsh v Lonsdale she holds an equitable lease.'],
        c: 'Hana holds an equitable lease only.' },
      { i: 'Whether Hana\'s equitable lease binds Dev.',
        l: ['An unregistered instrument passes no estate (**s 45 LTA**), and a registered proprietor holds free of unregistered interests unless an exception applies (**s 46(1)**). Knowing of an unregistered interest is not of itself fraud (**s 47(2)**); fraud means actual dishonesty (**UOB v Bebe**), such as a promise to honour the interest made with no intention of keeping it (**Loke Yew v Port Swettenham**). An equitable owner protects herself by caveat (**s 115**). A lease of 7 years or less would have been an overriding interest.'],
        a: ['Dev registered as a purchaser for value. He knew Hana was in occupation, but under s 47(2) that knowledge is not fraud, and the facts show no promise to honour her lease made to obtain the shop. Hana lodged no caveat. Her lease is too long to be an overriding interest. So Dev took free of it.'],
        c: 'Hana\'s equitable lease does not bind Dev.' }
    ],
    advice: 'Hana should claim damages from Ms Goh for breach of the agreement to lease. If she has evidence that Dev promised to honour the lease, she should plead fraud under Loke Yew. Lesson: caveat a lease over 7 years at once.',
    traps: ['Forgetting that Equity\'s Darling needs the legal estate, and that on registered land s 46 and s 47(2) replace the notice test.', 'Not saying what the loser can still claim.'],
    vary: [['The lease was for 5 years at a market rent', 'No deed needed and an overriding interest: Dev is bound.'], ['Hana lodged a caveat before Dev registered', 'Dev takes subject to her interest.']]
  },
  {
    title: 'Covenants: original parties, burden and benefit', lots: 'Lot 3', weight: 'High (past-year CS1)',
    signals: ['A seller keeps one plot and the buyer promises, "for herself and her successors", to repair, maintain, not build, or use only as a dwelling.', 'The burdened land is sold or let and the occupier ignores the promise.'],
    issues: ['Positive or negative?', 'Original parties: privity of contract.', 'Successors: burden at law and in equity.', 'Remedies.'],
    q: 'Mrs Leong sold No. 13 Sunny Avenue (registered title) to Gabby and kept No. 11. Gabby covenanted "on behalf of herself and her successors-in-title with Mrs Leong and her successors in title for the benefit of Mrs Leong\'s land": (i) not to allow the roof of No. 13 to fall into disrepair; (ii) not to use the premises other than as a private dwelling house; (iii) to maintain the boundary wall. Gabby let three rooms to nursing students, who run Science lessons there with children coming and going. The roof and walls have fallen into disrepair. Advise Mrs Leong.', marks: '12 marks · about 15 minutes',
    answer: [
      { i: 'Whether each covenant is positive or negative.',
        l: ['A covenant is positive if compliance requires action or expenditure, and negative if it only restrains the use of land. The test is substance, not wording.'],
        a: ['(i) "Not to allow the roof to fall into disrepair" is worded negatively, but complying means paying for repairs, so it is positive. (iii) "To maintain the boundary wall" is positive. (ii) "Not to use the premises other than as a private dwelling house" restrains use and costs nothing, so it is negative.'],
        c: 'Covenants (i) and (iii) are positive; (ii) is negative.' },
      { i: 'Whether Mrs Leong can enforce the covenants against Gabby.',
        l: ['Between the original covenantor and covenantee the covenant is a contract. Only a party may sue on it (**Tweddle v Atkinson**), and the original covenantor stays liable even after parting with the land or letting it.'],
        a: ['Gabby made the covenants with Mrs Leong, so privity of contract settles the matter and no running rules are needed. The roof and walls are in disrepair, so (i) and (iii) are breached. Science lessons for visiting children are a business use, so (ii) is breached, and Gabby answers for what she permits on her land. Letting to the students does not release her.'],
        c: 'Gabby is liable on all three covenants: damages for the repairs (or specific performance of defined works, given the leak risk to No. 11) and an injunction on (ii).' },
      { i: 'Whether the students are bound.',
        l: ['The burden of a covenant does not run at common law (**Austerberry v Oldham**), and positive burdens do not run in equity either (**Rhone v Stephens**). Under **Tulk v Moxhay** the burden of a negative covenant binds a successor in equity where it touches and concerns benefited land, was meant to bind successors, and the successor has notice; on registered land the entry on the Certificate of Title gives notice.'],
        a: ['The students did not covenant, so (i) and (iii), being positive, cannot bind them. Covenant (ii) is negative, protects No. 11, which Mrs Leong kept, is expressed to bind successors in title and is on the CT, so the students take with notice and can be restrained [check: the slides discuss buyers; applying Tulk v Moxhay to tenants is an extension]. The noise and traffic also support a claim in private nuisance against the students, and against Gabby for authorising it.'],
        c: 'Mrs Leong can seek an injunction against the students on (ii) and in nuisance; the roof and wall covenants bind only Gabby.' }
    ],
    advice: 'Mrs Leong should sue Gabby for the cost of repairs and an order to fix the roof and wall, and seek an injunction against both Gabby and the students to stop the lessons.',
    traps: ['Classifying by wording instead of cost.', 'Running the burden rules between the original parties.', 'Forgetting notice through the Certificate of Title, and the remedies.'],
    vary: [['Mrs Leong had sold No. 11 to Ms Yap', 'Ms Yap must show the benefit passed (Swift at law; annexation by the words "for the benefit of" in equity).'], ['Gabby sold No. 13 to Eve, who uses the shared road', 'Halsall v Brizell: Eve pays for the road as the price of using it.']]
  },
  {
    title: 'Easements and licences', lots: 'Lot 4', weight: 'High',
    signals: ['A claim to park, store, walk across, run a pipe or use a garden.', 'Informal permission, then a sale.'],
    issues: ['The four tests, one fact each.', 'If no easement, what kind of licence, and does it bind a buyer?'],
    q: 'Unit A shares a driveway with Unit B. A\'s owner claims a right to park two cars on B\'s driveway all day, Monday to Friday, and to store bicycles in a shed on B\'s land. Separately, Ms Goh let her neighbour Mr Koh use a path across her garden for free for five years; she has sold her house to Ben, who has blocked the path. Advise the owners of Unit A and Mr Koh.', marks: '15 marks · about 20 minutes',
    answer: [
      { i: 'Whether Unit A\'s parking and storage rights are easements.',
        l: ['Under **Re Ellenborough Park** an easement needs (1) a dominant and a servient tenement, (2) a right that accommodates the dominant land rather than a person or business (**Hill v Tupper**), (3) different owners, and (4) a right capable of forming the subject matter of a grant: definite, within the nature of easements, and not amounting to exclusive possession or ouster (**Copeland v Greenhalf**; **Batchelor v Marlow**).'],
        a: ['Unit A (dominant) and Unit B (servient) are separately owned, and parking near the home benefits Unit A as a residence, so tests 1 to 3 are met. Test 4 fails for both rights. Parking two cars all day on every weekday leaves B\'s owner no reasonable use of the driveway, exactly as in Batchelor v Marlow. Keeping bicycles in a shed on B\'s land is exclusive occupation of that shed, like the storage in Copeland v Greenhalf.'],
        c: 'Neither right is an easement as claimed. A narrower right, such as one car in one space for limited hours, could be.' },
      { i: 'Whether Mr Koh has any right that binds Ben.',
        l: ['A bare licence is mere permission. It is revocable and binds no buyer (**Wood v Leadbitter**). A licence becomes irrevocable by estoppel where the owner promised a right, the claimant relied on it and suffered detriment (**Inwards v Baker**). A contractual licence binds a buyer only where his conscience is affected so that a constructive trust arises (**Ashburn Anstalt v Arnold**).'],
        a: ['Mr Koh paid nothing, signed nothing and was promised nothing permanent, so he had a bare licence, not a grant of an easement. There is no reliance or detriment to support an estoppel. Ben made no promise to honour the permission, so no constructive trust arises.'],
        c: 'Mr Koh has no easement and no binding licence. Ben may block the path.' }
    ],
    advice: 'Unit A\'s owner should negotiate an express, limited parking easement by deed, noted on the CT. Mr Koh can only ask Ben for a new permission or an express easement.',
    traps: ['Listing the four tests without a fact for each.', 'Treating informal permission as an easement.', 'Saying a licence binds a buyer without a constructive trust.'],
    vary: [['The house with a right of way is converted into two flats', 'Graham v Philcox: the easement continues unless use substantially increases.']]
  },
  {
    title: 'Support, excavation and negligence', lots: 'Lot 4', weight: 'High (practice paper sample)',
    signals: ['A neighbour excavates or piles next to the boundary.', 'Cracks, settlement, a business interrupted.'],
    issues: ['Natural right of support: land, then buildings.', 'Negligence.', 'Loss and defences.'],
    q: 'Printwell Pte Ltd runs a four-storey printing factory next to land owned by Costco Enterprises. In 2024 Costco began excavation and piling next to the boundary for a basement car park. On its engineers\' advice, its contractor installed sheet piles, but Costco set up no continuous monitoring. Within weeks cracks appeared on Costco\'s own roads, the factory was damaged by soil settlement and had to suspend operations. Discuss Printwell\'s and Costco\'s legal positions.', marks: '15 marks · about 20 minutes',
    answer: [
      { i: 'Whether Costco breached the right of support owed to Printwell\'s land and factory.',
        l: ['A landowner has a natural right to support of the land from adjoining soil; a neighbour who removes soil must provide sufficient alternative support, and the cause of action arises when damage occurs (**Backhouse v Bonomi**). In England a building is protected only by an easement of support acquired by long use (**Dalton v Angus**). In Singapore the Court of Appeal in **Xpress Print v Monocrafts** [2000] 1 SLR(R) 1 held that the duty extends to the adjoining property including its buildings, and was breached where soil was removed without sufficient alternative support.'],
        a: ['Costco excavated next to the common boundary and the factory settled within weeks, which shows that the support from Costco\'s soil was removed without sufficient alternative support. Under Xpress Print the duty covers the factory building, so Printwell does not need to prove an easement of support. Costco cannot rely on its engineers\' advice or its contractor\'s work: the duty is the landowner\'s, though Costco may seek contribution from them separately.'],
        c: 'Costco is liable for breach of the right of support.' },
      { i: 'Whether Costco is also liable in negligence, and for what loss.',
        l: ['An excavating neighbour owes adjoining owners a duty to take reasonable care. Loss of profit that follows physical damage to the claimant\'s property is recoverable as consequential loss.'],
        a: ['Damage to a four-storey factory beside a deep excavation was plainly foreseeable. Costco set up no continuous monitoring, and the cracks on its own roads gave an early warning that it did not act on. That is a failure of reasonable care. Printwell can recover the cost of repair and its lost profits during the shutdown. Costco may argue that the factory\'s weight contributed and that Printwell must mitigate, but these go to the amount, not to liability.'],
        c: 'Costco is also liable in negligence, including for lost profits.' }
    ],
    advice: 'Printwell should claim repair costs and lost profit, and seek an injunction stopping the works until proper support and monitoring are in place. Costco should secure the site and seek contribution from its engineers and contractor.',
    traps: ['Stating only the English rule for buildings.', 'Leaving out negligence and the monitoring point.', 'Letting the contractor\'s fault excuse the landowner.']
  },
  {
    title: 'Mortgage terms: penalties, clogs and unconscionability', lots: 'Lot 5', weight: 'High (past-year CS2(b))',
    signals: ['A bar on redemption for most of the loan.', 'An option for the lender to buy; tied insurance; a variable rate.', 'A default rate far above the contract rate.', 'A vulnerable or a sophisticated borrower.'],
    issues: ['The borrower profile.', 'Each term against its authority.', 'Unconscionability.', 'Consequences.'],
    q: 'Zen, a veteran property fund manager, bought a penthouse with a 10-year loan from Bigbank in his and Belle\'s names as co-owners and co-borrowers, and Bigbank registered its mortgage. The terms included: (1) late instalments carry default interest at 28% a year; (2) the earliest date for redemption is in nine years. Two years later Zen died. Belle cannot pay the instalments. Discuss TWO legal issues pertaining to the mortgage.', marks: '20 marks · about 26 minutes',
    answer: [
      { i: 'Whether the 28% default interest is enforceable.',
        l: ['A sum payable on breach is enforceable only if it is a genuine pre-estimate of loss; a sum out of all proportion to the greatest loss that could conceivably follow is a penalty and unenforceable (**Dunlop v New Garage**). In **Hong Leong Finance v Tan Gin Huay** default interest of 18%, against contract rates of 5.5% to 6.75%, was a penalty, and the lender\'s appeal to "industry practice" failed.'],
        a: ['28% is higher than the 18% struck down in Hong Leong and several times any normal home-loan rate. Bigbank\'s real loss from a late instalment is the cost of funds and administration, which cannot approach 28%. Bigbank will say Zen was a sophisticated borrower who agreed the term, but the penalty rule turns on proportion, not on the borrower\'s skill, and market practice is no answer.'],
        c: 'The 28% clause is likely an unenforceable penalty; Bigbank may charge the contract rate and recover its actual loss.' },
      { i: 'Whether the nine-year bar on redemption is a clog on the equity of redemption.',
        l: ['A borrower always keeps the equity of redemption: "once a mortgage, always a mortgage". A postponement is void if it makes redemption illusory (**Fairclough v Swan Brewery**), but between commercial, advised parties a long postponement stands (**Knightsbridge Estates v Byrne**; **Fiscal Consultants** [check facts]). In Singapore a party alleging unconscionability must show an infirmity that the other party exploited, after which the burden shifts to that party to prove fairness (**BOM v BOK**).'],
        a: ['Nine years of a ten-year loan leaves only a year in which to redeem early, but redemption is not illusory as in Fairclough: the penthouse keeps its value, so there is something real to get back. Zen, a veteran fund manager, is the kind of sophisticated borrower held to his bargain in Knightsbridge. Belle is the weaker point for the bank: the facts give no sign that she had advice or experience. But she must first show an infirmity that Bigbank exploited, and nothing in the facts shows that.'],
        c: 'The nine-year bar probably stands, unless Belle proves exploitation under BOM v BOK.' },
      { i: 'What follows for Belle.',
        l: ['A co-borrower is liable for the whole debt. On default the mortgagee may enter after one month\'s notice (**s 75 LTA**) and sell once the power of sale is exercisable (**s 25 CLPA**).'],
        a: ['Belle is jointly liable with Zen\'s estate for the whole loan, not half of it. Bigbank\'s registered charge ranks ahead of the children\'s later caveat. If she cannot pay, Bigbank can take possession after notice and sell, accounting to her for any surplus.'],
        c: 'Belle must keep paying at the contract rate or face a mortgagee\'s sale.' }
    ],
    advice: 'Belle should refuse the 28% rate, pay at the contract rate, and negotiate with Bigbank or redeem with the estate\'s help; she should not rely on escaping the nine-year bar.',
    traps: ['Skipping the borrower profile.', 'Treating every long lock-in as void.', 'Not saying what the borrower pays if a term fails.', 'Using the English unconscionability test.'],
    vary: [['An elderly illiterate hawker gives the lender an option to buy his $600,000 shop for $200,000 on default', 'Void as a clog (Samuel v Jarrah) and unconscionable (BOM v BOK); 30% default interest against 8% is a penalty (Hong Leong).']]
  },
  {
    title: 'The mortgagee\'s remedies, and a lease made after the mortgage', lots: 'Lots 5, 6', weight: 'High (past-year CS1)',
    signals: ['Arrears and a notice of possession.', 'The borrower let the property after mortgaging it.', 'Lock-in, variable rate or tied insurance terms.'],
    issues: ['The terms.', 'Possession.', 'Whether the lease binds the bank.', 'Sale.'],
    q: 'To buy No. 13 Sunny Avenue, Gabby took a 15-year mortgage from Bestbank: instalments due on the 13th of each month; a 10-year lock-in; interest variable at the bank\'s discretion; insurance only from Bestbank\'s subsidiary, Best Insurers. A year later she let three rooms for 24 months to nursing students at $1,800 a month and kept a fourth room locked with her things. The students paid late, Gabby fell into arrears, and Bestbank sent notice that it would take possession. Advise Gabby and Bestbank.', marks: '15 marks · about 20 minutes',
    answer: [
      { i: 'Whether the lock-in, variable rate and tied insurance are enforceable.',
        l: ['A term that clogs the equity of redemption is void (**Fairclough**), but a postponement that leaves real value to redeem is valid, especially for an advised borrower (**Knightsbridge**). A collateral advantage stands if it is a separate bargain that ends on redemption and is not unfair (**Kreglinger**). Unconscionability needs an exploited infirmity (**BOM v BOK**).'],
        a: ['The 10-year lock-in on a 15-year loan leaves Gabby a house to redeem, so redemption is not illusory. She is an individual homebuyer, but nothing suggests illiteracy, poverty or exploitation, so BOM v BOK does not help. The variable rate is a price term that leaves redemption untouched, though it should be exercised in good faith [check]. The tied insurance ends with the loan and is valid unless the premiums are above market.'],
        c: 'The three terms are likely enforceable.' },
      { i: 'Whether Bestbank may take possession, and whether the students\' lease binds it.',
        l: ['A registered charge gives no inherent right to possession; after default the mortgagee may enter after one month\'s notice (**s 75 LTA**) and must account for rents (**Tan Hin Choon** [check]). A mortgagor in possession may grant an occupation lease of up to 3 years unless the deed excludes it (**s 23 CLPA**), and such a lease binds the mortgagee because it is authorised by law (**s 89(1) LTA**).'],
        a: ['Gabby is in arrears, so Bestbank may enter after a month\'s notice. Her lease to the students is for 24 months, within s 23\'s three years; nothing suggests the deed excluded the power, and she granted it while in possession [check]. It therefore binds Bestbank under s 89(1). Bestbank can take possession of Gabby\'s locked room and collect the students\' rent, which it must credit to the debt, but it cannot evict them before month 24.'],
        c: 'Bestbank may enter after notice but takes subject to the students\' lease.' },
      { i: 'Whether Bestbank may sell, and how.',
        l: ['The power of sale arises when the mortgage is by deed, money is due and nothing excludes it; it becomes exercisable on any one trigger in **s 25 CLPA**, including interest one month in arrears. The mortgagee must act in good faith and take reasonable care to get the best price reasonably obtainable (**Cuckmere Brick**), and the borrower may ask the court for a sale (**s 30 CLPA**).'],
        a: ['If interest is a month in arrears, the power is exercisable. Bestbank must market No. 13 properly and account to Gabby for any surplus after the debt and costs (**s 26(3) CLPA**). Gabby can stop all this by paying the arrears, or ask the court to order a sale she can control.'],
        c: 'Bestbank may sell on continued default, subject to its duty on sale.' }
    ],
    advice: 'Gabby should clear the arrears (using the students\' rent) or redeem; Bestbank may take possession after notice and collect the rent, but must honour the students\' lease.',
    traps: ['Treating the s 25 triggers as cumulative, or the "arisen" conditions as alternatives.', 'Forgetting the one-month notice.', 'Not asking whether the lease came before or after the mortgage.'],
    vary: [['Bank X sells Rina\'s home to its own subsidiary, unadvertised, for $1.1m against a $1.4m valuation', 'Breach of the Cuckmere duty: set the sale aside or recover the shortfall.']]
  },
  {
    title: 'Lease or licence', lots: 'Lot 6', weight: 'High (past-year CS1)',
    signals: ['Rooms let to students or sharers; an agreement called a "licence".', 'The owner keeps a room, keys, a cleaner, or a right to move occupiers.'],
    issues: ['Exclusive possession, term and rent.', 'Shams, services, retained keys.', 'One tenancy or several.'],
    q: 'Gabby let three of the four bedrooms of No. 13 for 24 months to three nursing students for $1,800 a month under one agreement. She kept the fourth bedroom locked with her belongings, and her helper cleans the premises once a week. Separately, Su Ling signed agreements headed "licence" with Tom, Uma and Vik on different dates for three bedrooms in her flat; a clause lets her move any occupier to another room, which she has never done. Are the occupiers tenants or licensees?', marks: '12 marks · about 15 minutes',
    answer: [
      { i: 'Whether the students hold a lease.',
        l: ['A tenancy exists where the occupier has exclusive possession for a term at a rent, whatever the document calls it (**Street v Mountford**; endorsed in **Goh Cin Chye** [check facts]). Retained keys do not by themselves defeat exclusive possession; the question is why they were kept (**Aslan v Murphy** [check]). Services that need unrestricted access, such as meals and room cleaning, make the occupier a lodger (**Abbeyfield**; **Marchant v Charters**).'],
        a: ['The students have three rooms and the shared areas for a fixed 24 months at $1,800 a month, under one agreement for one sum, which points to a joint tenancy of those rooms. Gabby\'s locked fourth bedroom is simply outside the grant. A weekly clean by her helper is a light service and gives no unrestricted access to the students\' rooms, so it does not show that Gabby kept possession. Twenty-four months is a certain term, under 7 years, so no deed is needed (**s 53(1) CLPA**).'],
        c: 'The students hold a 24-month lease of the three rooms.' },
      { i: 'Whether Tom holds a tenancy or a licence.',
        l: ['A clause that the parties never intended to operate is a sham and is ignored (**Antoniades v Villiers**). Separate agreements made at different times give no joint tenancy, but each occupier may hold a tenancy of his own room (**AG Securities v Vaughan**).'],
        a: ['The label "licence" is not decisive. The right to move occupiers has never been used and shows no real intention to share or move, so it is a sham. Tom pays rent for his own room and can exclude others from it. Because the agreements were signed on different dates, there is no joint tenancy, but Tom has exclusive possession of his room. No fixed term is stated, so he holds a periodic tenancy measured by the rent period [check].'],
        c: 'Tom is a periodic tenant of his room, not a licensee.' }
    ],
    advice: 'Gabby and Su Ling must treat their occupiers as tenants: Gabby\'s students stay for 24 months, and Su Ling needs a valid notice for a full rental period to end Tom\'s tenancy.',
    traps: ['Relying on the label.', 'Treating any key or cleaner as fatal to exclusive possession.', 'Forgetting that separate agreements defeat a joint tenancy but not individual tenancies.']
  },
  {
    title: 'Ending a lease: fixed term, notice, forfeiture, waiver and distress', lots: 'Lot 6', weight: 'High (past-year CS1)',
    signals: ['A notice to quit during a fixed term.', 'Late rent; a breach such as business use or a sublet.', 'Rent accepted after the landlord learns of the breach.'],
    issues: ['Fixed term or periodic.', 'A right to forfeit.', 'The right procedure (s 18 or s 18A).', 'Waiver and other remedies.'],
    q: 'Gabby\'s 24-month lease to the students forbids business use. The students run Science lessons for children at No. 13 and are consistently late with the $1,800 monthly rent. In month 18 Gabby, hoping to re-let at a higher rent, gave them notice to vacate. They refuse to leave. Advise Gabby and the students.', marks: '12 marks · about 15 minutes',
    answer: [
      { i: 'Whether the month-18 notice ended the lease.',
        l: ['A fixed-term lease ends when its term expires. A notice to quit ends only a periodic tenancy; it cannot end a fixed term early unless the lease contains a break clause.'],
        a: ['The students hold a fixed 24-month lease, and the facts show no break clause. Gabby\'s wish to re-let at a higher rent is no ground for ending it. Even if they were licensees, a contractual licence for a fixed period could not be revoked at will (**Winter Garden Theatre**).'],
        c: 'The notice is ineffective; the students may stay until month 24.' },
      { i: 'Whether Gabby can forfeit for the Science lessons.',
        l: ['Forfeiture needs a right to forfeit, either an express re-entry clause or, for a registered lease, the right implied by **s 93 LTA**. For a breach other than non-payment of rent, **s 18 CLPA** requires a notice specifying the breach, requiring it to be remedied if it is capable of remedy, and asking for compensation, and the tenant may apply for relief. A breach is capable of remedy if it can be put right in practice (**Akici v Butlin**; **Rugby School** [check]). Accepting rent with knowledge of the breach waives the right to forfeit for it (**Expert Clothing** [check holding]).'],
        a: ['The lessons breach the no-business covenant. The 24-month lease is unregistered, so s 93 does not apply, and Gabby needs an express re-entry clause, which the facts do not mention. If there is one, she must serve a s 18 notice giving the students a reasonable time to stop the lessons, which they can easily do. If she keeps accepting rent knowing of the lessons, she risks waiving the breach. Without a re-entry clause she can still claim damages or an injunction.'],
        c: 'Forfeiture is possible only with an express clause and a proper s 18 notice; otherwise Gabby\'s remedy is an injunction or damages.' },
      { i: 'What Gabby can do about the late rent.',
        l: ['A landlord may sue for arrears and distrain for up to 12 months\' rent under the **Distress Act**. Where the landlord forfeits for unpaid rent under a re-entry clause, **s 18A CLPA** lets the tenant pay the arrears and costs into court and keep the lease.'],
        a: ['Gabby can sue for the arrears and any contractual late interest, or levy distress. If she forfeits for rent under a re-entry clause, the students can stop the forfeiture by paying the arrears and costs under s 18A.'],
        c: 'Gabby can recover the rent, but late payment alone will not end the lease if the students pay up.' }
    ],
    advice: 'The students should stop the lessons, pay on time and stay until month 24. Gabby should withdraw the notice, sue for any arrears and, if the lease has a re-entry clause, serve a proper s 18 notice about the lessons.',
    traps: ['Using a notice to quit against a fixed term.', 'Serving the wrong notice for the breach.', 'Assuming a re-entry right on an unregistered lease.', 'Ignoring waiver.'],
    vary: [['Joe\'s landlord accepted late rent a week after learning of an unauthorised sublet', 'Waiver of forfeiture for that breach; s 18A protects Joe on the rent.']]
  },
  {
    title: 'The landlord\'s covenants: quiet enjoyment, derogation and set-off', lots: 'Lot 6', weight: 'Medium',
    signals: ['Landlord\'s works or rules hurt the tenant\'s trade.', 'The premises turn out unsuitable.', 'The tenant withholds rent under a no-set-off lease.'],
    issues: ['Breach of quiet enjoyment or derogation.', 'Was withholding rent justified?', 'Remedies.'],
    q: 'A restaurateur leased a unit in a mall for 5 years. The lease says rent is payable "without any set-off or deduction". The mall owner put up hoardings across the restaurant\'s main entrance for a 6-month renovation and customers fell by half. The restaurateur stopped paying rent and sued for derogation from grant; the landlord re-entered for non-payment. Advise the restaurateur.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether the landlord breached quiet enjoyment or derogated from the grant.',
        l: ['Every lease implies that the landlord will not substantially interfere with the tenant\'s possession or derogate from the grant, judged by what both parties contemplated when the lease was made. The landlord does not underwrite the tenant\'s profitability, and the tenant takes the premises as found (**OUE v Three Sixty Degree** [2013] 3 SLR 1). Merely making the business more costly is not a derogation (**Cold Storage v MCST Chancery Court**).'],
        a: ['Hoardings across the main entrance for six months physically obstruct customers\' access to the premises the tenant was granted. That is much more than the parking charges in Cold Storage and goes to the use both sides contemplated: a restaurant open to the public. The fall in customers is evidence of a substantial interference.'],
        c: 'The tenant has a good claim for damages for breach of quiet enjoyment or derogation.' },
      { i: 'Whether the tenant could withhold rent, and the effect of the re-entry.',
        l: ['A tenant may set off a closely connected cross-claim against rent only if the lease does not exclude set-off; a clause barring set-off is effective (**OUE v Three Sixty Degree**). A tenant facing forfeiture for unpaid rent may pay the arrears and costs into court and keep the lease (**s 18A CLPA**).'],
        a: ['The lease says rent is payable without set-off or deduction, so the tenant had to pay the rent in full and sue separately for damages. Withholding rent was a breach, and the landlord\'s re-entry for non-payment is likely valid, as in OUE. The tenant\'s way back is s 18A: pay the arrears and costs and keep the lease, while pursuing the damages claim.'],
        c: 'Withholding rent was a breach that justified re-entry, but s 18A relief is available.' }
    ],
    advice: 'The restaurateur should pay the arrears and costs at once and apply for relief under s 18A, then pursue the damages claim for the six months of obstruction.',
    traps: ['Assuming the landlord guarantees trade.', 'Letting a good damages claim justify withholding rent despite a no-set-off clause.']
  },
  {
    title: 'Assignment, sublease and privity', lots: 'Lot 6', weight: 'High',
    signals: ['The tenant assigns or sublets and the new occupier defaults.', 'The landlord sells the reversion.'],
    issues: ['Privity of contract.', 'Privity of estate and touching and concerning.', 'Assignment or sublease.'],
    q: 'Lin leased a shop to Tan for 10 years. In year 3 Tan assigned the lease to Wong with Lin\'s consent. Wong has stopped paying rent and has let the premises fall into disrepair in breach of the repairing covenant. Lin has since sold the freehold to Ms Ng. Advise Lin and Ms Ng.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether Tan remains liable after assigning.',
        l: ['The original landlord and tenant are bound in privity of contract for the whole contractual term, and an assignment does not release the original tenant without an express release (**City of London v Fell**).'],
        a: ['Tan covenanted with Lin to pay rent and repair for 10 years. The consent to assign was not a release. Tan therefore remains liable to Lin in contract for rent and repairs that fell due while Lin held the reversion, and can then seek an indemnity from Wong.'],
        c: 'Lin can sue Tan in privity of contract for arrears and disrepair up to the sale.' },
      { i: 'Whether Wong is liable, and to whom.',
        l: ['The current landlord and the current tenant are in privity of estate, and covenants that touch and concern the land, such as rent and repair, bind them (**Spencer\'s Case**). **s 10 and s 11 CLPA** pass the benefit and burden of lease covenants with the reversion, so a buyer of the reversion can sue on them. A "sublease" for the whole remaining term would operate as an assignment (**Milmo v Carreras**).'],
        a: ['Wong took an assignment, so Wong and the landlord are in privity of estate. Rent and repair touch and concern the land, so they bind Wong. Before the sale Lin could sue Wong; after the sale, s 10 passes the benefit to Ms Ng, who can sue Wong for rent and disrepair from the date she acquired the reversion. Had Tan "sublet" for the whole remaining term, the result would be the same, because that is an assignment.'],
        c: 'Wong is liable in privity of estate: to Lin before the sale, and to Ms Ng after it.' }
    ],
    advice: 'Lin should claim pre-sale arrears from Tan or Wong; Ms Ng should claim post-sale rent and repairs from Wong and consider forfeiture if the lease has a re-entry clause.',
    traps: ['Mentioning privity of estate without privity of contract.', 'Saying assignment releases the original tenant.', 'Forgetting s 10 and s 11 when the reversion is sold.']
  },
  {
    title: 'Co-ownership: legal title, survivorship, the Will and severance', lots: 'Lot 7', weight: 'High',
    signals: ['Two or more names on a title and a death.', 'A Will leaving "all my property".', 'A declaration served but not registered; a sale of a share; bankruptcy; divorce.'],
    issues: ['Joint tenants or tenants in common.', 'Severance before death.', 'Survivorship and the Will.'],
    q: 'Siblings Ann, Ben and Cai are registered owners of a shophouse as joint tenants. Ann signed a declaration of severance in the approved form and served it on Ben and Cai on Monday. She died on Wednesday before it was registered. Her Will leaves "all my property" to her son Dan. Who owns the shophouse?', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'How the siblings held the shophouse.',
        l: ['Co-owners named in an instrument hold as joint tenants unless it describes them as tenants in common (**s 53(1) LTA**). On a joint tenant\'s death the interest vanishes and the survivors take the whole by survivorship; a Will cannot pass a joint share (**Shafeeg v Fatimah** [check facts]).'],
        a: ['The siblings are registered as joint tenants. Unless the joint tenancy was severed before Ann died, her interest passed to Ben and Cai on her death, and her Will has nothing to act on.'],
        c: 'The answer turns on severance.' },
      { i: 'Whether Ann severed the joint tenancy before she died.',
        l: ['Statutory severance needs three steps: a declaration in the approved form, service on every other joint tenant, and registration (**s 53(5), (6) LTA**). It takes effect only on registration (**Chan Lung Kien v Chan Shwe Ching** [2018], overruling **Diaz v Diaz**). Equity severs by acting on one\'s own share, mutual agreement or a mutual course of dealing (**Williams v Hensman**); a Will and a unilateral statement do not sever, and nor do failed negotiations (**Burgess v Rawnsley**).'],
        a: ['Ann completed the first two steps but died before registration, so under Chan Lung Kien the statutory route did not sever. A unilateral declaration is not an act on her own share in equity, such as a sale or a mortgage, and nothing suggests an agreement or course of dealing with Ben and Cai. Her Will speaks only at death, after survivorship has operated.'],
        c: 'There was no severance.' }
    ],
    advice: 'Ben and Cai own the whole shophouse by survivorship and Dan takes nothing in it. A joint tenant who wants to sever must register the declaration, not just serve it.',
    traps: ['Letting a Will pass a joint share.', 'Treating service as enough.', 'Forgetting the equitable modes before concluding.'],
    vary: [['Ann had sold her share to a buyer before she died', 'Acting on her own share severs in equity (Williams v Hensman); the buyer holds a third as tenant in common.'], ['One sibling killed another', 'Re K: no benefit by survivorship.']]
  },
  {
    title: 'Beneficial ownership: resulting trusts, advancement and common intention', lots: 'Lot 7', weight: 'High (past-year CS2(a))',
    signals: ['One person paid; a partner, child or spouse is on the title.', 'Messages about intention; unequal contributions; mortgage repayments.'],
    issues: ['Legal title.', 'Actual intention, then presumptions.', 'Burden and timing.', 'Survivorship and the Will.'],
    q: 'After his divorce, Zen bought a penthouse and put his partner Belle\'s name on the registered title with his. Belle paid nothing towards the price. When he added her name, he sent her a WhatsApp message: "this is my assurance for you, to have and to hold forever". The Bigbank mortgage was in both their names as co-borrowers. During the divorce Zen had made a Will leaving "all his assets and property" to his two adult children. Zen has died. Discuss the respective rights of Belle and the children in the penthouse.', marks: '20 marks · about 26 minutes',
    answer: [
      { i: 'How Zen and Belle held the legal title.',
        l: ['Co-owners named without words of severance are joint tenants (**s 53(1) LTA**). On the death of a joint tenant the survivor takes the legal title by survivorship, and a Will cannot pass a joint share (**Shafeeg v Fatimah** [check facts]).'],
        a: ['The title names Zen and Belle with no words of severance, so they were legal joint tenants. Belle now holds the legal title alone. Zen\'s Will was made before the purchase and did not sever (s 53(5), (6) LTA; Chan Lung Kien), and no equitable mode of severance appears.'],
        c: 'Belle is the sole legal owner; the question is whether she holds any of it on trust for Zen\'s estate.' },
      { i: 'Whether Belle holds on a resulting trust for Zen\'s estate.',
        l: ['The court first looks for the transferor\'s actual intention at acquisition (**Goh Swee Fang**; **Wong Mei Lee Millie v Jake Ngor** [2026] SGCA 27), and presumptions are a last resort (**Patricia Khoo v Khoo Gaik Pin**). For gratuitous joint names Patricia Khoo gives four scenarios: (1) immediate benefit, so a beneficial joint tenancy; (2) benefit only on the transferor\'s death, so a resulting trust until then; (3) no benefit, so a resulting trust; (4) unclear, so the presumptions. A payer is presumed to keep the benefit, the person asserting the trust carries the burden, and the shares are fixed at acquisition (**Lau Siew Kim**). Mortgage repayments count only if the parties\' plan treated them as contributions (**Chan Yuen Lan**). The older rule gives no presumption of advancement between unmarried partners [check].'],
        a: ['Belle paid nothing, so the children will argue a resulting trust and say the beneficial interest passes under the Will. They bear the burden of proving it. Stage 1 decides the case. Zen deliberately added Belle\'s name "to assure her of his commitment", and his message "to have and to hold forever" speaks of a present, lasting gift. That fits scenario 1: an immediate benefit, so they were beneficial joint tenants. The children\'s best reply is that "forever" meant security only while Zen lived (scenario 2), or that her name was added only for the mortgage. Belle\'s liability as co-borrower is not a contribution to the price unless their plan was that she would repay, so it does not help either side much. Advancement does not help Belle, but she does not need it because the evidence of intention is strong.'],
        c: 'On the evidence Zen intended an immediate gift, so Belle is beneficially entitled to the whole penthouse by survivorship.' }
    ],
    advice: 'Belle owns the penthouse, subject to Bigbank\'s mortgage, and the Will passes nothing in it. The children have an arguable resulting trust claim that turns on intention; if they lodged a caveat, see topic 20.',
    traps: ['Starting with the presumptions instead of actual intention.', 'Putting the burden on the recipient.', 'Counting the mortgage as Belle\'s contribution without a plan.', 'Using s 112 Women\'s Charter for unmarried partners.'],
    vary: [['Mdm Wee paid for a flat in her daughter Joy\'s name; no evidence of intention', 'Resulting trust meets the presumption of advancement (parent to child), judged at the transfer: Joy probably keeps the flat.'], ['Ken paid 90% and Lily 10% for a flat in joint names', '90:10 resulting trust, tenancy in common in equity, no survivorship, unless Lily proves a common intention to share equally (DOP v DOO).']]
  },
  {
    title: 'Ending co-ownership: sale in lieu of partition, business partners, divorce', lots: 'Lot 7', weight: 'Medium',
    signals: ['Co-owners fall out; one lives there, the other wants a sale.', 'Business partners registered as joint tenants.', 'Spouses divorce.'],
    issues: ['Sale in lieu of partition.', 'Survivorship in business.', 'Divorce.'],
    q: 'Brothers Hock and Seng own their late father\'s house as tenants in common in equal shares. Hock lives in the house. Seng, who lives overseas, wants it sold, and Hock refuses. Advise Seng.', marks: '8 marks · about 10 minutes',
    answer: [
      { i: 'Whether Seng can obtain an order for sale in lieu of partition.',
        l: ['Co-ownership ends by joint sale, partition or a court-ordered sale in lieu of partition. The court orders sale where it is necessary or expedient, weighing the co-owners\' relationship, the state and use of the property, and the prejudice to each (**Abu Bakar v Jawahir**; **Chiam Heng Luan** [check each]).'],
        a: ['The brothers cannot agree, so cooperation over the house is not realistic. Seng, overseas, has no use of the house and no return from his half. Hock would lose his home and face the cost of moving, which is real prejudice. A house cannot sensibly be partitioned physically, which points to sale. Hock can avoid a sale by offering to buy Seng\'s half at a fair value.'],
        c: 'A court is likely to order sale unless Hock buys Seng out or proves serious prejudice.' }
    ],
    advice: 'Seng should apply for an order for sale and offer Hock the chance to buy his share; the proceeds are divided equally.',
    traps: ['Treating sale as automatic.', 'Applying survivorship to business partners (Malayan Credit: they are tenants in common in equity).', 'Giving unmarried partners a s 112 Women\'s Charter remedy.']
  },
  {
    title: 'Was a contract formed? "Subject to contract", writing and part performance', lots: 'Lot 8', weight: 'High',
    signals: ['WhatsApp or email negotiation with "subject to contract".', 'A "goodwill deposit" but no signed OTP.', 'The seller sells to someone else; the buyer talks of a caveat.'],
    issues: ['Formation.', 'Enforceability (s 6(d), part performance).', 'Remedies, money and the caveat.'],
    q: 'Over two weeks Marcus and Mr Lee negotiated on WhatsApp for Mr Lee\'s Punggol unit. Every message from Mr Lee ended with "subject to contract". They agreed $1.18m, completion in 10 weeks, and that the curtains and aircon would be included. Marcus paid $1,000 by PayNow marked "goodwill deposit". Mr Lee replied: "Ok received. Lawyer will send OTP Monday, subject to contract ya." On Sunday another buyer offered $1.25m; Mr Lee granted that buyer an OTP and told Marcus: "Sorry, deal off. Will refund." Marcus wants the unit and is thinking of lodging a caveat. Advise Marcus.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether a binding contract was formed.',
        l: ['A contract needs offer, acceptance, consideration, certainty and an intention to be bound, judged objectively. "Subject to contract" is not conclusive, but it creates a strong presumption that the parties do not intend to be bound until a formal contract, rebutted only by strong context (**Norwest Holdings v Newport Mining** [2011] SGCA 42). The court looks at all the circumstances and can find a contract despite the label (**OCBC Capital Investment v Wong Hua Choon** [2012] SGCA 54); the older strict view is **Tai Tong Realty v Galstaun**.'],
        a: ['Every message from Mr Lee carried the label, including his reply to the $1,000, and he said his lawyer would send the OTP on Monday. Both sides therefore expected a signed OTP before anyone was bound, and none was ever granted. The "goodwill deposit" is not an option fee, which is paid against a signed OTP. Marcus will argue that the price, completion date and inclusions were all agreed and that he paid money, so under OCBC the court should find a contract. That argument is weak here: unlike OCBC there were no common solicitors and no conduct treating the deal as done, and Mr Lee\'s own words tied the deal to the OTP.'],
        c: 'There is likely no binding contract.' },
      { i: 'If there were a contract, whether it could be enforced, and the remedies.',
        l: ['No action lies on a land contract unless it, or a signed memorandum, is in writing (**s 6(d) Civil Law Act**); emails can suffice (**Joseph Mathew**), and part performance needs acts unequivocally referable to the contract (**Hu Lee Impex**). Specific performance is discretionary (**EC Investment v Ridout Residence**).'],
        a: ['The WhatsApp messages state the parties, the unit and the price and may carry Mr Lee\'s name, so they arguably satisfy s 6(d) [check]. A $1,000 payment is too small and equivocal to be part performance. If a contract existed, specific performance would be the natural remedy for a unique home.'],
        c: 'This fallback matters only if the court finds a contract, which is unlikely.' },
      { i: 'Whether Marcus can lodge a caveat and recover his money.',
        l: ['Only a person claiming an interest in land may lodge a caveat (**s 115 LTA**), and a caveat lodged without reasonable cause exposes the caveator to compensation (**s 128**). Money paid for a purpose that fails is recoverable.'],
        a: ['Without a contract Marcus has no equitable interest, so he has nothing to caveat. A caveat would block the sale to the other buyer and expose him to a s 128 claim for Mr Lee\'s losses. The $1,000 was paid towards an OTP that never came, so Marcus can recover it, and Mr Lee has offered a refund.'],
        c: 'Marcus should not lodge a caveat; he should recover the $1,000.' }
    ],
    advice: 'Marcus cannot compel the sale. He should take the refund, and next time insist on a signed OTP and pay the option fee against it.',
    traps: ['Citing only one of Norwest and OCBC: state both, then choose with two facts.', 'Forgetting s 6(d).', 'Stopping at "no contract" without dealing with the money and the caveat.'],
    vary: [['Mr Lim replied "deal", took a $20,000 "deposit" and let Ms Chua renovate', 'OCBC and part performance give her a real argument; then Torrens issues against any registered buyer (topic 19).'], ['Tan orally sold a shophouse; Sam paid $300,000, took possession and renovated', 'Part performance: the contract is enforceable and a caveat is justified.']]
  },
  {
    title: 'The option to purchase: exercise, deposits and timing', lots: 'Lot 8', weight: 'High',
    signals: ['Exercise late, by email, or without the cheque.', 'A higher offer during the option period.', 'Failure to sign the formal agreement.'],
    issues: ['Effect of the OTP.', 'Valid exercise.', 'Deposit and option fee.'],
    q: 'An OTP says it is exercisable by delivering written notice with a cheque for the balance deposit to the seller\'s solicitors by 5 pm on Friday. The buyer emailed a scan of the notice at 6 pm on Friday and delivered the cheque on Monday. The seller refuses to proceed and has accepted a higher offer. Advise the buyer.', marks: '8 marks · about 10 minutes',
    answer: [
      { i: 'Whether the option was validly exercised.',
        l: ['To the buyer an OTP is an irrevocable offer that the seller cannot withdraw during the option period, and the contract of sale arises only on exercise (**Spiro v Glencrown**). Exercise must comply strictly with the manner and time the OTP specifies, and a further step the OTP requires has the effect the OTP gives it (**JT Chanrai v Consolidated Hotels**). Stamp duty on an exercised OTP is due within 14 days.'],
        a: ['The OTP required written notice and a cheque delivered to the solicitors by 5 pm on Friday. The buyer missed the time (6 pm), used a different method (an emailed scan, not delivery) and sent the cheque on Monday. Each requirement was missed, so the offer lapsed at 5 pm on Friday. The buyer may argue that the seller waived strict compliance, but a seller who promptly refused and took another offer has not waived anything.'],
        c: 'The option lapsed unexercised; no contract arose.' }
    ],
    advice: 'The buyer cannot compel the sale. The option fee is normally forfeited when the option lapses; if any balance deposit was paid on Monday, the buyer should ask for it back.',
    traps: ['Treating the OTP as the contract before exercise.', 'Being lenient about late or informal exercise.', 'Forgetting the 14-day stamp duty rule in MCQs.']
  },
  {
    title: 'After the contract: misrepresentation, requisitions and specific performance', lots: 'Lot 8', weight: 'Medium-high',
    signals: ['An untrue statement about seepage, noise or approvals before exercise.', '"Subject to satisfactory replies to requisitions" and a bad reply.', 'The seller refuses to complete.'],
    issues: ['Misrepresentation and its type.', 'Requisitions.', 'Remedies.'],
    q: 'Before exercising an OTP, Mina asked the seller\'s agent whether the flat had water seepage and whether the area was quiet. The agent said "no seepage, quiet area". After exercise Mina found long-term seepage in the bathroom ceiling and a night-time construction site opposite, both of which the agent knew about. Separately, Nia exercised an OTP "subject to satisfactory replies to requisitions"; the URA reply says 25% of the frontage may be acquired for road widening. Advise Mina and Nia.', marks: '12 marks · about 15 minutes',
    answer: [
      { i: 'Whether Mina can rescind or claim damages for misrepresentation.',
        l: ['A misrepresentation is an untrue statement of fact that induces the contract. It is fraudulent if made knowingly, without belief in its truth or recklessly (**Derry v Peek**), giving rescission and damages. If negligent, damages lie unless the maker proves reasonable belief (**s 2(1) Misrepresentation Act**). If innocent, the court may give rescission or damages in lieu (**s 2(2)**). Opinions and sales puffs are not statements of fact, but a half-truth can mislead. A seller is bound by statements his agent makes within authority.'],
        a: ['"No seepage" is a statement of fact. It was untrue, and Mina asked the question before exercising, so it induced the contract. "Quiet area" is partly opinion, but the agent knew of the construction site, so it misrepresented a fact he knew. The agent made both statements within his authority to market the flat, so the seller is bound. Because the agent knew the truth, the misrepresentation is fraudulent, or at least negligent under s 2(1).'],
        c: 'Mina can rescind and recover her money, or affirm and claim damages; she must act promptly to avoid affirming the contract.' },
      { i: 'Whether Nia can withdraw on the requisition reply.',
        l: ['A contract "subject to satisfactory replies to requisitions" gives the buyer a conditional exit if the replies are not satisfactory, judged by what a reasonable buyer would accept (**Chu Yik Man v S Rajagopal**; **Sheriffa v Lim Kim Som** [check holdings]).'],
        a: ['The possible loss of a quarter of the frontage affects the use, access and value of the land. A reasonable buyer would not regard that as satisfactory, even if the acquisition may be years away. The seller\'s view that the reply is satisfactory does not decide the point.'],
        c: 'Nia may withdraw, but she must do so promptly, in writing and within the terms of the OTP.' }
    ],
    advice: 'Mina should give notice of rescission now and claim her money and costs from the seller, who can look to the agent. Nia should withdraw in writing and ask for her deposit back.',
    traps: ['Treating "quiet area" as pure opinion without the half-truth point.', 'Forgetting that delay risks affirmation.', 'Treating specific performance as automatic.']
  },
  {
    title: 'Torrens title: indefeasibility, fraud, rectification and the Assurance Fund', lots: 'Lot 9', weight: 'High (the Ong question)',
    signals: ['A forged transfer; a buyer who was warned or paid cash.', 'A bank registered behind the forger\'s transferee.', 'A later gift; the true owner returns.'],
    issues: ['Each registered person: purchaser, fraud, wilful blindness.', 'The bank.', 'The owner\'s remedies.'],
    q: 'Mr Ong is the registered proprietor of a terrace house worth about $2.4m. While he worked in Shanghai, his nephew Seng forged his signature on a transfer of the house to Seng\'s friend Bobby for $900,000. Bobby\'s lawyer warned him that the signature looked nothing like the specimen on file and that the price was far below market. Bobby replied, "Don\'t ask so many questions, just register it", paid Seng in cash and was registered. A month later Bobby mortgaged the house to Harbour Bank for $1.5m; the bank made its usual checks, had no reason to suspect anything and registered its mortgage. Bobby has stopped paying. Advise Mr Ong.', marks: '20 marks · about 26 minutes',
    answer: [
      { i: 'Whether Bobby\'s registered title is indefeasible.',
        l: ['Registration is the source of title (**s 45 LTA**; **Breskvar v Wall**). A registered proprietor holds free of other interests (**s 46(1)**), and Singapore follows immediate indefeasibility, so an innocent registered purchaser takes good title even under a forged instrument (**Frazer v Walker**). Only a purchaser in good faith for value is protected (**s 4**; **s 46(3)**). Title is defeasible where the proprietor or his agent was a party to fraud or forgery (**s 46(2)(a)**). Fraud means actual dishonesty (**Assets Co v Mere Roihi**), and deliberately shutting one\'s eyes after suspicion is aroused counts (**Waimiha**; **UOB v Bebe** [2006] SGCA 30).'],
        a: ['Bobby took under a forged transfer. Frazer v Walker would protect him if he were innocent, but he was warned by his own lawyer that the signature did not match and that the price was less than 40% of market value. Suspicion was actually aroused, and his reply, "Don\'t ask so many questions, just register it", was a decision not to find out the truth. Paying cash supports that inference. That is wilful blindness, which Bebe treats as dishonesty, so s 46(2)(a) applies; for the same reason he is not a purchaser in good faith under s 4.'],
        c: 'Bobby\'s title is defeasible.' },
      { i: 'Whether Harbour Bank\'s mortgage binds Mr Ong.',
        l: ['Each registered party is judged on its own conduct. A mortgagee is a purchaser for value. A third party\'s fraud does not defeat a registered proprietor who was not party to it, and a person dealing with the registered proprietor need not look behind the register (**s 47(1)**; **UOB v Bebe**).'],
        a: ['Harbour Bank dealt with Bobby, the registered proprietor, made its usual checks and had no suspicion. Bobby was not the bank\'s agent, so his fraud is not the bank\'s fraud. As in Bebe, where UOB\'s mortgage stood although the mortgagor had used a cancelled title, and in Frazer v Walker itself, the bank holds an indefeasible registered mortgage.'],
        c: 'The bank\'s mortgage binds the house even after Bobby\'s title is set aside.' },
      { i: 'What Mr Ong can do.',
        l: ['The court may cancel or correct the register for fraud (**s 160**), but not against a proprietor in possession who was not party or privy to it (**s 160(2)**). A claimant should protect his claim by caveat (**s 115**). The Assurance Fund compensates loss caused by the Registrar\'s or staff\'s omission, mistake or misfeasance (**ss 151, 155**); a stranger\'s forgery alone does not trigger it.'],
        a: ['Bobby was party to the fraud, so s 160(2) does not protect him: Mr Ong can have Bobby\'s registration cancelled and his own restored, subject to the bank\'s charge. He should lodge a caveat at once to stop further dealings, and sue Seng and Bobby for his losses, including the $1.5m charge he must now pay off. The Assurance Fund will not help, because nothing suggests any error by the Registry.'],
        c: 'Mr Ong recovers the house but subject to the $1.5m mortgage, and must look to Seng and Bobby for that loss.' }
    ],
    advice: 'Mr Ong should caveat immediately, apply under s 160 to cancel Bobby\'s registration, and sue Seng and Bobby; he must deal with Harbour Bank as mortgagee.',
    traps: ['Letting Bobby\'s fraud taint the bank.', 'Calling negligence or notice "fraud".', 'Promising Assurance Fund money without Registry error.'],
    vary: [['Bobby was honest and paid a fair price', 'Bobby\'s title is indefeasible; Mr Ong is left with claims against Seng (and the Fund only for Registry error).'], ['Bobby gave the house to his sister, who registered', 's 46(3): she takes no better title than Bobby, so hers falls with his.']]
  },
  {
    title: 'Caveats: lodging, removal and compensation', lots: 'Lot 9', weight: 'High (past-year CS2)',
    signals: ['A buyer, heir or claimant lodges a caveat.', 'The owner wants to sell and asks how to remove it.', 'A disputed claim, or a claim only to money.'],
    issues: ['A caveatable interest.', 'The removal route.', 'Serious question and balance of convenience.', 'Security and compensation.'],
    q: 'After Zen\'s death, his children lodged a caveat against the penthouse, claiming that Belle holds it on a resulting trust for Zen\'s estate. Belle, now the sole registered proprietor, wants to sell the penthouse to clear the mortgage. Advise Belle on removing the caveat.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether the children claim a caveatable interest.',
        l: ['Any person claiming an interest in land may lodge a caveat (**s 115 LTA**). The interest must exist when the caveat is lodged (**Asiatic Enterprises**), and a bare contractual right to money is not enough (**Salbiah v Micro Credit**). A caveat takes effect on lodgment and blocks conflicting dealings (**s 119**), and lapses after 5 years (**s 121**).'],
        a: ['The children claim a beneficial interest in the penthouse under a resulting trust, through Zen\'s estate. That is an interest in land, not a claim to money, and it existed (if at all) from the purchase. Whether the children themselves or the executor should have lodged it is a point Belle can raise [check].'],
        c: 'The children claim a caveatable interest.' },
      { i: 'Which removal route Belle should use, and whether she will succeed.',
        l: ['Under **s 127(1)** the proprietor may apply for removal for any reason, and the caveator must then show cause; under **s 127(2)** the caveat may be removed if lodged vexatiously, frivolously or not in good faith. Disputed facts are approached as in **American Cyanamid**: is there a serious question to be tried, and where does the balance of convenience lie (**Eng Mee Yong v Letchumanan**)? The court may require the caveator to give an undertaking or security (**s 124**), and a caveat lodged wrongfully or without reasonable cause attracts compensation (**s 128**).'],
        a: ['Belle should proceed under s 127(1), because the children\'s claim is genuinely arguable, so a case that it was lodged vexatiously or in bad faith under s 127(2) would fail. Under s 127(1) the children must show cause. Zen\'s intention when he added Belle\'s name is a real dispute, so there is a serious question to be tried. On the balance of convenience, Belle needs to sell to clear the mortgage, while the children\'s interest, if it exists, can be protected by holding the sale proceeds. The court may therefore keep the caveat until trial but require an undertaking and security under s 124, or allow the sale with the proceeds held pending trial. Compensation under s 128 is unlikely, because the children have an honest and arguable claim.'],
        c: 'The caveat will probably stand pending trial, but Belle can secure an undertaking or a sale with the proceeds held.' }
    ],
    advice: 'Belle should apply under s 127(1), seek an order for the children\'s undertaking and security, and propose that the penthouse be sold with the net proceeds held until the trust question is decided.',
    traps: ['Not naming s 127(1) or (2) at the start, as the lecturer requires.', 'Allowing a caveat for a bare money claim.', 'Forgetting s 124 and s 128.'],
    vary: [['Daniel caveats on an alleged oral deal; his $20,000 may have been a loan', 'Thin evidence and Farah\'s pending sale tip the balance: removal, or a caveat kept only on security.']]
  },
  {
    title: 'Stamp duty and ABSD', lots: 'Lot 9', weight: 'Medium (MCQ, short part)',
    signals: ['Buyers of different residency status buying together.', 'Timing after an OTP is exercised.'],
    issues: ['Each buyer\'s rate.', 'The rate for the joint purchase.', 'Timing.'],
    q: 'Claire, a Singapore citizen, is married to Andre, a German citizen and Singapore PR. They live in a condominium unit owned by Claire and plan to buy a landed property as co-owners. What ABSD applies, and when is stamp duty payable?', marks: '6 marks · about 8 minutes',
    answer: [
      { i: 'Which ABSD rate applies to the joint purchase.',
        l: ['ABSD depends on residency status and the number of properties owned (slide figures; confirm current IRAS rates): citizens 0% on a first property, 20% on a second and 30% on a third; PRs 5%, 30% and 35%; foreigners 60%. Where joint buyers have different profiles, the higher applicable rate applies to the whole purchase. Rates are never averaged.'],
        a: ['Claire already owns the condominium, so the landed property is her second: 20%. Andre, a PR buying his first property, would pay 5%. Because they buy jointly, the higher rate, 20%, applies to the whole price, and both are liable as buyers. Andre\'s first-time status does not reduce the rate.'],
        c: 'ABSD of 20% applies to the whole purchase.' },
      { i: 'When stamp duty is payable.',
        l: ['Stamp duty is a tax on documents, payable by the buyer within 14 days of exercising the OTP (**Stamp Duties Act**).'],
        a: ['Claire and Andre must pay buyer\'s stamp duty and ABSD within 14 days of exercising their OTP.'],
        c: 'Both duties fall due within 14 days of exercise.' }
    ],
    advice: 'They should budget for 20% ABSD on top of buyer\'s stamp duty, or consider whether Claire should sell her condominium first [check current IRAS remission rules].',
    traps: ['Averaging the rates.', 'Treating only one buyer as liable.']
  },
  {
    title: 'Agency: authority, ratification and the principal\'s liability', lots: 'Lot 10', weight: 'Medium',
    signals: ['An agent grants an OTP or makes a statement without authority; the owner adopts it.', 'Promoters sign for an unformed company.', 'A wrong listing.'],
    issues: ['Actual, then apparent authority.', 'Ratification.', 'The agent\'s own liability.'],
    q: 'Apex Pte Ltd instructed agent Zed to sell a shop unit. Zed\'s listing stated "approved for F&B use". The unit is not so approved. A buyer relied on the listing, exercised an OTP and now cannot operate a restaurant. Advise the buyer, Apex and Zed.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether Apex is bound by Zed\'s statement.',
        l: ['A principal is bound by acts within the agent\'s actual or apparent authority. Apparent authority arises from a representation by the principal, reliance by the third party, and authority the principal could have given (**Freeman & Lockyer v Buckhurst Park**); an agent cannot create his own apparent authority (**Armagas v Mundogas**). A principal is liable for misrepresentations its agent makes within authority.'],
        a: ['Apex appointed Zed to market the unit. Describing the property in a listing is within an estate agent\'s actual or usual authority, and Apex\'s appointment held him out as authorised to do so. The buyer relied on the listing. Apex is therefore responsible for the statement.'],
        c: 'Apex is bound by Zed\'s listing.' },
      { i: 'What the buyer can claim.',
        l: ['An untrue statement of fact that induces the contract is a misrepresentation: rescission and damages for fraud (**Derry v Peek**), damages for negligence unless the maker proves reasonable belief (**s 2(1) Misrepresentation Act**), rescission or damages in lieu for innocent misrepresentation (**s 2(2)**).'],
        a: ['"Approved for F&B use" is a statement of fact about the property, it was untrue, and the buyer relied on it in exercising the OTP. Unless Apex can prove reasonable grounds for believing it, the buyer can claim damages under s 2(1), and can rescind and recover the money paid if it acts promptly.'],
        c: 'The buyer can rescind or claim damages against Apex.' },
      { i: 'Zed\'s liability.',
        l: ['An agent owes the principal a duty of reasonable care and skill and must comply with the CEA Code of Ethics. An agent who claims authority he lacks is liable for breach of warranty of authority (**Collen v Wright**).'],
        a: ['If Zed published the statement without checking the approval, he breached his duty of care to Apex, so Apex can recover its loss from him, unless Apex gave him the wrong information. The CEA may discipline Zed for a misleading listing.'],
        c: 'Zed is liable to Apex and may face CEA action.' }
    ],
    advice: 'The buyer should rescind promptly or claim damages from Apex; Apex should claim over against Zed.',
    traps: ['Letting the agent\'s own statements create apparent authority.', 'Saying ratification binds only from the date of ratification (it relates back: Bolton v Lambert).', 'Forgetting that promoters are personally liable (Kelner v Baxter).']
  },
  {
    title: 'The agent as fiduciary: secret profits, bribes and conflicts', lots: 'Lot 10', weight: 'High (practice paper sample)',
    signals: ['Trade discounts kept by the agent.', 'A fee from the buyer; a sale to a relative\'s company; offers not passed on.', 'Acting for both sides.'],
    issues: ['Which duties were breached.', 'Honest or dishonest.', 'The five remedies, matched to the facts.'],
    q: 'James hired KFM Property Agency to sell four of his industrial units for a 2% commission and agreed to pay KFM\'s expenses. KFM sold the units and was paid its commission, but it had enjoyed a trade discount on the advertising, marketing and printing costs it charged James in full. The discount was a custom of the trade, but James did not know of it. Discuss the legal positions of KFM and James.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether KFM breached its fiduciary duty by keeping the discounts.',
        l: ['An agent is a fiduciary: he must act in good faith, avoid conflicts, disclose material facts and make no secret profit from his position without the principal\'s informed consent. A trade custom unknown to the principal is no defence (**Hippisley v Knee Brothers**).'],
        a: ['KFM charged James the full price of advertising, marketing and printing while paying a discounted price, so it made a profit from its position as James\'s agent. James was never told and did not consent. KFM will say the discount is a custom of the trade, but in Hippisley exactly that argument failed against a principal who did not know of the custom. KFM\'s honesty does not excuse the breach, because the no-secret-profit rule is strict.'],
        c: 'KFM is in breach of fiduciary duty.' },
      { i: 'What James can recover, and whether KFM keeps its commission.',
        l: ['The principal may require the agent to account for a secret profit. An honest agent who took undisclosed discounts must account for them but may keep his agreed commission (**Hippisley**); a dishonest agent also forfeits his commission (**Andrews v Ramsay** [check exact holding]). An agent may be reimbursed only for expenses properly incurred.'],
        a: ['James can make KFM account for the whole discount, since KFM may recover only the expenses it actually incurred. On the facts KFM acted honestly, following trade practice, and earned its commission on completed sales, so, as in Hippisley, it will likely keep its 2% commission. James could argue that the breach justifies forfeiture, but that is the rule for dishonest agents.'],
        c: 'James recovers the discounts; KFM likely keeps its commission.' }
    ],
    advice: 'James should demand an account of the discounts and repayment. KFM should repay them and in future disclose any discount and obtain consent.',
    traps: ['Accepting trade custom as a defence.', 'Applying Hippisley to a dishonest agent.', 'Listing remedies without matching them to the facts.'],
    vary: [['Kelvin hid that the buyer was his cousin\'s company, suppressed $1.32m offers and took a $4,000 "appreciation fee" from the buyer', 'Two breaches (conflict: McPherson v Watt; non-disclosure), a bribe held on constructive trust (FHR), forfeiture of commission (Andrews v Ramsay), rescission of the OTP before completion, and damages for the $140,000 loss; Star Realty and a CEA complaint.'], ['Rita acted for both buyer and seller and took two commissions', 'Undisclosed conflict and secret commission: account, refuse her commission, CEA complaint.']]
  },
  {
    title: 'Commission: exclusive and non-exclusive agency, effective cause', lots: 'Lot 10', weight: 'High',
    signals: ['A sale to a buyer the agent never met, or through another agent.', 'Time gaps, price changes, rival agents.', 'A CEA exclusive form.'],
    issues: ['What the agreement says.', 'Clause 6 or effective cause.', 'Any forfeiture for breach.'],
    q: 'Mr Chen gave agent Ali an exclusive agency for 3 months at 1% commission on the CEA prescribed form. In the second month Mr Chen granted an OTP to his neighbour, whom Ali never met, and the neighbour exercised it two weeks later. Mr Chen refuses to pay Ali. Separately, under a non-exclusive 1% agency, agent Bee introduced Ms Ong, who offered $1m for Mr Tay\'s flat; Mr Tay wanted $1.1m. Four months later Ms Ong bought the flat for $1.05m through another agent, who persuaded her. Advise Ali and Bee.', marks: '10 marks · about 13 minutes',
    answer: [
      { i: 'Whether Ali is entitled to commission.',
        l: ['Commission depends first on the agency agreement. Under the CEA exclusive form, Clause 6 makes commission payable if the seller enters a binding agreement for sale within the validity period (up to 3 months, with a 3-month tail for buyers introduced during the period), whoever introduced the buyer; effective cause is irrelevant. A binding agreement on an OTP arises on exercise (**Spiro v Glencrown**).'],
        a: ['Ali held an exclusive agency for 3 months. The OTP was granted in the second month and exercised two weeks later, still within the period, so a binding sale was made during validity. Clause 6 applies, and it does not matter that Ali never met the neighbour.'],
        c: 'Mr Chen owes Ali his 1% commission.' },
      { i: 'Whether Bee is entitled to commission.',
        l: ['Under a non-exclusive agency the agent must be the effective cause of the sale (**Grandhome v Ng Kok Eng**): commission was promised, the agent engendered the buyer\'s interest, conveyed the offer, and the sale went to the same buyer at about the same price within a short time; the owner may show a break in the chain. A commission-only agent earns nothing unless the sale happens (**Luxor v Cooper**).'],
        a: ['Bee introduced Ms Ong and conveyed her $1m offer, so the first elements are met. But the sale came four months later, at a different price, after another agent persuaded her to buy. The time gap, the price change and the second agent\'s intervention break the chain of causation, so Bee was not the effective cause.'],
        c: 'Bee is unlikely to earn commission.' }
    ],
    advice: 'Ali should claim his 1% commission from Mr Chen. Bee has no claim unless she can show her introduction was still the real cause of the sale.',
    traps: ['Using effective cause under an exclusive agreement.', 'Forgetting that the OTP exercise date decides whether the sale fell in the period.', 'Forgetting that dishonesty forfeits commission anyway.']
  }
];
