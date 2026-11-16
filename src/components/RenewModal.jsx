import React, { useState, useMemo } from 'react';
import { X, RefreshCw, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { membershipPlans } from '../data/initialMembers';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function RenewModal({ isOpen, onClose, member, settings, onRenewMember }) {
  const [selectedPlanId, setSelectedPlanId] = useState('3m');
  const [customAmount, setCustomAmount] = useState(4000);
  const [sendReceiptWhatsApp, setSendReceiptWhatsApp] = useState(true);

  const selectedPlan = useMemo(() => {
    return membershipPlans.find(p => p.id === selectedPlanId) || membershipPlans[1];
  }, [selectedPlanId]);

  const newExpiryDate = useMemo(() => {
    if (!member) return '';
    const today = new Date();
    today.setHours(0,0,0,0);
    const currentExp = new Date(member.expiryDate);
    currentExp.setHours(0,0,0,0);

    const baseDate = currentExp > today ? currentExp : today;
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() + (selectedPlan?.durationMonths || 1));
    return newDate.toISOString().split('T')[0];
  }, [member, selectedPlan]);

  if (!isOpen || !member) return null;

  const handlePlanSelect = (plan) => {
    setSelectedPlanId(plan.id);
    setCustomAmount(plan.amount);
  };

  const handleRenewSubmit = (e) => {
    e.preventDefault();

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overscroll-contain">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border-t sm:border border-slate-200/90 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 pb-8 sm:pb-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-800">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Renew Membership Plan</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Extends validity & updates member status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Banner */}
        <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white block">{member.name}</span>
            <span className="text-xs text-slate-500">Plan: {member.plan}</span>
          </div>
          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${
            member.status === 'expired' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
          }`}>
            {member.status.toUpperCase()}
          </span>
        </div>

        {/* Plan Selection */}
        <form onSubmit={handleRenewSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
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
                        ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-900 dark:text-purple-300 font-bold'
                        : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs block">{plan.name}</span>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-0.5 block">
                      ₹{plan.amount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* New Expiry & Fee */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[11px] text-slate-500 block">New Expiry Date:</span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {newExpiryDate ? new Date(newExpiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block">Renewal Fee:</span>
              <div className="flex items-center text-sm font-extrabold text-slate-900 dark:text-white">
                <span>₹</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-20 bg-transparent border-b border-slate-300 dark:border-slate-700 font-bold focus:outline-none ml-1"
                />
              </div>
            </div>
          </div>

          {/* Send Receipt */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Send WhatsApp Confirmation</span>
            </div>
            <input
              type="checkbox"
              checked={sendReceiptWhatsApp}
              onChange={(e) => setSendReceiptWhatsApp(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded cursor-pointer shrink-0"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer"
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
