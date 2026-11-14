import React, { useState } from 'react';
import { X, UserPlus, Calendar, Phone, Mail, IndianRupee, MessageCircle, Sparkles } from 'lucide-react';
import { membershipPlans } from '../data/initialMembers';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function AddMemberModal({ isOpen, onClose, onAddMember, settings }) {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const calculateExpiry = (startDate, months) => {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + Number(months));
    return d.toISOString().split('T')[0];
  };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('3m');
  const [joinDate, setJoinDate] = useState(todayStr);
  const [amount, setAmount] = useState(4000);
  const [notes, setNotes] = useState('');
  const [sendWelcomeWhatsApp, setSendWelcomeWhatsApp] = useState(true);

  const selectedPlan = membershipPlans.find(p => p.id === selectedPlanId) || membershipPlans[1];

  const handlePlanChange = (planId) => {
    setSelectedPlanId(planId);
    const plan = membershipPlans.find(p => p.id === planId);
    if (plan) {
      setAmount(plan.amount);
    }
  };

  const calculatedExpiryDate = calculateExpiry(joinDate, selectedPlan.durationMonths);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please provide member name and phone number.");
      return;
    }

    const avatarColors = [
      'bg-cyan-600', 'bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 
      'bg-rose-600', 'bg-amber-600', 'bg-indigo-600', 'bg-teal-600'
    ];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newMember = {
      id: `mem-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim().replace(/\D/g, ''),
      email: email.trim(),
      plan: selectedPlan.name,
      durationMonths: selectedPlan.durationMonths,
      amount: Number(amount),
      joinDate: joinDate,
      expiryDate: calculatedExpiryDate,
      status: 'active',
      paymentStatus: 'paid',
      lastReminderSent: null,
      notes: notes.trim(),
      avatarColor: randomColor
    };

    onAddMember(newMember);

    if (sendWelcomeWhatsApp) {
      const welcomeMsg = generateWhatsAppMessage('welcome', newMember, settings);
      openWhatsApp(newMember.phone, welcomeMsg);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Add New Gym Member</h3>
              <p className="text-xs text-slate-400">Auto-calculates expiry date and syncs to database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram Malhotra"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                WhatsApp Phone *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. vikram@example.com"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Membership Plan Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Select Membership Plan
            </label>
            <div className="grid grid-cols-2 gap-2">
              {membershipPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => handlePlanChange(plan.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500 text-white font-bold ring-1 ring-cyan-500/30'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{plan.name}</span>
                      {plan.popular && (
                        <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded-full font-bold">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-cyan-400 mt-1 block">
                      ₹{plan.amount.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates & Amount */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Join Date
              </label>
              <input
                type="date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Expiry (Auto)
              </label>
              <input
                type="date"
                readOnly
                value={calculatedExpiryDate}
                className="w-full px-2.5 py-1.5 bg-slate-950/80 border border-cyan-500/30 rounded-xl text-xs text-cyan-400 font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Fee (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Member Notes / Medical / Batch
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Morning 7 AM batch, locker #12"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Toggle Send Welcome WhatsApp */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <div>
                <span className="text-xs font-bold text-white block">Send Welcome WhatsApp Message</span>
                <span className="text-[11px] text-slate-400">Dispatches welcome note with gym timings & validity</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={sendWelcomeWhatsApp}
              onChange={(e) => setSendWelcomeWhatsApp(e.target.checked)}
              className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll Member</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
