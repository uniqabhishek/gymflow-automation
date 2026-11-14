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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/15 via-cyan-500/10 to-transparent border border-blue-500/20 p-5 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Daily Morning Owner Briefing</h2>
              <p className="text-xs text-slate-300">
                Generated automatically each morning at 9:00 AM (as featured in the n8n automation reel).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Report'}</span>
            </button>

            <button
              onClick={handleSendToOwner}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Send to Owner WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Report Card (Left Column) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                Executive Morning Digest
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {settings.gymName}
              </h3>
              <p className="text-xs text-slate-400">
                Coach: {settings.ownerName} • Contact: {settings.ownerPhone}
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-xs text-slate-400 font-medium block">Active</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">
                  {activeMembers.length}
                </span>
                <span className="text-[10px] text-emerald-300/80">Valid access</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <span className="text-xs text-slate-400 font-medium block">Expiring</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">
                  {expiringMembers.length}
                </span>
                <span className="text-[10px] text-amber-300/80">Within 3d</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                <span className="text-xs text-slate-400 font-medium block">Expired</span>
                <span className="text-2xl font-black text-rose-400 mt-1 block">
                  {expiredMembers.length}
                </span>
                <span className="text-[10px] text-rose-300/80">Renew pending</span>
              </div>
            </div>

            {/* Financial Dues Highlight */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Total Recoverable Pending Fees</span>
                <div className="text-xl font-black text-cyan-400">
                  ₹{pendingDues.toLocaleString('en-IN')}
                </div>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {expiredMembers.length} Accounts
              </span>
            </div>

            {/* List of Expiring & Expired members */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Priority Action Queue Today:
              </h4>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {[...expiringMembers, ...expiredMembers].map(m => (
                  <div 
                    key={m.id}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-200 block">{m.name}</span>
                      <span className="text-[10px] text-slate-400">{m.plan} • {m.phone}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        m.status === 'expired' 
                          ? 'bg-rose-500/20 text-rose-400' 
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {m.status === 'expired' ? 'EXPIRED' : 'EXPIRING SOON'}
                      </span>
                      <span className="block text-[11px] font-bold text-slate-300 mt-0.5">
                        ₹{m.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* WhatsApp Plaintext Preview (Right Column) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Formatted WhatsApp Message Output
            </h3>
            <span className="text-[11px] text-cyan-400 font-mono">
              Ready to send to {settings.ownerPhone}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 shadow-2xl relative">
            <pre className="font-mono text-xs sm:text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed select-all">
              {reportText}
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
