import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Standings from './Standings';
import Bracket from './Bracket';
import Profiles from './Profiles';
import { Trophy } from 'lucide-react';

const TV = () => {
  const [viewIndex, setViewIndex] = useState(0);
  const views = ['standings', 'bracket', 'profiles'];

  useEffect(() => {
    const timer = setInterval(() => {
      setViewIndex((prev) => (prev + 1) % views.length);
    }, 10000); // 10 seconds per view
    return () => clearInterval(timer);
  }, []);

  const renderView = () => {
    switch (views[viewIndex]) {
      case 'standings':
        return <Standings />;
      case 'bracket':
        return <Bracket />;
      case 'profiles':
        return <Profiles />;
      default:
        return <Standings />;
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Header específico para TV */}
      <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Trophy color="var(--accent-primary)" size={32} />
          <h1 style={{ margin: 0, fontSize: '1.8rem', letterSpacing: '2px', color: 'var(--text-primary)' }}>FC SIXPISTOLS TV</h1>
        </div>
        <div style={{ color: 'var(--accent-secondary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          En Directo
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={viewIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress Bar for TV Mode */}
      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', position: 'fixed', bottom: 0, left: 0 }}>
        <motion.div 
          key={viewIndex}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 10, ease: 'linear' }}
          style={{ height: '100%', background: 'var(--accent-primary)' }}
        />
      </div>
    </div>
  );
};

export default TV;
