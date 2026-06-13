import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';
import './Results.css';

const Results = () => {
  const { matches, players, tournamentState } = useTournament();
  const [activeTab, setActiveTab] = useState('groups'); // 'groups' | 'knockout'

  if (tournamentState === 'setup') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container flex-center" style={{ minHeight: '60vh' }}>
        <div className="card-glass text-center">
          <h2 className="heading-md" style={{ color: 'var(--text-secondary)' }}>El torneo aún no ha comenzado</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>El administrador está configurando los participantes.</p>
        </div>
      </motion.div>
    );
  }

  const getPlayerName = (id) => players.find(p => p.id === id)?.name || 'Desconocido';
  const getPlayerTeam = (id) => players.find(p => p.id === id)?.team || 'Equipo';

  // Filtrar partidos
  const groupMatches = matches.filter(m => m.stage === 'group');
  const knockoutMatches = matches.filter(m => m.stage === 'knockout');

  // Agrupar Fase de Grupos por Jornada (Round)
  const groupedByRound = groupMatches.reduce((acc, m) => {
    if (!acc[m.round]) acc[m.round] = [];
    acc[m.round].push(m);
    return acc;
  }, {});

  const renderMatchCard = (match, index) => {
    const isFinished = match.status === 'finished';
    const hasScorers = match.scorers && match.scorers.trim() !== '';

    return (
      <motion.div 
        key={match.id} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`premium-match-card ${isFinished ? 'finished' : 'pending'}`}
      >
        {/* Etiqueta de Ronda / Estado */}
        <div className="match-card-header">
          <span className="match-round-badge">
            {match.stage === 'group' ? `Grupo ${match.group}` : match.round}
          </span>
          <span className={`match-status-badge ${isFinished ? 'status-finished' : 'status-pending'}`}>
            {isFinished ? 'FINALIZADO' : 'PENDIENTE'}
          </span>
        </div>

        {/* Cuerpos del partido */}
        <div className="match-card-body">
          <div className="team left-team">
            <h3 className="team-country">{getPlayerTeam(match.team1_id)}</h3>
            <span className="team-player">{getPlayerName(match.team1_id)}</span>
          </div>

          <div className="match-score-center">
            {isFinished ? (
              <div className="score-box">
                <span className={`score-number ${match.score1 > match.score2 ? 'winner' : ''}`}>{match.score1}</span>
                <span className="score-divider">-</span>
                <span className={`score-number ${match.score2 > match.score1 ? 'winner' : ''}`}>{match.score2}</span>
              </div>
            ) : (
              <div className="vs-box">VS</div>
            )}
          </div>

          <div className="team right-team">
            <h3 className="team-country">{getPlayerTeam(match.team2_id)}</h3>
            <span className="team-player">{getPlayerName(match.team2_id)}</span>
          </div>
        </div>

        {/* Goleadores */}
        {hasScorers && (
          <div className="match-scorers">
            <span className="scorers-icon">⚽</span>
            <span className="scorers-text">{match.scorers}</span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container results-container"
    >
      <div className="results-header">
        <h2 className="heading-lg"><Calendar style={{ display: 'inline', marginRight: '10px' }}/> Competición</h2>
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Fase de Grupos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'knockout' ? 'active' : ''}`}
            onClick={() => setActiveTab('knockout')}
            disabled={knockoutMatches.length === 0}
          >
            Eliminatorias
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'groups' && (
          <motion.div
            key="groups"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="tab-content"
          >
            {Object.entries(groupedByRound).map(([round, roundMatches]) => (
              <div key={round} className="round-section">
                <h3 className="round-title">Jornada {round}</h3>
                <div className="matches-grid">
                  {roundMatches.map((match, i) => renderMatchCard(match, i))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'knockout' && (
          <motion.div
            key="knockout"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tab-content"
          >
            <div className="round-section">
              <h3 className="round-title" style={{ color: 'var(--accent-primary)' }}><Trophy size={20} style={{ display: 'inline', marginRight: '10px' }}/> Fase Final</h3>
              <div className="matches-grid">
                {knockoutMatches.map((match, i) => renderMatchCard(match, i))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Results;
