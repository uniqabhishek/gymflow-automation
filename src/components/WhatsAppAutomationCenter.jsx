import React, { useState, useMemo } from 'react';
import { 
  Send, 
  Copy, 
  Bot
} from 'lucide-react';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function WhatsAppAutomationCenter({ members, settings }) {
  const [selectedTemplate, setSelectedTemplate] = useState('reminder_3days');
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const fallbackMember = useMemo(() => ({
    name: "Rahul Sharma",
    plan: "Quarterly (3 Months)",
    amount: 4000,
    phone: "919499268612",
    expiryDate: "2026-11-20"
  }), []);

  const selectedMember = useMemo(() => {
    return members.find(m => m.id === selectedMemberId) || members[0] || fallbackMember;
  }, [members, selectedMemberId, fallbackMember]);

  const previewMessage = useMemo(() => {
    return generateWhatsAppMessage(selectedTemplate, selectedMember, settings);
  }, [selectedTemplate, selectedMember, settings]);

  const templates = [
    {
      id: 'welcome',
      title: '🎉 Welcome & Onboarding',
      desc: 'Triggered when a new member joins. Includes gym timings, rules & membership validity.',
      tag: 'New Registration',
      color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
    },
    {
      id: 'reminder_3days',
      title: '🔔 3 Days Before Expiry',
      desc: 'Friendly automated reminder with 1-click UPI renewal link & QR.',
      tag: 'Auto-Trigger: Expiry - 3d',
      color: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
    },
    {
      id: 'reminder_urgent',
      title: '⚠️ 1 Day Before Expiry (Urgent)',
      desc: 'Urgent reminder warning of biometric / entry block if unpaid.',
      tag: 'Auto-Trigger: Expiry - 1d',
      color: 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400'
    },
    {
      id: 'expired',
      title: '❌ Expired Membership Alert',
      desc: 'Sent immediately when plan expires, offering discount & renewal link.',
      tag: 'Auto-Trigger: Day 0+',
      color: 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
    },
    {
      id: 'payment_receipt',
      title: '✅ Payment Confirmation Receipt',
      desc: 'Instant thank-you receipt with updated expiry date upon renewal.',
      tag: 'On Payment Success',
      color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(previewMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    openWhatsApp(selectedMember.phone, previewMessage);
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Automated WhatsApp Messaging Engine</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zero manual typing. Pre-configured templates with dynamic UPI payment links & instant member sync.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Templates Selection List (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Available Message Templates
          </h3>
          
          <div className="space-y-2">
            {templates.map(tpl => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{tpl.title}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${tpl.color}`}>
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {tpl.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Member Picker for Preview */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Preview With Selected Member:
            </label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {members.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.plan} - {m.status.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Message Preview (Right Column) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live WhatsApp Simulation
            </h3>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              To: {selectedMember.phone}
            </span>
          </div>

          {/* WhatsApp UI Simulation Box */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#efeae2] dark:bg-[#0b141a] overflow-hidden shadow-sm flex flex-col">
            
            {/* WhatsApp Top Bar */}
            <div className="bg-[#008069] dark:bg-[#1f2c34] px-4 py-3 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-xs">
                  {selectedMember.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{selectedMember.name}</h4>
                  <span className="text-[10px] text-white/80">online</span>
                </div>
              </div>
              <span className="text-[10px] text-white bg-white/10 px-2 py-0.5 rounded-full">
                End-to-End Encrypted
              </span>
            </div>

            {/* Chat Body */}
            <div className="p-4 sm:p-5 flex-1 min-h-[220px]">
              <div className="max-w-md ml-auto bg-white dark:bg-[#005c4b] text-slate-900 dark:text-slate-100 rounded-2xl rounded-tr-none p-3.5 shadow-sm text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed border border-slate-200/50 dark:border-emerald-600/30">
                {previewMessage}
                <div className="text-right text-[10px] text-slate-400 dark:text-emerald-200/60 mt-2">
                  Just now ✓✓
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-white dark:bg-[#1f2c34] p-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2.5">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleSend}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all transform active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
