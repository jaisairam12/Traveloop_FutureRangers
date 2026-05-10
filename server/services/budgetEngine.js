import db from '../config/db.js';

/**
 * Budget Engine
 * Handles complex cost calculations, aggregations, and daily breakdowns.
 */

// Auto-calculate the total budget and cost per day
export const calculateTripFinances = async (tripId) => {
  try {
    // 1. Get total allocated vs spent from budgets table
    const [[budgetTotals]] = await db.execute(`
      SELECT 
        SUM(allocated_amount) as total_allocated,
        SUM(spent_amount) as total_spent
      FROM budgets WHERE trip_id = ?
    `, [tripId]);

    // 2. Get total cost of all activities in the trip
    const [[activityTotals]] = await db.execute(`
      SELECT SUM(a.cost) as total_activity_cost
      FROM activities a
      JOIN trip_stops ts ON a.stop_id = ts.id
      WHERE ts.trip_id = ?
    `, [tripId]);

    // 3. Get trip duration
    const [[tripDetails]] = await db.execute(`
      SELECT DATEDIFF(end_date, start_date) as duration_days 
      FROM trips WHERE id = ?
    `, [tripId]);

    const allocated = parseFloat(budgetTotals.total_allocated || 0);
    const spent = parseFloat(budgetTotals.total_spent || 0);
    const activityCosts = parseFloat(activityTotals.total_activity_cost || 0);
    const days = parseInt(tripDetails.duration_days || 1);
    
    // Calculate true total spent including activities
    const trueTotalSpent = spent + activityCosts;

    return {
      allocated,
      spent: trueTotalSpent,
      remaining: allocated - trueTotalSpent,
      cost_per_day: trueTotalSpent / (days === 0 ? 1 : days),
      status: trueTotalSpent > allocated ? 'over_budget' : 'on_track'
    };
  } catch (error) {
    console.error('Budget Engine Error:', error);
    throw error;
  }
};

// Summarize expenses by category
export const getExpenseSummary = async (tripId) => {
  try {
    const [summary] = await db.execute(`
      SELECT category, SUM(spent_amount) as total_spent
      FROM budgets
      WHERE trip_id = ?
      GROUP BY category
    `, [tripId]);
    return summary;
  } catch (error) {
    console.error('Budget Engine Summary Error:', error);
    throw error;
  }
};
