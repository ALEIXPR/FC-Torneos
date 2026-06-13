import React, { createContext, useState, useContext, useEffect } from 'react';
import { generateGroups, generateGroupMatches, generateKnockoutMatches, calculateStandings } from '../lib/TournamentEngine';

const TournamentContext = createContext();

export const useTournament = () => useContext(TournamentContext);

// Payload Demo
const DEMO_TOURNAMENT = { id: 'demo1', name: 'Mundial de Leyendas (Demo)', status: 'knockout', createdAt: new Date().toISOString() };
const DEMO_PLAYERS = [
  { id: 'p1', name: 'Javi', team: 'Brasil', playstyle: 'Fútbol Directo', group: 'A', tournamentId: 'demo1' },
  { id: 'p2', name: 'Aleix', team: 'España', playstyle: 'Posesión (Tiki-taka)', group: 'A', tournamentId: 'demo1' },
  { id: 'p3', name: 'Carles', team: 'Francia', playstyle: 'Contragolpe Rápido', group: 'A', tournamentId: 'demo1' },
  { id: 'p4', name: 'Eyngel', team: 'Argentina', playstyle: 'Presión Alta', group: 'A', tournamentId: 'demo1' },
  { id: 'p5', name: 'Nacho', team: 'Inglaterra', playstyle: 'Juego por Bandas', group: 'B', tournamentId: 'demo1' },
  { id: 'p6', name: 'McFly', team: 'Alemania', playstyle: 'Posesión (Tiki-taka)', group: 'B', tournamentId: 'demo1' },
  { id: 'p7', name: 'Abel', team: 'Portugal', playstyle: 'Contragolpe Rápido', group: 'B', tournamentId: 'demo1' },
  { id: 'p8', name: 'Jerky', team: 'Países Bajos', playstyle: 'Fútbol Directo', group: 'B', tournamentId: 'demo1' }
];
const DEMO_MATCHES = [
  // Fase de Grupos A
  { id: 'A1', group: 'A', stage: 'group', round: 1, team1_id: 'p1', team2_id: 'p4', score1: 2, score2: 1, status: 'finished', scorers: 'Vinicius, Rodrygo / Messi', tournamentId: 'demo1' },
  { id: 'A2', group: 'A', stage: 'group', round: 1, team1_id: 'p2', team2_id: 'p3', score1: 1, score2: 1, status: 'finished', scorers: 'Morata / Mbappe', tournamentId: 'demo1' },
  { id: 'A3', group: 'A', stage: 'group', round: 2, team1_id: 'p1', team2_id: 'p3', score1: 0, score2: 2, status: 'finished', scorers: 'Dembelé x2', tournamentId: 'demo1' },
  { id: 'A4', group: 'A', stage: 'group', round: 2, team1_id: 'p4', team2_id: 'p2', score1: 0, score2: 3, status: 'finished', scorers: 'Pedri, Nico Williams, Yamal', tournamentId: 'demo1' },
  { id: 'A5', group: 'A', stage: 'group', round: 3, team1_id: 'p1', team2_id: 'p2', score1: 1, score2: 4, status: 'finished', scorers: 'Raphinha / Morata x3, Ruiz', tournamentId: 'demo1' },
  { id: 'A6', group: 'A', stage: 'group', round: 3, team1_id: 'p3', team2_id: 'p4', score1: 3, score2: 0, status: 'finished', scorers: 'Mbappe x2, Griezmann', tournamentId: 'demo1' },
  // Fase de Grupos B
  { id: 'B1', group: 'B', stage: 'group', round: 1, team1_id: 'p5', team2_id: 'p8', score1: 2, score2: 1, status: 'finished', scorers: 'Kane, Foden / Gakpo', tournamentId: 'demo1' },
  { id: 'B2', group: 'B', stage: 'group', round: 1, team1_id: 'p6', team2_id: 'p7', score1: 1, score2: 1, status: 'finished', scorers: 'Musiala / Cristiano', tournamentId: 'demo1' },
  { id: 'B3', group: 'B', stage: 'group', round: 2, team1_id: 'p5', team2_id: 'p7', score1: 3, score2: 0, status: 'finished', scorers: 'Saka x2, Kane', tournamentId: 'demo1' },
  { id: 'B4', group: 'B', stage: 'group', round: 2, team1_id: 'p8', team2_id: 'p6', score1: 0, score2: 2, status: 'finished', scorers: 'Havertz, Wirtz', tournamentId: 'demo1' },
  { id: 'B5', group: 'B', stage: 'group', round: 3, team1_id: 'p5', team2_id: 'p6', score1: 2, score2: 2, status: 'finished', scorers: 'Bellingham x2 / Musiala, Wirtz', tournamentId: 'demo1' },
  { id: 'B6', group: 'B', stage: 'group', round: 3, team1_id: 'p7', team2_id: 'p8', score1: 1, score2: 0, status: 'finished', scorers: 'Bruno Fernandes', tournamentId: 'demo1' },
  // Eliminatorias (Semifinales y Final)
  // Semis: 1ºA (Aleix p2) vs 2ºB (McFly p6) // 1ºB (Nacho p5) vs 2ºA (Carles p3)
  { id: 'k-demo1-sf1', stage: 'knockout', round: 'Semifinal 1', team1_id: 'p2', team2_id: 'p6', score1: 2, score2: 1, status: 'finished', scorers: 'Morata, Olmo / Havertz', tournamentId: 'demo1' },
  { id: 'k-demo1-sf2', stage: 'knockout', round: 'Semifinal 2', team1_id: 'p5', team2_id: 'p3', score1: 1, score2: 3, status: 'finished', scorers: 'Kane / Mbappe x2, Giroud', tournamentId: 'demo1' },
  { id: 'k-demo1-final', stage: 'knockout', round: 'Final', team1_id: 'p2', team2_id: 'p3', score1: 1, score2: 2, status: 'finished', scorers: 'Yamal / Mbappe, Dembelé', tournamentId: 'demo1' }
];

