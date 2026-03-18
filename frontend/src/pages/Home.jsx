import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ParkingCard from '../components/ParkingCard';
import MapView from '../components/MapView';
import BookingModal from '../components/BookingModal';

const Home = () => {
  const [spots, setSpots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeSpot, setActiveSpot] = useState(null);
  const [bookingSpot, setBookingSpot] = useState(null);

  const fetchSpots = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/parking${searchQuery ? `?area=${searchQuery}` : ''}`);
      setSpots(res.data);
    } catch (err) {
      console.error('Error fetching spots', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly
    const timer = setTimeout(() => {
      fetchSpots();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="app-layout">
      {/* Ambient background glows */}
      <div className="ambient-light-1" />
      <div className="ambient-light-2" />
      
      <Header />

      <main className="main-content container">
        <div style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '16px' }}>Find Your Perfect <br/><span className="gradient-text">Parking Spot</span> in Dubai</h2>
          <p className="subtitle">Real-time availability, secure bookings, and premium locations.</p>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="home-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Available Spots {spots.length > 0 && `(${spots.length})`}</h3>
            
            <div className="cards-grid">
              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading spots...</div>
              ) : spots.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No parking spots found in this area.</div>
              ) : (
                spots.map(spot => (
                  <div key={spot._id} onMouseEnter={() => setActiveSpot(spot)} onMouseLeave={() => setActiveSpot(null)}>
                    <ParkingCard spot={spot} onBook={setBookingSpot} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="map-container">
             <MapView spots={spots} activeSpot={activeSpot} />
          </div>
          
        </div>
      </main>

      {bookingSpot && (
        <BookingModal 
          spot={bookingSpot} 
          onClose={() => setBookingSpot(null)} 
          onSuccess={fetchSpots} 
        />
      )}
    </div>
  );
};

export default Home;
