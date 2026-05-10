import express from 'express';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:tripId', protect, async (req, res, next) => {
  try {
    const [notes] = await db.execute('SELECT * FROM notes WHERE trip_id = ?', [req.params.tripId]);
    res.json({ status: 'success', data: notes });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { trip_id, title, content } = req.body;
    const [result] = await db.execute(
      'INSERT INTO notes (trip_id, user_id, title, content) VALUES (?, ?, ?, ?)',
      [trip_id, req.user.id, title, content]
    );
    res.status(201).json({ status: 'success', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await db.execute('DELETE FROM notes WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ status: 'success', message: 'Note deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
