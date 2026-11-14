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
        <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-transparent border border-amber-300/60 dark:border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 animate-soft-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {pendingRemindersCount} Members Due for Renewal Action Today
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {expiringMembers.length} expiring within 3 days • {expiredMembers.length} expired & pending fee collection (₹{pendingDues.toLocaleString('en-IN')})
              </p>
            </div>
          </div>
          <button
            onClick={handleBatchReminders}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Send WhatsApp Reminders</span>
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Active Members */}
        <div 
          onClick={() => onFilterByStatus('active')}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Members</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeMembers.length}
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
              Valid
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Biometric access active</p>
        </div>

        {/* Expiring Soon */}
        <div 
          onClick={() => onFilterByStatus('expiring')}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Expiring Soon</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-800">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {expiringMembers.length}
            </span>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/60">
              ≤ 3 Days
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Ready for reminder</p>
        </div>

        {/* Expired Members */}
        <div 
          onClick={() => onFilterByStatus('expired')}
          className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Expired (Pending)</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-800">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight">
              {expiredMembers.length}
            </span>
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200/60 dark:border-rose-800/60">
              Overdue
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Renew pending</p>
        </div>

        {/* Revenue Collected */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Monthly Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ₹{totalCollectedRevenue.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> Auto-tracked
          </p>
        </div>

      </div>
    </div>
  );
}
