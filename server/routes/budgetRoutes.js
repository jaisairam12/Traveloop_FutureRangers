import express from 'express';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:tripId', protect, async (req, res, next) => {
  try {
    const [budgets] = await db.execute('SELECT * FROM budgets WHERE trip_id = ?', [req.params.tripId]);
    res.json({ status: 'success', data: budgets });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { trip_id, category, allocated_amount } = req.body;
    const [result] = await db.execute(
      'INSERT INTO budgets (trip_id, category, allocated_amount) VALUES (?, ?, ?)',
      [trip_id, category, allocated_amount]
    );
    res.status(201).json({ status: 'success', data: { id: result.insertId } });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/spend', protect, async (req, res, next) => {
  try {
    const { amount } = req.body;
    await db.execute('UPDATE budgets SET spent_amount = spent_amount + ? WHERE id = ?', [amount, req.params.id]);
    res.json({ status: 'success', message: 'Budget updated' });
  } catch (error) {
    next(error);
  }
});

export default router;
