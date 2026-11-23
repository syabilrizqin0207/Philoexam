// Paper 3: Section B answer sheet for the six Land Lah! mock papers.
// The question text and the marking scheme come from the app (LL.ref.mocks → LL.cases). The model answers are here,
// one ILAC block per issue. A block may instead be {ref: [topic, block]}, reusing a Paper 2 topic answer
// (papers/topics.mjs, 0-based) for the past-year case studies, so both papers say the same thing.
export default {
  title: 'RE2702 Land Law: Section B Answer Sheet for the Six Mock Papers',
  subtitle: 'Each mock\'s case study, where its 40 marks are, and a full model answer in ILAC with a conclusion for every party',
  meta: 'Section B: one case study, 40 marks, about 50 minutes · plan for 5 to 7 minutes · one ILAC block per issue · bold every authority · every named party gets a conclusion · [check] = confirm on your slides',
  intro: [
    'These are full-marks answers: they show every point the marking scheme rewards. In the hall you will not have time to write all of it. Aim for the issue headings, the law with the bolded authority, two or three facts applied to each rule, and a conclusion for each party. The table before each answer shows where the marks sit, so you can see which points carry the most.'
  ],
  mocks: {
    m1: {
      parts: [{ blocks: [
        { ref: [3, 0] }, { ref: [3, 1] }, { ref: [3, 2] },
        { ref: [7, 0] }, { ref: [7, 1] }, { ref: [7, 2] },
        { ref: [8, 0] },
        { ref: [9, 0] }, { ref: [9, 1] }, { ref: [9, 2] },
        { i: 'Whether Mrs Leong has a claim in nuisance for the noise and traffic.',
          l: ['Private nuisance is an unreasonable interference with a neighbour\'s use and enjoyment of land. The occupier who creates it is liable, and so is a landlord who authorises the activity that causes it.'],
          a: ['Children coming and going for Science lessons in a residential street bring noise and traffic that a private dwelling would not. The students run the lessons, so they are liable. Gabby let the rooms on terms forbidding business use, so she did not expressly authorise the lessons, but once she knows of them and lets them continue she is at risk. The claim overlaps with covenant (ii), which gives Mrs Leong the simpler route.'],
          c: 'Mrs Leong has a nuisance claim against the students, and possibly against Gabby, alongside covenant (ii).' }
      ] }],
      parties: [
        ['Mrs Leong', 'Sue Gabby for damages for the roof and wall and an order to repair; seek an injunction against Gabby and the students to stop the lessons (covenant (ii), Tulk v Moxhay and nuisance).'],
        ['Gabby', 'Liable to Mrs Leong on all three covenants; bound by the lock-in, variable rate and tied insurance; cannot evict the students before month 24; should clear the arrears or redeem.'],
        ['Bestbank', 'May enter after one month\'s notice and sell once the power is exercisable, taking reasonable care over the price, but takes subject to the students\' 24-month lease and must credit their rent to the debt.'],
        ['The students', 'Tenants until month 24; the notice to vacate is ineffective; they must stop the lessons, pay on time, and can use s 18A if forfeiture for rent is threatened.']
      ]
    },

    m2: {
      parts: [
        { blocks: [{ ref: [13, 0] }, { ref: [13, 1] }, { ref: [19, 0] }, { ref: [19, 1] }] },
        { blocks: [{ ref: [6, 0] }, { ref: [6, 1] }, { ref: [6, 2] }] }
      ],
      parties: [
        ['Belle', 'Sole legal owner by survivorship and, on the best reading of Zen\'s message, the whole beneficial owner; she should apply under s 127(1) with security under s 124, pay Bigbank at the contract rate (not 28%) and expect the nine-year bar to stand.'],
        ['The children', 'The Will passes nothing in the penthouse; their only route is a resulting trust claim, on which they carry the burden; their caveat will probably stay to trial, and s 128 compensation is unlikely.'],
        ['Bigbank', 'Its registered charge ranks first; the 28% default rate is likely a penalty, so it recovers the contract rate and real loss; the redemption bar probably stands; on default it may enter after notice and sell.']
      ]
    },

    m3: {
      parts: [
        { blocks: [
          { i: 'Whether Kai is a tenant or a licensee, and whether the one-month notice ended his right to occupy.',
            l: ['Exclusive possession for a term at a rent creates a tenancy whatever the document calls it (**Street v Mountford**; followed in **Goh Cin Chye** [check facts]). A clause that the parties never intended to operate is a sham and is ignored (**Antoniades v Villiers**). Retained keys do not by themselves defeat exclusive possession; the question is why they were kept (**Aslan v Murphy** [check]). A lease of 7 years or less at a rack rent needs no deed (**s 53(1) CLPA**) and, on registered land, is an overriding interest that binds a buyer. A fixed term ends with the term; a notice to quit cannot end it early without a break clause.'],
            a: ['Kai holds the keys to the ground floor for a fixed three years at $6,000 a month, which is a market rent for a café. Clause 4, letting Mdm Rosnah "introduce other occupiers", has never been used and would make a café impossible to run, so it is a sham. The spare key is kept "for emergencies", a limited purpose that does not give her general access. The locked back room is simply excluded from the grant. Kai therefore has exclusive possession of what was let to him, so the "Licence to Occupy" is a three-year lease. It needs no deed, and because it is for 7 years or less it binds a buyer as an overriding interest. Nothing suggests a break clause, so the one-month notice "terminating the licence" is ineffective, and a wish to sell with vacant possession is not a ground for ending a fixed term. Even if Kai were a licensee, a contractual licence for three years could not be revoked at will (**Winter Garden Theatre**).'],
            c: 'Kai is a tenant until January 2028. Mdm Rosnah cannot give vacant possession, and a buyer would take subject to the lease.' },
          { i: 'Whether Mdm Rosnah can forfeit for the pop-up bakery or the late rent.',
            l: ['Forfeiture needs a right to forfeit and the correct procedure. For a breach other than non-payment of rent, **s 18 CLPA** requires a notice specifying the breach, requiring it to be remedied if it is capable of remedy, and asking for compensation; the tenant has a reasonable time and may seek relief. Accepting rent with knowledge of a breach waives the right to forfeit for that breach (**Expert Clothing v Hillgate House** [check holding]), though a continuing breach gives a fresh right. For rent, the tenant may pay the arrears and costs and keep the lease (**s 18A CLPA**), and distress lies for up to 12 months\' rent.'],
            a: ['Letting a friend run a bakery from the café without written consent breaches clause 7, and clause 9 gives a right to re-enter. But Mdm Rosnah learned of the bakery in June and accepted the August rent without comment, which likely waives forfeiture for the breach up to that point. The bakery is still running, so it is a continuing breach. She can rely on a fresh right if she serves a s 18 notice requiring Kai to end the pop-up within a reasonable time, and she must stop accepting rent without a reservation. The breach is easily remedied, so Kai can comply and keep the lease. The late rent was paid, three weeks late, twice, and she accepted it, so it is no ground to forfeit now; she can claim any contractual late-payment interest. If rent falls into arrears in future, s 18A lets Kai pay up and keep the lease.'],
            c: 'She cannot forfeit for the past breaches. Her route is a s 18 notice about the continuing bakery; forfeiture follows only if Kai fails to stop it.' },
          { i: 'Which of the items Kai installed he may remove.',
            l: ['**Holland v Hodgson** asks the degree of annexation and its purpose, and the purpose now carries more weight (**D\'Eyncourt v Gregory**). A tenant may remove trade, ornamental and domestic fixtures during the lease or a short time after, making good any damage (**Fisher v Dixon**; **Spyers v Phillipson**); fixtures left after the tenant gives up possession belong to the landlord (**BP Refinery v Amazon** [check]).'],
            a: ['The espresso counter is bolted down, so presumed a fixture, but it was installed for Kai\'s café trade: a trade fixture. The neon sign is fixed to the façade and advertises his business: also a trade fixture, though removal from a conservation shophouse must be done carefully and the façade made good. The ceiling fans are wired in and serve the comfort of the café, so they are tenant\'s fixtures that he may remove, making good the ceiling. The walk-in chiller rests on its own weight and serves his trade: it is a chattel and never became part of the building.'],
            c: 'Kai may take the chiller at any time, and the counter, sign and fans before the lease ends or shortly after, making good the damage. Anything he leaves behind when he gives up possession becomes Mdm Rosnah\'s.' }
        ] },
        { blocks: [
          { i: 'Whether Glen breached his duties as Mdm Rosnah\'s agent.',
            l: ['An estate agent is a fiduciary: he must act in good faith, disclose material information including every offer, follow his instructions, avoid conflicts and make no secret profit. He may not steer a sale to himself or a connected person without full disclosure and the principal\'s consent (**McPherson v Watt**). The **Estate Agents Act 2010** and the CEA Code of Ethics reinforce these duties.'],
            a: ['There are two separate breaches. First, Glen never passed on Mr Yeo\'s $3.8m offer, which breaches his duty to disclose and to follow instructions. Second, he steered Mdm Rosnah to Pearl Holdings at $3.6m while calling it "a corporate client", hiding that his wife owns it. That is an undisclosed conflict with a connected party, exactly the situation in McPherson v Watt.'],
            c: 'Glen is in serious breach of fiduciary duty and is liable for any loss it causes.' },
          { i: 'Whether Mdm Rosnah is bound by the option granted to Pearl Holdings.',
            l: ['A transaction with a company connected to the agent, obtained without full disclosure of the connection, can be set aside by the principal (**McPherson v Watt**). Rescission must be claimed promptly, before the principal affirms, and requires restoring what was received.'],
            a: ['Mdm Rosnah granted the OTP because Glen misdescribed the market and concealed who owned Pearl. She discovered the truth before Pearl exercised the option, so nothing has been completed. She can rescind the OTP by written notice, returning the option fee, and should do so at once.'],
            c: 'The Pearl OTP can be set aside; Pearl is entitled only to the return of its option fee.' },
          { i: 'Whether Glen or Fiona is entitled to commission on the sale to Mr Yeo.',
            l: ['Commission depends on the agreement. Under a non-exclusive agency the agent earns commission only as the effective cause of the sale (**Grandhome v Ng Kok Eng**): commission was promised, the agent engendered the buyer\'s interest, conveyed the offer, and the sale went to the same buyer at about the same price within a short time; the owner may then show a break in the chain. A dishonest agent forfeits his commission (**Andrews v Ramsay** [check exact holding]), unlike an honest one (**Hippisley v Knee Brothers**).'],
            a: ['Glen introduced Mr Yeo, but he never conveyed Mr Yeo\'s offer, so a key element fails. Two months then passed, the price moved from $3.8m to $3.75m, and Fiona re-engaged Mr Yeo and negotiated with him over several weeks. Those facts break any chain from Glen\'s introduction, so Fiona is the effective cause. In any event Glen\'s dishonesty forfeits any commission he could claim.'],
            c: 'Fiona earns her 1% commission; Glen earns nothing, and Mdm Rosnah does not pay twice.' }
        ] }
      ],
      parties: [
        ['Mdm Rosnah', 'Kai is her tenant until January 2028, so she cannot sell with vacant possession; serve a s 18 notice about the continuing bakery and stop accepting rent without reservation; rescind the Pearl OTP; refuse Glen any commission, claim any loss from him (and possibly HomeTrue Realty [check basis]) and report him to the CEA; pay Fiona 1%.'],
        ['Kai', 'A tenant to January 2028 despite the label; must end the pop-up bakery when given a s 18 notice and pay rent on time; may remove the chiller at any time and his trade fixtures before he leaves, making good damage.'],
        ['Glen', 'In breach of fiduciary duty twice over; no commission; liable for loss; faces CEA discipline.'],
        ['Pearl Holdings', 'Its option can be set aside; it recovers the option fee only.'],
        ['Fiona', 'The effective cause of the sale to Mr Yeo, so entitled to her commission.']
      ]
    },

    m4: {
      parts: [
        { blocks: [
          { i: 'Whether Mei severed the joint tenancy before she died, so that her share passed to Sophie.',
            l: ['Co-owners registered as joint tenants hold subject to survivorship, so on one joint tenant\'s death the interest passes to the survivors and cannot pass by Will (**s 53(1) LTA**; **Shafeeg v Fatimah** [check facts]). Statutory severance needs three steps: a declaration in the approved form, service on every other joint tenant, and registration (**s 53(5), (6) LTA**). It takes effect only on registration (**Chan Lung Kien v Chan Shwe Ching** [2018], overruling **Diaz v Diaz**). In equity a joint tenancy is severed by acting on one\'s own share, by mutual agreement or by a mutual course of dealing (**Williams v Hensman**); a unilateral statement or failed negotiations do not sever (**Burgess v Rawnsley**).'],
            a: ['Mei signed the declaration in the approved form and served it on both brothers, so she completed the first two steps. Registration never happened because her lawyer put it off, and under Chan Lung Kien that is fatal however close she came: the declaration had no severing effect when she died in May. Her declaration is not an act on her own share in equity (she did not sell, mortgage or contract to dispose of it), and nothing shows an agreement or course of dealing with her brothers. Her Will cannot sever, because it speaks only at death, after survivorship has operated.'],
            c: 'The joint tenancy continued. On Mei\'s death Ah Huat and Kenneth took the whole bungalow by survivorship, and Sophie takes nothing in it under the Will.' },
          { i: 'Whether Sophie has any other claim.',
            l: ['A solicitor who fails to carry out a client\'s instruction with reasonable care may be liable in negligence, including to an intended beneficiary who loses an inheritance as a result [check: not covered in the notes].'],
            a: ['Mei instructed her lawyer to register the declaration and he delayed. Had he registered it before May, Mei would have held a third as a tenant in common, which would have passed to Sophie under the Will.'],
            c: 'Sophie\'s remedy, if any, is a negligence claim against Mei\'s lawyer for the value of the lost third.' }
        ] },
        { blocks: [
          { i: 'Whether Victor\'s registered title is indefeasible.',
            l: ['Registration is the source of title (**s 45 LTA**). A registered proprietor holds free of other interests (**s 46(1)**), and Singapore follows immediate indefeasibility, so an innocent registered purchaser takes good title even under a forged instrument (**Frazer v Walker**). Only a purchaser in good faith for value is protected (**s 4**; **s 46(3)**). Title is defeasible where the proprietor or his agent was a party to fraud or forgery (**s 46(2)(a)**). Fraud means actual dishonesty (**Assets Co v Mere Roihi**), including deliberately shutting one\'s eyes once suspicion is aroused (**Waimiha Sawmilling**; **UOB v Bebe** [2006] SGCA 30).'],
            a: ['Victor\'s own conveyancing lawyer queried both the price ($2m for a $6m bungalow) and a signature that looked nothing like Ah Huat\'s. Suspicion was therefore actually aroused, and Victor\'s instruction to "just push it through" was a decision not to find out the truth. That is wilful blindness, which counts as fraud, and Victor, Kenneth\'s business partner, is no purchaser in good faith. s 46(2)(a) applies. One refinement: Kenneth was himself a joint tenant and genuinely signed for his own interest, which is an act on his own share that severs the joint tenancy in equity (**Williams v Hensman**). The court may therefore restore only Ah Huat\'s half and leave Kenneth\'s half with Victor, rather than restore the whole [check: this point is not covered in your notes].'],
            c: 'Victor\'s title is defeasible as against Ah Huat, who recovers at least his own half and arguably the whole.' },
          { i: 'Whether Pinnacle Bank\'s charge binds Ah Huat.',
            l: ['Each registered party is judged on its own conduct. A chargee who lends in good faith is a purchaser for value. A third party\'s fraud does not defeat a registered proprietor who was not party to it, and a person dealing with the registered proprietor need not look behind the register (**s 47(1)**; **UOB v Bebe**; **Frazer v Walker**).'],
            a: ['Pinnacle Bank carried out its usual searches, dealt only with Victor as the registered proprietor and had no reason to suspect anything. Victor was not the bank\'s agent, so his fraud is not the bank\'s fraud. As with UOB in Bebe and the mortgagee in Frazer v Walker, Pinnacle holds an indefeasible registered charge.'],
            c: 'Pinnacle\'s $3m charge binds the bungalow, whoever is restored as owner.' },
          { i: 'What Ah Huat can do.',
            l: ['The court may cancel or correct the register for fraud (**s 160**), but not against a proprietor in possession who was not party or privy to it (**s 160(2)**). A claimant should caveat at once (**s 115**). The Assurance Fund compensates only loss caused by the Registrar\'s or staff\'s omission, mistake or misfeasance (**ss 151, 155**).'],
            a: ['Victor was party to the fraud, so s 160(2) does not protect him, and Ah Huat can apply to cancel Victor\'s registration. He should lodge a caveat immediately to stop further dealings, because Victor has disappeared and might deal with the title again. He can sue Kenneth (the forger) and Victor for his losses, including the charge he must now clear. The Assurance Fund will not respond to Kenneth\'s forgery alone, since nothing suggests a Registry error.'],
            c: 'Ah Huat recovers the bungalow (at least his half) subject to Pinnacle\'s charge, and looks to Kenneth and Victor for his loss.' }
        ] },
        { blocks: [
          { i: 'Whether the 24% default interest binds Ah Huat.',
            l: ['A sum payable on breach that is out of all proportion to the lender\'s greatest conceivable loss is a penalty and unenforceable; "industry practice" is no answer (**Hong Leong Finance v Tan Gin Huay**: 18% against 5.5% to 6.75%; **Dunlop v New Garage**).'],
            a: ['24% is six times the 4% contract rate and higher than the 18% struck down in Hong Leong. The bank\'s real loss from late payment is far smaller.'],
            c: 'The default rate is a penalty; Pinnacle may charge 4% and recover its actual loss.' },
          { i: 'Whether the option for Pinnacle to buy the bungalow for $3.5m is valid.',
            l: ['An option for the lender to buy the mortgaged property, granted as part of the mortgage, is a void clog on the equity of redemption (**Samuel v Jarrah Timber**; **Jones v Morgan** [check]). Courts have been more lenient between sophisticated commercial parties (**Citicorp v Wee Ah Kee** [check]).'],
            a: ['The option was part of the charge and exists to let the bank take a $6m bungalow for $3.5m if the borrower defaults, which is the very thing the rule forbids. Victor\'s commercial background does not save a term so plainly repugnant to redemption.'],
            c: 'The option is void.' },
          { i: 'Whether the bar on redemption before August 2031 is valid.',
            l: ['A postponement of redemption is void only if it makes redemption illusory (**Fairclough v Swan Brewery**); a reasonable postponement between commercial parties stands (**Knightsbridge Estates v Byrne**).'],
            a: ['A five-year lock-in on a bungalow that keeps its value leaves something real to redeem, so it is not illusory.'],
            c: 'The lock-in probably stands, subject to any early-redemption charge that is wholly out of proportion to the bank\'s loss.' }
        ] }
      ],
      parties: [
        ['Sophie', 'Takes nothing in the bungalow because severance was never registered; consider a negligence claim against Mei\'s lawyer [check].'],
        ['Ah Huat', 'Caveat now; apply under s 160 to cancel Victor\'s registration; take the bungalow back subject to Pinnacle\'s charge, which he may redeem by paying the principal, 4% interest and costs; the default rate and the option do not bind him; the lock-in probably does; sue Kenneth and Victor.'],
        ['Pinnacle Bank', 'An indefeasible charge, but recoverable only at the contract rate; it cannot use the option.']
      ]
    },

    m5: {
      parts: [
        { blocks: [
          { i: 'Whether Priya validly exercised the option.',
            l: ['To the buyer an OTP is an irrevocable offer; the seller cannot withdraw during the option period, and the contract of sale arises only on exercise (**Spiro v Glencrown**). Exercise must comply strictly with the time and manner the OTP specifies (**JT Chanrai v Consolidated Hotels**). If the option lapses, there is no contract, no equitable interest and nothing to caveat, and the option fee, which paid for the option itself, is not refundable.'],
            a: ['The OTP required Priya to sign the acceptance copy at the sellers\' solicitors\' office and deliver a cheque for 4% by 4 pm on 15 October. Her emailed scan and bank-transfer screenshot at 3.50 pm were not the method stated, and she signed in person at 4.40 pm, after the deadline. On the strict approach the option lapsed at 4 pm. Priya will argue that the solicitors waived strict compliance by accepting her documents, but nothing in the facts shows such a waiver, and the Fongs had every reason to insist on the terms once the $3.3m offer arrived.'],
            c: 'The option probably lapsed, so there is no contract; the Fongs may accept the $3.3m offer and Priya should not caveat. If a court found a valid exercise, she would be owner in equity and could seek specific performance (**EC Investment v Ridout Residence**) and caveat at once.' },
          { i: 'Whether Daniel\'s statement about the roof gives Priya a claim.',
            l: ['A misrepresentation is an untrue statement of fact that induces a contract. It is fraudulent if made knowingly, without belief in its truth or recklessly (**Derry v Peek**), giving rescission and damages; negligent if made without reasonable grounds (**s 2(1) Misrepresentation Act**), giving damages; or innocent (**s 2(2)**), where the court may give rescission or damages in lieu. Opinions and sales talk are not statements of fact. A principal is bound by statements its agent makes within authority (**Freeman & Lockyer**).'],
            a: ['"The roof was completely redone in 2024. No leaks" is a specific statement of fact, not sales talk. It was false, and Priya asked about leaks before taking the option, so it induced her. The Fongs had told Daniel that the roof had leaked and was only patched, so he made the statement knowing it was untrue, which is fraudulent. Describing the property is within an estate agent\'s authority, so the Fongs are bound by it.'],
            c: 'If a contract exists, Priya may rescind or keep the house and claim damages from the Fongs (who can look to Daniel), acting promptly to avoid affirming. If there is no contract, she can still claim the loss the lie caused her, such as the option fee paid on the faith of it [check].' }
        ] },
        { blocks: [
          { i: 'Whether Mr Wee may restrict the Fongs to walking across the driveway.',
            l: ['An easement must satisfy **Re Ellenborough Park**: a dominant and a servient tenement, a right that accommodates the dominant land, different owners, and a right capable of grant. An easement registered on the title binds the servient owner and his successors. Substantial interference with it is actionable by injunction and damages.'],
            a: ['The Fongs\' title carries a registered right of way over No. 23\'s driveway to reach their garage. No. 23 is servient and the Fongs\' house dominant; the right serves the house; the owners differ; and a defined vehicular right of way is a classic easement. It binds Mr Wee. Parking two cars across the driveway every evening blocks vehicle access to the garage, a substantial interference, and he has no right to cut the easement down to a footpath.'],
            c: 'The Fongs can obtain an injunction to keep the driveway clear and damages.' },
          { i: 'Whether the Fongs\' gardener can keep using the shortcut.',
            l: ['Permission to cross land is a bare licence: personal, revocable and binding on no successor (**Wood v Leadbitter**; **Ashburn Anstalt v Arnold**). A licence becomes irrevocable only by estoppel, which needs a promise, reliance and detriment (**Inwards v Baker**).'],
            a: ['Mr Wee\'s late father simply let the gardener take the shortcut. There was no grant, no payment and no promise of permanence, and no one relied on it to their detriment.'],
            c: 'It was a bare licence, and Mr Wee may withdraw it.' },
          { i: 'Whether Mr Wee is liable for the cracked wall and the subsided garden.',
            l: ['A landowner is entitled to support for the land from adjoining soil, and a neighbour who excavates must secure alternative support (**Backhouse v Bonomi**). In England a building needs an easement of support (**Dalton v Angus**), but in Singapore **Xpress Print v Monocrafts** extends the duty to the neighbour\'s buildings. An excavating neighbour also owes a duty of reasonable care in negligence.'],
            a: ['Mr Wee is digging a basement pool beside the boundary with no shoring, and the Fongs\' garden has subsided and their boundary wall has cracked. That is a removal of support without adequate alternative support, which covers both the land and, under Xpress Print, the wall. Digging without any shoring is also a failure of reasonable care.'],
            c: 'Mr Wee is liable; the Fongs can seek an injunction stopping the works until proper support is in place, and damages for the repairs.' },
          { i: 'Whether the Fongs can stop the three-storey extension.',
            l: ['The burden of a negative covenant runs in equity to a successor with notice where it touches and concerns benefited land and was meant to bind successors (**Tulk v Moxhay**); on registered land, entry on the Certificate of Title gives notice. The benefit passes with the benefited land by annexation or at law where the covenant touches and concerns that land (**P&A Swift v Combined English Stores**).'],
            a: ['"Not to erect any building exceeding two storeys" restricts building and costs nothing to obey, so it is negative. It was taken for the benefit of the land the Fongs now own, which annexes the benefit to that land, so it passed to them. It is entered on No. 23\'s title, so Mr Wee is bound in equity with notice, although he never promised anything himself.'],
            c: 'The Fongs can obtain an injunction against the third storey.' }
        ] }
      ],
      parties: [
        ['Priya', 'Probably no contract, because the option lapsed; no caveat; she may claim for Daniel\'s fraudulent statement against the Fongs (and Daniel) [check the remedy if there is no contract].'],
        ['The Fongs', 'Free to accept the $3.3m offer if the option lapsed, but answerable for Daniel\'s misstatement; against Mr Wee: injunctions to keep the driveway clear, stop the digging until support is secured, and stop the third storey, plus damages; they cannot insist on the gardener\'s shortcut.'],
        ['Mr Wee', 'Must clear the driveway, shore up his excavation and pay for the damage, and keep to two storeys; may end the shortcut.']
      ]
    },

    m6: {
      parts: [
        { blocks: [
          { i: 'Whether Ms Chua and Mr Lim made a binding contract.',
            l: ['A contract needs offer, acceptance and an intention to be bound, judged objectively. "Subject to contract" creates a strong presumption that the parties do not intend to be bound until a formal contract, rebutted only by strong context (**Norwest Holdings v Newport Mining** [2011] SGCA 42); the court looks at all the circumstances, including conduct after the exchange (**OCBC Capital Investment v Wong Hua Choon** [2012] SGCA 54).'],
            a: ['Ms Chua herself wrote "subject to contract", so the presumption is against a binding deal. But Mr Lim replied "deal", the $20,000 PayNow note said "deposit shophouse", and Mr Lim let her start renovating in April. Under OCBC that later conduct may show both sides treated the deal as concluded. Mr Lim will rely on Norwest: the label came from the buyer, and no formal document was ever signed. The price, parties and property are certain. On balance the label leans against a contract, but the conduct makes it a genuine contest.'],
            c: 'A contract is arguable but uncertain.' },
          { i: 'If there was a contract, whether it is enforceable.',
            l: ['A land contract is enforceable only if it or a memorandum is in writing and signed by the party sued (**s 6(d) Civil Law Act**); emails can suffice and a typed name can be a signature (**Joseph Mathew**). Otherwise part performance requires acts by the claimant unequivocally referable to the contract (**Maddison v Alderson**; **Hu Lee Impex**).'],
            a: ['The WhatsApp messages state the parties, the shophouse and $4.2m, and Mr Lim\'s "deal" may count as signed if his name or number identifies him [check]. The $20,000 payment alone is equivocal, since money can be paid for many reasons, but renovating the shophouse with the owner\'s knowledge is buyer-like conduct that points to this contract. Ms Chua therefore has a reasonable argument that the contract is enforceable and that she holds an equitable interest.'],
            c: 'If a contract exists, it is likely enforceable through the messages or part performance.' },
          { i: 'Whether Ms Chua\'s interest binds Mr Ho.',
            l: ['A registered proprietor holds free of unregistered interests (**s 46(1) LTA**) unless he or his agent was party to fraud (**s 46(2)(a)**). Knowing of an unregistered interest is not of itself fraud (**s 47(2)**); fraud means actual dishonesty, including wilful blindness (**UOB v Bebe**) or a promise never meant to be kept (**Loke Yew v Port Swettenham**). An equitable interest is protected by caveat (**s 115**).'],
            a: ['Mr Ho is registered and paid $4.5m. He knew of Ms Chua\'s claim, but under s 47(2) knowledge alone is not fraud. Ms Chua would have to show that he set out dishonestly to defeat a contract he knew was concluded, or made her a promise he never meant to keep; the facts show neither. She lodged no caveat, so her interest was unprotected when he registered.'],
            c: 'Mr Ho\'s title is indefeasible; Ms Chua cannot recover the shophouse from him.' },
          { i: 'What Ms Chua can recover.',
            l: ['A party in breach of a land contract is liable in damages. Money paid for a purpose that fails is recoverable.'],
            a: ['If the contract existed, Mr Lim broke it by selling to Mr Ho, so he is liable in damages, including her lost bargain. If there was no contract, the $20,000 was paid for a sale that never happened and must be returned, and she can claim the value of renovations made with Mr Lim\'s knowledge [check basis].'],
            c: 'Her realistic remedies are against Mr Lim, not the shophouse.' }
        ] },
        { blocks: [
          { i: 'Whether Zara breached her duties by taking $5,000 from Mr Ho.',
            l: ['An agent is a fiduciary who must not make a secret profit or take a payment from the other side without the principal\'s informed consent; the CEA Code also bars commission from both sides without disclosure. A trade practice unknown to the principal is no defence (**Hippisley v Knee Brothers**).'],
            a: ['Zara took $5,000 from the buyer, Mr Ho, for "introducing" him, and did not tell Mr Lim. That is a secret commission taken in a conflict of interest.'],
            c: 'Zara is in breach.' },
          { i: 'What Mr Lim can do, and whether Zara keeps her commission.',
            l: ['A bribe or secret commission is held on constructive trust for the principal (**FHR European Ventures v Cedar Capital** [check Singapore adoption]); the principal can claim an account, and a dishonest agent forfeits commission (**Andrews v Ramsay** [check exact holding]). Under a non-exclusive agency commission depends on effective cause (**Grandhome**).'],
            a: ['Mr Lim can claim the $5,000 from Zara, which she holds on trust for him. Her dishonesty justifies refusing her 1% commission. She may say she was the effective cause, but she was engaged to sell to Ms Chua, the sale to Mr Ho was a different deal, and the secret profit rule applies in any case.'],
            c: 'Mr Lim recovers the $5,000, may refuse commission, and can report Zara to the CEA.' }
        ] },
        { blocks: [
          { i: 'Whether Ms Chua can sell her interest in the car park lot, and what follows.',
            l: ['Joint tenants hold subject to survivorship. A joint tenant may sever by the statutory declaration, service and registration (**s 53(5), (6) LTA**; **Chan Lung Kien**), or in equity by acting on her own share, mutual agreement or a mutual course of dealing (**Williams v Hensman**). A sale of one joint tenant\'s share severs. Where co-owners cannot agree, the court may order a sale in lieu of partition, weighing the relationship, use and prejudice (**Abu Bakar v Jawahir**).'],
            a: ['Ms Chua can sell her interest. The sale is an act on her own share, so it severs the joint tenancy, and the buyer and Mr Lim become tenants in common in equal shares. Until she does, survivorship applies: if she dies first, Mr Lim takes the whole lot, and her Will cannot change that. Given the falling-out over the shophouse, the co-owners may not cooperate, in which case either may apply for a sale in lieu of partition.'],
            c: 'Ms Chua may sell her half, which severs the joint tenancy; if co-ownership becomes unworkable, a court can order the lot sold.' }
        ] }
      ],
      parties: [
        ['Ms Chua', 'An arguable contract but no claim to the shophouse against Mr Ho; claim damages from Mr Lim or the return of the $20,000 and renovation costs; sell or sever her share of the car park lot.'],
        ['Mr Lim', 'Possibly liable to Ms Chua; recovers the $5,000 from Zara and may refuse her commission; co-owner of the car park lot with Ms Chua or her buyer.'],
        ['Mr Ho', 'An indefeasible registered owner; Ms Chua cannot take the shophouse from him.'],
        ['Zara', 'Holds the $5,000 on trust for Mr Lim, loses her commission, and faces CEA discipline.']
      ]
    }
  }
};
