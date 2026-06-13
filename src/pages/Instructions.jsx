import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, 
  Shield, 
  Users, 
  Trophy, 
  Play, 
  CheckCircle, 
  HelpCircle, 
  ChevronRight, 
  BookOpen, 
  Flame, 
  Award, 
  Settings, 
  FileText, 
  Zap 
} from 'lucide-react';
import './Instructions.css';

const Instructions = () => {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'players' | 'admin' | 'faq'

  const tabContentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container instructions-page"
    >
      <header className="instructions-header">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ display: 'inline-block', marginBottom: '0.75rem' }}
        >
          <BookOpen size={48} color="var(--accent-primary)" style={{ filter: 'drop-shadow(0 0 15px rgba(0, 255, 136, 0.4))' }} />
        </motion.div>
        <h2 className="instructions-title">Guía de la Plataforma</h2>
        <p className="instructions-subtitle">Domina el funcionamiento de los torneos de E-Sports 🎮</p>
      </header>

      {/* Tabs Selector */}
      <div className="help-tabs">
        <button 
          className={`help-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          📖 General
        </button>
        <button 
          className={`help-tab-btn ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          👥 Jugadores
        </button>
        <button 
          className={`help-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          ⚙️ Admin
        </button>
        <button 
          className={`help-tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          ❓ FAQ
        </button>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'general' && (
          <motion.div
            key="general"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="help-card help-card-general">
              <h3 className="help-card-title" style={{ color: 'var(--accent-primary)' }}>
                <Trophy size={22} /> Estructura de Torneos
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                FC Sixpistols organiza competiciones rápidas diseñadas para mantener la tensión y la emoción del fútbol virtual. Los torneos se desarrollan en cuatro fases consecutivas:
              </p>
              
              <div className="help-steps">
                <div className="help-step-item">
                  <div className="help-step-num">1</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Inscripción y Setup 📝</h4>
                    <p className="help-step-desc">Se registran los jugadores activos con sus selecciones y estilos de juego tácticos definidos.</p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num">2</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Fase de Grupos (A y B) ⚔️</h4>
                    <p className="help-step-desc">El motor agrupa aleatoriamente a los 8 participantes en 2 grupos y genera el calendario oficial de partidos.</p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num">3</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Semifinales Cruzadas ⚡</h4>
                    <p className="help-step-desc">Los dos mejores equipos de cada grupo avanzan y se enfrentan cruzados (1º del Grupo A vs 2º del Grupo B, y viceversa).</p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num">4</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">La Gran Final 🏆</h4>
                    <p className="help-step-desc">Los dos ganadores de las semifinales disputan el partido decisivo por el trono de la copa.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="help-card">
              <h3 className="help-card-title" style={{ color: 'var(--text-primary)' }}>
                <Star size={20} color="#fbbf24" /> Torneo Demo Integrado
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                La plataforma incluye de manera predeterminada el torneo <strong>"Mundial de Leyendas (Demo)"</strong> en fase final de eliminatorias 🏟️. 
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginTop: '0.75rem', marginLeft: '1.25rem' }}>
                <li>Este torneo sirve como demostración inmediata de la plataforma para los visitantes.</li>
                <li><strong>No se puede eliminar</strong>, garantizando que siempre haya datos de ejemplo para explorar.</li>
                <li>Es completamente editable desde el panel de administración para hacer pruebas rápidas.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {activeTab === 'players' && (
          <motion.div
            key="players"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="help-card help-card-player">
              <h3 className="help-card-title" style={{ color: 'var(--accent-secondary)' }}>
                <Users size={22} /> Guía del Espectador y Jugadores
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Explora las diferentes secciones públicas en el menú de navegación inferior para mantenerte al día con el torneo en juego:
              </p>
              
              <div className="help-steps">
                <div className="help-step-item">
                  <div className="help-step-num help-step-num-player">Partidos</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Calendario y Resultados 📅</h4>
                    <p className="help-step-desc">
                      Consulta los cruces por jornadas. Los marcadores finalizados se actualizan al instante y muestran los autores de los goles de forma detallada. También incluye la pestaña <strong>⚽ Pichichi</strong>, que extrae todos los goleadores y los ordena de mayor a menor con medallas (🥇, 🥈, 🥉) para el Top 3.
                    </p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num help-step-num-player">Grupos</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Tablas de Clasificación 📊</h4>
                    <p className="help-step-desc">
                      Sigue la tabla de posiciones en vivo para los Grupos A y B. El sistema calcula automáticamente Puntos, Diferencia de Goles, Goles Favor y Goles Contra. En móvil se muestran las columnas clave y se destacan en color los puestos de clasificación directa.
                    </p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num help-step-num-player">Cuadro</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Fase Eliminatoria 🛡️</h4>
                    <p className="help-step-desc">
                      Muestra el árbol de Semifinales y Final. El bracket se desbloquea automáticamente en cuanto el administrador decide avanzar de fase al terminar los grupos.
                    </p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num help-step-num-player">Perfiles</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Estadísticas y Rendimiento 👤</h4>
                    <p className="help-step-desc">
                      Accede a las fichas técnicas de los jugadores para analizar sus estilos de juego y estadísticas generales de rendimiento en el torneo actual.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'admin' && (
          <motion.div
            key="admin"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="help-card help-card-admin">
              <h3 className="help-card-title" style={{ color: '#ff4444' }}>
                <Shield size={22} /> Panel del Administrador (Master Control)
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Si eres el organizador, puedes acceder al panel de administración desde la página principal de la app usando la clave maestra de seguridad:
              </p>
              
              <div style={{ background: 'rgba(255, 68, 68, 0.08)', border: '1px solid rgba(255, 68, 68, 0.2)', padding: '0.8rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🔑</span>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Contraseña de Seguridad</span>
                  <strong style={{ fontSize: '1rem', color: '#ff4444', letterSpacing: '1px' }}>lider</strong>
                </div>
              </div>

              <div className="help-steps">
                <div className="help-step-item">
                  <div className="help-step-num help-step-num-admin">1</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Creación de Torneos 🆕</h4>
                    <p className="help-step-desc">Desde el Master Control puedes nombrar y crear múltiples torneos. El último torneo creado se activará automáticamente como torneo en curso.</p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num help-step-num-admin">2</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Registro de Participantes ➕</h4>
                    <p className="help-step-desc">Añade a los jugadores uno por uno en la etapa de <strong>Setup</strong>. Elige su selección nacional y estilo de juego táctico. Se requiere un mínimo estricto de <strong>8 jugadores</strong> para poder habilitar el inicio.</p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num help-step-num-admin">3</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Iniciar Fase de Grupos 🚀</h4>
                    <p className="help-step-desc">Presiona "Iniciar Torneo" para sortear y dividir aleatoriamente a los 8 participantes en dos grupos (A y B) de 4 integrantes y calendarizar el fixture completo de partidos.</p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num help-step-num-admin">4</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Actualizar Resultados y Goleadores 💾</h4>
                    <p className="help-step-desc">
                      Digita los goles de cada enfrentamiento y pulsa "Guardar Resultado". Registra los autores de los goles en el campo de texto correspondiente separándolos por comas (ej. <code>Messi x2, Mbappe</code>) para actualizar el Pichichi en tiempo real.
                    </p>
                  </div>
                </div>

                <div className="help-step-item">
                  <div className="help-step-num help-step-num-admin">5</div>
                  <div className="help-step-content">
                    <h4 className="help-step-title">Avanzar a Eliminatorias ⚡</h4>
                    <p className="help-step-desc">Al terminar de disputarse todos los partidos de la fase de grupos, presiona el botón "Avanzar a Semifinales". El motor clasificará a los dos primeros de cada grupo y los emparejará en partidos de ida y vuelta para el Cuadro de Honor.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'faq' && (
          <motion.div
            key="faq"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="help-card">
              <h3 className="help-card-title" style={{ color: 'var(--accent-primary)' }}>
                <HelpCircle size={22} /> Preguntas Frecuentes
              </h3>
              
              <div className="faq-item">
                <h4 className="faq-question"><span>🤔</span> ¿Cómo se corrigen o modifican los resultados guardados?</h4>
                <p className="faq-answer">
                  Puedes editar cualquier partido en cualquier momento. Vuelve a entrar al Panel de Admin, modifica los goles y goleadores en los campos del partido en cuestión, y pulsa <strong>"Actualizar Resultado"</strong>. Todos los puntos, la clasificación de los grupos y el ranking de goleadores se recalcularán automáticamente en tiempo real.
                </p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question"><span>📈</span> ¿Qué criterios se usan en caso de empate en la tabla de posiciones?</h4>
                <p className="faq-answer">
                  El motor de torneo calcula la clasificación en base a las reglas internacionales de fútbol:
                  <br />
                  1. <strong>Puntos totales</strong> (3 por victoria, 1 por empate).
                  <br />
                  2. <strong>Diferencia de goles (DG)</strong> (Goles a Favor menos Goles en Contra).
                  <br />
                  3. <strong>Goles a favor (GF)</strong>.
                </p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question"><span>⚽</span> ¿Cómo debo ingresar los goleadores para que el Pichichi los sume bien?</h4>
                <p className="faq-answer">
                  El parseador inteligente de goles es bastante flexible. Puedes ingresar nombres sencillos separados por comas o especificar multiplicadores para goles múltiples.
                  <br />
                  <strong>Formatos sugeridos:</strong>
                  <ul style={{ marginLeft: '1.2rem', marginTop: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    <li><code>Messi, Mbappe</code> (1 gol para cada uno)</li>
                    <li><code>Vinicius x2, Bellingham</code> (2 goles para Vinicius, 1 para Bellingham)</li>
                    <li><code>Morata x3, Ruiz</code> (Hat-trick para Morata, 1 para Ruiz)</li>
                  </ul>
                </p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question"><span>🔒</span> ¿Se puede restablecer la aplicación o cambiar la contraseña?</h4>
                <p className="faq-answer">
                  La contraseña general de administración está hardcodeada como <code>lider</code> para simplificar el acceso a los administradores locales. El almacenamiento se realiza en el <code>localStorage</code> de tu navegador, por lo que borrar los datos de navegación restablecerá la base de datos a su estado original (solo con el torneo Demo).
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Instructions;
