import express from 'express';
import db from '../config/db.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/trips
// @desc    Create a new trip
// @access  Private (Planners only)
router.post('/', protect, authorize('planner', 'admin'), async (req, res, next) => {
  try {
    const { name, destination, start_date, end_date, visibility } = req.body;
    const planner_id = req.user.id;

    const [result] = await db.execute(
      'INSERT INTO trips (planner_id, name, destination, start_date, end_date, visibility) VALUES (?, ?, ?, ?, ?, ?)',
      [planner_id, name, destination, start_date, end_date, visibility || 'private']
    );

    // Automatically add the planner as a member
    await db.execute(
      'INSERT INTO trip_members (trip_id, user_id, role) VALUES (?, ?, ?)',
      [result.insertId, planner_id, 'planner']
    );

    res.status(201).json({ status: 'success', data: { id: result.insertId, name, destination } });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/trips
// @desc    Get all trips for the logged-in user (as planner or member)
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const [trips] = await db.execute(`
      SELECT t.*, tm.role as user_role 
      FROM trips t
      JOIN trip_members tm ON t.id = tm.trip_id
      WHERE tm.user_id = ?
    `, [req.user.id]);
    
    res.json({ status: 'success', data: trips });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/trips/:id/members
// @desc    Invite/Add a member to a trip
// @access  Private (Planners of the trip only)
router.post('/:id/members', protect, async (req, res, next) => {
  try {
    const { user_id, role } = req.body;
    const trip_id = req.params.id;

    // Verify current user is the planner of this trip
    const [trip] = await db.execute('SELECT planner_id FROM trips WHERE id = ?', [trip_id]);
    if (trip.length === 0 || trip[0].planner_id !== req.user.id) {
      return res.status(403).json({ status: 'error', message: 'Only the trip planner can add members' });
    }

    await db.execute(
      'INSERT INTO trip_members (trip_id, user_id, role) VALUES (?, ?, ?)',
      [trip_id, user_id, role || 'viewer']
    );

    res.status(201).json({ status: 'success', message: 'Member added successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ status: 'error', message: 'User is already a member' });
    } else {
      next(error);
    }
  }
});

export default router;
