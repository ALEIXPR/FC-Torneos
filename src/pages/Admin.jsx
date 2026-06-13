import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Trash2, Users, Play, Trophy, ChevronDown, Plus, ChevronLeft, Settings, Home, Shield, Zap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { 
    tournaments,
    activeTournament,
    activeTournamentId,
    setActiveTournamentId,
    createTournament,
    tournamentState, 
    players, 
    matches, 
    addPlayer, 
    removePlayer,
    startTournament, 
    advanceToKnockout,
    updateMatchResult,
    deleteTournament
  } = useTournament();

  const [view, setView] = useState(activeTournamentId ? 'manage' : 'list');
  const [newTournamentName, setNewTournamentName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'lider') {
      setIsAuthenticated(true);
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (newTournamentName.trim() === '') return;
    createTournament(newTournamentName);
    setNewTournamentName('');
    toast.success('¡Torneo creado! Añade jugadores para empezar.');
    setView('manage');
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name');
    const team = fd.get('team');
    const playstyle = fd.get('playstyle');
    if (!name || !team || !playstyle) {
      toast.error('Rellena todos los campos');
      return;
    }
    addPlayer({ name, team, playstyle });
    e.target.reset();
    toast.success(`${name} añadido al torneo`);
  };

  // ── LOGIN ──
  if (!isAuthenticated) {
    return (
      <div className="container flex-center" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-glass" style={{ width: '100%', maxWidth: '400px' }}
        >
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
            <ChevronLeft size={20} /> Volver a Inicio
          </button>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <Shield size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
            <h2 className="heading-md" style={{ color: 'var(--accent-primary)' }}>Panel de Admin</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Introduce la contraseña para gestionar torneos</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Contraseña..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              autoFocus
            />
            <button type="submit" className="btn-primary">Acceder</button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── MASTER LIST ──
  if (view === 'list') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingBottom: '3rem', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0 1.5rem' }}>
          <h2 className="heading-lg" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>Master Control</h2>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <Home size={16} /> Salir
          </button>
        </div>
        
        {/* Crear torneo */}
        <div className="card-glass" style={{ marginBottom: '2rem', borderLeft: '3px solid var(--accent-primary)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <Plus size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Crear Nuevo Torneo
          </h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Nombre del Torneo..." 
              required 
              className="glass-input"
              value={newTournamentName}
              onChange={e => setNewTournamentName(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Crear
            </button>
          </form>
        </div>

        {/* Torneos existentes */}
        <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Torneos ({tournaments.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tournaments.map(t => {
            const statusLabel = t.status === 'setup' ? 'Configuración' : t.status === 'groups' ? 'Fase de Grupos' : 'Eliminatorias';
            const statusColor = t.status === 'setup' ? '#fbbf24' : t.status === 'groups' ? '#3b82f6' : 'var(--accent-primary)';
            return (
              <div key={t.id} className="card-glass" style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.3rem' }}>{t.name}</h4>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: `${statusColor}20`, color: statusColor, fontWeight: '600', textTransform: 'uppercase' }}>
                    {statusLabel}
                  </span>
                  {t.id === 'demo1' && (
                    <span style={{ fontSize: '0.7rem', marginLeft: '0.5rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                      DEMO
                    </span>
                  )}
                </div>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setActiveTournamentId(t.id);
                    setView('manage');
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                >
                  <Settings size={16} /> Gestionar
                </button>
              </div>
            );
          })}
          {tournaments.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>No hay torneos. ¡Crea uno arriba!</p>}
        </div>
      </motion.div>
    );
  }

  // ── MANAGE TOURNAMENT ──
  const isDemo = activeTournament?.id === 'demo1';
  const groupMatches = matches.filter(m => m.stage === 'group');
  const knockoutMatches = matches.filter(m => m.stage === 'knockout');
  const allGroupsFinished = groupMatches.length > 0 && groupMatches.every(m => m.status === 'finished');

  const getStatusBadge = () => {
    if (!tournamentState) return null;
    const config = {
      setup: { label: 'CONFIGURACIÓN', color: '#fbbf24', icon: <Settings size={14} /> },
      groups: { label: 'FASE DE GRUPOS', color: '#3b82f6', icon: <Zap size={14} /> },
      knockout: { label: 'ELIMINATORIAS', color: 'var(--accent-primary)', icon: <Award size={14} /> },
    };
    const c = config[tournamentState];
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', padding: '0.3rem 0.8rem', borderRadius: '6px', background: `${c.color}20`, color: c.color, fontWeight: '700', textTransform: 'uppercase' }}>
        {c.icon} {c.label}
      </span>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingBottom: '3rem', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem 0' }}>
        <button 
          onClick={() => { setActiveTournamentId(null); setView('list'); }} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '1rem', fontSize: '0.85rem' }}
        >
          <ChevronLeft size={18} /> Master Control
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--accent-primary)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>{activeTournament?.name}</h2>
            {getStatusBadge()}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => { setActiveTournamentId(activeTournamentId); navigate('/'); }} 
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'none', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', borderRadius: '8px', cursor: 'pointer' }}
            >
              Ver Público
            </button>
            {!isDemo && (
              <button 
                onClick={() => {
                  if (window.confirm('¿Borrar este torneo por completo? No se puede deshacer.')) {
                    deleteTournament(activeTournamentId);
                    setView('list');
                    toast.success('Torneo eliminado');
                  }
                }} 
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: '#ff444420', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '8px', cursor: 'pointer' }}
              >
                <Trash2 size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} /> Borrar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ═══════ FASE: SETUP ═══════ */}
      {tournamentState === 'setup' && (
        <>
          {/* Añadir jugador */}
          <div className="card-glass" style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--accent-primary)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} color="var(--accent-primary)" /> Añadir Participante
            </h3>
            <form onSubmit={handleAddPlayer} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <input name="name" placeholder="Nombre del Jugador (ej. Eyngel)" required className="glass-input" />
              
              <select name="team" required className="glass-input" defaultValue="">
                <option value="" disabled>Elegir Selección...</option>
                <option value="España">🇪🇸 España</option>
                <option value="Alemania">🇩🇪 Alemania</option>
                <option value="Francia">🇫🇷 Francia</option>
                <option value="Inglaterra">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra</option>
                <option value="Italia">🇮🇹 Italia</option>
                <option value="Países Bajos">🇳🇱 Países Bajos</option>
                <option value="Portugal">🇵🇹 Portugal</option>
                <option value="Bélgica">🇧🇪 Bélgica</option>
                <option value="Croacia">🇭🇷 Croacia</option>
                <option value="Argentina">🇦🇷 Argentina</option>
                <option value="Brasil">🇧🇷 Brasil</option>
                <option value="Uruguay">🇺🇾 Uruguay</option>
                <option value="Colombia">🇨🇴 Colombia</option>
                <option value="Marruecos">🇲🇦 Marruecos</option>
                <option value="Senegal">🇸🇳 Senegal</option>
                <option value="Japón">🇯🇵 Japón</option>
                <option value="Corea del Sur">🇰🇷 Corea del Sur</option>
                <option value="Estados Unidos">🇺🇸 Estados Unidos</option>
                <option value="México">🇲🇽 México</option>
                <option value="Canadá">🇨🇦 Canadá</option>
              </select>

              <select name="playstyle" required className="glass-input" defaultValue="">
                <option value="" disabled>Estilo de Juego...</option>
                <option value="Posesión (Tiki-taka)">Posesión (Tiki-taka)</option>
                <option value="Contragolpe Rápido">Contragolpe Rápido</option>
                <option value="Presión Alta">Presión Alta</option>
                <option value="Juego por Bandas">Juego por Bandas</option>
                <option value="Fútbol Directo">Fútbol Directo</option>
              </select>
              
              <button type="submit" className="btn-primary">Añadir Jugador</button>
            </form>
          </div>

          {/* Lista de jugadores inscritos */}
          <div className="card-glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Jugadores Inscritos ({players.length})</h3>
              {players.length >= 8 && (
                <button 
                  onClick={() => {
                    startTournament();
                    toast.success('¡Grupos generados! Los partidos están listos.');
                  }} 
                  className="btn-primary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}
                >
                  <Play size={16} /> Iniciar Torneo
                </button>
              )}
            </div>

            {players.length > 0 && players.length < 8 && (
              <div style={{ padding: '0.8rem', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', color: '#fbbf24' }}>
                ⚠️ Necesitas mínimo 8 jugadores para iniciar el torneo ({8 - players.length} más).
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <AnimatePresence>
                {players.map((p, i) => (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', borderLeft: '2px solid var(--accent-primary)' }}
                  >
                    <div>
                      <strong style={{ fontSize: '1rem' }}>{p.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {p.team} · {p.playstyle}
                      </div>
                    </div>
                    <button onClick={() => { removePlayer(p.id); toast.success('Jugador eliminado'); }} style={{ background: 'none', border: 'none', color: '#ff6666', cursor: 'pointer', padding: '0.5rem' }}>
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {players.length === 0 && (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>
                  Añade jugadores con el formulario de arriba para empezar.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* ═══════ FASE: GROUPS / KNOCKOUT ═══════ */}
      {(tournamentState === 'groups' || tournamentState === 'knockout') && (
        <div className="card-glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '700' }}>
              <Trophy size={20} color="var(--accent-primary)" /> Resultados de Partidos
            </h3>
            {tournamentState === 'groups' && allGroupsFinished && (
              <button 
                onClick={() => {
                  advanceToKnockout();
                  toast.success('¡Eliminatorias generadas!');
                }} 
                className="btn-primary" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Zap size={16} /> Avanzar a Semifinales
              </button>
            )}
          </div>
          
          {Object.entries(
            matches.reduce((acc, m) => {
              const key = m.stage === 'group' ? `Jornada ${m.round} · Grupo ${m.group}` : m.round;
              if (!acc[key]) acc[key] = [];
              acc[key].push(m);
              return acc;
            }, {})
          ).map(([round, roundMatches]) => (
            <div key={round} style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', borderBottom: '1px solid rgba(0,255,136,0.2)', paddingBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {round}
              </h4>
              {roundMatches.map(match => {
                const player1 = players.find(p => p.id === match.team1_id);
                const player2 = players.find(p => p.id === match.team2_id);
                const isFinished = match.status === 'finished';
                return (
                  <div key={match.id} style={{ marginBottom: '1rem', padding: '1rem', background: isFinished ? 'rgba(0,255,136,0.03)' : 'rgba(255,255,255,0.03)', borderRadius: '8px', border: isFinished ? '1px solid rgba(0,255,136,0.15)' : '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {player1?.team || 'TBD'} vs {player2?.team || 'TBD'}
                      </span>
                      {isFinished && (
                        <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(0,255,136,0.15)', color: 'var(--accent-primary)', fontWeight: '700' }}>
                          ✓ GUARDADO
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                      <span style={{ flex: 1, textAlign: 'right', fontWeight: 'bold', fontSize: '1rem' }}>{player1?.name || 'TBD'}</span>
                      <input 
                        type="number" 
                        defaultValue={match.score1 ?? ''} 
                        id={`score1-${match.id}`}
                        className="glass-input"
                        style={{ width: '55px', height: '45px', fontSize: '1.3rem', textAlign: 'center', padding: '0.2rem', fontWeight: 'bold' }} 
                      />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '300' }}>:</span>
                      <input 
                        type="number" 
                        defaultValue={match.score2 ?? ''} 
                        id={`score2-${match.id}`}
                        className="glass-input"
                        style={{ width: '55px', height: '45px', fontSize: '1.3rem', textAlign: 'center', padding: '0.2rem', fontWeight: 'bold' }} 
                      />
                      <span style={{ flex: 1, fontWeight: 'bold', fontSize: '1rem' }}>{player2?.name || 'TBD'}</span>
                    </div>
                    
                    <input 
                      type="text" 
                      id={`scorers-${match.id}`}
                      defaultValue={match.scorers ?? ''}
                      placeholder="Goleadores (Ej: Mbappé x2, Bellingham)" 
                      className="glass-input"
                      style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem', marginBottom: '0.6rem' }}
                    />

                    <button 
                      className="btn-primary" 
                      style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
                      onClick={() => {
                        const s1 = parseInt(document.getElementById(`score1-${match.id}`).value);
                        const s2 = parseInt(document.getElementById(`score2-${match.id}`).value);
                        const scorers = document.getElementById(`scorers-${match.id}`).value;
                        if (!isNaN(s1) && !isNaN(s2)) {
                          updateMatchResult(match.id, s1, s2, scorers);
                          toast.success('Resultado guardado ✓');
                        } else {
                          toast.error('Introduce los dos marcadores');
                        }
                      }}
                    >
                      {isFinished ? 'Actualizar Resultado' : 'Guardar Resultado'}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
          {matches.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No hay partidos generados.</p>}
        </div>
      )}
    </motion.div>
  );
};

export default Admin;
