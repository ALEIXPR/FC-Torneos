import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Info } from 'lucide-react';

const Instructions = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="container"
      style={{ paddingBottom: '5rem' }}
    >
      <h2 className="heading-lg" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Guía de Uso</h2>
      
      <div className="card-glass" style={{ marginBottom: '2rem' }}>
        <h3 className="heading-md" style={{ marginBottom: '1rem', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={20} /> Para Usuarios
        </h3>
        <ul style={{ color: 'var(--text-secondary)', marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>Resultados:</strong> Muestra los partidos de la fase de grupos y eliminatorias. Si el torneo no ha empezado, verás un mensaje de espera.</li>
          <li><strong>Clasificación:</strong> Sigue la tabla en vivo. El algoritmo calcula Puntos, Diferencia de Goles y Goles a Favor automáticamente.</li>
          <li><strong>Cuadro Final:</strong> Una vez acabada la fase de grupos, el administrador activará las Semifinales.</li>
          <li><strong>Perfiles:</strong> Revisa el estado de forma, estilos de juego y estadísticas de cada participante.</li>
        </ul>
      </div>

      <div className="card-glass" style={{ border: '1px solid rgba(255, 68, 68, 0.3)' }}>
        <h3 className="heading-md" style={{ marginBottom: '1rem', color: '#ff4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={20} /> Para Administradores
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>
          El panel de Admin es exclusivo para organizar el torneo. La contraseña general es <strong>lider</strong>.
        </p>
        <ul style={{ color: 'var(--text-secondary)', marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>Crear Torneos:</strong> Desde el Lobby inicial puedes crear nuevas copas (Ej: "Mundial 2026").</li>
          <li><strong>Setup:</strong> Añade a los participantes configurando sus selecciones y estilos de juego. Mínimo 4 jugadores.</li>
          <li><strong>Generar Grupos:</strong> Cuando los jugadores estén listos, pulsa este botón para que el sistema cree los cruces aleatoriamente.</li>
          <li><strong>Guardar Resultados:</strong> Introduce los goles de cada partido; la tabla de clasificación reaccionará en tiempo real.</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Instructions;
