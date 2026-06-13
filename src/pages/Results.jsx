import React, { useState, useMemo } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';
import './Results.css';

/* ── Pichichi goal parser ──────────────────────────────────────
 *  scorers string format examples:
 *    "Vinicius, Rodrygo / Messi"
 *    "Morata x3, Ruiz / Dembelé x2"
 *  '/' separates teams, ',' separates players within a team,
 *  'x2', 'x3' etc. denotes multiple goals by the same player.
 */
const parseGoals = (scorersString) => {
  const goals = {};
  if (!scorersString || !scorersString.trim()) return goals;

  // Split by '/' to get each team's scorers block
  const teamBlocks = scorersString.split('/');

  teamBlocks.forEach((block) => {
    // Split by ',' to get individual scorer entries
    const entries = block.split(',');
    entries.forEach((entry) => {
      const trimmed = entry.trim();
      if (!trimmed) return;

      // Check for multiplier like "x2", "x3"
      const multiMatch = trimmed.match(/^(.+?)\s*x(\d+)$/i);
      let name, count;
      if (multiMatch) {
        name = multiMatch[1].trim();
        count = parseInt(multiMatch[2], 10);
      } else {
        name = trimmed;
        count = 1;
      }

      if (name) {
        goals[name] = (goals[name] || 0) + count;
      }
    });
  });

  return goals;
};

const buildPichichi = (matches) => {
  const totals = {};
  const finishedMatches = matches.filter((m) => m.status === 'finished');

  finishedMatches.forEach((match) => {
    const goals = parseGoals(match.scorers);
    Object.entries(goals).forEach(([player, count]) => {
      totals[player] = (totals[player] || 0) + count;
    });
  });

  return Object.entries(totals)
    .map(([name, goals]) => ({ name, goals }))
    .sort((a, b) => b.goals - a.goals);
};

/* ── Component ──────────────────────────────────────────────── */
const Results = () => {
  const { matches, players, tournamentState } = useTournament();
  const [activeTab, setActiveTab] = useState('groups');

  const pichichi = useMemo(() => buildPichichi(matches), [matches]);

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

  const getPlayerName = (id) => players.find((p) => p.id === id)?.name || 'Desconocido';
  const getPlayerTeam = (id) => players.find((p) => p.id === id)?.team || 'Equipo';

  const groupMatches = matches.filter((m) => m.stage === 'group');
  const knockoutMatches = matches.filter((m) => m.stage === 'knockout');

  const groupedByRound = groupMatches.reduce((acc, m) => {
    if (!acc[m.round]) acc[m.round] = [];
    acc[m.round].push(m);
    return acc;
  }, {});

  const TABS = [
    { key: 'groups', label: 'Fase de Grupos' },
    { key: 'knockout', label: 'Eliminatorias', disabled: knockoutMatches.length === 0 },
    { key: 'pichichi', label: '⚽ Pichichi' },
  ];

  /* ── Medal helpers ── */
  const medalColor = (pos) => {
    if (pos === 1) return '#ffd700';
    if (pos === 2) return '#c0c0c0';
    if (pos === 3) return '#cd7f32';
    return 'var(--text-secondary)';
  };

  const medalEmoji = (pos) => {
    if (pos === 1) return '🥇';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    return `${pos}`;
  };

  /* ── Match card renderer ── */
  const renderMatchCard = (match, index) => {
    const isFinished = match.status === 'finished';
    const hasScorers = match.scorers && match.scorers.trim() !== '';

    return (
      <motion.div
        key={match.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className={`premium-match-card ${isFinished ? 'finished' : 'pending'}`}
      >
        {/* Header */}
        <div className="match-card-header">
          <span className="match-round-badge">
            {match.stage === 'group' ? `Grupo ${match.group}` : match.round}
          </span>
          <span className={`match-status-badge ${isFinished ? 'status-finished' : 'status-pending'}`}>
            {isFinished ? 'FINALIZADO' : 'PENDIENTE'}
          </span>
        </div>

        {/* Body */}
        <div className="match-card-body">
          <div className="team left-team">
            <h3 className="team-country">{getPlayerTeam(match.team1_id)}</h3>
            <span className="team-player">{getPlayerName(match.team1_id)}</span>
          </div>

          <div className="match-score-center">
            {isFinished ? (
              <div className="score-box">
                <span className={`score-number ${match.score1 > match.score2 ? 'winner' : ''}`}>{match.score1}</span>
                <span className="score-divider">–</span>
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

        {/* Scorers */}
        {hasScorers && (
          <div className="match-scorers">
            <span className="scorers-icon">⚽</span>
            <span className="scorers-text">{match.scorers}</span>
          </div>
        )}
      </motion.div>
    );
  };

  /* ── Pichichi leaderboard renderer ── */
  const renderPichichi = () => {
    if (pichichi.length === 0) {
      return (
        <div className="pichichi-empty">
          <span style={{ fontSize: '2.5rem' }}>⚽</span>
          <p>Aún no hay goles registrados.</p>
        </div>
      );
    }

    return (
      <div className="pichichi-list">
        {pichichi.map((entry, i) => {
          const pos = i + 1;
          const isTop3 = pos <= 3;
          return (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`pichichi-row ${isTop3 ? `pichichi-top${pos}` : ''}`}
            >
              <span className="pichichi-pos" style={{ color: medalColor(pos) }}>
                {medalEmoji(pos)}
              </span>
              <span className="pichichi-name">{entry.name}</span>
              <span className="pichichi-goals">
                <span className="pichichi-goals-count">{entry.goals}</span>
                <span className="pichichi-goals-icon">⚽</span>
              </span>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container results-container">
      {/* Header */}
      <div className="results-header">
        <h2 className="heading-lg">
          <Calendar size={22} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-3px' }} />
          Partidos
        </h2>

        <div className="tabs-container">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
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
                <div className="matches-stack">
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
              <h3 className="round-title" style={{ color: 'var(--accent-primary)' }}>
                <Trophy size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-2px' }} />
                Fase Final
              </h3>
              <div className="matches-stack">
                {knockoutMatches.map((match, i) => renderMatchCard(match, i))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'pichichi' && (
          <motion.div
            key="pichichi"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="tab-content"
          >
            <div className="round-section">
              <h3 className="round-title" style={{ color: 'var(--accent-primary)' }}>
                <Trophy size={18} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-2px' }} />
                Máximos Goleadores
              </h3>
              {renderPichichi()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Results;
