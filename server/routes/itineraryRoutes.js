import express from 'express';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to verify user has access to trip
const verifyTripAccess = async (req, res, next) => {
  const trip_id = req.body.trip_id || req.params.tripId;
  const [member] = await db.execute('SELECT role FROM trip_members WHERE trip_id = ? AND user_id = ?', [trip_id, req.user.id]);
  
  if (member.length === 0) {
    return res.status(403).json({ status: 'error', message: 'Not authorized to access this itinerary' });
  }
  // Optional: check if role is 'planner' or 'editor' for write actions
  req.tripRole = member[0].role;
  next();
};

// @route   POST /api/itinerary/stops
// @desc    Add a city/stop to a trip
// @access  Private
router.post('/stops', protect, verifyTripAccess, async (req, res, next) => {
  try {
    if (req.tripRole === 'viewer') return res.status(403).json({ status: 'error', message: 'Viewers cannot modify itinerary' });

    const { trip_id, day_number, city, date, order_index } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO trip_stops (trip_id, day_number, city, date, order_index) VALUES (?, ?, ?, ?, ?)',
      [trip_id, day_number, city, date, order_index || 0]
    );

    res.status(201).json({ status: 'success', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/itinerary/activities
// @desc    Add an activity to a stop
// @access  Private
router.post('/activities', protect, async (req, res, next) => {
  try {
    const { stop_id, title, type, start_time, duration, cost, order_index } = req.body;
    
    // Ideally verify access to the stop's trip here
    const [result] = await db.execute(
      'INSERT INTO activities (stop_id, title, type, start_time, duration, cost, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [stop_id, title, type, start_time, duration, cost || 0, order_index || 0]
    );

    res.status(201).json({ status: 'success', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/itinerary/:tripId
// @desc    Get full itinerary (stops and activities) for a trip
// @access  Private
router.get('/:tripId', protect, verifyTripAccess, async (req, res, next) => {
  try {
    const [stops] = await db.execute('SELECT * FROM trip_stops WHERE trip_id = ? ORDER BY day_number, order_index', [req.params.tripId]);
    
    // For a complex payload, we might fetch all activities and map them in JS
    if(stops.length === 0) return res.json({ status: 'success', data: [] });

    const stopIds = stops.map(s => s.id);
    const [activities] = await db.execute(`SELECT * FROM activities WHERE stop_id IN (${stopIds.join(',')}) ORDER BY order_index, start_time`);

    const itinerary = stops.map(stop => ({
      ...stop,
      activities: activities.filter(a => a.stop_id === stop.id)
    }));

    res.json({ status: 'success', data: itinerary });
  } catch (error) {
    next(error);
  }
});

export default router;
