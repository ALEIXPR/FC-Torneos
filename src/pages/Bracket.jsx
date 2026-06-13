import React from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion } from 'framer-motion';
import './Bracket.css';

const Bracket = () => {
  const { tournamentState, matches, players } = useTournament();

  const getMatch = (roundName) => matches.find(m => m.stage === 'knockout' && m.round === roundName);
  
  const renderMatchBox = (match, title) => {
    if (!match) return (
      <div className="bracket-match-box empty">
        <div className="bracket-title">{title}</div>
        <div className="bracket-team"><span>Por determinar</span></div>
        <div className="bracket-team"><span>Por determinar</span></div>
      </div>
    );

    const p1 = players.find(p => p.id === match.team1_id);
    const p2 = players.find(p => p.id === match.team2_id);
    
    const p1Won = match.status === 'finished' && match.score1 > match.score2;
    const p2Won = match.status === 'finished' && match.score2 > match.score1;

    return (
      <div className={`bracket-match-box ${match.status === 'finished' ? 'finished' : ''}`}>
        <div className="bracket-title">{title}</div>
        <div className={`bracket-team ${p1Won ? 'winner' : ''}`}>
          <span>{p1 ? p1.name : 'TBD'}</span>
          <span className="bracket-score">{match.score1 ?? '-'}</span>
        </div>
        <div className={`bracket-team ${p2Won ? 'winner' : ''}`}>
          <span>{p2 ? p2.name : 'TBD'}</span>
          <span className="bracket-score">{match.score2 ?? '-'}</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="container"
      style={{ paddingBottom: '5rem' }}
    >
      <h2 className="heading-lg" style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Cuadro Final</h2>
      <div className="card-glass flex-center" style={{ minHeight: '400px', flexDirection: 'column' }}>
        {tournamentState === 'setup' || tournamentState === 'groups' ? (
           <>
             <h3 className="heading-md" style={{ color: 'var(--text-secondary)' }}>Fase de Eliminatorias</h3>
             <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>
               El cuadro se generará al terminar la fase de grupos.
             </p>
           </>
        ) : (
           <div className="bracket-container">
             <div className="bracket-column semis-column">
               <div className="bracket-connector right top">
                 {renderMatchBox(getMatch('Semifinal 1'), 'Semifinal 1')}
               </div>
               <div className="bracket-connector right bottom">
                 {renderMatchBox(getMatch('Semifinal 2'), 'Semifinal 2')}
               </div>
             </div>
             
             <div className="bracket-column final-column">
               <div className="bracket-connector left">
                 {renderMatchBox(getMatch('Final'), 'Gran Final')}
               </div>
             </div>
           </div>
        )}
      </div>
    </motion.div>
  );
};

export default Bracket;
