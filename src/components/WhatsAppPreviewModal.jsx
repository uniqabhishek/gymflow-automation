import React, { useState } from 'react';
import { X, MessageCircle, Send, Copy, Check, Sparkles } from 'lucide-react';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function WhatsAppPreviewModal({ isOpen, onClose, member, settings, onMarkReminderSent }) {
  if (!isOpen || !member) return null;

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border-t sm:border border-slate-200/90 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">WhatsApp {member.name}</h3>
              <p className="text-xs text-slate-500">+{member.phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Selector Pills */}
        <div className="mt-3.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
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
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Message Content (Editable):
            </label>
            <button
              onClick={handleCopy}
              className="text-[11px] font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            rows={7}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed resize-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer text-center"
          >
            <Send className="w-4 h-4 fill-current" />
            <span>Open WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
}
