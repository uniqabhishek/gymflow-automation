import React, { useState } from 'react';
import { X, RefreshCw, Calendar, IndianRupee, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { membershipPlans } from '../data/initialMembers';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function RenewModal({ isOpen, onClose, member, settings, onRenewMember }) {
  if (!isOpen || !member) return null;

  const [selectedPlanId, setSelectedPlanId] = useState('3m');
  const [customAmount, setCustomAmount] = useState(4000);
  const [sendReceiptWhatsApp, setSendReceiptWhatsApp] = useState(true);

  const selectedPlan = membershipPlans.find(p => p.id === selectedPlanId) || membershipPlans[1];

  const handlePlanSelect = (plan) => {
    setSelectedPlanId(plan.id);
    setCustomAmount(plan.amount);
  };

  // Calculate new expiry date
  const computeNewExpiryDate = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const currentExp = new Date(member.expiryDate);
    currentExp.setHours(0,0,0,0);

    // If already expired, renew from today. If still active, extend from current expiry date!
    const baseDate = currentExp > today ? currentExp : today;
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() + selectedPlan.durationMonths);
    return newDate.toISOString().split('T')[0];
  };

  const newExpiryDate = computeNewExpiryDate();

  const handleRenewSubmit = (e) => {
    e.preventDefault();

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }

    const updatedMember = {
      ...member,
      plan: selectedPlan.name,
      durationMonths: selectedPlan.durationMonths,
      amount: Number(customAmount),
      expiryDate: newExpiryDate,
      status: 'active',
      paymentStatus: 'paid'
    };

    onRenewMember(updatedMember);

    if (sendReceiptWhatsApp) {
      const msg = generateWhatsAppMessage('payment_receipt', updatedMember, settings);
      openWhatsApp(updatedMember.phone, msg);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/20">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Renew Membership Plan</h3>
              <p className="text-xs text-slate-400">Extends validity & updates member status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Banner */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="font-bold text-sm text-slate-200 block">{member.name}</span>
            <span className="text-xs text-slate-400">Current Plan: {member.plan}</span>
          </div>
          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${
            member.status === 'expired' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
          }`}>
            {member.status.toUpperCase()}
          </span>
        </div>

        {/* Plan Selection */}
        <form onSubmit={handleRenewSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Select Extension Duration:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {membershipPlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => handlePlanSelect(plan)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-500/15 border-purple-500 text-white font-bold ring-1 ring-purple-500/30'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs block">{plan.name}</span>
                    <span className="text-xs font-bold text-purple-400 mt-0.5 block">
                      ₹{plan.amount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* New Expiry & Fee */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-950 border border-purple-500/20">
            <div>
              <span className="text-[11px] text-slate-400 block">New Expiry Date:</span>
              <span className="text-sm font-black text-emerald-400">
                {new Date(newExpiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block">Renewal Fee:</span>
              <div className="flex items-center text-sm font-black text-cyan-400">
                <span>₹</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-20 bg-transparent border-b border-cyan-500/50 text-cyan-400 font-bold focus:outline-none ml-1"
                />
              </div>
            </div>
          </div>

          {/* Send Receipt */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-300 font-medium">Send WhatsApp Confirmation</span>
            </div>
            <input
              type="checkbox"
              checked={sendReceiptWhatsApp}
              onChange={(e) => setSendReceiptWhatsApp(e.target.checked)}
              className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Renew & Extend</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
