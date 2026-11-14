import React, { useState } from 'react';
import { X, MessageCircle, Send, Copy, Check, Sparkles } from 'lucide-react';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function WhatsAppPreviewModal({ isOpen, onClose, member, settings, onMarkReminderSent }) {
  if (!isOpen || !member) return null;

  // Pick default template based on member status
  const getDefaultTemplate = () => {
    if (member.status === 'expired') return 'expired';
    if (member.status === 'expiring') return 'reminder_3days';
    return 'welcome';
  };

  const [selectedTemplate, setSelectedTemplate] = useState(getDefaultTemplate());
  const [copied, setCopied] = useState(false);
  const [customText, setCustomText] = useState(generateWhatsAppMessage(getDefaultTemplate(), member, settings));

  const handleTemplateChange = (tplId) => {
    setSelectedTemplate(tplId);
    setCustomText(generateWhatsAppMessage(tplId, member, settings));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    openWhatsApp(member.phone, customText);
    if (onMarkReminderSent) {
      onMarkReminderSent(member.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Send WhatsApp to {member.name}</h3>
              <p className="text-xs text-slate-400">Phone: +{member.phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Selector Pills */}
        <div className="mt-4">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Choose Message Template:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'reminder_3days', label: '🔔 3d Reminder' },
              { id: 'reminder_urgent', label: '⚠️ Urgent 1d' },
              { id: 'expired', label: '❌ Expired Notice' },
              { id: 'welcome', label: '🎉 Welcome' },
              { id: 'payment_receipt', label: '✅ Receipt' },
            ].map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleTemplateChange(tpl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedTemplate === tpl.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Editable Box */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Message Content (Editable):
            </label>
            <button
              onClick={handleCopy}
              className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            rows={8}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-100 font-sans focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed resize-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4 fill-current" />
            <span>Send via WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
}
