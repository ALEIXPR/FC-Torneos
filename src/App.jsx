import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTournament, TournamentProvider } from './context/TournamentContext';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import { ChevronLeft } from 'lucide-react';

import Lobby from './pages/Lobby';
import Results from './pages/Results';
import Standings from './pages/Standings';
import Bracket from './pages/Bracket';
import Profiles from './pages/Profiles';
import Admin from './pages/Admin';
import Instructions from './pages/Instructions';
import TV from './pages/TV';

const TournamentLayout = () => {
  return (
    <>
      <Header title="Mundial" />
      <main>
        <Routes>
          <Route path="/" element={<Results />} />
          <Route path="/clasificacion" element={<Standings />} />
          <Route path="/cuadro" element={<Bracket />} />
          <Route path="/perfiles" element={<Profiles />} />
          <Route path="/instrucciones" element={<Instructions />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </>
  );
};

const InstructionsStandalone = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="app-header" style={{
        padding: '1.5rem',
        background: 'linear-gradient(to bottom, rgba(5, 8, 16, 1) 0%, rgba(5, 8, 16, 0) 100%)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            left: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <ChevronLeft size={20} />
          <span style={{ fontSize: '0.85rem' }}>Lobby</span>
        </button>

        <h1 className="heading-md" style={{ color: 'var(--text-primary)', margin: 0 }}>
          FC <span style={{ color: 'var(--accent-primary)' }}>SIXPISTOLS</span>
        </h1>
      </header>
      <main>
        <Instructions />
      </main>
    </>
  );
};

function AppContent() {
  const { activeTournamentId } = useTournament();
  
  return (
    <div className="app-container">
      <Routes>
        <Route path="/tv" element={!activeTournamentId ? <Lobby /> : <TV />} />
        <Route path="/admin" element={<Admin />} />
        {!activeTournamentId && (
          <Route path="/instrucciones" element={<InstructionsStandalone />} />
        )}
        <Route path="/*" element={!activeTournamentId ? <Lobby /> : <TournamentLayout />} />
      </Routes>
      <Toaster position="top-center" toastOptions={{ style: { background: '#141b2d', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
    </div>
  );
}

function App() {
  return (
    <TournamentProvider>
      <Router>
        <AppContent />
      </Router>
    </TournamentProvider>
  );
}

export default App;
