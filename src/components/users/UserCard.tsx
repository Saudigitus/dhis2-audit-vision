import React from 'react';
import { User } from '../../types/users/users';

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
  loadingChanges?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick, loadingChanges }) => {
  return (
    <div
      onClick={() => onClick(user)}
      className="bg-white rounded-xl border border-[#e2e8f0] p-3 xs:p-4 sm:p-5 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="relative shrink-0">
          <div className={`w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full ${user.color} flex items-center justify-center text-white text-sm xs:text-base sm:text-lg font-bold`}>
            {user.initial}
          </div>
          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-white ${user.status === 'Online' ? 'bg-[#22c55e]' : 'bg-[#94a3b8]'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-[#0f172a] truncate">{user.name}</div>
          <div className="text-xs text-[#64748b] truncate">{user.email}</div>
          <div className="flex flex-wrap items-center gap-1 xs:gap-1.5 sm:gap-2 mt-1 xs:mt-1.5">
            <span className={`text-[10px] font-semibold border rounded px-1 xs:px-1.5 sm:px-2 py-0.5 ${user.roleColor}`}>
              {user.role}
            </span>
            <span className="text-[10px] xs:text-[11px] text-[#94a3b8]">· {user.lastActive}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 xs:pt-3 border-t border-[#f1f5f9]">
        <span className="text-[11px] xs:text-xs text-[#64748b]">Changes</span>
        <span className="text-sm xs:text-base sm:text-lg font-bold text-[#0f172a]">
          {loadingChanges ? '...' : user.changes}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
