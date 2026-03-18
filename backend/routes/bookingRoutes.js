import express from 'express';
import Booking from '../models/Booking.js';
import ParkingLot from '../models/ParkingLot.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  const session = await ParkingLot.startSession();
  session.startTransaction();
  try {
    const { userId, parkingLotId, startTime, durationHours } = req.body;
    
    const parkingLot = await ParkingLot.findById(parkingLotId).session(session);
    if (!parkingLot) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Parking lot not found' });
    }

    if (parkingLot.availableSpots <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'No available spots' });
    }

    const totalPrice = parkingLot.pricePerHour * durationHours;

    const newBooking = new Booking({
      userId,
      parkingLotId,
      startTime,
      durationHours,
      totalPrice
    });

    await newBooking.save({ session });
    
    // Decrement available spots
    parkingLot.availableSpots -= 1;
    await parkingLot.save({ session });

    await session.commitTransaction();
    res.status(201).json(newBooking);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

// Get bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('parkingLotId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
