import express from 'express';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:tripId', protect, async (req, res, next) => {
  try {
    const [items] = await db.execute('SELECT * FROM packing_items WHERE trip_id = ?', [req.params.tripId]);
    res.json({ status: 'success', data: items });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { trip_id, category, item_name } = req.body;
    const [result] = await db.execute(
      'INSERT INTO packing_items (trip_id, category, item_name) VALUES (?, ?, ?)',
      [trip_id, category, item_name]
    );
    res.status(201).json({ status: 'success', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/toggle', protect, async (req, res, next) => {
  try {
    await db.execute('UPDATE packing_items SET is_packed = NOT is_packed WHERE id = ?', [req.params.id]);
    res.json({ status: 'success', message: 'Item toggled' });
  } catch (error) {
    next(error);
  }
});

export default router;
