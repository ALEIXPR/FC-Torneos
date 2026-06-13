import React from 'react';
import { useTournament } from '../context/TournamentContext';
import { LogOut } from 'lucide-react';

const Header = ({ title }) => {
  const { selectTournament } = useTournament();

  return (
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
        onClick={() => selectTournament(null)}
        style={{
          position: 'absolute',
          left: '1.5rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <LogOut size={20} style={{ transform: 'rotate(180deg)' }} />
      </button>

      <h1 className="heading-md" style={{ color: 'var(--text-primary)', margin: 0 }}>
        FC <span style={{ color: 'var(--accent-primary)' }}>SIXPISTOLS</span>
      </h1>
      <span style={{ 
        position: 'absolute', 
        right: '1.5rem', 
        fontSize: '0.8rem', 
        fontWeight: 'bold', 
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }}>
        {title}
      </span>
    </header>
  );
};

export default Header;
