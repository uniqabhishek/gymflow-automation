import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function WhatsAppAutomationCenter({ members, settings }) {
  const [selectedTemplate, setSelectedTemplate] = useState('reminder_3days');
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const selectedMember = members.find(m => m.id === selectedMemberId) || members[0] || {
    name: "Rahul Sharma",
    plan: "Quarterly (3 Months)",
    amount: 4000,
    phone: "919876543210",
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  const previewMessage = generateWhatsAppMessage(selectedTemplate, selectedMember, settings);

  const templates = [
    {
      id: 'welcome',
      title: '🎉 Welcome & Onboarding',
      desc: 'Triggered when a new member joins. Includes gym timings, rules & membership validity.',
      tag: 'New Registration',
      color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
    },
    {
      id: 'reminder_3days',
      title: '🔔 3 Days Before Expiry',
      desc: 'Friendly automated reminder with 1-click UPI renewal link & QR.',
      tag: 'Auto-Trigger: Expiry - 3d',
      color: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
    },
    {
      id: 'reminder_urgent',
      title: '⚠️ 1 Day Before Expiry (Urgent)',
      desc: 'Urgent reminder warning of biometric / entry block if unpaid.',
      tag: 'Auto-Trigger: Expiry - 1d',
      color: 'border-orange-500/30 bg-orange-500/10 text-orange-400'
    },
    {
      id: 'expired',
      title: '❌ Expired Membership Alert',
      desc: 'Sent immediately when plan expires, offering discount & renewal link.',
      tag: 'Auto-Trigger: Day 0+',
      color: 'border-rose-500/30 bg-rose-500/10 text-rose-400'
    },
    {
      id: 'payment_receipt',
      title: '✅ Payment Confirmation Receipt',
      desc: 'Instant thank-you receipt with updated expiry date upon renewal.',
      tag: 'On Payment Success',
      color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-transparent border border-emerald-500/20 p-5 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">Automated WhatsApp Messaging Engine</h2>
            <p className="text-xs text-slate-300">
              Zero manual WhatsApp typing! Pre-configured templates with dynamic UPI payment links & instant member sync.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Templates Selection List (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Available Automation Templates
          </h3>
          
          <div className="space-y-2.5">
            {templates.map(tpl => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-100">{tpl.title}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${tpl.color}`}>
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {tpl.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Member Picker for Preview */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <label className="text-xs font-medium text-slate-300 block">
              Preview With Selected Member:
            </label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
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
              Live WhatsApp Chat Preview
            </h3>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              To: {selectedMember.phone}
            </span>
          </div>

          {/* WhatsApp UI Simulation Box */}
          <div className="rounded-3xl border border-slate-800 bg-[#0b141a] overflow-hidden shadow-2xl flex flex-col">
            
            {/* WhatsApp Top Bar */}
            <div className="bg-[#1f2c34] px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                  {selectedMember.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{selectedMember.name}</h4>
                  <span className="text-[10px] text-slate-400">online</span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                End-to-End Encrypted
              </span>
            </div>

            {/* Chat Body */}
            <div className="p-4 sm:p-6 bg-radial from-slate-950/40 to-[#0b141a] flex-1">
              <div className="max-w-md ml-auto bg-[#005c4b] text-slate-100 rounded-2xl rounded-tr-none p-4 shadow-md text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed border border-emerald-600/30">
                {previewMessage}
                <div className="text-right text-[10px] text-emerald-200/60 mt-2">
                  Just now ✓✓
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-[#1f2c34] p-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleSend}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp Web / App</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
