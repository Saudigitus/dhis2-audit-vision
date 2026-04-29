import React from 'react';
import { User } from '../../types/users/users';

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div
      onClick={() => onClick(user)}
      className="bg-white rounded-xl border border-[#e2e8f0] p-5 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className={`w-12 h-12 rounded-full ${user.color} flex items-center justify-center text-white text-lg font-bold`}>
            {user.initial}
          </div>
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${user.status === 'Online' ? 'bg-[#22c55e]' : 'bg-[#94a3b8]'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-[#0f172a]">{user.name}</div>
          <div className="text-xs text-[#64748b]">{user.email}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`text-[10px] font-semibold border rounded px-2 py-0.5 ${user.roleColor}`}>
              {user.role}
            </span>
            <span className="text-[11px] text-[#94a3b8]">· {user.lastActive}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
        <span className="text-xs text-[#64748b]">Changes</span>
        <span className="text-lg font-bold text-[#0f172a]">{user.changes}</span>
      </div>
    </div>
  );
};

export default UserCard;
