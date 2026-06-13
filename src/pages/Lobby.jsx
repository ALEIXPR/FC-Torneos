import React from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Lobby.css';

const Lobby = () => {
  const { tournaments, setActiveTournamentId } = useTournament();
  const navigate = useNavigate();

  return (
    <div className="lobby-container">
      <div className="lobby-bg"></div>

      <div className="lobby-content">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="lobby-header"
        >
          <Trophy color="var(--accent-primary)" size={64} style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.4))' }} />
          <h1>FC SIXPISTOLS</h1>
          <p>Plataforma Oficial de E-Sports &amp; Competición</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="tournaments-list"
        >
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            Torneos Activos
          </h3>
          
          {tournaments.map((t, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              key={t.id}
              onClick={() => {
                setActiveTournamentId(t.id);
                navigate('/');
              }}
              className="tournament-card"
            >
              <div>
                <h3>{t.name}</h3>
                <p>Estado: <span style={{ color: t.status === 'setup' ? 'var(--text-secondary)' : 'var(--accent-primary)' }}>
                  {t.status === 'setup' ? 'Inscripción' : t.status === 'groups' ? 'Fase de Grupos' : 'Eliminatorias'}
                </span></p>
              </div>
              <ChevronRight color="var(--accent-primary)" />
            </motion.div>
          ))}
        </motion.div>

        {/* Admin button — goes straight to /admin which has its own auth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="create-tournament-section"
        >
          <button 
            className="btn-primary" 
            onClick={() => navigate('/admin')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--accent-secondary)', color: 'var(--text-primary)' }}
          >
            <Settings size={20} />
            Panel de Administración
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Lobby;
