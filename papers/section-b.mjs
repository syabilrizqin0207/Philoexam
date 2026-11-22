// Paper 2: every Section B (case study / essay) topic and how to answer it.
// Sources: Lecture 13 (exam format), the practice paper, the Context and Case Guide and the Essay Samples and Q&A Bank.
// [check] marks a point your own notes flag as unconfirmed.
import TOPICS from './topics.mjs';

export default {
  title: 'RE2702 Land Law: Section B, Every Topic and How to Answer It',
  subtitle: 'Every case-study topic the course can set, each with a sample question and a full model answer in ILAC, plus essay plans and the past-year case studies mapped part by part',
  meta: 'Final: Tue 24 Nov 2026, 9 to 11 am, Biz2 05-11 · Section A: 20 MCQs × 3 marks · Section B: one case study, 40 marks, 2 to 3 sub-questions, each possibly from a different area · open book, copy and paste disabled',

  method: [
    { head: 'What Section B looks like', paras: [
      'Section B is one case study worth 40 marks. The revision lecture says it will have 2 to 3 sub-questions and that each part may raise issues from a different area of law. The past-year paper (worth 50 marks) joined covenants, a mortgage and a lease in one story about Mrs Leong, Gabby, Bestbank and the students, and co-ownership, a caveat and a mortgage in another about Zen and Belle. The lecturer says this year\'s paper will likely involve fewer issues.',
      'The instructions are fixed. Use the ILAC format, highlight or bold the authorities, and paragraph the answer. The lecturer repeats three more points: plan before you write; whenever you mention privity of estate, also mention privity of contract; and for a caveat, open by saying whether you use s 127(1) or s 127(2) and why.'
    ] },
    { head: 'Time plan for the two hours', table: [
      ['Minutes', 'What to do'],
      ['0 to 3', 'Read the Section B question, the last line first ("Advise A, B and C"). Note the parts and their marks.'],
      ['3 to 53', 'Section A: 20 MCQs at about 2.5 minutes each. Write T or F beside every statement in combination questions before reading the options.'],
      ['53 to 60', 'Plan Section B: draw the diagram (who owns, who promised, who paid, who is registered) and number the issues per part.'],
      ['60 to 112', 'Write Section B: about 1.3 minutes per mark. A 20-mark part gets about 25 minutes; a 10-mark part about 13.'],
      ['112 to 120', 'Check: every named party has a conclusion, every authority is bolded, any skipped MCQ is answered.']
    ] },
    { head: 'Read the story with four questions', list: [
      '**Who owns what, and how is it held?** Registered title, joint tenants or tenants in common, lease or licence, legal or equitable.',
      '**Who promised what to whom?** Contract, covenant, option, mortgage term, agency agreement.',
      '**Who is bound by it now?** A buyer, a tenant, a bank, an heir, a successor in title.',
      '**What can the winner get?** Damages, injunction, specific performance, rescission, rectification, removal of a caveat, an account.'
    ], ordered: true },
    { head: 'ILAC, and what each step must contain', table: [
      ['Step', 'What earns the marks', 'Frame'],
      ['Issue', 'One line, framed as a question on the facts, naming the parties.', '"The issue is whether the students hold a lease or a licence."'],
      ['Law', 'The rule in two to four lines, with the case **in bold** and the section **in bold**, and what the case decided.', '"In **UOB v Bebe** [2006] SGCA 30 the Court of Appeal held that fraud means actual dishonesty."'],
      ['Application', 'Match each element of the rule to a fact, using "because". Answer the other side\'s best point in one sentence.', '"Here, Bobby\'s lawyer warned him ... Because he refused to inquire, he was wilfully blind."'],
      ['Conclusion', 'One or two lines per party, with the remedy.', '"Accordingly, Mrs Leong can obtain an injunction against Gabby on covenant (ii)."']
    ] },
    { head: 'Sentences that earn marks', list: [
      '**Assumption:** "The facts do not say whether the lease was registered. If it was, ... If not, ..."',
      '**Counter-argument:** "Bestbank may argue that ... This is unlikely to succeed because ..."',
      '**Both cases on a split point:** "**Norwest** creates a strong presumption of no contract; **OCBC** looks at all the circumstances. On these facts the presumption holds because ..."',
      '**Remedy:** "If I am wrong on liability, the remedy would be ..." (one or two lines, to collect the remedies marks either way).'
    ] },
    { head: 'Issue spotter: the fact in the story and where to go', table: [
      ['Fact in the story', 'Topic', 'Lead authorities'],
      ['Tenant or seller removes fittings, machinery, a house on stilts', '1', 'Holland v Hodgson; D\'Eyncourt; Elitestone; Kiah'],
      ['Crane, drone, sign, ground anchors', '2', 'Bernstein; Kelsen; Anchor Brewhouse; s 3B SLA'],
      ['Unregistered interest and a later buyer', '3, 19', 'Equity\'s Darling; Walsh v Lonsdale; s 46, s 47(2) LTA'],
      ['"for herself and her successors" promises when land is sold', '4', 'Austerberry; Rhone; Tulk v Moxhay'],
      ['Right to park, store, walk, use a garden', '5', 'Re Ellenborough Park; Batchelor; Copeland'],
      ['Neighbour excavates, cracks appear', '6', 'Xpress Print; Dalton v Angus; negligence'],
      ['Lock-in, option to buy, tied insurance, high default rate', '7', 'Fairclough; Knightsbridge; Samuel; Kreglinger; Hong Leong; BOM v BOK'],
      ['Bank threatens possession or sells cheaply', '8', 's 75 LTA; s 25 CLPA; Cuckmere'],
      ['Rooms let, a room kept locked, a cleaner, a "licence" label', '9', 'Street v Mountford; AG Securities; Aslan'],
      ['Late rent, business use, notice to quit during a fixed term', '10', 's 18, s 18A CLPA; Expert Clothing; Distress Act'],
      ['Landlord\'s works hurt the business; rent withheld', '11', 'OUE v Three Sixty; Cold Storage'],
      ['Lease assigned, assignee stops paying', '12', 'City of London v Fell; Spencer\'s Case; Milmo'],
      ['Two names on a title, a death, a Will', '13', 's 53 LTA; Shafeeg; Chan Lung Kien'],
      ['One person paid; a child, partner or spouse is on the title', '14', 'Lau Siew Kim; Patricia Khoo; Chan Yuen Lan'],
      ['Co-owners fall out; one wants a sale', '15', 'Abu Bakar; Malayan Credit; s 112 WC'],
      ['WhatsApp deal, "subject to contract", money paid', '16', 'Norwest; OCBC; s 6(d) CLA; Hu Lee Impex'],
      ['Option exercised late, by the wrong method', '17', 'Spiro; JT Chanrai'],
      ['Untrue statement before purchase; requisition reply', '18', 'Derry v Peek; s 2 Misrep Act; Chu Yik Man'],
      ['Forged transfer, a buyer who did not ask, a bank', '19', 'Frazer v Walker; Bebe; Waimiha; s 160; ss 151, 155'],
      ['Someone lodged a caveat', '20', 's 115, s 127, s 128 LTA; Eng Mee Yong'],
      ['Citizen and PR buying together', '21', 'ABSD: higher rate applies'],
      ['Agent signs or promises without authority; promoters', '22', 'Freeman & Lockyer; Armagas; Kelner; Bolton v Lambert'],
      ['Agent keeps discounts, takes a fee, sells to a cousin', '23', 'Hippisley; Andrews v Ramsay; FHR; McPherson v Watt'],
      ['Who gets commission; another agent sold it', '24', 'CEA Clause 6; Grandhome; Luxor v Cooper']
    ] },
    { head: 'Three rules for the hall', list: [
      'Every named party gets a conclusion, even if it is one line.',
      'Bold every case and section, every time. Give the full case name once, then a short form (**Bebe**, **Street**).',
      'If a fact is missing, state the assumption in one line, give the alternative in one more, and carry on.'
    ] }
  ],

  topics: TOPICS,

  essayIntro: [
    'A narrative question asks you to "explain" or "discuss" a doctrine rather than advise parties. Use introduction, argument and conclusion: state your thesis in the first two sentences, make four or five points each supported by a case or section, and finish with a view. Bold the authorities here too.'
  ],
  essays: [
    { q: 'E1. "The rule that the burden of a positive covenant does not run with the land causes difficulty in practice." Discuss.', intro: 'At common law the burden of a covenant never passes (**Austerberry**), and **Rhone v Stephens** confirmed that positive burdens do not run in equity either; only negative burdens run, under **Tulk v Moxhay**. The rule causes real difficulty, and the workarounds only partly solve it.', points: ['The problem: a promise to repair a shared wall or pay for a road binds only the original covenantor.', 'The reason: equity restrains conscience but will not compel a stranger to spend money.', 'Workarounds: a chain of indemnity covenants (breaks when a link is lost); **Halsall v Brizell** (limited to linked benefits, as Rhone shows); leases, where privity of estate carries positive covenants.', 'Statutory schemes: strata management corporations bind owners to contribute, so the gap is mainly in landed property.', 'Reform: registrable land obligations have been proposed in England [check]; Singapore has not adopted them.'], end: 'The rule is harsh for landed property; statutory schemes solve most strata cases, and registrable land obligations would be the cleanest fix.' },
    { q: 'E2. "Registration gives an indefeasible title, but fraud defeats it." Discuss with Singapore authority.', intro: 'The register is conclusive (**s 46(1) LTA**) and Singapore follows immediate indefeasibility (**Frazer v Walker**). The fraud exception is narrow and tied to the proprietor\'s own conduct.', points: ['Immediate indefeasibility protects the buyer who relies on the register, even against forgery.', 'Fraud means actual dishonesty, not negligence or notice (**Assets Co**; **s 47(2)**); wilful blindness counts (**Waimiha**; **UOB v Bebe**).', 'Whose fraud: the proprietor\'s or his agent\'s; a stranger\'s fraud does not defeat an innocent buyer (**Bebe**).', 'Only purchasers benefit (**s 46(3)**; **Chan Wai Leen**), and a promise never meant to be kept is fraud (**Loke Yew**).', 'Safety nets: rectification (**s 160**, limited against proprietors in possession), the Assurance Fund (**ss 151, 155**, Registry error only), caveats, and claims against wrongdoers.'], end: 'Indefeasibility is strong because the exception is narrow; owners should caveat early and sue the wrongdoer.' },
    { q: 'E3. "An estate agent earns commission only if he is the effective cause of the sale." Discuss.', intro: 'Commission is first a matter of contract. Effective cause governs non-exclusive agency; the CEA exclusive form turns on its own wording.', points: ['Effective cause asks whether the agent\'s introduction was the real cause of the sale (**Grandhome**: five elements, then the owner may rebut).', 'Non-exclusive agency: several agents compete and only the effective cause is paid.', 'Exclusive agency: Clause 6 pays on any binding sale in the validity period, whoever found the buyer.', 'Timing: the binding agreement arises on exercise of an OTP (**Spiro**).', 'Fiduciary limits: dishonesty forfeits commission (**Andrews v Ramsay**; contrast **Hippisley**).'], end: 'The statement is accurate for non-exclusive agency and incomplete for exclusive agency.' },
    { q: 'E4. "A lease is defined by exclusive possession, and labels do not decide the issue." Discuss.', intro: '**Street v Mountford** holds that exclusive possession for a term at a rent is a tenancy whatever the label. The test is sound and its exceptions are narrow.', points: ['The test: substance over form ("a fork is a fork"), followed in Singapore (**Goh Cin Chye** [check]).', 'Shams are ignored (**Antoniades v Villiers**); separate agreements give separate rights (**AG Securities**).', 'Exceptions: no intention to create legal relations, family arrangements (**Errington**), service occupancy, lodgers receiving services (**Abbeyfield**).', 'Retained keys are not decisive (**Aslan v Murphy** [check]).', 'Why it matters: a lease is property that binds buyers and banks; a licence is personal.'], end: 'Exclusive possession is the key, and courts look through labels; a drafter who wants a licence must give the owner real control.' },
    { q: 'E5. Explain how equity developed alongside the common law and how the bona fide purchaser rule protects a buyer.', intro: 'Equity grew from the Chancellor\'s conscience-based jurisdiction to correct the rigid common law. Singapore fuses its administration with the law (**s 3 Civil Law Act**) while keeping the doctrines distinct.', points: ['Origins: the writ system, petitions to the Lord Chancellor, and equity prevailing in conflict (**Earl of Oxford\'s Case**).', 'Legal rights bind the world; equitable rights bind all but Equity\'s Darling: good faith, value, the legal estate, no notice (**Pilcher v Rawlins** [check]).', 'Equity looks to substance (**Walsh v Lonsdale**) and treats as done what ought to be done (**Lysaght v Edwards**).', 'Remedies are discretionary: clean hands, delay (**Lee Christina**).', 'On registered land the register replaces notice; knowledge alone is not fraud (**s 47(2) LTA**), so equitable interests need a caveat.'], end: 'Equity softens the common law through discretionary remedies; on registered land the register now does most of the work that notice once did.' },
    { q: 'E6. How do the courts treat negotiations marked "subject to contract" when the parties later act as if bound?', intro: 'The words signal that the parties do not intend to be bound yet. The leading Singapore cases are **Norwest** [2011] SGCA 42 and **OCBC** [2012] SGCA 54.', points: ['Norwest: a strong presumption of no contract, rebutted only by strong context.', 'OCBC: the label is not decisive; look at all the circumstances and the objective evidence.', 'Evidence: settled terms, conduct after the exchange, common solicitors, payments, possession (compare **RTS Flexible Systems**).', 'Land adds s 6(d) CLA writing and signature (emails can suffice: **Joseph Mathew**).', 'Part performance can rescue an oral deal (**Maddison**; **Hu Lee Impex**).'], end: 'The default is no contract; a party who says the label was dropped needs clear evidence.' },
    { q: 'E7. Discuss the Singapore approach to resulting trusts where property is bought in another\'s name.', intro: '**Dyer v Dyer** presumed a trust for the payer. Singapore now treats evidence of actual intention as primary and the presumptions as a last resort.', points: ['Stage 1: actual intention (**Goh Swee Fang**; **Patricia Khoo**; **Wong Mei Lee Millie** [2026]).', 'Stage 2: the presumption of resulting trust, with the burden on the person asserting it and shares fixed at acquisition (**Lau Siew Kim**).', 'Advancement: parent to child and husband to wife, with strength depending on the relationship (**Lau Siew Kim**); little weight today (**Pettitt**).', 'Common intention can displace presumed shares (**Chan Yuen Lan**; **DOP v DOO**).', 'Criticism: the presumptions are blunt, which is why courts prefer evidence.'], end: 'Singapore prefers evidence to presumptions; parties should record the purpose of a transfer.' },
    { q: 'E8. "Equity does not allow a mortgagee to impose terms that stop the mortgagor getting his property back." Discuss.', intro: 'The equity of redemption is protected by "once a mortgage, always a mortgage", but the modern law weighs fairness and the borrower\'s position.', points: ['Illusory postponements are void (**Fairclough**); commercial parties are held to long ones (**Knightsbridge**).', 'Options to buy in the loan are void (**Samuel v Jarrah**; **Jones v Morgan** [check]).', 'Collateral advantages stand if separate and fair (**Kreglinger**), subject to restraint of trade (**Esso**).', 'Penalties: default interest out of proportion (**Hong Leong**).', 'Unconscionability in Singapore (**BOM v BOK**) protects vulnerable borrowers.'], end: 'The rule guards redemption; its strength now depends on the borrower, giving commercial parties more freedom than the vulnerable.' },
    { q: 'E9. Explain the landowner\'s right of support and how Singapore law differs from the English position.', intro: 'Support for land is a natural right; England protects buildings only through an easement, while Singapore extends the duty to buildings.', points: ['The natural right and the timing of the claim (**Backhouse v Bonomi**).', 'The English route for buildings: an easement acquired by long use (**Dalton v Angus**).', 'Singapore: **Xpress Print v Monocrafts** extends the duty to the claimant\'s buildings.', 'Negligence as a parallel claim, especially for a failure to monitor.', 'Practice: developers must secure alternative support and monitor, and remain liable despite contractors.'], end: 'Singapore gives neighbours stronger protection than English law, which suits dense development.' },
    { q: 'E10. What makes a right proprietary rather than personal, and why does it matter in land law?', intro: 'A proprietary right binds third parties; a personal right binds only the person who granted it. **National Provincial Bank v Ainsworth** supplies the test.', points: ['Lord Wilberforce\'s four features: definable, identifiable by third parties, capable of assumption by third parties, some permanence.', 'The bundle of rights: ownership can be split into leases, easements and mortgages.', 'Contrast: leases and easements are proprietary; licences are personal (**Ashburn Anstalt**); covenants bind successors only in equity and only if negative (**Tulk v Moxhay**).', 'Registration is a separate question of protection, not part of the definition (**s 46 LTA**).', 'Consequence: whether a buyer, bank or heir is bound turns on this classification.'], end: 'Classification as proprietary is the gateway question in almost every land problem.' }
  ],

  comboIntro: [
    'Section B joins topics in one story. Read the last line first, split the answer into parts with headings, and give each part its own ILAC blocks. The same fact can appear in two parts: the 24-month student lease is relevant to both the mortgage and the lease question. Apply it to each rule separately. Below are mark plans for the past-year case studies and the Q&A bank\'s mock, adjusted to a 40-mark paper. Every part already has a full model answer in ILAC in Part B, in the topic numbers shown: together they make the complete answer.'
  ],
  combos: [
    { head: 'Case Study 1: Mrs Leong, Gabby, Bestbank and the students', facts: ['Covenants on the sale of No. 13; a 15-year mortgage with a lock-in, variable rate and tied insurance; rooms let to nursing students for 24 months; late rent, Science lessons, a notice to vacate in month 18; roof and wall disrepair; noise.'], plan: [['Covenants', '4', 10, 13], ['Mortgage terms and the bank', '7, 8', 12, 16], ['Lease or licence, notice, rent, business use', '9, 10', 14, 18], ['Nuisance and conclusions for each party', '4, 10', 4, 5]], notes: ['Conclusions for Mrs Leong, Gabby, Bestbank and the students, one line each at least.', 'Use the 24-month lease in the mortgage part (s 23 CLPA, s 89 LTA) and again in the lease part.'] },
    { head: 'Case Study 2: Zen, Belle, the children and Bigbank', facts: ['A penthouse in joint names bought by Zen, Belle paid nothing, a text "to have and to hold forever", a Will in favour of the children, Zen\'s death, the children\'s caveat; a mortgage with 28% default interest and a nine-year bar on redemption.'], plan: [['(a) Belle and the children', '13, 14, 20', 20, 26], ['(b) Two mortgage issues', '7, 8', 20, 26]], notes: ['In (a) open with legal title (joint tenants by default), then the beneficial question, then the Will, then the caveat and s 127(1).', 'In (b) name the two issues first (default interest, redemption bar), give each half a page, then the consequences for Belle as co-borrower.'] },
    { head: 'Q&A bank mock: Mr Lim, Ms Chua, Mr Ho and agent Zara', facts: ['A WhatsApp deal "subject to contract" answered with "deal"; a $20,000 deposit and renovations; a sale to Mr Ho who knew of the claim and registered; no caveat; a secret $5,000 to the agent; a jointly owned car park lot.'], plan: [['(a) Ms Chua and the shophouse', '16, 19', 20, 26], ['(b) Mr Lim and Zara', '23, 24', 10, 13], ['(c) The car park lot', '13, 15', 10, 13]], notes: ['Spot the five signals: "subject to contract", no caveat, a knowing registered buyer, a secret payment, joint ownership.'] }
  ],
  checklist: [
    'Did I read the last line and answer for every named party?',
    'Does every issue have its own ILAC block with a heading?',
    'Is every case and section bolded?',
    'Did I state both sides on split points (Norwest and OCBC; Anchor Brewhouse and Bernstein)?',
    'Where facts were missing, did I state the assumption and the alternative?',
    'Did I give a remedy for each conclusion (damages, injunction, specific performance, rescission, rectification, removal of caveat, account)?',
    'Privity of estate paired with privity of contract? Caveat opened with s 127(1) or (2)?',
    'Did I check the [check] points I relied on against my slides?'
  ]
};
