import React, { useMemo } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion } from 'framer-motion';
import { calculateStandings } from '../lib/TournamentEngine';

const Profiles = () => {
  const { players, matches } = useTournament();

  const playerStats = useMemo(() => {
    return calculateStandings(players, matches);
  }, [players, matches]);

  if (players.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container flex-center" style={{ minHeight: '60vh' }}>
        <div className="card-glass text-center">
          <h2 className="heading-md" style={{ color: 'var(--text-secondary)' }}>Aún no hay perfiles</h2>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="container"
      style={{ paddingBottom: '5rem' }}
    >
      <h2 className="heading-lg" style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Scouting Report</h2>
      
      <div className="profiles-grid">
        {playerStats.map((player, i) => {
          const winRate = player.played > 0 ? Math.round((player.won / player.played) * 100) : 0;
          
          return (
            <motion.div 
              key={player.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card-glass profile-card" style={{ marginBottom: '1.5rem' }}
            >
              <div className="profile-header flex-between" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 className="heading-md" style={{ color: 'var(--text-primary)' }}>{player.name}</h3>
                  <span style={{ color: 'var(--text-secondary)' }}>{player.team} {player.group ? `(Grupo ${player.group})` : ''}</span>
                </div>
                <div className="symbiosis-badge" style={{ background: 'rgba(0, 255, 136, 0.05)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--accent-primary)' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)', fontSize: '1.2rem' }}>{winRate}% WR</span>
                </div>
              </div>
              
              <div className="profile-stats">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Partidos</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{player.played}</div>
                  </div>
                  <div style={{ background: 'rgba(0, 255, 136, 0.05)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(0,255,136,0.2)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>G. Favor</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{player.gf}</div>
                  </div>
                  <div style={{ background: 'rgba(255, 68, 68, 0.05)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(255,68,68,0.2)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#ff4444', textTransform: 'uppercase' }}>G. Contra</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff4444' }}>{player.ga}</div>
                  </div>
                </div>

                <div className="playstyle-info" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong>Estilo:</strong></span>
                  <span style={{ color: 'var(--accent-secondary)' }}>{player.playstyle}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Profiles;