export const TournamentProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState(() => {
    const saved = localStorage.getItem('fc_tournaments_v3');
    return saved ? JSON.parse(saved) : [DEMO_TOURNAMENT];
  });

  const [activeTournamentId, setActiveTournamentId] = useState(null);

  const [allPlayers, setAllPlayers] = useState(() => {
    const saved = localStorage.getItem('fc_players_v3');
    return saved ? JSON.parse(saved) : DEMO_PLAYERS;
  });
  
  const [allMatches, setAllMatches] = useState(() => {
    const saved = localStorage.getItem('fc_matches_v3');
    return saved ? JSON.parse(saved) : DEMO_MATCHES;
  });

  useEffect(() => {
    localStorage.setItem('fc_tournaments_v3', JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem('fc_players_v3', JSON.stringify(allPlayers));
  }, [allPlayers]);

  useEffect(() => {
    localStorage.setItem('fc_matches_v3', JSON.stringify(allMatches));
  }, [allMatches]);

  // Derived state for the active tournament
  const activeTournament = tournaments.find(t => t.id === activeTournamentId);


  const tournamentState = activeTournament ? activeTournament.status : null; // 'setup', 'groups', 'knockout'
  const players = allPlayers.filter(p => p.tournamentId === activeTournamentId);
  const matches = allMatches.filter(m => m.tournamentId === activeTournamentId);

  // Actions: Tournaments
  const createTournament = (name) => {
    const newId = Date.now().toString();
    setTournaments(prev => [...prev, { id: newId, name, status: 'setup', createdAt: new Date().toISOString() }]);
    setActiveTournamentId(newId);
    return newId;
  };

  const selectTournament = (id) => {
    setActiveTournamentId(id);
  };

  // Actions: Active Tournament
  const addPlayer = (player) => {
    if (!activeTournamentId) return;
    setAllPlayers(prev => [...prev, { ...player, id: Date.now().toString(), tournamentId: activeTournamentId, group: null }]);
  };

  const removePlayer = (id) => {
    setAllPlayers(prev => prev.filter(p => p.id !== id));
  };

  const startTournament = () => {
    if (!activeTournamentId) return;
    const { A, B } = generateGroups(players);
    
    const groupedPlayers = players.map(p => {
      if (A.find(x => x.id === p.id)) return { ...p, group: 'A' };
      if (B.find(x => x.id === p.id)) return { ...p, group: 'B' };
      return p;
    });

    setAllPlayers(prev => prev.map(p => {
      const updated = groupedPlayers.find(gp => gp.id === p.id);
      return updated ? updated : p;
    }));

    const matchesA = generateGroupMatches(A, 'A');
    const matchesB = generateGroupMatches(B, 'B');
    
    const newMatches = [...matchesA, ...matchesB].map(m => ({...m, tournamentId: activeTournamentId}));
    setAllMatches(prev => [...prev, ...newMatches]);
    
    setTournaments(prev => prev.map(t => 
      t.id === activeTournamentId ? { ...t, status: 'groups' } : t
    ));
  };

  const advanceToKnockout = () => {
    const standings = getStandings('A').concat(getStandings('B'));
    const knockoutMatches = generateKnockoutMatches(standings, activeTournamentId);
    
    setAllMatches(prev => [...prev, ...knockoutMatches]);
    setTournaments(prev => prev.map(t => 
      t.id === activeTournamentId ? { ...t, status: 'knockout' } : t
    ));
  };

  const updateMatchResult = (matchId, score1, score2, scorers = '') => {
    setAllMatches(prev => {
      const newMatches = prev.map(m => {
        if (m.id === matchId) {
          return { ...m, score1, score2, status: 'finished', scorers };
        }
        return m;
      });

      // Lógica automática para llenar la final si ambas semis terminaron
      const semis = newMatches.filter(m => m.tournamentId === activeTournamentId && m.stage === 'knockout' && m.round.includes('Semifinal'));
      const final = newMatches.find(m => m.tournamentId === activeTournamentId && m.stage === 'knockout' && m.round === 'Final');
      
      if (semis.length === 2 && semis.every(s => s.status === 'finished') && final && final.team1_id === null) {
        const winner1 = semis[0].score1 > semis[0].score2 ? semis[0].team1_id : semis[0].team2_id;
        const winner2 = semis[1].score1 > semis[1].score2 ? semis[1].team1_id : semis[1].team2_id;
        final.team1_id = winner1;
        final.team2_id = winner2;
      }

      return [...newMatches];
    });
  };

  const resetTournament = () => {
    if(window.confirm("¿Estás seguro de borrar este torneo? No se puede deshacer.")) {
      setAllPlayers(prev => prev.filter(p => p.tournamentId !== activeTournamentId));
      setAllMatches(prev => prev.filter(m => m.tournamentId !== activeTournamentId));
      setTournaments(prev => prev.map(t => 
        t.id === activeTournamentId ? { ...t, status: 'setup' } : t
      ));
    }
  };

  const getStandings = (group) => {
    const groupPlayers = players.filter(p => p.group === group);
    const groupMatches = matches.filter(m => m.group === group);
    return calculateStandings(groupPlayers, groupMatches);
  };

  return (
    <TournamentContext.Provider value={{ 
      tournaments,
      activeTournamentId, 
      setActiveTournamentId,
      activeTournament,
      createTournament,
      players: activeTournament ? allPlayers.filter(p => p.tournamentId === activeTournamentId) : [], 
      players, 
      matches, 
      addPlayer, 
      removePlayer,
      startTournament,
      advanceToKnockout,
      updateMatchResult,
      getStandings,
      resetTournament
    }}>
      {children}
    </TournamentContext.Provider>
  );
};
