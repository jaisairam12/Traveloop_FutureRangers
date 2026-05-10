import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, CheckCircle, Circle, Package } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { packingList as initialList } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function PackingChecklistPage() {
  const { dark } = useTheme();
  const [categories, setCategories] = useState(initialList);
  const [newItem, setNewItem] = useState({});

  const toggleItem = (catIdx, itemIdx) => {
    const updated = [...categories];
    updated[catIdx] = {
      ...updated[catIdx],
      items: updated[catIdx].items.map((it, i) => i === itemIdx ? { ...it, checked: !it.checked } : it)
    };
    setCategories(updated);
  };

  const addItem = (catIdx) => {
    const text = newItem[catIdx];
    if (!text?.trim()) return;
    const updated = [...categories];
    updated[catIdx] = {
      ...updated[catIdx],
      items: [...updated[catIdx].items, { id: `new-${Date.now()}`, name: text.trim(), checked: false }]
    };
    setCategories(updated);
    setNewItem({ ...newItem, [catIdx]: '' });
  };

  const totalItems = categories.reduce((a, c) => a + c.items.length, 0);
  const checkedItems = categories.reduce((a, c) => a + c.items.filter(i => i.checked).length, 0);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-outfit text-3xl font-bold mb-1">Packing Checklist</h1>
          <p className={`mb-6 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{checkedItems}/{totalItems} items packed</p>
          <ProgressBar value={checkedItems} max={totalItems} showLabel className="mb-8" />

          <div className="space-y-6">
            {categories.map((cat, catIdx) => (
              <Card key={cat.category}>
                <h3 className="font-outfit font-bold text-lg flex items-center gap-2 mb-4">
                  <span>{cat.icon}</span> {cat.category}
                  <span className={`text-sm font-normal ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>
                    ({cat.items.filter(i => i.checked).length}/{cat.items.length})
                  </span>
                </h3>
                <div className="space-y-1">
                  {cat.items.map((item, itemIdx) => (
                    <button key={item.id} onClick={() => toggleItem(catIdx, itemIdx)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer text-left ${dark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                      {item.checked
                        ? <CheckCircle size={20} className="text-primary shrink-0" />
                        : <Circle size={20} className="opacity-30 shrink-0" />
                      }
                      <span className={`text-sm ${item.checked ? 'line-through opacity-40' : ''}`}>{item.name}</span>
                    </button>
                  ))}
                </div>
                <div className={`flex gap-2 mt-3 pt-3 border-t ${dark ? 'border-dark-border' : 'border-light-border'}`}>
                  <input type="text" placeholder="Add item..." value={newItem[catIdx] || ''}
                    onChange={e => setNewItem({ ...newItem, [catIdx]: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && addItem(catIdx)}
                    className="flex-1 bg-transparent text-sm outline-none" />
                  <Button size="sm" variant="ghost" onClick={() => addItem(catIdx)} icon={<Plus size={14} />}>Add</Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
