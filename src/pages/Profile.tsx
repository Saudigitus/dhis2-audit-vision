import { useState } from 'react';
import { User, Mail, Shield, Clock, Key, Save } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@dhis2.org');

  return (
    <div className="max-w-3xl space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#0f172a]">Admin User</h2>
            <p className="text-sm text-[#64748b]">admin@dhis2.org</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs font-medium border border-[#3b82f6] text-[#3b82f6] rounded px-2.5 py-0.5 flex items-center gap-1">
                <Shield size={12} />
                Super Admin
              </span>
              <span className="flex items-center gap-1 text-xs text-[#22c55e]">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-2 mb-5">
          <User size={20} className="text-[#3b82f6]" />
          <h3 className="font-bold text-[15px] text-[#0f172a]">Personal Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Role</label>
            <input
              type="text"
              value="Super Admin"
              disabled
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm bg-[#f8fafc] text-[#64748b]"
            />
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Clock size={20} className="text-[#3b82f6]" />
          <h3 className="font-bold text-[15px] text-[#0f172a]">Activity Summary</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#f8fafc] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#0f172a]">127</div>
            <div className="text-xs text-[#64748b] mt-1">Total Changes</div>
          </div>
          <div className="bg-[#f8fafc] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#0f172a]">2 min ago</div>
            <div className="text-xs text-[#64748b] mt-1">Last Active</div>
          </div>
          <div className="bg-[#f8fafc] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#0f172a]">Jan 2024</div>
            <div className="text-xs text-[#64748b] mt-1">Member Since</div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Key size={20} className="text-[#3b82f6]" />
          <h3 className="font-bold text-[15px] text-[#0f172a]">Change Password</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-3 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-[#3b82f6] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2563eb] transition-colors cursor-pointer">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
