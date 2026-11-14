import React, { useEffect, useState } from 'react';
import { X, QrCode, CheckCircle2, IndianRupee, MessageSquare, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createUpiUri, generateQrCodeDataUrl } from '../utils/upi';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

export default function UpiPaymentModal({ isOpen, onClose, member, settings, onConfirmPayment }) {
  if (!isOpen || !member) return null;

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendReceiptWhatsApp, setSendReceiptWhatsApp] = useState(true);

  const upiUri = createUpiUri({
    upiId: settings.upiId,
    payeeName: settings.gymName,
    amount: member.amount,
    transactionNote: `Renewal_${member.name.replace(/\s+/g, '')}`
  });

  useEffect(() => {
    let isMounted = true;
    generateQrCodeDataUrl(upiUri).then(url => {
      if (isMounted) {
        setQrCodeUrl(url);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [upiUri]);

  const handleConfirm = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }

    onConfirmPayment(member.id);

    if (sendReceiptWhatsApp) {
      const receiptMsg = generateWhatsAppMessage('payment_receipt', member, settings);
      openWhatsApp(member.phone, receiptMsg);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border-t sm:border border-slate-200/90 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl text-center max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Instant UPI Payment QR</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Details */}
        <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-left">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white">{member.name}</span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{Number(member.amount).toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{member.plan} • {member.phone}</p>
        </div>

        {/* QR Code Container */}
        <div className="my-4 p-3 rounded-2xl bg-white dark:bg-white inline-block shadow-sm border border-slate-200">
          {loading ? (
            <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
              Generating QR...
            </div>
          ) : (
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-48 h-48 mx-auto rounded-lg"
            />
          )}
        </div>

        {/* Supported Apps Badges */}
        <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <p className="font-medium">Scan & Pay with any UPI app:</p>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">GPay</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">PhonePe</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Paytm</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">BHIM</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-1">
            UPI ID: <span className="text-slate-800 dark:text-slate-200 font-bold">{settings.upiId}</span>
          </p>
        </div>

        {/* Send Receipt Option */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Send WhatsApp Receipt</span>
          </div>
          <input
            type="checkbox"
            checked={sendReceiptWhatsApp}
            onChange={(e) => setSendReceiptWhatsApp(e.target.checked)}
            className="w-4 h-4 accent-emerald-600 rounded cursor-pointer shrink-0"
          />
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
          
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark as Paid</span>
          </button>
        </div>

      </div>
    </div>
  );
}
