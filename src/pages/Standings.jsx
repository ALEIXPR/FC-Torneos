import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Standings.css';

const Standings = () => {
  const { tournamentState, getStandings } = useTournament();
  const [activeGroup, setActiveGroup] = useState('A');

  if (tournamentState === 'setup') {
    return (
      <div className="container flex-center" style={{ minHeight: '60vh' }}>
        <div className="card-glass text-center">
          <h2 className="heading-md" style={{ color: 'var(--text-secondary)' }}>La fase de grupos no ha comenzado</h2>
        </div>
      </div>
    );
  }

  const standings = getStandings(activeGroup);

  return (
    <div className="container" style={{ paddingBottom: '5rem' }}>
      <div className="standings-header flex-between" style={{ marginBottom: '2rem' }}>
        <h2 className="heading-lg" style={{ fontSize: '2.5rem' }}>Clasificación</h2>
        
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="card-glass standings-card"
      >
        <div className="table-responsive">
          <table className="standings-table">
            <thead>
              <tr>
                <th title="Posición">Pos</th>
                <th className="text-left">Equipo</th>
                <th title="Partidos Jugados">PJ</th>
                <th title="Victorias">G</th>
                <th title="Empates">E</th>
                <th title="Derrotas">P</th>
                <th title="Goles a Favor">GF</th>
                <th title="Goles en Contra">GC</th>
                <th title="Diferencia de Goles">DG</th>
                <th title="Puntos">Pts</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {standings.map((team, index) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    key={team.id} 
                    className={index < 2 ? 'qualified' : ''}
                  >
                    <td>{index + 1}</td>
                    <td className="text-left">
                      <div className="team-info">
                        <span className="team-name-table">{team.team}</span>
                        <span className="player-name-table">{team.name}</span>
                      </div>
                    </td>
                    <td>{team.played}</td>
                    <td>{team.won}</td>
                    <td>{team.drawn}</td>
                    <td>{team.lost}</td>
                    <td>{team.gf}</td>
                    <td>{team.ga}</td>
                    <td>{team.gd}</td>
                    <td className="points" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: '900' }}>{team.points}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Standings;
