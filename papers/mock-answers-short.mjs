// Paper 3, short version: the six mock case studies answered in exam-length ILAC, to fit on four A4 pages.
// One block per issue in the app's marking scheme, in the same order (marks come from the scheme):
// [issue question, law, application, conclusion]. [check] = confirm on your slides.
export default {
  title: 'Section B: the six mock papers in four pages',
  note: 'Exam-length ILAC answers · marks per issue from the marking scheme · bold = cite it · red [check] = confirm on your slides',
  mocks: {
    m1: {
      facts: 'Mrs Leong sold No. 13 to Gabby, keeping No. 11; Gabby covenanted for herself and her successors (i) not to let the roof fall into disrepair, (ii) private dwelling only, (iii) to maintain the boundary wall. Gabby\'s 15-year Bestbank mortgage: 10-year lock-in, rate variable at the bank\'s discretion, insurance only from its subsidiary. She let 3 rooms for 24 months to nursing students ($1,800/month, no business), keeping a 4th room locked; a helper cleans weekly. The students run Science lessons and pay late; Gabby is in arrears and Bestbank threatens possession; in month 18 Gabby gave notice to vacate; the roof and wall have decayed.',
      blocks: [
        ['Can Mrs Leong enforce the covenants against Gabby and the students?',
         'Original parties are bound by privity of contract (**Tweddle v Atkinson**). Classify by cost: a covenant needing money or work is positive. The burden never runs at law (**Austerberry v Oldham**) and positive burdens never run in equity (**Rhone v Stephens**); a negative burden binds a successor with notice in equity (**Tulk v Moxhay**), and the Certificate of Title gives notice.',
         '(i) and (iii) are positive despite the wording; (ii) is negative. Gabby is the original covenantor, so she is liable on all three although she moved out: the roof and wall have decayed, and the lessons are a business use she permits. The students promised nothing, so (i) and (iii) cannot bind them, but (ii) benefits No. 11, binds successors and is on the CT, so Tulk v Moxhay supports an injunction [check: tenants are an extension].',
         'Damages or specific performance against Gabby for the roof and wall; an injunction on (ii) against Gabby and the students.'],
        ['Are the mortgage terms valid, may Bestbank take possession, and does the students\' lease bind it?',
         'A postponement is void only if redemption becomes illusory (**Fairclough v Swan Brewery**); advised parties are held to it (**Knightsbridge**). A collateral advantage stands if separate and fair (**Kreglinger**). Unconscionability needs an exploited infirmity (**BOM v BOK**). Entry after one month\'s notice (**s 75 LTA**). A mortgagor in possession may lease for up to 3 years (**s 23 CLPA**), which binds the bank (**s 89(1) LTA**). Sale once exercisable (**s 25 CLPA**), with care for the true value (**Cuckmere**).',
         'Ten years of a 15-year loan leaves a house to redeem, and no infirmity is shown, so the lock-in stands. The variable rate is a price term, not a clog, but must be used in good faith [check]. The tied insurance is valid unless above market. Gabby is in arrears, so the bank may enter after notice; the 24-month lease is within s 23 and binds it, so it collects the rent against the debt.',
         'The terms stand; Bestbank may enter and later sell, but subject to the students\' lease.'],
        ['Lease or licence? Did the month-18 notice work? Gabby\'s remedies for the lessons and late rent?',
         'Exclusive possession for a term at a rent is a lease whatever the label (**Street v Mountford**); kept keys or light services do not defeat it (**Aslan v Murphy**; contrast **Abbeyfield**). A fixed term cannot be ended by notice. Forfeiture needs an express re-entry clause (no **s 93 LTA** for a short unregistered lease) and a **s 18 CLPA** notice; accepting rent with knowledge waives it (**Expert Clothing** [check]); for rent, **s 18A**; distress up to 12 months\' rent.',
         'Three rooms, 24 months, $1,800 a month; the locked room is outside the grant and a weekly clean is no unrestricted access, so this is a lease, needing no deed (**s 53(1) CLPA**). The notice is ineffective. The lessons breach the no-business term, but forfeiture needs a clause and a s 18 notice, and the breach is easily remedied. For late rent Gabby can sue or distrain; s 18A lets the students pay up.',
         'The students stay to month 24; Gabby has an injunction or damages and a rent claim, and forfeiture only with a clause and notice.'],
        ['Is there a claim for the noise and traffic?',
         'Private nuisance is an unreasonable interference with a neighbour\'s enjoyment of land; the occupier is liable, and so is a landlord who authorises it.',
         'Children coming and going in a residential street go beyond ordinary home use: the students are liable, and Gabby too if she lets it continue.',
         'A nuisance claim alongside covenant (ii).']
      ],
      advice: '**Mrs Leong**: sue Gabby; injunction on (ii). **Gabby**: liable on the covenants and bound by the loan terms; cannot evict before month 24. **Bestbank**: may enter after notice and sell, subject to the lease. **Students**: tenants to month 24; stop the lessons and pay on time.'
    },
    m2: {
      facts: 'Zen, a veteran property fund manager, bought a penthouse and added his partner Belle (who paid nothing) to the registered title, texting "this is my assurance for you, to have and to hold forever". Their 10-year Bigbank loan is in both names: 28% default interest; no redemption for nine years. His earlier Will leaves everything to his two adult children. Zen has died; the children caveated; Belle cannot pay.',
      blocks: [
        ['How do Zen and Belle hold the legal title, and does the Will pass anything?',
         'Co-owners named without words of severance are joint tenants (**s 53(1) LTA**). On death the survivor takes by survivorship and a Will cannot pass a joint share (**Shafeeg v Fatimah**). Severance needs declaration, service and registration (**s 53(5), (6) LTA**; **Chan Lung Kien**) or an equitable mode (**Williams v Hensman**).',
         'Both are named with no words of severance, so they were joint tenants. The Will was made before the purchase and cannot sever; no statutory step or equitable mode appears.',
         'Belle is now the sole legal owner; the Will passes nothing in the penthouse.'],
        ['Does Belle hold on a resulting trust for Zen\'s estate?',
         'Actual intention comes first (**Goh Swee Fang**; **Wong Mei Lee Millie v Jake Ngor** [2026] SGCA 27); presumptions are a last resort (**Patricia Khoo v Khoo Gaik Pin**: immediate benefit, benefit on death, no benefit, unclear). The person asserting the trust carries the burden (**Lau Siew Kim**); mortgage liability counts only if the plan treated it as a contribution (**Chan Yuen Lan**). No advancement between unmarried partners [check].',
         'The children assert the trust, so they must prove it. Zen deliberately added Belle "to assure her of his commitment", and "to have and to hold forever" speaks of a present, lasting gift: scenario 1, a beneficial joint tenancy. The children will say it was security only during his life (scenario 2). Belle\'s co-borrower liability is not a contribution.',
         'On the evidence Belle owns the whole beneficially, though the children have an arguable claim.'],
        ['Can the children\'s caveat stand?',
         'A caveat needs a claimed interest in land (**s 115 LTA**). Remove under **s 127(1)** (caveator shows cause) or **s 127(2)** (vexatious or bad faith); disputed facts go to a serious question and the balance of convenience (**Eng Mee Yong**); security under **s 124**; compensation under **s 128**.',
         'A beneficial interest through the estate is caveatable [check who may lodge]. The claim is genuinely arguable, so Belle uses s 127(1), not s 127(2); there is a serious question, so the caveat probably stays to trial, with security. s 128 is unlikely: the claim is honest.',
         'The caveat stays pending trial; Belle should ask for security.'],
        ['Is the 28% default interest enforceable?',
         'A rate out of all proportion to the lender\'s greatest conceivable loss is a penalty; "industry practice" is no answer (**Hong Leong Finance v Tan Gin Huay**: 18% against 5.5% to 6.75%; **Dunlop**).',
         '28% exceeds the 18% struck down in Hong Leong. Zen\'s sophistication does not help Bigbank, because the test is proportion, not skill.',
         'A penalty: Bigbank recovers the contract rate and its real loss.'],
        ['Is the nine-year bar on redemption a clog?',
         'A postponement is void only if it makes redemption illusory (**Fairclough**); sophisticated borrowers are held to their bargain (**Knightsbridge**; **Fiscal Consultants** [check facts]); an exploited infirmity shifts the burden to the lender (**BOM v BOK**).',
         'The penthouse keeps its value, so redemption is not illusory. Zen was a sophisticated investor. Belle, unadvised, must first show an infirmity Bigbank exploited; nothing shows one.',
         'The bar probably stands.'],
        ['What follows for Belle?',
         'A co-borrower is liable for the whole debt. On default the mortgagee may enter after one month\'s notice (**s 75 LTA**) and sell (**ss 24, 25 CLPA**) with care for the true value (**Cuckmere**).',
         'Belle owes the whole loan with Zen\'s estate, at the contract rate. Bigbank\'s registered charge ranks ahead of the later caveat.',
         'She must pay or face a mortgagee\'s sale.']
      ],
      advice: '**Belle**: sole owner by survivorship; s 127(1) with security; pay at the contract rate. **Children**: the Will passes nothing; their resulting trust claim is arguable but they bear the burden. **Bigbank**: charge ranks first; no 28%; the bar stands.'
    },
    m3: {
      facts: 'Kai occupies Mdm Rosnah\'s ground floor under a 3-year "Licence to Occupy" at $6,000 a month: he holds the keys; she keeps an emergency key and a locked back room; clause 4 (never used) lets her add occupiers; clause 7 bars other traders; clause 9 allows re-entry. He bolted a counter, wired in fans, installed a free-standing chiller and a sign, let a friend run a pop-up bakery (she knew in June and took August rent) and paid late twice. She gave one month\'s notice to sell. Agent Glen (non-exclusive, 1%) hid Mr Yeo\'s $3.8m offer and steered her to an OTP at $3.6m with Pearl, his wife\'s company; two months later agent Fiona sold to Mr Yeo at $3.75m.',
      blocks: [
        ['Is Kai a tenant or a licensee, and did the notice end his right?',
         'Exclusive possession for a term at a rent is a lease whatever the label (**Street v Mountford**). A clause never meant to operate is a sham (**Antoniades v Villiers**); an emergency key does not defeat exclusive possession (**Aslan v Murphy** [check]). A lease of 7 years or less needs no deed (**s 53(1) CLPA**) and binds a buyer as an overriding interest. A fixed term cannot be ended by notice.',
         'Kai has the keys for a fixed three years at a market rent. Clause 4 has never been used and would make a café impossible: a sham. The locked back room is outside the grant.',
         'A three-year lease: the notice is ineffective, Kai stays to January 2028, and a buyer takes subject to him.'],
        ['Can she forfeit for the bakery or the late rent?',
         'Forfeiture needs a right (clause 9) and a **s 18 CLPA** notice for non-rent breaches. Accepting rent with knowledge waives the breach (**Expert Clothing** [check]), but a continuing breach gives a fresh right. For rent, **s 18A**.',
         'The bakery breaches clause 7, but taking the August rent after June waived it so far. It continues, so she can serve a fresh s 18 notice, refusing rent without reservation. The late rent was paid and accepted.',
         'Serve a s 18 notice on the continuing bakery; no forfeiture for the past.'],
        ['Which items may Kai remove?',
         '**Holland v Hodgson**: degree and purpose of annexation, purpose prevailing. Tenants remove trade, ornamental and domestic fixtures during the term or soon after, making good (**Fisher v Dixon**).',
         'The counter and sign are trade fixtures; the fans are tenant\'s fixtures; the chiller rests on its weight and is a chattel.',
         'He may take all four, the fixtures before or soon after the lease ends, making good the damage.'],
        ['Did Glen breach his duties, and what follows for Pearl\'s OTP and his commission?',
         'An agent is a fiduciary: disclose every offer, follow instructions, no conflict. A sale to a connected party without disclosure can be set aside (**McPherson v Watt**). A dishonest agent forfeits commission (**Andrews v Ramsay** [check]; contrast **Hippisley**).',
         'Two breaches: he suppressed the $3.8m offer, and he hid that Pearl is his wife\'s company. She learned before exercise, so she can rescind the OTP, returning the option fee.',
         'Set the OTP aside; Glen gets no commission and is liable for loss; report him to the CEA.'],
        ['Who earns commission on the sale to Mr Yeo?',
         'Non-exclusive agency: commission only for the effective cause (**Grandhome v Ng Kok Eng**): interest engendered, offer conveyed, same buyer at about the same price within a short time; a break in the chain defeats it.',
         'Glen never conveyed Mr Yeo\'s offer; two months passed, the price changed and Fiona negotiated the deal over weeks.',
         'Fiona is the effective cause and earns 1%; Mdm Rosnah pays once.']
      ],
      advice: '**Mdm Rosnah**: no vacant possession before 2028; s 18 notice on the bakery; rescind Pearl\'s OTP; pay Fiona, not Glen. **Kai**: tenant to 2028; stop the bakery; keep his fittings. **Glen**: no commission, liable, CEA. **Pearl**: option fee back. **Fiona**: 1%.'
    },
    m4: {
      facts: 'Siblings Ah Huat, Mei and Kenneth are registered joint tenants of a bungalow. Mei signed and served a declaration of severance but her lawyer never registered it; she died, leaving everything to her daughter Sophie. Kenneth forged Ah Huat\'s signature on a transfer of the whole to his partner Victor for $2m (worth $6m); Victor\'s lawyer queried the price and signature and Victor said "just push it through"; it was registered. Pinnacle Bank, in good faith, lent Victor $3m on a registered charge: 24% default interest (contract rate 4%), an option to buy at $3.5m on default, no redemption before 2031.',
      blocks: [
        ['(a) Did Mei sever before she died, so that Sophie takes her share?',
         'A joint share passes by survivorship, never by Will (**Shafeeg**). Statutory severance needs declaration, service and registration and takes effect only on registration (**s 53(5), (6) LTA**; **Chan Lung Kien**, overruling **Diaz v Diaz**). A unilateral declaration is not an equitable severance (**Williams v Hensman**; **Burgess v Rawnsley**).',
         'Mei completed two steps; registration never happened. She did not sell or mortgage her share, and there was no agreement with her brothers. Her Will cannot sever.',
         'No severance: Ah Huat and Kenneth took by survivorship and Sophie takes nothing, though she may sue Mei\'s lawyer in negligence [check].'],
        ['(b) Can Ah Huat recover the bungalow, and does Pinnacle\'s charge bind it?',
         'Immediate indefeasibility protects innocent registered purchasers (**s 46(1) LTA**; **Frazer v Walker**), but not a proprietor party to fraud, which includes wilful blindness (**s 46(2)(a)**; **Waimiha**; **UOB v Bebe**). Each registered party is judged separately, and no one need look behind the register (**s 47(1)**). Rectification under **s 160**; the Assurance Fund only for Registry error (**ss 151, 155**).',
         'Victor was warned about the price and the signature and chose not to inquire: wilful blindness, so his title is defeasible. Pinnacle searched, dealt with the registered proprietor and had no suspicion; Victor\'s fraud is not the bank\'s, so its charge is indefeasible. Kenneth signed genuinely for his own interest, which may pass his half to Victor [check].',
         'Ah Huat caveats, has Victor\'s registration cancelled and recovers the bungalow (at least his half) subject to the charge; he sues Kenneth and Victor; the Fund will not pay.'],
        ['(c) Which terms of the charge bind Ah Huat?',
         'Default interest out of all proportion is a penalty (**Hong Leong**). An option for the lender to buy, in the mortgage, is a void clog (**Samuel v Jarrah Timber**). A postponement stands unless redemption becomes illusory (**Fairclough**; **Knightsbridge**).',
         '24% is six times the 4% contract rate. The $3.5m option on a $6m house exists to take the property on default. A five-year lock-in leaves a valuable house to redeem.',
         'Ah Huat redeems by paying the principal, 4% interest and costs; the default rate and the option fall; the lock-in stands.']
      ],
      advice: '**Sophie**: nothing in the bungalow. **Ah Huat**: caveat, s 160, redeem the charge at 4%, sue Kenneth and Victor. **Pinnacle**: charge valid at the contract rate only; no option.'
    },
    m5: {
      facts: 'Agent Daniel told Priya the roof was "completely redone in 2024. No leaks"; the Fongs had told him it leaked. Her OTP required signing at the solicitors\' office with a 4% cheque by 4 pm on 15 October; she emailed scans and a transfer screenshot at 3.50 pm and signed in person at 4.40 pm; the Fongs now have a $3.3m offer. Neighbour Mr Wee parks across the Fongs\' registered right of way, has ended his late father\'s permission for the Fongs\' gardener to cut across, is digging a pool by the boundary with no shoring (cracks, subsidence) and plans a third storey despite a registered "not exceeding two storeys" covenant for the Fongs\' land.',
      blocks: [
        ['(a) Did Priya validly exercise the option?',
         'An OTP is an irrevocable offer; the contract arises only on exercise (**Spiro v Glencrown**), which must follow the stated mode and time strictly (**JT Chanrai**). No exercise means no contract and no caveat; specific performance is discretionary (**EC Investment**).',
         'Email and a screenshot were not the stated mode, and her signature came after 4 pm. Nothing shows the Fongs waived strict compliance.',
         'The option lapsed: no contract, and the Fongs may take the $3.3m offer. If exercise were valid, she would seek specific performance and caveat.'],
        ['(a) Does Daniel\'s statement give Priya a claim?',
         'An untrue statement of fact that induces a contract: fraudulent (**Derry v Peek**), negligent (**s 2(1) Misrepresentation Act**) or innocent (**s 2(2)**). A principal is bound by its agent\'s statements within authority.',
         'A specific, false statement of fact, made knowing the truth, in answer to her question: fraudulent, and binding on the Fongs.',
         'Rescission or damages if a contract exists, acting promptly; otherwise damages for the loss it caused [check].'],
        ['(b) Can Mr Wee block the right of way or end the gardener\'s shortcut?',
         'A registered easement satisfying **Re Ellenborough Park** binds the servient owner; substantial interference is actionable. A bare licence is personal and revocable (**Wood v Leadbitter**; **Ashburn Anstalt**); estoppel needs reliance and detriment (**Inwards v Baker**).',
         'Parking across the drive blocks vehicle access, a substantial interference with a registered right of way. The shortcut was mere permission from his father, with no grant or reliance.',
         'An injunction and damages for the driveway; the shortcut can be withdrawn.'],
        ['(b) Is Mr Wee liable for the cracks and subsidence?',
         'Natural right of support (**Backhouse v Bonomi**); England needs an easement for buildings (**Dalton v Angus**), but **Xpress Print v Monocrafts** extends the duty to buildings; also negligence.',
         'He dug by the boundary with no shoring, and the land subsided and the wall cracked.',
         'Injunction until support is secured, and damages.'],
        ['(b) Can the Fongs stop the third storey?',
         'A negative covenant binds a successor with notice in equity (**Tulk v Moxhay**); the CT gives notice; the benefit passes with the benefited land (annexation; **P&A Swift**).',
         'The height limit is negative, benefits the Fongs\' land and is on No. 23\'s title.',
         'An injunction against the third storey.']
      ],
      advice: '**Priya**: probably no contract; claim for the lie. **Fongs**: may sell to the $3.3m buyer; injunctions on the driveway, digging and third storey. **Mr Wee**: clear the drive, shore the dig, two storeys only; may end the shortcut.'
    },
    m6: {
      facts: 'Ms Chua wrote to Mr Lim on WhatsApp "ok $4.2m, subject to contract"; he replied "deal"; she paid $20,000 marked "deposit shophouse" and renovated with his knowledge; no caveat. He sold to Mr Ho for $4.5m; Mr Ho knew of her claim and registered. Agent Zara (non-exclusive, 1%) secretly took $5,000 from Mr Ho. Mr Lim and Ms Chua are joint tenants of a car park lot; she wants to sell.',
      blocks: [
        ['(a) Does Ms Chua have an enforceable contract, and does it bind Mr Ho?',
         '"Subject to contract" raises a strong presumption of no contract (**Norwest**), rebuttable on all the circumstances (**OCBC v Wong Hua Choon**). Writing under **s 6(d) CLA** or part performance (**Hu Lee Impex**). A registered buyer is indefeasible (**s 46(1)**); knowledge is not fraud (**s 47(2)**); only dishonesty counts (**UOB v Bebe**; **Loke Yew**).',
         'The label leans against a contract, but "deal", the "deposit" and renovation with Mr Lim\'s knowledge make it arguable, and renovating is buyer-like part performance. Mr Ho knew of the claim, but knowledge is not fraud, nothing shows dishonesty, and she lodged no caveat.',
         'She cannot take the shophouse from Mr Ho; she claims damages from Mr Lim if a contract existed, or the $20,000 and renovation costs back.'],
        ['(b) What can Mr Lim do about Zara?',
         'An agent must not take a secret commission; it is held on constructive trust (**FHR** [check]); a dishonest agent forfeits commission (**Andrews v Ramsay**); effective cause governs non-exclusive commission (**Grandhome**).',
         'The $5,000 from the buyer, undisclosed, is a secret commission; the sale to Mr Ho was not the deal she was working on.',
         'Mr Lim recovers the $5,000, refuses her commission and reports her to the CEA.'],
        ['(c) Can Ms Chua sell her share of the car park lot?',
         'Joint tenancy means survivorship until severed by statute (**s 53(5), (6) LTA**; **Chan Lung Kien**) or by acting on one\'s share (**Williams v Hensman**); a court may order sale in lieu of partition (**Abu Bakar**).',
         'Selling her share severs: the buyer and Mr Lim become tenants in common in equal shares. If she dies first without severing, Mr Lim takes all.',
         'She may sell her half; if they cannot cooperate, either may seek a court-ordered sale.']
      ],
      advice: '**Ms Chua**: no claim to the shophouse; sue Mr Lim; sell or sever her lot share. **Mr Lim**: may owe her damages; recovers $5,000 from Zara. **Mr Ho**: indefeasible. **Zara**: repays, no commission, CEA.'
    }
  }
};
