/**
 * Tournament Engine
 * Lógica pura (agrimensor de grupos, cruces eliminatorios, cálculos de clasificación)
 */

export const generateGroups = (players) => {
  // Mezclar aleatoriamente
  const shuffled = [...players].sort(() => 0.5 - Math.random());
  
  // Dividir en 2 grupos (ej. si son 8 -> 4 y 4)
  const groupA = [];
  const groupB = [];
  
  shuffled.forEach((p, index) => {
    if (index % 2 === 0) groupA.push(p);
    else groupB.push(p);
  });

  return { A: groupA, B: groupB };
};

export const generateGroupMatches = (group, groupId) => {
  const matches = [];
  let matchId = 1;
  
  // Algoritmo Round Robin (Berger tables) para generar Jornadas (Rounds)
  const n = group.length;
  const players = [...group];
  
  // Si son impares, añadimos un fantasma ("BYE")
  if (n % 2 !== 0) {
    players.push({ id: 'BYE', name: 'Descansa' });
  }
  
  const numRounds = players.length - 1;
  const halfSize = players.length / 2;

  for (let round = 0; round < numRounds; round++) {
    for (let i = 0; i < halfSize; i++) {
      const p1 = players[i];
      const p2 = players[players.length - 1 - i];

      // Ignorar si el rival es el fantasma
      if (p1.id !== 'BYE' && p2.id !== 'BYE') {
        matches.push({
          id: `g${groupId}-m${matchId++}`,
          stage: 'group',
          group: groupId,
          round: round + 1, // Jornada
          team1_id: p1.id,
          team2_id: p2.id,
          score1: null,
          score2: null,
          status: 'pending',
          scorers: [] // Array para guardar goleadores FC26
        });
      }
    }
    // Rotar array (manteniendo el primer elemento fijo)
    players.splice(1, 0, players.pop());
  }

  return matches;
};

export const generateKnockoutMatches = (standings, tournamentId) => {
  // standings ya vienen ordenados. Cogemos el Top 4.
  const top4 = standings.slice(0, 4);
  if (top4.length < 4) return [];

  return [
    {
      id: `k-${tournamentId}-sf1`,
      stage: 'knockout',
      round: 'Semifinal 1',
      team1_id: top4[0].id,
      team2_id: top4[3].id,
      score1: null,
      score2: null,
      status: 'pending',
      scorers: ''
    },
    {
      id: `k-${tournamentId}-sf2`,
      stage: 'knockout',
      round: 'Semifinal 2',
      team1_id: top4[1].id,
      team2_id: top4[2].id,
      score1: null,
      score2: null,
      status: 'pending',
      scorers: ''
    },
    {
      id: `k-${tournamentId}-final`,
      stage: 'knockout',
      round: 'Final',
      team1_id: null, // Se llenarán cuando acaben las semis
      team2_id: null,
      score1: null,
      score2: null,
      status: 'pending',
      scorers: ''
    }
  ];
};

export const calculateStandings = (players, matches) => {
  const standings = players.map(p => ({
    ...p,
    played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0
  }));

  matches.forEach(m => {
    if (m.status === 'finished' && m.stage === 'group') {
      const p1 = standings.find(s => s.id === m.team1_id);
      const p2 = standings.find(s => s.id === m.team2_id);

      if (p1 && p2) {
        p1.played++; p2.played++;
        p1.gf += m.score1; p1.ga += m.score2;
        p2.gf += m.score2; p2.ga += m.score1;

        if (m.score1 > m.score2) {
          p1.won++; p1.points += 3; p2.lost++;
        } else if (m.score1 < m.score2) {
          p2.won++; p2.points += 3; p1.lost++;
        } else {
          p1.drawn++; p2.drawn++; p1.points += 1; p2.points += 1;
        }
      }
    }
  });

  standings.forEach(s => s.gd = s.gf - s.ga);

  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });
};
