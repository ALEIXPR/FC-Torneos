import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Standings.css';

const Standings = () => {
  const { getStandings, tournamentState } = useTournament();
  const [activeGroup, setActiveGroup] = useState('A');

  if (tournamentState === 'setup') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container flex-center" style={{ minHeight: '60vh' }}>
        <div className="card-glass text-center">
          <h2 className="heading-md" style={{ color: 'var(--text-secondary)' }}>Sin Clasificación</h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Esperando al sorteo de grupos.</p>
        </div>
      </motion.div>
    );
  }

  const standings = getStandings(activeGroup);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="container"
    >
      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
        <h2 className="heading-lg">Clasificación</h2>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--glass-bg)', padding: '0.3rem', borderRadius: '8px' }}>
          <button 
            className={`btn-primary ${activeGroup === 'A' ? '' : 'inactive'}`} 
            onClick={() => setActiveGroup('A')}
            style={{ padding: '0.5rem 1rem', background: activeGroup === 'A' ? 'var(--accent-primary)' : 'transparent', color: activeGroup === 'A' ? '#000' : '#fff' }}
          >
            Grupo A
          </button>
          <button 
            className={`btn-primary ${activeGroup === 'B' ? '' : 'inactive'}`} 
            onClick={() => setActiveGroup('B')}
            style={{ padding: '0.5rem 1rem', background: activeGroup === 'B' ? 'var(--accent-primary)' : 'transparent', color: activeGroup === 'B' ? '#000' : '#fff' }}
          >
            Grupo B
          </button>
        </div>
      </div>
      
      <div className="card-glass standings-table-container">
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
  );
};

export default Standings;
