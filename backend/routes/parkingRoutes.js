import express from 'express';
import ParkingLot from '../models/ParkingLot.js';

const router = express.Router();

// Get all parking lots, optionally filter by area
router.get('/', async (req, res) => {
  try {
    const { area } = req.query;
    const filter = area ? { area: new RegExp(area, 'i') } : {};
    const parkingLots = await ParkingLot.find(filter);
    res.json(parkingLots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific parking lot by ID
router.get('/:id', async (req, res) => {
  try {
    const parkingLot = await ParkingLot.findById(req.params.id);
    if (!parkingLot) return res.status(404).json({ message: 'Parking lot not found' });
    res.json(parkingLot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
