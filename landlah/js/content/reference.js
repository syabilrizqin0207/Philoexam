/* Reference pack: exam format, ILAC, timing, frames, issue spotter, authority bank, numbers, mock papers and the plan.
   Sources: Lecture 13 (revision and exam format) and the Q&A Bank, Part 0. */
(function (LL) {
  'use strict';
  var R = LL.ref;

  R.exam = {
    when: 'Tuesday 24 November 2026, 9:00 am to 11:00 am',
    where: 'Biz2, 05-11 (face to face only)',
    format: [
      'Section A: 20 MCQs, 3 marks each (60 marks). Choose the most suitable answer.',
      'Section B: one case study (40 marks), with 2–3 sub-questions or issues; each part may raise a different area of law.',
      '2 hours. Open book: soft copies on your laptop and hard-copy notes are allowed.',
      'Electronic exam: secure, no internet access, copy and paste disabled.',
      'Coverage: Lectures 1–12, tutorial discussions, curated videos and references.',
      'Section B instructions: use ILAC, highlight or bold authorities, and paragraph your answer.'
    ],
    note: 'The practice paper does not mention a penalty for wrong MCQ answers, so this app assumes none: never leave a question blank. Check the instructions on the day.'
  };

  R.timing = [
    ['0:00–0:55', 'Section A: 20 MCQs. About 2.5 minutes each. Flag anything that stalls you and move on.'],
    ['0:55–1:00', 'Section B set-up: read the last line ("Advise A, B, C"), draw who owns, who promised, who paid, who is registered; number the issues.'],
    ['1:00–1:50', 'Write each issue in ILAC, time in proportion to marks (about 1 minute per mark).'],
    ['1:50–2:00', 'Return to flagged MCQs. Check that every named party has a conclusion.']
  ];

  R.ilac = [
    ['Issue', 'One line framed as a question on the facts, naming the parties: "Whether Marcus and Mr Lee formed a binding contract."'],
    ['Law', 'The rule, with the case and section in bold and the point of the case in one clause. Two to four lines per rule.'],
    ['Application', 'Use the facts and the word "because". Match each element of the rule to a fact. Answer the other side\'s best point in one sentence.'],
    ['Conclusion', 'One or two lines per party, with the remedy.']
  ];

  R.frames = [
    ['State the issue', '"The issue is whether ..." / "Mr Ong will want to know whether ..."'],
    ['State the rule', '"Under s 46(2)(a) LTA, title is defeasible where the proprietor or his agent was a party to fraud or forgery."'],
    ['Cite the case', '"In UOB v Bebe [2006] SGCA 30, the Court of Appeal held that fraud means actual dishonesty."'],
    ['Apply', '"Here, Bobby\'s lawyer warned him that ... Because Bobby told the lawyer not to ask questions, he deliberately avoided inquiry."'],
    ['Counter-argument', '"Harbour Bank may argue that ... This fails because ..."'],
    ['Assumption', '"The facts are silent on whether the OTP was exercised. If it was, ... If not, ..."'],
    ['Conclude', '"Accordingly, Marcus is unlikely to succeed in claiming specific performance. He should recover the $1,000."']
  ];

  R.hallRules = [
    'Every named party gets a conclusion.',
    'Bold the authority: cases and sections, every time.',
    'If the facts are thin, state the assumption in one line and carry on; give the alternative outcome in one more line.',
    'When you mention privity of estate, also mention privity of contract.',
    'A Will cannot pass a joint tenant\'s share: survivorship comes first.',
    'For a caveat, open by saying whether you use s 127(1) or s 127(2), and why.',
    'MCQs: read all four options. One word ("may", "all", "any", "without exception") can flip an option.'
  ];

  R.mcqAttack = [
    ['Read the stem\'s last line first', 'Is it asking for the TRUE statement, the FALSE one, or "the most suitable answer"?'],
    ['Name the lot', 'Which area is this? Use the issue spotter below.'],
    ['Strike absolutes', '"All", "any", "never", "without exception" are usually wrong in land law; exceptions exist almost everywhere.'],
    ['Roman-numeral sets', 'Find one statement you are sure is false and strike every option containing it.'],
    ['Check the reason clause', 'An option with the right outcome for the wrong reason ("no contract AS Y owes no fiduciary duty") is wrong.']
  ];

  /* "If the facts mention ..." -> lot */
  R.spotter = [
    ['Machinery, fittings, aircon, a tenant removing items at lease end', 1],
    ['A crane, sign, drone, tunnel or ground anchors', 1],
    ['A trustee selling; a buyer who "knew" or got a gift; a deed missing', 2],
    ['"Covenanted ... for herself and her successors"; repair, height, business use', 3],
    ['A right of way, parking, storage, a garden; a neighbour digging', 4],
    ['A loan secured on the property; lock-in, default interest, option, tied insurance; bank taking possession', 5],
    ['Rooms let, "licence" label, keys, notice to quit, late rent, forfeiture, quiet enjoyment', 6],
    ['Two names on the title; someone dies; a Will; who paid; severance; divorce', 7],
    ['WhatsApp or email negotiations; "subject to contract"; OTP; deposit; no signed document', 8],
    ['A forged transfer; registered buyer or bank; a caveat; ABSD or stamp duty', 9],
    ['An agent: commission, secret fee, discount, relative as buyer, several agents, exclusive form', 10]
  ];

  R.authorityBank = [
    ['Equitable interest binds all except', 'Equity\'s Darling (good faith, value, legal estate, no notice)'],
    ['Burden of a covenant', 'Austerberry, Rhone v Stephens (never at law); Tulk v Moxhay (negative, in equity)'],
    ['Easement tests', 'Re Ellenborough Park'],
    ['Support of land and buildings', 'Xpress Print v Monocrafts'],
    ['Clog on redemption', 'Fairclough, Knightsbridge, Samuel v Jarrah, Kreglinger, Hong Leong, BOM v BOK'],
    ['Mortgagee\'s sale', 'Cuckmere Brick; China & South Sea Bank; s 25 CLPA; s 75 LTA'],
    ['Lease v licence', 'Street v Mountford; Antoniades v Villiers; AG Securities v Vaughan'],
    ['Privity after assignment', 'City of London v Fell, Spencer\'s Case, s 10 and s 11 CLPA'],
    ['Forfeiture', 's 18, s 18A CLPA; s 93 LTA; waiver (Expert Clothing)'],
    ['Quiet enjoyment', 'OUE v Three Sixty; Cold Storage v MCST Chancery Court'],
    ['Severance', 's 53(5), (6) LTA, Chan Lung Kien, Williams v Hensman'],
    ['Resulting trust', 'Lau Siew Kim, Chan Yuen Lan, Patricia Khoo'],
    ['Subject to contract', 'Norwest v Newport Mining, OCBC v Wong Hua Choon, Tai Tong (old)'],
    ['Land contract writing', 's 6(d) Civil Law Act, Joseph Mathew, Hu Lee Impex (part performance)'],
    ['OTP', 'Spiro v Glencrown; JT Chanrai'],
    ['Specific performance', 'EC Investment, Lee Christina'],
    ['Torrens title', 's 46 LTA, Frazer v Walker, UOB v Bebe, Waimiha'],
    ['Caveat', 's 115, s 127, s 128 LTA, American Cyanamid, Eng Mee Yong'],
    ['Secret profit and bribes', 'Hippisley v Knee Bros, Andrews v Ramsay, McPherson v Watt, FHR v Cedar Capital'],
    ['Commission', 'Grandhome v Ng Kok Eng; CEA exclusive form Clause 6; Luxor v Cooper']
  ];

  R.numbers = [
    ['Subsoil default depth', '30 m below SHD (s 3B State Lands Act)', 1],
    ['Lease needing a deed', 'Over 7 years (s 53(1) CLPA: 7 years or less at rack rent exempt)', 6],
    ['Lease needing registration', 'Over 7 years (s 87 LTA)', 6],
    ['Mortgagor\'s statutory lease', 'Up to 3 years (s 23 CLPA)', 5],
    ['Mortgagee entry', 'After one month\'s notice (s 75 LTA)', 5],
    ['Power of sale triggers', 'Notice + 3 months; interest 1 month in arrears; breach of another term (s 25 CLPA)', 5],
    ['Distress', 'Up to 12 months\' rent', 6],
    ['s 18A possession order', 'At least 4 weeks', 6],
    ['Option fee / deposit', 'About 1% / about 10%', 8],
    ['Stamp duty on exercised OTP', 'Within 14 days', 9],
    ['Caveat lapse', '5 years (s 121)', 9],
    ['Caveat once a dealing is lodged', '30 days to get a court order (s 120)', 9],
    ['ABSD citizen', '0% / 20% / 30% (1st / 2nd / 3rd+)', 9],
    ['ABSD PR', '5% / 30% / 35%', 9],
    ['ABSD foreigner', '60%', 9],
    ['SSD (slides)', '12% / 8% / 4% in years 1 / 2 / 3 [check the 2025 change]', 9],
    ['Exclusive agency', 'Up to 3 months, with a 3-month tail', 10],
    ['AML records', 'At least 5 years', 10]
  ];

  /* Fixed mock papers: Section A picks 2 MCQs per lot, deterministically, plus any forced questions. */
  R.mocks = [
    { id: 'm1', title: 'Mock Paper 1', sub: 'Your practice paper\'s four MCQs, 16 more, and the past-year Mrs Leong case', forced: ['c7-01', 'c8-01', 'c9-01', 'c9-02'], k: 0, caseId: 'leong' },
    { id: 'm2', title: 'Mock Paper 2', sub: 'Past-year Case Study (2): Zen, Belle and Bigbank, (a) 20 + (b) 20', k: 1, caseId: 'zen' },
    { id: 'm3', title: 'Mock Paper 3', sub: 'New case: the Joo Chiat shophouse (leases, fixtures, agency)', k: 2, caseId: 'new-joochiat' },
    { id: 'm4', title: 'Mock Paper 4', sub: 'New case: the Bukit Timah bungalow (co-ownership, Torrens, mortgage)', k: 3, caseId: 'new-bukit' },
    { id: 'm5', title: 'Mock Paper 5', sub: 'New case: Serangoon Gardens (OTP, misrepresentation, easements, support, covenant)', k: 4, caseId: 'new-serangoon' },
    { id: 'm6', title: 'Mock Paper 6', sub: 'Q&A Bank combined mock: shophouse, agent and car park lot', k: 5, caseId: 'mock-lim' }
  ];

  /* The three-day plan to the paper on Tuesday 24 November. act = a deep link the plan button opens. */
  R.plan = [
    { day: 'Saturday 21 Nov', theme: 'Diagnose, then the most-tested lots', items: [
      { id: 'p1', t: 'Sit Mock Paper 1, Section A only (20 MCQs, 60 min) for a baseline.', act: 'mockA:m1' },
      { id: 'p2', t: 'Read the Exam Pack: ILAC, timing, the issue spotter and the authority bank.', act: 'view:pack' },
      { id: 'p3', t: 'Lot 9 Torrens: lesson, training, graded test.', act: 'lot:9' },
      { id: 'p4', t: 'Lot 8 Sale and OTP: lesson, training, graded test.', act: 'lot:8' },
      { id: 'p5', t: 'Lot 7 Co-ownership: lesson, training, graded test.', act: 'lot:7' },
      { id: 'p6', t: 'Case drill: Mr Ong (Torrens, 20 marks). Mark it, read the model answer.', act: 'case:ong' },
      { id: 'p7', t: 'Case drill: Punggol (10 marks in 15 minutes).', act: 'case:punggol' },
      { id: 'p8', t: 'Notebook: redo every question you missed today.', act: 'view:notebook' }
    ] },
    { day: 'Sunday 22 Nov', theme: 'Mortgages, leases, covenants, agency', items: [
      { id: 'p9', t: 'Lot 5 Mortgages: lesson, training, graded test.', act: 'lot:5' },
      { id: 'p10', t: 'Lot 6 Leases: lesson, training, graded test.', act: 'lot:6' },
      { id: 'p11', t: 'Lot 3 Covenants: lesson, training, graded test.', act: 'lot:3' },
      { id: 'p12', t: 'Lot 10 Agency: lesson, training, graded test.', act: 'lot:10' },
      { id: 'p13', t: 'Case drills: KFM and Printwell, the two sample questions in your practice paper.', act: 'case:kfm' },
      { id: 'p14', t: 'Full Mock Paper 2 under exam conditions (2 hours).', act: 'mock:m2' },
      { id: 'p15', t: 'Mark Section B (keyword marker, then Prof. Borough if available). Notebook.', act: 'view:notebook' }
    ] },
    { day: 'Monday 23 Nov', theme: 'Close the gaps, one more full paper, print', items: [
      { id: 'p16', t: 'Lots 1, 2 and 4: skim the lesson, then the graded test.', act: 'lot:1' },
      { id: 'p17', t: 'Full Mock Paper 3 (new case) under exam conditions.', act: 'mock:m3' },
      { id: 'p18', t: 'Lightning rounds on your two weakest lots.', act: 'view:map' },
      { id: 'p19', t: 'Notebook: clear every item.', act: 'view:notebook' },
      { id: 'p20', t: 'Build and print your cheat sheets: My Mistakes, the Exam Pack, and one-pagers for weak lots.', act: 'view:cheats' },
      { id: 'p21', t: 'Pack: printed notes, laptop charged, charger, student card. Sleep by 11 pm.' }
    ] },
    { day: 'Tuesday 24 Nov', theme: 'Exam day', items: [
      { id: 'p22', t: '7:30 am: read your My Mistakes sheet once. No new material.', act: 'view:cheats' },
      { id: 'p23', t: '8:30 am: at Biz2, 05-11. Paper runs 9:00 to 11:00.' }
    ] }
  ];
})(window.LL);
