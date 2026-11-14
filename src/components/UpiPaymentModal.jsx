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
    // Fire confetti celebration
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-black text-white">Instant UPI Payment QR</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Details */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-left">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-100">{member.name}</span>
            <span className="text-base font-black text-cyan-400">
              ₹{Number(member.amount).toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{member.plan} • {member.phone}</p>
        </div>

        {/* QR Code Container */}
        <div className="my-5 p-4 rounded-3xl bg-white mx-auto inline-block shadow-xl shadow-cyan-500/10 border-4 border-cyan-500/30">
          {loading ? (
            <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-xs">
              Generating UPI QR...
            </div>
          ) : (
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-56 h-56 mx-auto rounded-xl"
            />
          )}
        </div>

        {/* Supported Apps Badges */}
        <div className="text-[11px] text-slate-400 space-y-1">
          <p className="font-medium text-slate-300">
            Scan & Pay with any UPI App:
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-300">
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">GPay</span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">PhonePe</span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Paytm</span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">BHIM</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-2">
            UPI ID: <span className="text-cyan-400">{settings.upiId}</span>
          </p>
        </div>

        {/* Send Receipt Option */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">Send WhatsApp Receipt</span>
          </div>
          <input
            type="checkbox"
            checked={sendReceiptWhatsApp}
            onChange={(e) => setSendReceiptWhatsApp(e.target.checked)}
            className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
          
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark as Paid</span>
          </button>
        </div>

      </div>
    </div>
  );
}
