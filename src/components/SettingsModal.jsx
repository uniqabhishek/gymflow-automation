import React, { useState, useEffect } from 'react';
import { X, Settings, Save, RotateCcw, Building2, User, Phone, QrCode, Globe, MessageCircle } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, settings, onSaveSettings, onResetData }) {
  const [formData, setFormData] = useState({ ...settings });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    onClose();
  };

  const handleReset = () => {
    if (confirm("Reset member database back to default sample members? Any custom members added will be replaced.")) {
      onResetData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border-t sm:border border-slate-200/90 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 pb-8 sm:pb-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <Settings className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Gym Configuration & Settings</h3>
              <p className="text-[11px] text-slate-500">Configure UPI, gym details & n8n webhook</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Developer & System Architect Card */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 dark:border-emerald-500/30 text-left">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                App Developer & Owner
              </span>
            </div>
            <a
              href="https://wa.me/919499268612?text=Hi%20Abhishek!%20I%20have%20a%20question%20about%20the%20GymFlow%20app%20setup."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition-all"
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              <span>WhatsApp Developer</span>
            </a>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Name:</span>
              <span className="font-extrabold text-slate-900 dark:text-white">Abhishek</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">WhatsApp (Only):</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">+91 9499268612</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-emerald-500/10">
              <span className="text-[10px] text-slate-400 block">Official UPI ID:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">9499268312@slc</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-4 space-y-3.5">
          
          {/* Gym Name */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Gym / Club Name
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.gymName || ''}
                onChange={(e) => handleChange('gymName', e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Owner Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Owner / Manager Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.ownerName || ''}
                  onChange={(e) => handleChange('ownerName', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Owner WhatsApp (Daily Reports)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={formData.ownerPhone || ''}
                  onChange={(e) => handleChange('ownerPhone', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* UPI ID */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Payment UPI ID (VPA)
            </label>
            <div className="relative">
              <QrCode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.upiId || ''}
                onChange={(e) => handleChange('upiId', e.target.value)}
                placeholder="e.g. 9499268312@slc"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-emerald-700 dark:text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Used to generate dynamic UPI QR codes and payment links</p>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Gym Location / Address
            </label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="e.g. Sector 18, Commercial Hub"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* n8n Webhook URL */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              n8n Cloud / Self-Hosted Webhook URL
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={formData.n8nWebhookUrl || ''}
                onChange={(e) => handleChange('n8nWebhookUrl', e.target.value)}
                placeholder="https://n8n.yourdomain.com/webhook/..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Reset Database Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Database to Default Samples</span>
            </button>
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
              type="submit"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer text-center"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
