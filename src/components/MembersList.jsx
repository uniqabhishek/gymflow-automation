import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  QrCode, 
  RefreshCw, 
  Trash2, 
  Edit3, 
  Download, 
  Calendar, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { exportToCsv } from '../utils/storage';

export default function MembersList({
  members,
  onOpenWhatsApp,
  onOpenUpiModal,
  onOpenRenewModal,
  onEditMember,
  onDeleteMember,
  selectedStatusFilter,
  setSelectedStatusFilter
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('all');

  // Filter and search logic
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      // Status filter
      if (selectedStatusFilter !== 'all' && m.status !== selectedStatusFilter) {
        return false;
      }
      // Plan filter
      if (selectedPlanFilter !== 'all' && !m.plan.toLowerCase().includes(selectedPlanFilter.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(query);
        const matchesPhone = m.phone.includes(query);
        const matchesPlan = m.plan.toLowerCase().includes(query);
        return matchesName || matchesPhone || matchesPlan;
      }
      return true;
    }).sort((a, b) => {
      // Sort: Expiring / Expired first, then by expiry date ascending
      if (a.status === 'expired' && b.status !== 'expired') return -1;
      if (b.status === 'expired' && a.status !== 'expired') return 1;
      if (a.status === 'expiring' && b.status === 'active') return -1;
      if (b.status === 'expiring' && a.status === 'active') return 1;
      return new Date(a.expiryDate) - new Date(b.expiryDate);
    });
  }, [members, selectedStatusFilter, selectedPlanFilter, searchQuery]);

  // Relative expiry calculator
  const getRelativeExpiryLabel = (expiryDate) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const exp = new Date(expiryDate);
    exp.setHours(0,0,0,0);
    const diff = Math.round((exp - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) {
      return { text: `Expired ${Math.abs(diff)}d ago`, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
    }
    if (diff === 0) {
      return { text: 'Expires TODAY', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30 font-bold' };
    }
    if (diff === 1) {
      return { text: 'Expires Tomorrow', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    }
    if (diff <= 3) {
      return { text: `Expires in ${diff} days`, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    }
    return { text: `Valid for ${diff} days`, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
  };

  const activeCount = members.filter(m => m.status === 'active').length;
  const expiringCount = members.filter(m => m.status === 'expiring').length;
  const expiredCount = members.filter(m => m.status === 'expired').length;

  return (
    <div className="space-y-4">
      
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/60 p-3 sm:p-4 rounded-2xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member by name, phone, or plan..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters & Export */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          
          {/* Plan Filter Dropdown */}
          <select
            value={selectedPlanFilter}
            onChange={(e) => setSelectedPlanFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Plans</option>
            <option value="monthly">Monthly (1M)</option>
            <option value="quarterly">Quarterly (3M)</option>
            <option value="half-yearly">Half-Yearly (6M)</option>
            <option value="annual">Annual (1Y)</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={() => exportToCsv(members)}
            title="Download Member List as CSV (Google Sheets compatible)"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-xs font-medium border border-slate-700/60 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>

      </div>

      {/* Filter Tabs (All, Expiring Soon, Expired, Active) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedStatusFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            selectedStatusFilter === 'all'
              ? 'bg-slate-100 text-slate-950 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800/60 border border-slate-800'
          }`}
        >
          <span>All Members</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">
            {members.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedStatusFilter('expiring')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            selectedStatusFilter === 'expiring'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : 'bg-slate-900/60 text-amber-400 hover:bg-slate-800/60 border border-amber-500/20'
          }`}
        >
          <span>Expiring Soon</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400/20 text-amber-300">
            {expiringCount}
          </span>
        </button>

        <button
          onClick={() => setSelectedStatusFilter('expired')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            selectedStatusFilter === 'expired'
              ? 'bg-rose-500 text-white font-bold shadow-sm'
              : 'bg-slate-900/60 text-rose-400 hover:bg-slate-800/60 border border-rose-500/20'
          }`}
        >
          <span>Expired</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-300">
            {expiredCount}
          </span>
        </button>

        <button
          onClick={() => setSelectedStatusFilter('active')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            selectedStatusFilter === 'active'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'bg-slate-900/60 text-emerald-400 hover:bg-slate-800/60 border border-emerald-500/20'
          }`}
        >
          <span>Active</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">
            {activeCount}
          </span>
        </button>
      </div>

      {/* Members Table / List */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Clock className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <p className="text-base font-semibold text-slate-300">No members match your filter</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting search keywords or changing filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950/50">
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">Plan & Fee</th>
                  <th className="py-3.5 px-4">Join Date</th>
                  <th className="py-3.5 px-4">Expiry Date</th>
                  <th className="py-3.5 px-4">Status & Validity</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredMembers.map((member) => {
                  const relative = getRelativeExpiryLabel(member.expiryDate);
                  
                  return (
                    <tr 
                      key={member.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Member Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-md ${member.avatarColor || 'bg-cyan-600'}`}>
                            {member.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors block">
                              {member.name}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                              <span className="flex items-center gap-0.5">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {member.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Plan & Amount */}
                      <td className="py-3 px-4">
                        <div>
                          <span className="font-medium text-slate-200 block">
                            {member.plan}
                          </span>
                          <span className="text-cyan-400 font-bold text-[11px]">
                            ₹{Number(member.amount).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </td>

                      {/* Join Date */}
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {member.joinDate ? new Date(member.joinDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                      </td>

                      {/* Expiry Date */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-medium text-slate-200">
                          {member.expiryDate ? new Date(member.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </div>
                      </td>

                      {/* Status & Relative Countdown */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border font-medium ${relative.color}`}>
                          {member.status === 'expired' && <AlertCircle className="w-3 h-3" />}
                          {member.status === 'expiring' && <Clock className="w-3 h-3" />}
                          {member.status === 'active' && <CheckCircle2 className="w-3 h-3" />}
                          {relative.text}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* 1-Click WhatsApp Reminder */}
                          <button
                            onClick={() => onOpenWhatsApp(member)}
                            title="Send WhatsApp Reminder / Welcome"
                            className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold px-2.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </button>

                          {/* UPI QR Payment */}
                          <button
                            onClick={() => onOpenUpiModal(member)}
                            title="Generate UPI Payment QR Code"
                            className="p-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Renew */}
                          <button
                            onClick={() => onOpenRenewModal(member)}
                            title="Extend / Renew Membership"
                            className="p-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 transition-all cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => onDeleteMember(member.id)}
                            title="Delete Member"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
