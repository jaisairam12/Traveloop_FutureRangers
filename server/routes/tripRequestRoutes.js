import express from 'express';
import db from '../config/db.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/requests
// @desc    Create a public trip request (AI match quiz submission)
// @access  Private (Users only)
router.post('/', protect, authorize('user'), async (req, res, next) => {
  try {
    const { destination, budget, duration, style } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO trip_requests (user_id, destination, budget, duration, style) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, destination, budget, duration, style]
    );

    res.status(201).json({ status: 'success', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/requests/feed
// @desc    Get open trip requests for planners to view
// @access  Private (Planners & Admins only)
router.get('/feed', protect, authorize('planner', 'admin'), async (req, res, next) => {
  try {
    const [requests] = await db.execute(`
      SELECT tr.*, u.name as user_name, u.avatar 
      FROM trip_requests tr 
      JOIN users u ON tr.user_id = u.id 
      WHERE tr.status = 'open'
      ORDER BY tr.created_at DESC
    `);
    
    res.json({ status: 'success', data: requests });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/requests/:id/respond
// @desc    Planner responds to a trip request
// @access  Private (Planners only)
router.post('/:id/respond', protect, authorize('planner'), async (req, res, next) => {
  try {
    const { message } = req.body;
    const request_id = req.params.id;

    const [result] = await db.execute(
      'INSERT INTO request_responses (request_id, planner_id, message) VALUES (?, ?, ?)',
      [request_id, req.user.id, message]
    );

    res.status(201).json({ status: 'success', message: 'Response sent successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
