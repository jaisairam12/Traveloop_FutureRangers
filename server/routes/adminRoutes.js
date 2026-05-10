import express from 'express';
import db from '../config/db.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, authorize('admin'), async (req, res, next) => {
  try {
    const [[usersCount]] = await db.execute('SELECT COUNT(*) as count FROM users');
    const [[tripsCount]] = await db.execute('SELECT COUNT(*) as count FROM trips');
    const [[requestsCount]] = await db.execute('SELECT COUNT(*) as count FROM trip_requests');
    
    // Most popular destination logic
    const [popular] = await db.execute(`
      SELECT destination, COUNT(*) as count 
      FROM trips 
      GROUP BY destination 
      ORDER BY count DESC 
      LIMIT 5
    `);

    res.json({
      status: 'success',
      data: {
        total_users: usersCount.count,
        total_trips: tripsCount.count,
        total_requests: requestsCount.count,
        popular_destinations: popular
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
