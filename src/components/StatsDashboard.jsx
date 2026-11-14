import React from 'react';
import { Users, Clock, AlertTriangle, IndianRupee, MessageCircle, Send, CheckCircle, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function StatsDashboard({ members, settings, onFilterByStatus }) {
  const activeMembers = members.filter(m => m.status === 'active');
  const expiringMembers = members.filter(m => m.status === 'expiring');
  const expiredMembers = members.filter(m => m.status === 'expired');

  const totalCollectedRevenue = members
    .filter(m => m.paymentStatus === 'paid')
    .reduce((sum, m) => sum + (Number(m.amount) || 0), 0);

  const pendingDues = expiredMembers
    .reduce((sum, m) => sum + (Number(m.amount) || 0), 0);

  const pendingRemindersCount = expiringMembers.length + expiredMembers.length;

  const handleBatchReminders = () => {
    const targets = [...expiringMembers, ...expiredMembers];
    if (targets.length === 0) {
      alert("No members currently require expiry reminders!");
      return;
    }
    
    // Trigger the first target and advise user
    const first = targets[0];
    const type = first.status === 'expired' ? 'expired' : 'reminder_3days';
    const msg = generateWhatsAppMessage(type, first, settings);
    openWhatsApp(first.phone, msg);

    if (targets.length > 1) {
      alert(`Opening WhatsApp for ${first.name}. There are ${targets.length - 1} more pending reminders. You can send each one directly from the Members Directory!`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner Alert for Expiring / Pending Members */}
      {pendingRemindersCount > 0 && (
        <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-transparent border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-200">
                {pendingRemindersCount} Members Require Renewal Action Today!
              </h3>
              <p className="text-xs text-slate-300">
                {expiringMembers.length} expiring within 3 days • {expiredMembers.length} expired & pending fee collection (₹{pendingDues.toLocaleString('en-IN')})
              </p>
            </div>
          </div>
          <button
            onClick={handleBatchReminders}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Launch WhatsApp Reminders</span>
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Active Members */}
        <div 
          onClick={() => onFilterByStatus('active')}
          className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 transition-all hover:bg-slate-800/40 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Members</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {activeMembers.length}
            </span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              ● Healthy
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Gym access active</p>
        </div>

        {/* Expiring Soon */}
        <div 
          onClick={() => onFilterByStatus('expiring')}
          className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition-all hover:bg-slate-800/40 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Expiring Soon</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
              {expiringMembers.length}
            </span>
            <span className="text-xs text-amber-300 font-medium">
              ≤ 3 Days
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Ready for reminder</p>
        </div>

        {/* Expired Members */}
        <div 
          onClick={() => onFilterByStatus('expired')}
          className="bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 rounded-2xl p-4 transition-all hover:bg-slate-800/40 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Expired (Pending)</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-400 tracking-tight">
              {expiredMembers.length}
            </span>
            <span className="text-xs text-rose-300 font-medium">
              Overdue
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Renew pending</p>
        </div>

        {/* Revenue Collected */}
        <div className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 transition-all hover:bg-slate-800/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Monthly Revenue</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ₹{totalCollectedRevenue.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> Auto-tracked
          </p>
        </div>

      </div>
    </div>
  );
}
