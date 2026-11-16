import React, { useState, useMemo } from 'react';
import { X, UserPlus, MessageCircle } from 'lucide-react';
import { membershipPlans } from '../data/initialMembers';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function AddMemberModal({ isOpen, onClose, onAddMember, settings }) {
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('3m');
  const [joinDate, setJoinDate] = useState(todayStr);
  const [amount, setAmount] = useState(4000);
  const [notes, setNotes] = useState('');
  const [sendWelcomeWhatsApp, setSendWelcomeWhatsApp] = useState(true);

  const selectedPlan = useMemo(() => {
    return membershipPlans.find(p => p.id === selectedPlanId) || membershipPlans[1];
  }, [selectedPlanId]);

  const calculatedExpiryDate = useMemo(() => {
    const d = new Date(joinDate || todayStr);
    d.setMonth(d.getMonth() + Number(selectedPlan.durationMonths || 1));
    return d.toISOString().split('T')[0];
  }, [joinDate, selectedPlan, todayStr]);

  if (!isOpen) return null;

  const handlePlanChange = (planId) => {
    setSelectedPlanId(planId);
    const plan = membershipPlans.find(p => p.id === planId);
    if (plan) {
      setAmount(plan.amount);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please provide member name and phone number.");
      return;
    }

    const avatarColors = [
      'bg-emerald-600', 'bg-blue-600', 'bg-indigo-600', 'bg-purple-600', 
      'bg-rose-600', 'bg-amber-600', 'bg-teal-600'
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

    // Reset form
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border-t sm:border border-slate-200/90 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 pb-8 sm:pb-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <UserPlus className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Add New Gym Member</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Auto-calculates expiry date and syncs to database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram Malhotra"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                WhatsApp Phone *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. vikram@example.com"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Membership Plan Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
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
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                        : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{plan.name}</span>
                      {plan.popular && (
                        <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.2 rounded-full font-bold">
                          HOT
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                      ₹{plan.amount.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates & Amount */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Join Date
              </label>
              <input
                type="date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                className="w-full px-2 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Expiry (Auto)
              </label>
              <input
                type="date"
                readOnly
                value={calculatedExpiryDate}
                className="w-full px-2 py-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-400 font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Fee (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-2 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Member Notes / Batch
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Morning 7 AM batch, locker #12"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Toggle Send Welcome WhatsApp */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Send Welcome WhatsApp Note</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Sends welcome message with gym timings & validity</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={sendWelcomeWhatsApp}
              onChange={(e) => setSendWelcomeWhatsApp(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer shrink-0"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-200 dark:border-slate-800">
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
              <UserPlus className="w-4 h-4" />
              <span>Enroll Member</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
