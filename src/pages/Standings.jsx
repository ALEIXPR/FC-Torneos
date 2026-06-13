import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Standings.css';

const Standings = () => {
  const { tournamentState, getStandings } = useTournament();
  const [activeGroup, setActiveGroup] = useState('A');

  if (!tournamentState || tournamentState === 'setup') {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh' }}>
        <div className="card-glass text-center">
          <h2 className="heading-md" style={{ color: 'var(--text-secondary)' }}>
            La fase de grupos no ha comenzado
          </h2>
        </div>
      </div>
    );
  }

  const standings = getStandings(activeGroup);

  return (
    <div className="standings-page container">
      {/* Header */}
      <div className="standings-header">
        <h2 className="standings-title">Clasificación</h2>

        <div className="group-tabs">
          <button
            className={`group-tab ${activeGroup === 'A' ? 'active' : ''}`}
            onClick={() => setActiveGroup('A')}
          >
            Grupo A
          </button>
          <button
            className={`group-tab ${activeGroup === 'B' ? 'active' : ''}`}
            onClick={() => setActiveGroup('B')}
          >
            Grupo B
          </button>
        </div>
      </div>

      {/* Table Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="standings-card"
        >
          {/* Column headers */}
          <div className="standings-row standings-row--header">
            <span className="col-pos">#</span>
            <span className="col-team">Equipo</span>
            <span className="col-stat">PJ</span>
            <span className="col-stat">G</span>
            <span className="col-stat">E</span>
            <span className="col-stat">P</span>
            <span className="col-stat col-extra" title="Goles a Favor">GF</span>
            <span className="col-stat col-extra" title="Goles en Contra">GC</span>
            <span className="col-stat col-extra" title="Diferencia de Goles">DG</span>
            <span className="col-pts">Pts</span>
          </div>

          {/* Team rows */}
          {standings.map((team, index) => {
            const qualified = index < 2;
            return (
              <motion.div
                layout
                key={team.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                className={`standings-row ${qualified ? 'standings-row--qualified' : ''}`}
              >
                <span className={`col-pos ${qualified ? 'col-pos--qualified' : ''}`}>
                  {index + 1}
                </span>

                <span className="col-team">
                  <span className="team-name">{team.team}</span>
                  <span className="player-name">{team.name}</span>
                </span>

                <span className="col-stat">{team.played}</span>
                <span className="col-stat">{team.won}</span>
                <span className="col-stat">{team.drawn}</span>
                <span className="col-stat">{team.lost}</span>
                <span className="col-stat col-extra">{team.gf}</span>
                <span className="col-stat col-extra">{team.ga}</span>
                <span className="col-stat col-extra">{team.gd > 0 ? `+${team.gd}` : team.gd}</span>
                <span className="col-pts">{team.points}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Standings;
