/* Cast: playable Singaporean students and the chapter mentors (all fictional). */
(function (RL) {
  'use strict';
  var SKIN = { light: '#f6c9a0', fair: '#f0bd8c', medium: '#dba06c', tan: '#c98a5a', brown: '#9a5f3a', deep: '#7a4528' };
  var HAIR = { black: '#1b1012', dark: '#3a2216', grey: '#b9b3ad', white: '#f1ece6', brown: '#5a3420' };

  RL.looks = {
    /* players */
    weiling: { skin: SKIN.light, hair: HAIR.black, style: 'ponytail', shirt: '#ff8a3d', acc: ['lanyard'] },
    aisyah: { skin: SKIN.medium, hair: '#3d2a8c', style: 'hijab', shirt: '#f2694e', acc: [] },
    arjun: { skin: SKIN.brown, hair: HAIR.black, style: 'short', shirt: '#3b6fd8', acc: ['glasses'] },
    marcus: { skin: SKIN.tan, hair: HAIR.dark, style: 'curly', shirt: '#b3261e', acc: [] },
    junjie: { skin: SKIN.fair, hair: HAIR.black, style: 'buzz', shirt: '#56683a', acc: [] },
    kavitha: { skin: SKIN.deep, hair: HAIR.black, style: 'long', shirt: '#c2307a', acc: ['collar'] },
    /* mentors */
    socratan: { skin: SKIN.fair, hair: HAIR.white, style: 'bald', shirt: '#fff0b8', acc: ['beard', 'sash'], beard: HAIR.white },
    gautama: { skin: SKIN.brown, hair: HAIR.grey, style: 'bald', shirt: '#fff6ec', acc: ['mustache', 'collar'], beard: HAIR.grey },
    boole: { skin: SKIN.light, hair: '#2c4aa8', style: 'cap', shirt: '#2c4aa8', acc: ['mustache', 'collar'], beard: HAIR.dark },
    johnson: { skin: SKIN.light, hair: HAIR.grey, style: 'wig', shirt: '#6b3a1e', acc: ['collar'] },
    ayer: { skin: SKIN.light, hair: HAIR.dark, style: 'short', shirt: '#22303f', acc: ['glasses', 'tie'] },
    james: { skin: SKIN.fair, hair: HAIR.brown, style: 'short', shirt: '#5a4632', acc: ['beard', 'collar'], beard: HAIR.brown },
    pascal: { skin: SKIN.light, hair: HAIR.brown, style: 'long', shirt: '#1b1012', acc: ['collar'] },
    bernoulli: { skin: SKIN.fair, hair: '#f1ece6', style: 'cap', shirt: '#1d3b8a', acc: ['epaulettes', 'tie'] },
    mill: { skin: SKIN.light, hair: '#8a5a32', style: 'detective', shirt: '#b08a5a', acc: ['whiskers', 'collar'], beard: HAIR.brown },
    popper: { skin: SKIN.light, hair: HAIR.grey, style: 'short', shirt: '#3b6fd8', acc: ['glasses', 'labcoat'] },
    aristotle: { skin: SKIN.fair, hair: HAIR.grey, style: 'bun', shirt: '#d9534f', acc: ['apron'] },
    schopenhauer: { skin: SKIN.light, hair: HAIR.white, style: 'wild', shirt: '#fff6ec', acc: ['singlet'], frown: true },
    examiner: { skin: SKIN.tan, hair: HAIR.black, style: 'short', shirt: '#22040a', acc: ['glasses', 'glow'], frame: '#ffd23f' }
  };

  /* Perks only work in Training and Lightning rounds. Graded tests are perk-free. */
  RL.players = [
    { id: 'weiling', name: 'Wei Ling', from: 'Tampines', blurb: 'Year 1, FASS. Runs on kopi-O kosong and colour-coded notes.',
      quote: 'Kopi first. Then we argue.', perk: 'kopi', perkName: 'Kopi Boost', perkText: '+15 seconds in every Lightning Round.' },
    { id: 'aisyah', name: 'Nur Aisyah', from: 'Woodlands', blurb: 'Year 2, Law. Debate captain who can smell a straw man from the MRT platform.',
      quote: 'Premise one, premise two, then we talk.', perk: 'hint', perkName: 'Debate Notes', perkText: 'Twice per Training run: reveal the trap a question is built on.' },
    { id: 'arjun', name: 'Arjun', from: 'Jurong West', blurb: 'Year 1, Computing. Chess club, truth tables for fun.',
      quote: 'Think three moves ahead.', perk: 'eliminate', perkName: 'Chess Mind', perkText: 'Twice per Training run: strike out one wrong option.' },
    { id: 'marcus', name: 'Marcus', from: 'Katong', blurb: 'Year 3, Science. Eurasian guitarist who brings devil curry to every potluck.',
      quote: 'Every argument has a rhythm, man.', perk: 'retry', perkName: 'Second Strum', perkText: 'Twice per Training run: retry a question you got wrong.' },
    { id: 'junjie', name: 'Jun Jie', from: 'Punggol', blurb: 'Freshie, just ORD-ed. Treats every exam like an IPPT gold attempt.',
      quote: 'Chiong ah! No fallacy left behind.', perk: 'combo', perkName: 'Chiong Mode', perkText: 'Lightning Round combo multiplier starts one level higher.' },
    { id: 'kavitha', name: 'Kavitha', from: 'Serangoon', blurb: 'Year 2, Business. Library regular who annotates everything twice.',
      quote: 'Check the notes. Then check them again.', perk: 'notes', perkName: 'Library Card', perkText: 'Three times per Training run: open the lesson card behind a question.' }
  ];
  RL.getPlayer = function (id) {
    for (var i = 0; i < RL.players.length; i++) if (RL.players[i].id === id) return RL.players[i];
    return RL.players[0];
  };

  RL.RANKS = ['Freshie', 'Kopi Sceptic', 'Argument Spotter', 'Logic Apprentice', 'Definition Hunter', 'Meaning Maker',
    'Odds Reader', 'Decision Theorist', 'Mill Detective', 'Lab Sceptic', 'Fallacy Buster', 'Dialectician', 'Philosopher'];
})(window.RL);
