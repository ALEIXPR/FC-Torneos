import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </>
  );
};

function AppContent() {
  const { activeTournamentId } = useTournament();
  
  return (
    <div className="app-container">
      <Routes>
        <Route path="/tv" element={!activeTournamentId ? <Lobby /> : <TV />} />
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
