import React from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const areas = ["All Areas", "Downtown", "Al Barsha", "Dubai Marina", "Business Bay", "Jumeirah Beach Residence", "Al Wasl", "DIFC", "Jumeirah 3", "Deira", "Dubailand"];

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '24px', marginBottom: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      
      <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
        <Search size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder="Search by location, mall, or street..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-md)',
            padding: '16px 24px 16px 48px',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'var(--transition)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
        />
      </div>

      <div style={{ position: 'relative', minWidth: '200px' }}>
        <MapPin size={20} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <select 
          onChange={(e) => setSearchQuery(e.target.value === "All Areas" ? "" : e.target.value)}
          style={{
            width: '100%',
            background: 'var(--surface-2)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--border-radius-md)',
            padding: '16px 40px 16px 48px',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            transition: 'var(--transition)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
        >
          {areas.map(area => <option key={area} value={area}>{area}</option>)}
        </select>
        <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          ▼
        </div>
      </div>

    </div>
  );
};

export default SearchBar;
