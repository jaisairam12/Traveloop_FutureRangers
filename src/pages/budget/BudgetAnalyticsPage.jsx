import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertTriangle, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { budgetData } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function BudgetAnalyticsPage() {
  const { dark } = useTheme();
  const pct = Math.round((budgetData.spent / budgetData.total) * 100);
  const remaining = budgetData.total - budgetData.spent;

  const pieData = budgetData.categories.map(c => ({ name: c.name, value: c.spent, color: c.color }));

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-outfit text-3xl font-bold mb-2">Budget Analytics</h1>
          <p className={`mb-8 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Japanese Culture Explorer · Track your spending</p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Budget', value: `$${budgetData.total.toLocaleString()}`, icon: <DollarSign size={20} />, color: 'from-primary to-emerald-500' },
              { label: 'Total Spent', value: `$${budgetData.spent.toLocaleString()}`, icon: <TrendingUp size={20} />, color: 'from-blue-500 to-cyan-500', badge: `${pct}%` },
              { label: 'Remaining', value: `$${remaining.toLocaleString()}`, icon: <PieChartIcon size={20} />, color: remaining > 0 ? 'from-emerald-500 to-green-500' : 'from-red-500 to-rose-500' },
            ].map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white`}>{s.icon}</div>
                    {s.badge && <Badge color="blue">{s.badge}</Badge>}
                  </div>
                  <p className="font-outfit text-2xl font-bold">{s.value}</p>
                  <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <Card>
                <h3 className="font-outfit font-bold text-lg mb-4">Spending Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" stroke="none">
                        {pieData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: dark ? '#1A1D27' : '#FFFFFF',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                        }}
                        formatter={(value) => [`$${value}`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 justify-center">
                  {pieData.map(d => (
                    <span key={d.name} className="flex items-center gap-1.5 text-xs">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Category Cards */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
              <Card>
                <h3 className="font-outfit font-bold text-lg mb-4">Budget by Category</h3>
                <div className="space-y-4">
                  {budgetData.categories.map(cat => {
                    const catPct = Math.round((cat.spent / cat.budget) * 100);
                    const over = cat.spent > cat.budget;
                    return (
                      <div key={cat.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="flex items-center gap-2 text-sm font-medium">
                            <span>{cat.icon}</span> {cat.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {over && <AlertTriangle size={14} className="text-danger" />}
                            <span className={`text-sm font-medium ${over ? 'text-danger' : ''}`}>
                              ${cat.spent} / ${cat.budget}
                            </span>
                          </div>
                        </div>
                        <ProgressBar
                          value={cat.spent}
                          max={cat.budget}
                          color={over ? 'danger' : catPct > 80 ? 'accent' : 'primary'}
                        />
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Expense Table */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
            <Card>
              <h3 className="font-outfit font-bold text-lg mb-4">Recent Expenses</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${dark ? 'border-dark-border' : 'border-light-border'}`}>
                      <th className="text-left py-3 font-medium opacity-60">Date</th>
                      <th className="text-left py-3 font-medium opacity-60">Item</th>
                      <th className="text-left py-3 font-medium opacity-60">Category</th>
                      <th className="text-right py-3 font-medium opacity-60">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.expenses.map(exp => (
                      <tr key={exp.id} className={`border-b ${dark ? 'border-dark-border/50' : 'border-light-border/50'}`}>
                        <td className={`py-3 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{exp.date}</td>
                        <td className="py-3 font-medium">{exp.item}</td>
                        <td className="py-3">
                          <Badge color={
                            exp.category === 'Accommodation' ? 'purple' :
                            exp.category === 'Transport' ? 'blue' :
                            exp.category === 'Food & Dining' ? 'amber' : 'green'
                          }>{exp.category}</Badge>
                        </td>
                        <td className="py-3 text-right font-semibold">${exp.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
