import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  parkingLotId: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingLot', required: true },
  startTime: { type: Date, required: true },
  durationHours: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
