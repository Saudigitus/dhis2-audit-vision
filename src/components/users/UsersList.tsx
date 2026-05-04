import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { User } from '../../types/users/users';
import UserCard from './UserCard';

interface UsersListProps {
  auditSummary: Record<string, number>;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  onSelectUser: (user: User) => void;
}

const UsersList: React.FC<UsersListProps> = ({ 
  auditSummary, 
  loading, 
  hasMore, 
  loadMore, 
  onSelectUser 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Processar, filtrar e ordenar utilizadores - diretamente do auditSummary
  const processedUsers = React.useMemo(() => {
    // Criar utilizadores a partir do auditSummary
    const auditUsers = Object.entries(auditSummary).map(([username, changes]) => ({
      name: username,
      username: username,
      initial: username.charAt(0).toUpperCase(),
      color: 'bg-[#3b82f6]',
      role: 'User',
      roleColor: 'text-[#3b82f6] border-[#93c5fd] bg-[#eff6ff]',
      status: 'Offline',
      lastActive: 'N/A',
      changes: changes,
      email: `${username}@dhis2.org`
    }));

    // Filtrar por busca
    const filteredUsers = auditUsers.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenar por changes decrescente
    return filteredUsers.sort((a, b) => b.changes - a.changes);
  }, [auditSummary, searchTerm]);

  return (
    <div className="pt-6 border-t border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-bold text-[#0f172a]">All System Users</h3>
        <div className="relative w-full md:w-72">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            />
          </div>
          
          {/* Dropdown */}
          {showDropdown && (
            <>
              {/* Backdrop to close dropdown when clicking outside */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDropdown(false)}
              />
              
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e2e8f0] rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                {Object.keys(auditSummary).length > 0 ? (
                  Object.entries(auditSummary)
                    .filter(([username]) => 
                      username.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .sort(([, a], [, b]) => b - a)
                    .map(([username, changes]) => (
                      <div
                        key={username}
                        onClick={() => {
                          setSearchTerm(username);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2.5 cursor-pointer hover:bg-[#f8fafc] flex items-center justify-between"
                      >
                        <span className="text-sm text-[#0f172a]">{username}</span>
                        <span className="text-xs font-semibold text-[#64748b]">{changes} changes</span>
                      </div>
                    ))
                ) : (
                  <div className="px-4 py-4 text-center text-sm text-[#64748b]">
                    {loading ? 'Loading users...' : 'No users found'}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {processedUsers.length > 0 ? (
          processedUsers.map((user, i) => (
            <UserCard 
              key={i} 
              user={user} 
              onClick={onSelectUser} 
              loadingChanges={loading}
            />
          ))
        ) : loading ? (
          <div className="col-span-3 py-10 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6]"></div>
          </div>
        ) : (
          <div className="col-span-3 py-10 text-center text-[#64748b]">
            No users found matching your search.
          </div>
        )}
      </div>
      
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2.5 bg-white border border-[#e2e8f0] text-[#3b82f6] font-bold rounded-xl hover:bg-[#f8fafc] transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
            {!loading && <ChevronRight size={18} className="rotate-90" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;
