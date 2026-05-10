import { motion } from 'framer-motion';
import { Users, UserPlus, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const members = [
  { id: 1, name: 'Sarah Connor', role: 'Planner', avatar: '👩🏻' },
  { id: 2, name: 'John Doe', role: 'Editor', avatar: '👨🏼‍🦱' },
  { id: 3, name: 'Alex Smith', role: 'Viewer', avatar: '🧑🏽' },
];

export default function CollaborativeSidebar() {
  const { dark } = useTheme();

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <h3 className="font-outfit font-bold text-lg">Trip Members</h3>
        </div>
        <button className={`p-1.5 rounded-lg transition-colors ${dark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {members.map(member => (
          <div key={member.id} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${dark ? 'bg-dark-surface' : 'bg-light-surface'}`}>
              {member.avatar}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{member.name}</h4>
              <p className={`text-xs ${dark ? 'text-dark-muted' : 'text-light-muted'}`}>{member.role}</p>
            </div>
            {member.role !== 'Planner' && (
              <button className={`p-2 rounded-full transition-colors ${dark ? 'hover:bg-white/10 text-dark-muted' : 'hover:bg-black/5 text-light-muted'}`}>
                <MessageCircle size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={`pt-4 mt-4 border-t ${dark ? 'border-dark-border' : 'border-light-border'}`}>
        <Button variant="outline" className="w-full" icon={<UserPlus size={16} />}>
          Invite Friends
        </Button>
      </div>
    </Card>
  );
}
