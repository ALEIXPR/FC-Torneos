import React from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion } from 'framer-motion';
import './Bracket.css';

const Bracket = () => {
  const { tournamentState, matches, players } = useTournament();

  const getPlayerName = (id) => players.find(p => p.id === id)?.name || '';

  const semis = matches.filter(m => m.stage === 'knockout' && m.round.includes('Semifinal'));
  const final = matches.find(m => m.stage === 'knockout' && m.round === 'Final');

  const renderMatch = (match, title) => {
    if (!match) return <div className="bracket-match placeholder">Por definir</div>;
    
    return (
      <div className="bracket-match">
        <div className="bracket-match-title">{title}</div>
        <div className={`bracket-team ${match.score1 > match.score2 ? 'winner' : ''}`}>
          <span className="bracket-player">{getPlayerName(match.team1_id) || 'TBD'}</span>
          <span className="bracket-score">{match.score1 ?? '-'}</span>
        </div>
        <div className={`bracket-team ${match.score2 > match.score1 ? 'winner' : ''}`}>
          <span className="bracket-player">{getPlayerName(match.team2_id) || 'TBD'}</span>
          <span className="bracket-score">{match.score2 ?? '-'}</span>
        </div>
      </div>
    );
  };

  if (tournamentState === 'setup' || tournamentState === 'groups') {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh' }}>
        <div className="card-glass text-center">
          <h2 className="heading-md" style={{ color: 'var(--text-secondary)' }}>Fase de Eliminatorias</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>El cuadro se generará al terminar la fase de grupos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '5rem', width: '100%' }}>
      <h2 className="heading-lg" style={{ marginBottom: '2rem', color: 'var(--accent-primary)' }}>Cuadro Final</h2>
      <div className="bracket-wrapper">
        <div className="bracket-container">
          <div className="bracket-column">
            {renderMatch(semis[0], 'SEMIFINAL 1')}
            {renderMatch(semis[1], 'SEMIFINAL 2')}
          </div>
          
          <div className="bracket-connector">
            <div className="line-horizontal"></div>
            <div className="line-vertical"></div>
            <div className="line-horizontal-right"></div>
          </div>

          <div className="bracket-column final-column">
            {renderMatch(final, 'GRAN FINAL')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bracket;
