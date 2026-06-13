import React, { useState } from 'react';
import { useTournament } from '../context/TournamentContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Trash2, Users, Play, Trophy, ChevronDown, Plus, ChevronLeft, Settings, Home } from 'lucide-react';
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
    resetTournament
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
    if(newTournamentName.trim() === '') return;
    createTournament(newTournamentName);
    setNewTournamentName('');
    toast.success('Torneo creado exitosamente');
    setView('manage');
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const player = {
      name: fd.get('name'),
      team: fd.get('team'),
      playstyle: fd.get('playstyle')
    };
    addPlayer(player);
    e.target.reset();
    toast.success(`${player.name} añadido al torneo`);
  };

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
          <h2 className="heading-md text-center" style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Acceso Administrador</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Contraseña de admin..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              autoFocus
            />
            <button type="submit" className="btn-primary">Entrar al Panel</button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container" style={{ paddingBottom: '5rem', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <div className="flex-between" style={{ padding: '2rem 0' }}>
          <h2 className="heading-lg" style={{ color: 'var(--accent-primary)' }}>Master Control</h2>
          <button onClick={() => navigate('/')} className="btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Home size={18} /> Salir
          </button>
        </div>
        
        <div className="card-glass" style={{ marginBottom: '2rem', background: 'rgba(0, 255, 136, 0.05)' }}>
          <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Crear Nuevo Torneo</h3>
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
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Crear
            </button>
          </form>
        </div>

        <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Torneos Existentes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tournaments.map(t => (
            <div key={t.id} className="card-glass flex-between" style={{ padding: '1.5rem' }}>
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.2rem' }}>{t.name}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Estado: <span style={{ color: 'var(--accent-primary)' }}>{t.status.toUpperCase()}</span>
                </div>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => {
                  setActiveTournamentId(t.id);
                  setView('manage');
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
              >
                <Settings size={18} /> Gestionar
              </button>
            </div>
          ))}
          {tournaments.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No hay torneos en el sistema.</p>}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container" style={{ paddingBottom: '5rem', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ padding: '2rem 0' }}>
        <button 
          onClick={() => {
            setActiveTournamentId(null);
            setView('list');
          }} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '1.5rem' }}
        >
          <ChevronLeft size={20} /> Volver al Master Control
        </button>

        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h2 className="heading-lg" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>{activeTournament?.name}</h2>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Gestión Integral de Datos</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => navigate('/')} 
              className="btn-primary" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--text-primary)' }}
            >
              Ver Público
            </button>
            <button 
              onClick={() => {
                resetTournament();
                setActiveTournamentId(null);
                setView('list');
                toast.success('Torneo Eliminado');
              }} 
              className="btn-primary" 
              style={{ background: '#ff4444', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              Borrar
            </button>
          </div>
        </div>

        {tournamentState === 'setup' && (
          <div className="card-glass" style={{ marginBottom: '2rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20}/> Añadir Participante
            </h3>
            <form onSubmit={handleAddPlayer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input name="name" placeholder="Nombre del Jugador (ej. Eyngel)" required className="glass-input" />
              
              <select name="team" required className="animated-select">
                <button type="button"><selectedcontent></selectedcontent><ChevronDown className="picker-icon" size={16} /></button>
                <option value="" disabled selected>Elegir Selección...</option>
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

              <select name="playstyle" required className="animated-select">
                <button type="button"><selectedcontent></selectedcontent><ChevronDown className="picker-icon" size={16} /></button>
                <option value="" disabled selected>Estilo FC...</option>
                <option value="Posesión (Tiki-taka)">Posesión (Tiki-taka)</option>
                <option value="Contragolpe Rápido">Contragolpe Rápido</option>
                <option value="Presión Alta">Presión Alta</option>
                <option value="Juego por Bandas">Juego por Bandas</option>
                <option value="Fútbol Directo">Fútbol Directo</option>
              </select>
              
              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Añadir Jugador</button>
            </form>
          </div>
        )}

        {tournamentState === 'setup' && (
          <div className="card-glass">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3 className="heading-md">Jugadores Inscritos ({players.length})</h3>
              {players.length >= 4 && (
                <button 
                  onClick={() => {
                    startTournament();
                    toast.success('¡Grupos Generados!');
                  }} 
                  className="btn-primary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                >
                  <Play size={16}/> Generar Grupos
                </button>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <AnimatePresence>
                {players.map(p => (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}
                  >
                    <div>
                      <strong>{p.name}</strong> <span style={{ color: 'var(--text-secondary)' }}>({p.team})</span>
                    </div>
                    <button onClick={() => removePlayer(p.id)} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {players.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No hay participantes todavía.</p>}
            </div>
          </div>
        )}

        {(tournamentState === 'groups' || tournamentState === 'knockout') && (
          <div className="card-glass">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3 className="heading-md" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={20}/> Guardar Resultados
              </h3>
              {tournamentState === 'groups' && matches.every(m => m.status === 'finished') && (
                <button 
                  onClick={() => {
                    advanceToKnockout();
                    toast.success('¡Eliminatorias Generadas!');
                  }} 
                  className="btn-primary" 
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Avanzar a Semifinales
                </button>
              )}
            </div>
            
            {Object.entries(
              matches.reduce((acc, m) => {
                if (!acc[m.round]) acc[m.round] = [];
                acc[m.round].push(m);
                return acc;
              }, {})
            ).map(([round, roundMatches]) => (
              <div key={round} style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', borderBottom: '1px solid rgba(0,255,136,0.2)', paddingBottom: '0.5rem' }}>
                  Jornada {round}
                </h4>
                {roundMatches.map(match => (
                  <div key={match.id} style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      Partido {match.id} • {match.stage === 'group' ? `Grupo ${match.group}` : 'Eliminatoria'}
                    </div>
                    <div className="flex-between">
                      <span style={{flex: 1, fontWeight: 'bold'}}>{players.find(p=>p.id === match.team1_id)?.name}</span>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input 
                        type="number" 
                        defaultValue={match.score1 ?? ''} 
                        id={`score1-${match.id}`}
                        className="glass-input"
                        style={{ width: '60px', height: '50px', fontSize: '1.5rem', textAlign: 'center', padding: '0.2rem' }} 
                      />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '1.5rem' }}>-</span>
                      <input 
                        type="number" 
                        defaultValue={match.score2 ?? ''} 
                        id={`score2-${match.id}`}
                        className="glass-input"
                        style={{ width: '60px', height: '50px', fontSize: '1.5rem', textAlign: 'center', padding: '0.2rem' }} 
                      />
                      </div>
                      <span style={{flex: 1, textAlign: 'right', fontWeight: 'bold'}}>{players.find(p=>p.id === match.team2_id)?.name}</span>
                    </div>
                    
                    <div style={{ marginTop: '1rem' }}>
                      <input 
                        type="text" 
                        id={`scorers-${match.id}`}
                        defaultValue={match.scorers ?? ''}
                        placeholder="Goleadores (Ej: Mbappé x2, Bellingham)" 
                        className="glass-input"
                        style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
                      />
                    </div>

                    <button 
                      className="btn-primary" 
                      style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', background: 'var(--bg-tertiary)', border: '1px solid var(--accent-primary)', color: 'var(--text-primary)' }}
                      onClick={() => {
                        const s1 = parseInt(document.getElementById(`score1-${match.id}`).value);
                        const s2 = parseInt(document.getElementById(`score2-${match.id}`).value);
                        const scorers = document.getElementById(`scorers-${match.id}`).value;
                        if(!isNaN(s1) && !isNaN(s2)) {
                          updateMatchResult(match.id, s1, s2, scorers);
                          toast.success('Resultado y goleadores guardados');
                        } else {
                          toast.error('Introduce valores numéricos válidos');
                        }
                      }}
                    >
                      Guardar Resultado
                    </button>
                  </div>
                ))}
              </div>
            ))}
            {matches.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No hay partidos generados en este torneo.</p>}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Admin;
