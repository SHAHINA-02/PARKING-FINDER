import React from 'react';
import { MapPin } from 'lucide-react';

const MapView = ({ spots, activeSpot }) => {
  // Using a stylized dark map image for the background
  const mapImageUrl = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80'; 

  return (
    <div className="glass-panel" style={{ 
      position: 'relative', 
      width: '100%', 
      height: '600px', 
      borderRadius: 'var(--border-radius-lg)', 
      overflow: 'hidden',
      border: '1px solid var(--glass-border)'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${mapImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(100%) brightness(0.6) contrast(1.2)',
        zIndex: 0
      }} />
      
      {/* Overlay to dim map further and add blue tint */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(13, 15, 23, 0.6)',
        mixBlendMode: 'overlay',
        zIndex: 1
      }} />

      {/* Render dummy pins because actual coordinates don't directly map to this static image easily */}
      {/* We normally would map lat/lng to top/left percentages, but for static aesthetic we just distribute them */}
      
      {spots.map((spot, index) => {
        // Pseudo-random distribution based on index to spread pins
        const top = `${20 + (index * 7) % 60}%`;
        const left = `${15 + (index * 13) % 70}%`;
        
        const isActive = activeSpot && activeSpot._id === spot._id;
        const color = spot.availableSpots === 0 ? 'var(--danger)' : (spot.availableSpots < 20 ? 'var(--warning)' : 'var(--primary)');
        
        return (
          <div key={spot._id} style={{
            position: 'absolute',
            top,
            left,
            zIndex: isActive ? 10 : 2,
            transform: 'translate(-50%, -100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'var(--transition)',
            cursor: 'pointer'
          }}>
            <div style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(8px)',
              padding: '4px 8px',
              borderRadius: 'var(--border-radius-sm)',
              border: `1px solid ${color}`,
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              marginBottom: '4px',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.3s ease',
              boxShadow: `0 0 10px ${color}40`
            }}>
              AED {spot.pricePerHour}/hr
            </div>
            <div style={{
              width: '32px',
              height: '32px',
              background: color,
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 15px ${color}80`,
              animation: isActive ? 'pulse 2s infinite' : 'none',
              border: isActive ? '2px solid white' : 'none'
            }}>
              <div style={{ transform: 'rotate(45deg)' }}>
                <MapPin size={16} color="white" fill="white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapView;
