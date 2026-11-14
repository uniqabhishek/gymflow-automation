import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Copy, 
  Check, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  IndianRupee,
  Share2
} from 'lucide-react';
import { generateDailyOwnerReport, openWhatsApp } from '../utils/whatsapp';

export default function DailyReportView({ members, settings }) {
  const [copied, setCopied] = useState(false);

  const reportText = generateDailyOwnerReport(members, settings);

  const activeMembers = members.filter(m => m.status === 'active');
  const expiringMembers = members.filter(m => m.status === 'expiring');
  const expiredMembers = members.filter(m => m.status === 'expired');

  const pendingDues = expiredMembers.reduce((sum, m) => sum + (Number(m.amount) || 0), 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToOwner = () => {
    openWhatsApp(settings.ownerPhone, reportText);
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Daily Morning Owner Briefing</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generated automatically each morning at 9:00 AM (as featured in the n8n automation reel).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleSendToOwner}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Send to WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Visual Report Card (Left Column) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm">
            
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Executive Morning Digest
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                {settings.gymName}
              </h3>
              <p className="text-xs text-slate-500">
                Coach: {settings.ownerName} • Contact: {settings.ownerPhone}
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Active</span>
                <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                  {activeMembers.length}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Valid</span>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Expiring</span>
                <span className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 mt-0.5 block">
                  {expiringMembers.length}
                </span>
                <span className="text-[10px] text-amber-700 dark:text-amber-400">≤ 3 Days</span>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Expired</span>
                <span className="text-2xl font-extrabold text-rose-700 dark:text-rose-400 mt-0.5 block">
                  {expiredMembers.length}
                </span>
                <span className="text-[10px] text-rose-700 dark:text-rose-400">Pending</span>
              </div>
            </div>

            {/* Financial Dues Highlight */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Recoverable Pending Fees</span>
                <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                  ₹{pendingDues.toLocaleString('en-IN')}
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                {expiredMembers.length} Accounts
              </span>
            </div>

            {/* List of Expiring & Expired members */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Priority Action Queue Today:
              </h4>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {[...expiringMembers, ...expiredMembers].map(m => (
                  <div 
                    key={m.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{m.name}</span>
                      <span className="text-[10px] text-slate-500">{m.plan} • {m.phone}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        m.status === 'expired' 
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {m.status === 'expired' ? 'EXPIRED' : 'EXPIRING'}
                      </span>
                      <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                        ₹{m.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Formatted Text Box (Right Column) */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Formatted WhatsApp Message
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              To: {settings.ownerPhone}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm">
            <pre className="font-mono text-xs sm:text-sm text-slate-800 dark:text-emerald-400 whitespace-pre-wrap leading-relaxed select-all">
              {reportText}
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
