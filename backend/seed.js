import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ParkingLot from './models/ParkingLot.js';
import Booking from './models/Booking.js';

dotenv.config();

const parkingLots = [
  {
    name: 'Mall of the Emirates Parking',
    area: 'Al Barsha',
    pricePerHour: 15,
    totalSpots: 500,
    availableSpots: 120,
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.1181, lng: 55.2006 }
  },
  {
    name: 'Dubai Mall Grand Parking',
    area: 'Downtown',
    pricePerHour: 20,
    totalSpots: 1200,
    availableSpots: 45,
    image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.1972, lng: 55.2744 }
  },
  {
    name: 'JBR Beach Parking',
    area: 'Jumeirah Beach Residence',
    pricePerHour: 25,
    totalSpots: 300,
    availableSpots: 5,
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.0776, lng: 55.1328 }
  },
  {
    name: 'Marina Walk Underground',
    area: 'Dubai Marina',
    pricePerHour: 18,
    totalSpots: 400,
    availableSpots: 80,
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.0805, lng: 55.1403 }
  },
  {
    name: 'Business Bay Standard',
    area: 'Business Bay',
    pricePerHour: 12,
    totalSpots: 250,
    availableSpots: 150,
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.1856, lng: 55.2672 }
  },
  {
    name: 'City Walk Outdoor',
    area: 'Al Wasl',
    pricePerHour: 22,
    totalSpots: 150,
    availableSpots: 0,
    image: 'https://images.unsplash.com/photo-1616165415772-59bcbd825313?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.2081, lng: 55.2605 }
  },
  {
    name: 'DIFC Gate Avenue',
    area: 'DIFC',
    pricePerHour: 30,
    totalSpots: 450,
    availableSpots: 200,
    image: 'https://images.unsplash.com/photo-1543360492-9c1ba83ce9aa?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.2127, lng: 55.2811 }
  },
  {
    name: 'Kite Beach Public Parking',
    area: 'Jumeirah 3',
    pricePerHour: 10,
    totalSpots: 200,
    availableSpots: 12,
    image: 'https://images.unsplash.com/photo-1574510860803-05459374092b?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.1652, lng: 55.2085 }
  },
  {
    name: 'Deira City Centre Parking',
    area: 'Deira',
    pricePerHour: 10,
    totalSpots: 800,
    availableSpots: 350,
    image: 'https://images.unsplash.com/photo-1626244101416-dd56f0475ded?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.2519, lng: 55.3331 }
  },
  {
    name: 'Global Village VIP',
    area: 'Dubailand',
    pricePerHour: 50,
    totalSpots: 100,
    availableSpots: 60,
    image: 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&q=80',
    coordinates: { lat: 25.0676, lng: 55.3056 }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dubai-parking-finder');
    console.log('Connected to MongoDB');

    await ParkingLot.deleteMany();
    await Booking.deleteMany();
    console.log('Cleared existing data');

    await ParkingLot.insertMany(parkingLots);
    console.log('Successfully seeded 10 parking lots');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedDB();
