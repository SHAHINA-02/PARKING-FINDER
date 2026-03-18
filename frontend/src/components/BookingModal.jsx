import React, { useState } from 'react';
import { X, Clock, CreditCard, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BookingModal = ({ spot, onClose, onSuccess }) => {
  const [hours, setHours] = useState(1);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = spot.pricePerHour * hours;

  const handleBook = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your details');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/bookings', {
        userId: name,
        parkingLotId: spot._id,
        startTime: new Date(),
        durationHours: hours
      });
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(13, 15, 23, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '32px',
        position: 'relative',
        background: 'var(--surface-1)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '24px', right: '24px',
          background: 'transparent', border: 'none', color: 'var(--text-secondary)',
          cursor: 'pointer'
        }}>
          <X size={24} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Booking Confirmed!</h2>
            <p className="subtitle">Your parking spot has been reserved.</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Book Parking</h2>
            <p className="subtitle" style={{ marginBottom: '32px' }}>{spot.name} - {spot.area}</p>

            <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Your Name / ID</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" 
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)', outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Duration (Hours)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <input 
                    type="range" 
                    min="1" max="24" 
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--primary)' }}
                  />
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, width: '40px' }}>{hours}h</span>
                </div>
              </div>

              <div style={{ 
                background: 'rgba(255,255,255,0.03)', padding: '20px', 
                borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--glass-border)',
                marginTop: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Rate</span>
                  <span>AED {spot.pricePerHour} / hr</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', fontWeight: 700, fontSize: '1.2rem' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--accent)' }}>AED {totalPrice}</span>
                </div>
              </div>

              {error && <div style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{error}</div>}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px', padding: '16px' }} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
