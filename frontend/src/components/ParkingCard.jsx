import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const ParkingCard = ({ spot, onBook }) => {
  const isFull = spot.availableSpots === 0;
  const isFilling = spot.availableSpots < 20 && spot.availableSpots > 0;
  
  let statusClass = 'available';
  let statusText = 'Available';
  
  if (isFull) {
    statusClass = 'full';
    statusText = 'Full';
  } else if (isFilling) {
    statusClass = 'filling';
    statusText = 'Filling Fast';
  }

  return (
    <div className="glass-panel animate-fade-in" style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'var(--transition)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = 'var(--glow-shadow)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
    }}>
      
      <div style={{ position: 'relative', height: '200px', width: '100%' }}>
        <img src={spot.image} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 50%, var(--surface-1) 100%)' }} />
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <span className={`status-badge ${statusClass}`}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
            {statusText}
          </span>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: '1', background: 'var(--surface-1)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{spot.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
          <MapPin size={16} />
          <span>{spot.area}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '4px' }}>Price</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>AED {spot.pricePerHour}<span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/hr</span></div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '4px' }}>Spots</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{spot.availableSpots} <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ {spot.totalSpots}</span></div>
          </div>
        </div>
        
        <button 
          className={`btn ${isFull ? 'btn-secondary' : 'btn-primary'}`} 
          style={{ width: '100%', marginTop: '24px' }}
          disabled={isFull}
          onClick={() => onBook(spot)}
        >
          {isFull ? 'No Availability' : 'Book Spot'}
        </button>
      </div>

    </div>
  );
};

export default ParkingCard;
