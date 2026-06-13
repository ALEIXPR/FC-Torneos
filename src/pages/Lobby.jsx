import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight, PlusCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Lobby.css';

const Lobby = () => {
  const { tournaments, setActiveTournamentId, createTournament } = useTournament();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (adminPassword === 'lider') {
      toast.success('Acceso Autorizado');
      navigate('/admin');
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  return (
    <div className="lobby-container">
      {/* Background Image Layer */}
      <div className="lobby-bg"></div>

      <div className="lobby-content">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="lobby-header"
        >
          <Trophy color="var(--accent-primary)" size={64} style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.4))' }} />
          <h1>FC SIXPISTOLS</h1>
          <p>Plataforma Oficial de E-Sports & Competición</p>
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

        {/* Create Tournament Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="create-tournament-section"
        >
          {!showCreate ? (
            <button 
              className="btn-primary" 
              onClick={() => setShowCreate(true)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--accent-secondary)', color: 'var(--text-primary)' }}
            >
              <PlusCircle size={20} />
              Panel de Administración
            </button>
          ) : (
            <AnimatePresence>
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreateSubmit}
              >
                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Lock size={18} color="var(--accent-secondary)" />
                  Acceso de Administrador
                </h3>
                <input
                  type="password"
                  placeholder="Contraseña de Admin..."
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="password-input"
                  autoFocus
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowCreate(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                    Entrar
                  </button>
                </div>
              </motion.form>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Lobby;
