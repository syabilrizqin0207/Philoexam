/* Cast: playable Real Estate students, the lot mentors and the examiner (all fictional). */
(function (LL) {
  'use strict';
  var SKIN = { light: '#f6c9a0', fair: '#f0bd8c', medium: '#dba06c', tan: '#c98a5a', brown: '#9a5f3a', deep: '#7a4528' };
  var HAIR = { black: '#1b1012', dark: '#3a2216', grey: '#b9b3ad', white: '#f1ece6', brown: '#5a3420' };

  LL.looks = {
    huimin: { skin: SKIN.light, hair: HAIR.black, style: 'ponytail', shirt: '#2fa07a', acc: ['lanyard'] },
    farhan: { skin: SKIN.medium, hair: HAIR.black, style: 'short', shirt: '#3b6fd8', acc: ['glasses'] },
    devi: { skin: SKIN.deep, hair: HAIR.black, style: 'long', shirt: '#ffb238', acc: ['collar'] },
    ryan: { skin: SKIN.fair, hair: HAIR.dark, style: 'spiky', shirt: '#c2307a', acc: [] },
    pakmat: { skin: SKIN.tan, hair: HAIR.grey, style: 'cap', shirt: '#2fa07a', acc: ['mustache'], beard: HAIR.grey },
    chancellor: { skin: SKIN.light, hair: HAIR.white, style: 'wig', shirt: '#1d3b8a', acc: ['collar'] },
    mrsleong: { skin: SKIN.light, hair: HAIR.grey, style: 'bun', shirt: '#d9534f', acc: ['glasses'] },
    engineer: { skin: SKIN.brown, hair: HAIR.black, style: 'cap', shirt: '#ffb238', acc: ['mustache'], beard: HAIR.black },
    banker: { skin: SKIN.fair, hair: HAIR.grey, style: 'short', shirt: '#22303f', acc: ['glasses', 'tie'] },
    landlady: { skin: SKIN.light, hair: HAIR.black, style: 'long', shirt: '#6a55d6', acc: ['collar'] },
    executor: { skin: SKIN.brown, hair: HAIR.black, style: 'bun', shirt: '#22303f', acc: ['glasses', 'collar'] },
    marcus: { skin: SKIN.tan, hair: HAIR.dark, style: 'curly', shirt: '#b3261e', acc: [] },
    registrar: { skin: SKIN.fair, hair: HAIR.black, style: 'short', shirt: '#fff6ec', acc: ['tie', 'lanyard'] },
    cea: { skin: SKIN.light, hair: HAIR.brown, style: 'ponytail', shirt: '#1d3b8a', acc: ['lanyard'] },
    borough: { skin: SKIN.medium, hair: HAIR.grey, style: 'bun', shirt: '#0b3550', acc: ['glasses', 'collar'], frame: '#ffd23f' },
    examiner: { skin: SKIN.tan, hair: HAIR.black, style: 'short', shirt: '#041521', acc: ['glasses', 'glow'], frame: '#ffd23f' }
  };

  LL.PROF = { id: 'borough', name: 'Prof. Ellen Borough', role: 'Examiner · marks Sections A and B' };

  /* Perks only work in Training and Lightning rounds. Graded tests and mock papers are perk-free. */
  LL.players = [
    { id: 'huimin', name: 'Hui Min', from: 'Bishan', blurb: 'Year 2, Real Estate. Colour-codes every case by lot and never misses a tutorial.',
      quote: 'Issue first. Then the law.', perk: 'notes', perkName: 'Tabbed Notes', perkText: 'Three times per Training run: open the lesson cards behind a question.' },
    { id: 'farhan', name: 'Farhan', from: 'Bedok', blurb: 'Year 2, Real Estate. Wants to be a valuer; can smell an undervalue sale from Raffles Place.',
      quote: 'Strike the absolutes. Then decide.', perk: 'eliminate', perkName: 'Valuer\'s Eye', perkText: 'Twice per Training run: strike out one wrong option.' },
    { id: 'devi', name: 'Devi', from: 'Yishun', blurb: 'Year 3, Real Estate. Interned at a conveyancing firm and reads every OTP twice.',
      quote: 'Read the clause. All of it.', perk: 'hint', perkName: 'Conveyancer\'s Note', perkText: 'Twice per Training run: reveal the trap a question is built on.' },
    { id: 'ryan', name: 'Ryan', from: 'Clementi', blurb: 'Year 2, Real Estate. Plays futsal on Tuesdays and treats every test like a penalty shoot-out.',
      quote: 'One more go. I know this one.', perk: 'retry', perkName: 'Second Shot', perkText: 'Twice per Training run: retry a question you got wrong.' }
  ];
  LL.getPlayer = function (id) {
    for (var i = 0; i < LL.players.length; i++) if (LL.players[i].id === id) return LL.players[i];
    return LL.players[0];
  };
  LL.RANKS = ['Freshie', 'Kampong Surveyor', 'Chancery Clerk', 'Covenant Reader', 'Easement Finder', 'Mortgage Analyst',
    'Leasing Officer', 'Title Keeper', 'Conveyancer', 'Registry Hand', 'Estate Agent', 'Land Lawyer'];
})(window.LL);
