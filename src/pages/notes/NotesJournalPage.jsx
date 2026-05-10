import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { journalNotes as initialNotes } from '../../data/mockData';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function NotesJournalPage() {
  const { dark } = useTheme();
  const [notes, setNotes] = useState(initialNotes);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const startEdit = (note) => { setEditing(note.id); setEditText(note.content); };
  const saveEdit = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, content: editText } : n));
    setEditing(null);
  };
  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-outfit text-3xl font-bold">Travel Journal</h1>
              <p className={`mt-1 ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>Your memories, one day at a time</p>
            </div>
            <Button icon={<Plus size={16} />}>New Note</Button>
          </div>

          <div className="space-y-6">
            {notes.map((note, i) => (
              <motion.div key={note.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex flex-col items-center justify-center text-white shrink-0">
                        <span className="text-[10px] opacity-80">DAY</span>
                        <span className="font-outfit font-bold leading-none">{note.day}</span>
                      </div>
                      <div>
                        <h3 className="font-outfit font-bold">{note.title} {note.mood}</h3>
                        <p className={`text-sm ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{note.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {editing === note.id ? (
                        <>
                          <button onClick={() => saveEdit(note.id)} className="p-2 rounded-lg hover:bg-primary/10 text-primary cursor-pointer"><Save size={16} /></button>
                          <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-black/5 cursor-pointer"><X size={16} /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(note)} className={`p-2 rounded-lg cursor-pointer ${dark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}><Pencil size={16} /></button>
                          <button onClick={() => deleteNote(note.id)} className="p-2 rounded-lg hover:bg-danger/10 text-danger/50 hover:text-danger cursor-pointer"><Trash2 size={16} /></button>
                        </>
                      )}
                    </div>
                  </div>
                  {editing === note.id ? (
                    <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={5}
                      className={`w-full rounded-xl px-4 py-3 text-sm outline-none resize-none ${dark ? 'bg-dark-surface border border-dark-border text-dark-text' : 'bg-light-surface border border-light-border'} focus:ring-2 focus:ring-primary/20`} />
                  ) : (
                    <p className={`text-sm leading-relaxed ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{note.content}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
