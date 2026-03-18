import mongoose from 'mongoose';

const parkingLotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  totalSpots: { type: Number, required: true },
  availableSpots: { type: Number, required: true },
  image: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
}, { timestamps: true });

export default mongoose.model('ParkingLot', parkingLotSchema);
