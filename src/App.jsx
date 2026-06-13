import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTournament, TournamentProvider } from './context/TournamentContext';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

import Lobby from './pages/Lobby';
import Results from './pages/Results';
import Standings from './pages/Standings';
import Bracket from './pages/Bracket';
import Profiles from './pages/Profiles';
import Admin from './pages/Admin';
import Instructions from './pages/Instructions';
import TV from './pages/TV';

const HeaderWrapper = () => {
  const { activeTournament } = useTournament();
  const location = useLocation();

  // Hide header on TV and Admin panels
  if (location.pathname === '/tv' || location.pathname === '/admin') {
    return null;
  }

  const title = activeTournament ? activeTournament.name : "Inicio";
  return <Header title={title} />;
};

const BottomNavWrapper = () => {
  const location = useLocation();

  // Hide bottom nav on TV dashboard
  if (location.pathname === '/tv') {
    return null;
  }

  return <BottomNav />;
};

function AppContent() {
  const { activeTournamentId } = useTournament();
  
  return (
    <div className="app-container">
      <HeaderWrapper />
      
      <main>
        <Routes>
          <Route path="/tv" element={!activeTournamentId ? <Lobby /> : <TV />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Main Enrouting */}
          <Route path="/" element={!activeTournamentId ? <Lobby /> : <Results />} />
          <Route path="/clasificacion" element={!activeTournamentId ? <Navigate to="/" replace /> : <Standings />} />
          <Route path="/cuadro" element={!activeTournamentId ? <Navigate to="/" replace /> : <Bracket />} />
          <Route path="/perfiles" element={!activeTournamentId ? <Navigate to="/" replace /> : <Profiles />} />
          <Route path="/instrucciones" element={<Instructions />} />
          
          {/* Catch-all redirection */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <BottomNavWrapper />
      
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
