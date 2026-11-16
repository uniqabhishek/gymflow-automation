import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Download, 
  Calculator, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function GymOwnerPitchDemo({ onSwitchToApp, settings }) {
  const [memberCount, setMemberCount] = useState(120);
  const [avgFee, setAvgFee] = useState(1500);
  const [dropoutRate, setDropoutRate] = useState(20);

  const [testGymName, setTestGymName] = useState("MuscleForge Fitness");
  const [testOwnerName, setTestOwnerName] = useState("Vikram");
  const [testOwnerPhone, setTestOwnerPhone] = useState("");
  const [testSent, setTestSent] = useState(false);

  const monthlyLeakedMembers = Math.round(memberCount * (dropoutRate / 100));
  const monthlyLeakedRevenue = monthlyLeakedMembers * avgFee;
  const yearlyLeakedRevenue = monthlyLeakedRevenue * 12;

  const monthlyRecovered = Math.round(monthlyLeakedRevenue * 0.8);
  const yearlyRecovered = monthlyRecovered * 12;

  const setupFee = 12000;
  const paybackDays = Math.max(1, Math.round((setupFee / monthlyRecovered) * 30));

  const developerName = settings?.developerName || "Abhishek";
  const developerWhatsApp = "919499268612";
  const developerUpi = settings?.upiId || "9499268312@slc";

  const handleSendTestToOwner = (e) => {
    e.preventDefault();
    if (!testOwnerPhone.trim()) {
      alert("Please enter a WhatsApp phone number to test.");
      return;
    }

    const testMessage = 
`🔔 *[LIVE DEMO] ${testGymName} - Membership Alert* 💪

Namaste *${testOwnerName}*! 👋
This is a live demonstration of your gym's automated reminder system.

📋 *Plan:* Quarterly (3 Months)
📅 *Status:* Expiring in 3 Days!
💰 *Renewal Fee:* ₹${avgFee * 3}

💳 *Instant UPI Renewal Link:*
upi://pay?pa=${encodeURIComponent(developerUpi)}&pn=${encodeURIComponent(testGymName)}&am=${avgFee * 3}&tn=Demo_Renewal

⚡ *Why this works:*
1. 98% of members open WhatsApp within 5 minutes.
2. 1-click UPI payment eliminates excuses.
3. Your staff saves 2+ hours daily.

Let's automate your gym today! Contact ${developerName} (WhatsApp Only: +91 9499268612). 🚀`;

    openWhatsApp(testOwnerPhone, testMessage);
    setTestSent(true);
    setTimeout(() => setTestSent(false), 5000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 py-2">
      
      {/* Hero Pitch Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Gym Automation Agency Solution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Stop Losing <span className="text-emerald-600 dark:text-emerald-400">₹30,000+ Every Month</span> to Forgotten Gym Renewals.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Members don't quit because they want to — they leave because nobody reminded them on time with an instant UPI payment link. 
            <strong className="text-slate-900 dark:text-white"> GymFlow automates 100% of expiry tracking, WhatsApp reminder links, and morning owner briefings.</strong>
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onSwitchToApp}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Explore Live Gym Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${developerWhatsApp}?text=${encodeURIComponent("Hi Abhishek! I want to get the GymFlow WhatsApp automation setup installed for my gym.")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold shadow-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current text-emerald-400 dark:text-emerald-600" />
              <span>Book Setup on WhatsApp (Only)</span>
            </a>

            <a
              href="https://github.com/uniqabhishek/gymflow-automation/releases/download/v1.0.2/GymFlow-Demo-v1.0.2.apk"
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Download Android APK v1.0.2</span>
            </a>
          </div>

          {/* Developer Contact Verified Badge */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Developer & Owner: <strong className="text-slate-800 dark:text-slate-200">{developerName}</strong>
            </span>
            <span className="flex items-center gap-1 font-mono">
              WhatsApp: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">+91 9499268612</strong> (WhatsApp Only)
            </span>
            <span className="flex items-center gap-1 font-mono">
              UPI: <strong className="text-slate-700 dark:text-slate-300">{developerUpi}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Live WhatsApp Demo on Owner's Phone */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Try It Live on YOUR Phone Right Now
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter your details to receive a live personalized sample reminder on your own WhatsApp:
            </p>
          </div>
        </div>

        <form onSubmit={handleSendTestToOwner} className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Your Gym's Name
            </label>
            <input
              type="text"
              required
              value={testGymName}
              onChange={(e) => setTestGymName(e.target.value)}
              placeholder="e.g. Iron Clad Gym"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Owner / Your Name
            </label>
            <input
              type="text"
              required
              value={testOwnerName}
              onChange={(e) => setTestOwnerName(e.target.value)}
              placeholder="e.g. Vikram"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Your WhatsApp Number
            </label>
            <input
              type="tel"
              required
              value={testOwnerPhone}
              onChange={(e) => setTestOwnerPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>{testSent ? 'Opened WhatsApp!' : 'Send Live Demo to Me'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Revenue Leakage & ROI Calculator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Gym Revenue Leakage & ROI Calculator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calculate how much revenue is slipping through the cracks each month:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Slider 1: Total Members */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Total Active Members in Your Gym:
                </span>
                <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-0.5 rounded-lg border border-emerald-200/80 dark:border-emerald-800">
                  {memberCount} Members
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="600"
                step="10"
                value={memberCount}
                onChange={(e) => setMemberCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>30 (Studio)</span>
                <span>300 (Mid-Sized)</span>
                <span>600+ (Large Club)</span>
              </div>
            </div>

            {/* Slider 2: Monthly Fee */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Average Monthly Fee:
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  ₹{avgFee.toLocaleString('en-IN')} / mo
                </span>
              </div>
              <input
                type="range"
                min="800"
                max="5000"
                step="100"
                value={avgFee}
                onChange={(e) => setAvgFee(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹800 (Budget)</span>
                <span>₹2,000 (Standard)</span>
                <span>₹5,000 (CrossFit/Premium)</span>
              </div>
            </div>

            {/* Slider 3: Dropout Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Members Delaying / Forgetting Renewal:
                </span>
                <span className="text-base font-extrabold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-0.5 rounded-lg border border-rose-200/80 dark:border-rose-800">
                  {dropoutRate}% Delayed
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={dropoutRate}
                onChange={(e) => setDropoutRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10% (Low)</span>
                <span>20% (Industry Average)</span>
                <span>40% (High Dropout)</span>
              </div>
            </div>

          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
              Estimated Monthly Revenue Leak
            </span>

            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">Current Monthly Loss:</span>
              <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
                -₹{monthlyLeakedRevenue.toLocaleString('en-IN')}
                <span className="text-xs text-slate-500 font-normal ml-1">/ month</span>
              </div>
              <span className="text-[11px] text-slate-500">
                (₹{yearlyLeakedRevenue.toLocaleString('en-IN')} uncollected every year)
              </span>
            </div>

            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">Recovered with GymFlow (80% Recovery):</span>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                +₹{monthlyRecovered.toLocaleString('en-IN')}
                <span className="text-xs text-slate-500 font-normal ml-1">/ month</span>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                +₹{yearlyRecovered.toLocaleString('en-IN')} back into your gym account
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium block">
                GymFlow One-Time Setup (₹12,000)
              </span>
              <span className="text-lg font-black text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                Pays for itself in {paybackDays} DAYS! 🚀
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Zero monthly software subscription fees forever.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Comparison Matrix: Traditional Software vs GymFlow */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Why Gym Owners Prefer GymFlow Over Heavy Software
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare expensive SaaS subscription software with your custom GymFlow automation:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Feature / Aspect</th>
                <th className="py-3 px-4 text-rose-600">Traditional Software</th>
                <th className="py-3 px-4 text-slate-500">Pen & Register / Excel</th>
                <th className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40">GymFlow Automation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Monthly Cost</td>
                <td className="py-3 px-4 text-rose-600">₹1,500 – ₹3,000 / month forever</td>
                <td className="py-3 px-4 text-slate-500">₹0 (Free)</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20">₹0 Monthly (One-Time Setup Fee)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Renewal Reminders</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Generic SMS (90% ignored)</td>
                <td className="py-3 px-4 text-rose-600">Manual calls or completely forgotten</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20">Automated WhatsApp (98% Open Rate)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Instant UPI QR Link</td>
                <td className="py-3 px-4 text-rose-600">2-3% payment gateway cut</td>
                <td className="py-3 px-4 text-slate-500">Cash or manual counter QR</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20">Direct 0% UPI QR Links (GPay/PhonePe)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Daily Owner Briefing</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Must open heavy desktop app</td>
                <td className="py-3 px-4 text-rose-600">Count register pages manually</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20">Sent to Owner WhatsApp at 9 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Package Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            What's Included in the Turnkey Setup (₹12,000–₹15,000)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Everything your gym needs to go 100% automated within 48 hours:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Branded Web & Mobile App",
              desc: "Personalized with your gym's logo, colors, address, and membership tiers."
            },
            {
              title: "Automated WhatsApp Bot",
              desc: "Sends Welcome, 3-day reminder, 1-day urgent notice, and payment receipts automatically."
            },
            {
              title: "Direct UPI QR Code Engine",
              desc: "Links directly to your gym's bank account with 0% gateway commission."
            },
            {
              title: "Cloud Database / Google Sheets",
              desc: "Live synchronized database accessible from any phone or computer securely."
            },
            {
              title: "Daily 9:00 AM WhatsApp Digest",
              desc: "Owner morning briefing delivered directly to your personal phone."
            },
            {
              title: "Complete Staff Training & Support",
              desc: "30 days of direct WhatsApp priority support from Abhishek."
            }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 bg-white/15 px-3 py-1 rounded-full border border-white/20">
          Limited Slots: 3 Gym Onboardings This Month
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Ready to Automate Your Gym & Recover Your Lost Revenue?
        </h3>

        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Book a 15-minute live consultation with <strong>{developerName}</strong>. We will configure your gym's automated WhatsApp bot and database within 48 hours.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/${developerWhatsApp}?text=${encodeURIComponent("Hi Abhishek! I saw the GymFlow demo and want to book the setup for my gym.")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-slate-100 text-xs font-black shadow-md transition-all transform active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
            <span>Chat on WhatsApp (+91 9499268612)</span>
          </a>

          <div className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-800/80 text-white text-xs font-bold border border-white/20">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>WhatsApp Only: +91 9499268612</span>
          </div>

          <button
            onClick={onSwitchToApp}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white text-xs font-bold border border-white/20 transition-colors cursor-pointer"
          >
            <span>Launch Live App Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
