import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trophy, Users, Shield, LayoutGrid, Settings, HelpCircle } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Trophy size={24} />
        <span>Partidos</span>
      </NavLink>
      <NavLink to="/clasificacion" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <LayoutGrid size={24} />
        <span>Grupos</span>
      </NavLink>
      <NavLink to="/cuadro" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Shield size={24} />
        <span>Cuadro</span>
      </NavLink>
      <NavLink to="/perfiles" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Users size={24} />
        <span>Perfiles</span>
      </NavLink>
      <NavLink to="/instrucciones" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <HelpCircle size={24} />
        <span>Ayuda</span>
      </NavLink>
      <NavLink to="/admin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Settings size={24} />
        <span>Admin</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
