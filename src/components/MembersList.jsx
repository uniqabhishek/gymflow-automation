import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MessageCircle, 
  QrCode, 
  RefreshCw, 
  Trash2, 
  Download, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Clock
} from 'lucide-react';
import { exportToCsv } from '../utils/storage';

export default function MembersList({
  members,
  onOpenWhatsApp,
  onOpenUpiModal,
  onOpenRenewModal,
  onDeleteMember,
  selectedStatusFilter,
  setSelectedStatusFilter
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('all');

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      if (selectedStatusFilter !== 'all' && m.status !== selectedStatusFilter) {
        return false;
      }
      if (selectedPlanFilter !== 'all' && !m.plan.toLowerCase().includes(selectedPlanFilter.toLowerCase())) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(query);
        const matchesPhone = m.phone.includes(query);
        const matchesPlan = m.plan.toLowerCase().includes(query);
        return matchesName || matchesPhone || matchesPlan;
      }
      return true;
    }).sort((a, b) => {
      if (a.status === 'expired' && b.status !== 'expired') return -1;
      if (b.status === 'expired' && a.status !== 'expired') return 1;
      if (a.status === 'expiring' && b.status === 'active') return -1;
      if (b.status === 'expiring' && a.status === 'active') return 1;
      return new Date(a.expiryDate) - new Date(b.expiryDate);
    });
  }, [members, selectedStatusFilter, selectedPlanFilter, searchQuery]);

  const getRelativeExpiryLabel = (expiryDate) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const exp = new Date(expiryDate);
    exp.setHours(0,0,0,0);
    const diff = Math.round((exp - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) {
      return { text: `Expired ${Math.abs(diff)}d ago`, color: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900' };
    }
    if (diff === 0) {
      return { text: 'Expires TODAY', color: 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 border-amber-300 dark:border-amber-700 font-bold' };
    }
    if (diff === 1) {
      return { text: 'Expires Tomorrow', color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900' };
    }
    if (diff <= 3) {
      return { text: `Expires in ${diff}d`, color: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900' };
    }
    return { text: `Valid for ${diff}d`, color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900' };
  };

  const activeCount = members.filter(m => m.status === 'active').length;
  const expiringCount = members.filter(m => m.status === 'expiring').length;
  const expiredCount = members.filter(m => m.status === 'expired').length;

  return (
    <div className="space-y-3.5 sm:space-y-4">
      
      {/* Controls Bar (Search + Plan Filter + Export) */}
      <div className="flex flex-col gap-2.5 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, plan..."
            className="w-full pl-10 pr-12 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-950 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer px-1 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters & Export */}
        <div className="flex items-center justify-between gap-2">
          
          {/* Plan Filter Dropdown */}
          <select
            value={selectedPlanFilter}
            onChange={(e) => setSelectedPlanFilter(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
          >
            <option value="all">All Membership Plans</option>
            <option value="monthly">Monthly (1 Month)</option>
            <option value="quarterly">Quarterly (3 Months)</option>
            <option value="half-yearly">Half-Yearly (6 Months)</option>
            <option value="annual">Annual (1 Year)</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={() => exportToCsv(members)}
            title="Download CSV"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden xs:inline">Export</span> CSV
          </button>
        </div>

      </div>

      {/* Filter Tabs (Horizontal Scrollable Pills) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedStatusFilter('all')}
          className={`px-3 py-1.5 font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
            selectedStatusFilter === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800'
          }`}
        >
          <span>All</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            {members.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedStatusFilter('expiring')}
          className={`px-3 py-1.5 font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
            selectedStatusFilter === 'expiring'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60'
          }`}
        >
          <span>Expiring</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
            {expiringCount}
          </span>
        </button>

        <button
          onClick={() => setSelectedStatusFilter('expired')}
          className={`px-3 py-1.5 font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
            selectedStatusFilter === 'expired'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60'
          }`}
        >
          <span>Expired</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300">
            {expiredCount}
          </span>
        </button>

        <button
          onClick={() => setSelectedStatusFilter('active')}
          className={`px-3 py-1.5 font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
            selectedStatusFilter === 'active'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60'
          }`}
        >
          <span>Active</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
            {activeCount}
          </span>
        </button>
      </div>

      {/* MOBILE VIEW: Touch-Friendly Native Cards (< md screens) */}
      <div className="block md:hidden space-y-3">
        {filteredMembers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400">
            <Clock className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No members found</p>
            <p className="text-xs text-slate-500 mt-0.5">Try resetting filters or search query.</p>
          </div>
        ) : (
          filteredMembers.map((member) => {
            const relative = getRelativeExpiryLabel(member.expiryDate);

            return (
              <div 
                key={member.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3 transition-all"
              >
                {/* Card Header: Avatar + Name + Relative Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm shrink-0 ${member.avatarColor || 'bg-emerald-600'}`}>
                      {member.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight truncate">
                        {member.name}
                      </h4>
                      <a 
                        href={`tel:${member.phone}`}
                        className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 mt-0.5"
                      >
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{member.phone}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] border font-bold ${relative.color}`}>
                      {member.status === 'expired' && <AlertCircle className="w-3 h-3 shrink-0" />}
                      {member.status === 'expiring' && <Clock className="w-3 h-3 shrink-0" />}
                      {member.status === 'active' && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                      <span>{relative.text}</span>
                    </span>

                    <button
                      onClick={() => onDeleteMember(member.id)}
                      title="Remove Member"
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Plan Details & Dates Grid */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Plan & Fee</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{member.plan}</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-xs">
                      ₹{Number(member.amount).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Valid Until</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">
                      {member.expiryDate ? new Date(member.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Joined: {member.joinDate ? new Date(member.joinDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '-'}
                    </span>
                  </div>
                </div>

                {/* Native Touch Actions (Full-width buttons on mobile) */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  
                  {/* 1-Click WhatsApp Reminder */}
                  <button
                    onClick={() => onOpenWhatsApp(member)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span>WhatsApp</span>
                  </button>

                  {/* UPI QR Code */}
                  <button
                    onClick={() => onOpenUpiModal(member)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>QR Pay</span>
                  </button>

                  {/* Renew */}
                  <button
                    onClick={() => onOpenRenewModal(member)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-bold border border-purple-200 dark:border-purple-800 transition-all active:scale-95 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 shrink-0" />
                    <span>Renew</span>
                  </button>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* DESKTOP VIEW: Data Table (>= md screens) */}
      <div className="hidden md:block bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Clock className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">No members match your filter</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting search keywords or changing filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-950/50">
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">Plan & Fee</th>
                  <th className="py-3.5 px-4">Join Date</th>
                  <th className="py-3.5 px-4">Expiry Date</th>
                  <th className="py-3.5 px-4">Status & Validity</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {filteredMembers.map((member) => {
                  const relative = getRelativeExpiryLabel(member.expiryDate);
                  
                  return (
                    <tr 
                      key={member.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm ${member.avatarColor || 'bg-emerald-600'}`}>
                            {member.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">
                              {member.name}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              <span className="flex items-center gap-0.5">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {member.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                            {member.plan}
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                            ₹{Number(member.amount).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {member.joinDate ? new Date(member.joinDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {member.expiryDate ? new Date(member.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border font-semibold ${relative.color}`}>
                          {member.status === 'expired' && <AlertCircle className="w-3.5 h-3.5" />}
                          {member.status === 'expiring' && <Clock className="w-3.5 h-3.5" />}
                          {member.status === 'active' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {relative.text}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenWhatsApp(member)}
                            title="Send WhatsApp Reminder / Welcome"
                            className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold px-2.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp</span>
                          </button>

                          <button
                            onClick={() => onOpenUpiModal(member)}
                            title="Generate UPI Payment QR Code"
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onOpenRenewModal(member)}
                            title="Extend / Renew Membership"
                            className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 transition-all cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onDeleteMember(member.id)}
                            title="Delete Member"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
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
