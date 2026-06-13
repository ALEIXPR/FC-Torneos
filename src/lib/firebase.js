// Archivo de configuración simulado (mock) de Firebase
// Se usará una implementación real de Firebase cuando se tengan las credenciales.

export const db = {};
export const auth = {};

// Funciones mock para simular carga de datos
export const mockPlayers = [
  { id: '1', name: 'Javi Jerky', team: 'Francia', symbiosis: 85, semisChance: 90, offensePct: 80, playstyle: 'Contragolpe rápido', valorant: 'Duelista agresivo (Jett)' },
  { id: '2', name: 'Aleix', team: 'Inglaterra', symbiosis: 90, semisChance: 95, offensePct: 75, playstyle: 'Posesión y toque', valorant: 'Controlador táctico (Omen)' },
  { id: '3', name: 'Carles Sala', team: 'España', symbiosis: 80, semisChance: 85, offensePct: 85, playstyle: 'Tiki-taka ofensivo', valorant: 'Iniciador (Sova)' },
  { id: '4', name: 'Eyngel', team: 'Alemania', symbiosis: 88, semisChance: 80, offensePct: 70, playstyle: 'Presión alta', valorant: 'Centinela defensivo (Killjoy)' },
  { id: '5', name: 'Player 5', team: 'Brasil', symbiosis: 70, semisChance: 60, offensePct: 90, playstyle: 'Jogo Bonito', valorant: 'Duelista (Reyna)' },
  { id: '6', name: 'Player 6', team: 'Argentina', symbiosis: 95, semisChance: 88, offensePct: 82, playstyle: 'Juego directo', valorant: 'Iniciador (Breach)' },
  { id: '7', name: 'Player 7', team: 'Portugal', symbiosis: 82, semisChance: 75, offensePct: 78, playstyle: 'Bandas', valorant: 'Centinela (Cypher)' },
  { id: '8', name: 'Player 8', team: 'Países Bajos', symbiosis: 75, semisChance: 65, offensePct: 70, playstyle: 'Fútbol total', valorant: 'Controlador (Brimstone)' },
];

export const mockMatches = [
  { id: 'm1', stage: 'group', team1_id: '1', team2_id: '2', score1: 2, score2: 1, status: 'finished' },
  { id: 'm2', stage: 'group', team1_id: '3', team2_id: '4', score1: 0, score2: 0, status: 'finished' },
  { id: 'm3', stage: 'group', team1_id: '1', team2_id: '3', score1: null, score2: null, status: 'pending' },
];
