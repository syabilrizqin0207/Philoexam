/* Trap index: the professor quotes these when a wrong answer matches a known trap, and the mistake
   cheat sheet prints them. ch = the lot (chapter) to revise. Built from the "Traps and tips" boxes of the
   Context and Case Guide and the "Exam tricks" boxes of the Q&A Bank. */
(function (LL) {
  'use strict';
  var T = function (key, ch, text) { LL.TRAPS[key] = { ch: ch, text: text }; };

  /* Lot 1 · Land, legal system, fixtures, title */
  T('weight-only', 1, 'Run BOTH Holland v Hodgson tests. Resting on its own weight only raises a presumption of a chattel; purpose (permanent improvement of the land) now carries more weight (D\'Eyncourt v Gregory).');
  T('building-tests', 1, 'If the item IS the building (walls, roof, a bungalow on pillars), it is part and parcel of the land (Elitestone v Morris). Skip the two fixture tests.');
  T('tenant-window', 1, 'A tenant removes trade, ornamental and domestic fixtures during the lease or a short time after, making good damage. Items left once possession is given up belong to the landlord.');
  T('airspace-limit', 1, 'An owner holds only the airspace reasonably necessary for ordinary use and enjoyment (s 2 LTA; Bernstein v Skyviews). Low intrusions (signs, crane jibs) are trespass; high overflights are not.');
  T('subsoil-30m', 1, 'Singapore subsoil: only the depth reasonably necessary, i.e. the depth in the State title or, if silent, 30 m below the Singapore Height Datum (s 3B State Lands Act). Bocardo (England) does not apply here.');
  T('precedent', 1, 'Only the ratio decidendi of a higher court in the same hierarchy binds. Obiter dicta and English decisions are persuasive only. Privy Council appeals ended in 1994.');
  T('civil-criminal', 1, 'Civil: claimant v defendant, balance of probabilities, compensation. Criminal: Public Prosecutor v accused, beyond reasonable doubt, punishment.');
  T('adr', 1, 'Arbitration ends in an award that binds the parties. Mediation is assisted negotiation: nothing binds until the parties sign a settlement.');
  T('proprietary', 1, 'A proprietary right must be definable, identifiable by third parties, capable of assumption by third parties and have some permanence (Ainsworth). Registration is not one of the four.');

  /* Lot 2 · Law and equity */
  T('legal-estate', 2, 'Equity\'s Darling must ACQUIRE THE LEGAL ESTATE. A buyer holding only a contract or another equitable interest is not protected.');
  T('gift-value', 2, 'A gift is not value. A donee takes subject to prior equitable interests even without notice.');
  T('imputed', 2, 'Notice includes constructive (would have found out on proper inquiry) and imputed (the buyer\'s solicitor or agent knew). Lack of actual knowledge is not enough.');
  T('fusion-admin', 2, 'Singapore fused the ADMINISTRATION of law and equity (s 3 Civil Law Act). The doctrines stay separate, and equity prevails in a conflict (Earl of Oxford\'s Case).');
  T('eq-discretion', 2, 'Damages are a right once breach is proved. Equitable remedies (specific performance, injunction, rescission, rectification) are discretionary: clean hands, delay, adequacy of damages.');
  T('walsh', 2, 'A specifically enforceable written agreement for a lease is treated in equity as a lease (Walsh v Lonsdale). No deed means no LEGAL lease, not no lease at all.');
  T('torrens-notice', 2, 'On registered land, mere knowledge of an unregistered interest is not fraud (s 47(2) LTA). An equitable interest needs a caveat.');

  /* Lot 3 · Covenants */
  T('pos-disguise', 3, 'Classify by what compliance costs. "Not to allow the roof to fall into disrepair" and "to maintain" are POSITIVE (they need money or work), whatever the wording.');
  T('burden-law', 3, 'The burden of a covenant NEVER passes at common law (Austerberry; Rhone v Stephens). The benefit can.');
  T('tulk-negative', 3, 'Tulk v Moxhay runs only NEGATIVE covenants, in equity, against a successor with notice, where the covenant benefits identifiable dominant land and was meant to bind successors. Remedy: injunction.');
  T('original-parties', 3, 'Between the original covenantor and covenantee, privity of contract decides. Skip the running rules; the covenantor stays liable after selling or letting.');
  T('halsall', 3, 'Halsall v Brizell: a successor who takes a benefit (using the road or drains) must bear the burden tied to it. It is a workaround, not a rule that positive burdens run.');
  T('benefit-burden', 3, 'Benefit and burden are separate questions with separate rules. Answer both, in that order, for each covenant.');

  /* Lot 4 · Easements, support, licences */
  T('four-tests', 4, 'Re Ellenborough Park: dominant and servient tenements; accommodates the dominant land; DIFFERENT owners; capable of grant (definite, no ouster). Give one fact per test.');
  T('accommodate', 4, 'A personal or commercial advantage that does not benefit the land itself fails "accommodation" (Hill v Tupper).');
  T('ouster', 4, 'A right that excludes the servient owner (storage, all-day parking) is ouster and cannot be an easement (Copeland v Greenhalf; Batchelor v Marlow).');
  T('support-buildings', 4, 'England: the natural right protects land; buildings need an easement (Dalton v Angus). Singapore: Xpress Print v Monocrafts extends the duty to buildings. State both, then add negligence.');
  T('licence-personal', 4, 'A licence is permission, not a property right. A bare licence is revocable and binds no buyer; a contractual licence binds a buyer only through a constructive trust (Ashburn Anstalt).');
  T('philcox', 4, 'Altering the dominant land ends or limits an easement only if the extent of use increases (Graham v Philcox).');

  /* Lot 5 · Mortgages */
  T('borrower-profile', 5, 'Identify the borrower first. Advised commercial parties are held to long postponements (Knightsbridge); vulnerable individuals get protection (Hong Leong; BOM v BOK).');
  T('option-clog', 5, 'An option for the lender to buy the mortgaged property, given as part of the mortgage, is a void clog (Samuel v Jarrah Timber). Singapore has shown leniency to sophisticated commercial borrowers (Citicorp v Wee Ah Kee [check]), so profile the borrower.');
  T('collateral', 5, 'A collateral advantage that is a separate bargain and ends on redemption is valid (Kreglinger). Ask whether it outlives redemption or is unfair.');
  T('penalty-default', 5, 'A default interest rate out of all proportion to the lender\'s greatest conceivable loss is a penalty (Hong Leong: 18% v 5.5–6.75%). "Industry practice" is no answer.');
  T('arisen-exercisable', 5, 'Power of sale: ARISEN needs all three (deed, money due, no exclusion). EXERCISABLE needs any one s 25 CLPA trigger (notice + 3 months; interest 1 month in arrears; breach of another term).');
  T('s75', 5, 'A registered chargee has no inherent right to possession. s 75 LTA: after default, entry needs one month\'s notice, and rents taken must be accounted for.');
  T('lease-mortgage', 5, 'Which came first? A lease before the mortgage binds the bank. A lease after it binds the bank only under s 23 CLPA (up to 3 years), the deed, or consent (s 89(1) LTA).');
  T('sale-duty', 5, 'On sale the mortgagee must act in good faith and take reasonable care to get the true market value (Cuckmere). No duty to wait for a better market (China & South Sea Bank).');

  /* Lot 6 · Leases and licences */
  T('label', 6, 'Exclusive possession for a term at a rent is a tenancy whatever the document calls it (Street v Mountford: "a fork is a fork").');
  T('sham', 6, 'Clauses never meant to operate (a right to move others in, to move the occupier) are shams and are ignored (Antoniades v Villiers).');
  T('services', 6, 'Real attendance and services that need unrestricted access (meals, cleaning the rooms) point to a lodger\'s licence. Weekly cleaning of common areas or a locked store room do not by themselves.');
  T('fixed-term', 6, 'A fixed-term lease ends at the end of the term. A notice to quit works only for a periodic tenancy, or under a break clause.');
  T('privity-both', 6, 'When you mention privity of estate, also mention privity of contract: the original tenant stays liable for the contractual term (City of London v Fell); the assignee is bound by privity of estate (Spencer\'s Case).');
  T('forfeit-steps', 6, 'Forfeiture: (1) a right to forfeit (express re-entry clause, or s 93 LTA for registered leases); (2) the right procedure (s 18 CLPA notice for non-rent breaches; s 18A for rent); (3) check waiver.');
  T('waiver', 6, 'Accepting rent with knowledge of a breach waives the right to forfeit for that breach (a continuing breach can give a fresh right).');
  T('underwrite', 6, 'Quiet enjoyment and non-derogation need substantial interference judged by what both sides contemplated. The landlord does not underwrite the tenant\'s profits (OUE v Three Sixty), and a no-set-off clause works.');
  T('certain-term', 6, 'A lease needs a term certain from the start ("for the duration of the war" fails: Lace v Chantler; Prudential).');

  /* Lot 7 · Co-ownership and trusts */
  T('will-jt', 7, 'A Will cannot pass a joint tenant\'s share: survivorship takes effect first. Check whether anything severed the joint tenancy BEFORE death.');
  T('sever-register', 7, 'Statutory severance needs all three steps: declaration in the approved form, service on every other joint tenant, registration. It takes effect on registration (Chan Lung Kien, overruling Diaz v Diaz).');
  T('rt-burden', 7, 'The legal burden is on the person who asserts the resulting trust (the payer proves the recipient holds for him). The presumption helps, but the burden does not shift.');
  T('two-stage', 7, 'Look for the transferor\'s actual intention FIRST. Presumptions are a last resort (Goh Swee Fang; Patricia Khoo).');
  T('advancement', 7, 'The presumption of advancement is about relationships (parent–child, husband–wife). Its strength depends on the relationship, and Singapore asks whether a gift is more probable than not (Lau Siew Kim).');
  T('acq-time', 7, 'The extent of a resulting trust is fixed at acquisition (Lau Siew Kim). Later mortgage payments count only if the parties\' plan treated them as contributions (Chan Yuen Lan).');
  T('wc-spouses', 7, 's 112 Women\'s Charter divides matrimonial assets on divorce between spouses only. Unmarried partners use trust law.');

  /* Lot 8 · Sale and purchase */
  T('stc-both', 8, '"Subject to contract": state Norwest (strong presumption of no contract) AND OCBC v Wong Hua Choon (look at all circumstances and objective intention). Then pick a side with two facts.');
  T('goodwill', 8, 'A "goodwill deposit" is not an option fee. An option fee is paid against a signed OTP.');
  T('writing', 8, 's 6(d) Civil Law Act: no action on a land contract unless it or a memorandum is in writing and signed by the party sued, showing the 3 Ps (parties, property, price), unless part performance applies.');
  T('pp-unequivocal', 8, 'Part performance needs acts by the claimant unequivocally referable to a contract about the land (Hu Lee Impex rejects the relaxed Steadman test). A small payment alone is usually equivocal.');
  T('otp-strict', 8, 'An OTP must be exercised exactly as it says, in time and in the stated mode (JT Chanrai). The contract arises on exercise (Spiro v Glencrown).');
  T('no-contract', 8, 'When the answer is "no contract", finish the job: no equitable interest, so no caveat, and the money paid is recoverable.');
  T('misrep-opinion', 8, 'Misrepresentation needs an untrue statement of FACT that induced the contract. Opinions and sales puffs are outside it, unless the opinion implies facts the maker knows are untrue.');
  T('sp-discretion', 8, 'Specific performance is the usual remedy for land but is discretionary: adequacy of damages, clean hands, delay, hardship to third parties (EC Investment; Lee Christina).');

  /* Lot 9 · Registration, Torrens, caveats, stamp duty */
  T('whose-fraud', 9, 's 46(2)(a): the fraud or forgery must be that of the registered proprietor or his agent. A stranger\'s forgery does not defeat an innocent registered purchaser.');
  T('notice-fraud', 9, 'Fraud means actual dishonesty (Assets Co; UOB v Bebe). Carelessness or notice of an unregistered interest is not fraud (s 47(2)). Wilful blindness after suspicion is.');
  T('immediate', 9, 'Singapore follows IMMEDIATE indefeasibility (Frazer v Walker): an innocent purchaser who registers under a forged instrument gets a good title.');
  T('donee', 9, 'Only a purchaser (good faith, value: s 4) is protected. A donee or non-purchaser takes no better title than the transferor (s 46(3)).');
  T('each-separately', 9, 'Judge each registered person separately. A fraudulent buyer\'s title can be defeasible while the innocent mortgagee behind him is indefeasible.');
  T('caveat-interest', 9, 'A caveat needs an interest in land that the law recognises and that exists when the caveat is lodged (s 115; Asiatic Enterprises). A bare contractual right to money is not enough (Salbiah).');
  T('caveat-open', 9, 'For caveat removal, open with s 127(1) (any reason; caveator shows cause) or s 127(2) (vexatious, frivolous, not in good faith), say why, then apply American Cyanamid (Eng Mee Yong).');
  T('absd-higher', 9, 'Joint buyers of mixed profiles pay the HIGHER applicable ABSD rate on the whole price. Rates are never averaged or split by share.');
  T('ct-all', 9, 'Not every legal interest is on the Certificate of Title: overriding interests (e.g. leases of 7 years or less) bind without registration.');
  T('assurance', 9, 'The Assurance Fund pays for loss caused by the Registrar\'s or staff\'s omission, mistake or misfeasance (ss 151, 155). A stranger\'s forgery alone does not trigger it.');

  /* Lot 10 · Agency and estate agency */
  T('custom', 10, 'A trade custom the principal did not know about is no defence to a secret profit (Hippisley v Knee Bros). Disclosure plus consent is the only cure.');
  T('honest-agent', 10, 'An HONEST agent who took an undisclosed profit accounts for it but may keep the agreed commission (Hippisley). A DISHONEST agent also forfeits commission (Andrews v Ramsay).');
  T('bribe-remedies', 10, 'Bribe or secret commission: list the remedies (account, constructive trust under FHR v Cedar, rescission of the tainted contract, forfeit commission, damages), then pick those the facts support.');
  T('conflict', 10, 'Selling to oneself, a relative or a connected company without full disclosure and consent is a conflict, and the sale can be set aside (McPherson v Watt).');
  T('exclusive', 10, 'Under the CEA exclusive form (Clause 6), commission is due on any binding sale in the validity period, introduced by the agent or not. Effective cause (Grandhome) is for NON-exclusive agency.');
  T('apparent-own', 10, 'Apparent authority needs a representation BY THE PRINCIPAL. An agent cannot create his own apparent authority (Armagas v Mundogas).');
  T('commission-only', 10, 'A commission-only agent earns nothing unless the event in the contract (usually a sale) happens (Luxor v Cooper). Finding a willing buyer is not enough.');
})(window.LL);
