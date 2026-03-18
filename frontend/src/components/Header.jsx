import React from 'react';
import { Car, Map, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, marginBottom: '32px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            background: 'var(--gradient-main)', 
            width: '40px', 
            height: '40px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glow-shadow)'
          }}>
            <Car color="white" size={24} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Dubai<span className="gradient-text">Park</span>
          </h1>
        </div>

        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, transition: 'var(--transition)' }}>Find Parking</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'var(--transition)' }}>My Bookings</a>
          <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
            <User size={18} />
            <span>Sign In</span>
          </button>
        </nav>

      </div>
    </header>
  );
};

export default Header;
