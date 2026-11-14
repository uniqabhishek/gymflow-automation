import React, { useState } from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  Send, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  MessageCircle, 
  Download, 
  Calculator, 
  Sparkles, 
  ArrowRight,
  Clock,
  Award,
  Users
} from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export default function GymOwnerPitchDemo({ onSwitchToApp, settings }) {
  // ROI Calculator states
  const [memberCount, setMemberCount] = useState(120);
  const [avgFee, setAvgFee] = useState(1500);
  const [dropoutRate, setDropoutRate] = useState(20); // 20% delay or drop

  // Live WhatsApp Test on Owner's Phone
  const [testGymName, setTestGymName] = useState("MuscleForge Fitness");
  const [testOwnerName, setTestOwnerName] = useState("Vikram");
  const [testOwnerPhone, setTestOwnerPhone] = useState("");
  const [testSent, setTestSent] = useState(false);

  // Calculations
  const monthlyLeakedMembers = Math.round(memberCount * (dropoutRate / 100));
  const monthlyLeakedRevenue = monthlyLeakedMembers * avgFee;
  const yearlyLeakedRevenue = monthlyLeakedRevenue * 12;

  // Recovered with GymFlow (estimated 80% recovery with automated reminders)
  const monthlyRecovered = Math.round(monthlyLeakedRevenue * 0.8);
  const yearlyRecovered = monthlyRecovered * 12;

  // Setup fee: ₹12,000 (typical agency pricing)
  const setupFee = 12000;
  const paybackDays = Math.max(1, Math.round((setupFee / monthlyRecovered) * 30));

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
upi://pay?pa=ironpeak@upi&pn=${encodeURIComponent(testGymName)}&am=${avgFee * 3}&tn=Demo_Renewal

⚡ *Why this works:*
1. 98% of members open WhatsApp within 5 minutes.
2. 1-click UPI payment eliminates excuses.
3. Your staff saves 2+ hours daily.

Let's automate your gym today! Contact Abhishek Singh. 🚀`;

    openWhatsApp(testOwnerPhone, testMessage);
    setTestSent(true);
    setTimeout(() => setTestSent(false), 5000);
  };

  const directCallPhone = "919876543210";
  const directWhatsAppPhone = "919876543210";

  return (
    <div className="space-y-10 py-2">
      
      {/* Hero Sales Pitch Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Gym Automation Agency Solution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Stop Losing <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400">₹30,000+ Every Month</span> to Forgotten Gym Renewals!
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Gym members don't leave because they want to — they leave because nobody reminded them on time with an easy UPI payment link. 
            <strong className="text-white"> GymFlow automates 100% of expiry tracking, WhatsApp reminder links, and morning owner briefings.</strong>
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onSwitchToApp}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Explore Live Gym Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${directWhatsAppPhone}?text=${encodeURIComponent("Hi Abhishek! I want to get the GymFlow WhatsApp automation setup installed for my gym.")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Book Gym Setup (WhatsApp)</span>
            </a>

            <a
              href="https://github.com/uniqabhishek/gymflow-automation/releases"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Android APK</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Live WhatsApp Demo on Owner's Phone */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              Try It Live on YOUR Phone Right Now!
            </h2>
            <p className="text-xs text-slate-400">
              Enter your details below to receive a personalized sample reminder on your own WhatsApp:
            </p>
          </div>
        </div>

        <form onSubmit={handleSendTestToOwner} className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Your Gym's Name
            </label>
            <input
              type="text"
              required
              value={testGymName}
              onChange={(e) => setTestGymName(e.target.value)}
              placeholder="e.g. Iron Clad Gym"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Owner / Your Name
            </label>
            <input
              type="text"
              required
              value={testOwnerName}
              onChange={(e) => setTestOwnerName(e.target.value)}
              placeholder="e.g. Vikram"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Your WhatsApp Number
            </label>
            <input
              type="tel"
              required
              value={testOwnerPhone}
              onChange={(e) => setTestOwnerPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>{testSent ? 'Opened WhatsApp!' : 'Send Live Demo to Me'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Interactive ROI & Revenue Leak Calculator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              Gym Revenue Leakage & ROI Calculator
            </h2>
            <p className="text-xs text-slate-400">
              Calculate exactly how much money your gym is currently losing every month:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Slider 1: Total Members */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  Total Active Members in Your Gym:
                </span>
                <span className="text-base font-black text-cyan-400 bg-cyan-500/10 px-3 py-0.5 rounded-lg border border-cyan-500/20">
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
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>30 Members (Small Studio)</span>
                <span>300 Members (Mid-Sized)</span>
                <span>600+ Members (Mega Gym)</span>
              </div>
            </div>

            {/* Slider 2: Monthly Fee */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  Average Monthly Membership Fee:
                </span>
                <span className="text-base font-black text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-lg border border-emerald-500/20">
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
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹800 (Budget)</span>
                <span>₹2,000 (Standard)</span>
                <span>₹5,000 (Premium/CrossFit)</span>
              </div>
            </div>

            {/* Slider 3: Dropout / Delayed Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  Members Delaying or Forgetting Renewal:
                </span>
                <span className="text-base font-black text-rose-400 bg-rose-500/10 px-3 py-0.5 rounded-lg border border-rose-500/20">
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
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10% (Low)</span>
                <span>20% (Industry Average)</span>
                <span>40% (High Dropout)</span>
              </div>
            </div>

          </div>

          {/* Result Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block">
              Estimated Monthly Financial Impact
            </span>

            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400">Current Monthly Loss (Uncollected Fees):</span>
              <div className="text-3xl font-black text-rose-400 mt-1">
                -₹{monthlyLeakedRevenue.toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-normal ml-1">/ month</span>
              </div>
              <span className="text-[11px] text-slate-400">
                (That's ₹{yearlyLeakedRevenue.toLocaleString('en-IN')} walking out the door every year!)
              </span>
            </div>

            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400">Recovered with GymFlow (80% Renewal Rate):</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                +₹{monthlyRecovered.toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-normal ml-1">/ month</span>
              </div>
              <span className="text-[11px] text-emerald-300/80">
                +₹{yearlyRecovered.toLocaleString('en-IN')} extra cash in your bank account!
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
              <span className="text-xs text-slate-300 font-medium block">
                GymFlow One-Time Setup (₹12,000)
              </span>
              <span className="text-lg font-black text-cyan-400 mt-0.5 block">
                Pays for itself in {paybackDays} DAYS! 🚀
              </span>
              <span className="text-[10px] text-slate-400">
                Zero monthly fees forever after that.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Comparison Matrix: Traditional Software vs GymFlow */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-black text-white">
            Why Gym Owners Are Ditching Traditional Gym Software
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare expensive SaaS subscription software with your custom GymFlow automation:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4">Feature / Aspect</th>
                <th className="py-3 px-4 text-rose-400">Traditional Gym Software</th>
                <th className="py-3 px-4 text-slate-400">Pen & Register / Excel</th>
                <th className="py-3 px-4 text-emerald-400 font-black bg-emerald-500/10">GymFlow Automation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Monthly Subscription</td>
                <td className="py-3 px-4 text-rose-400">₹1,500 – ₹3,000 every month forever</td>
                <td className="py-3 px-4 text-slate-400">₹0 (Free)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">₹0 Monthly Forever (One-Time Setup)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Renewal Reminders</td>
                <td className="py-3 px-4 text-slate-300">Generic SMS (90% never opened)</td>
                <td className="py-3 px-4 text-rose-400">Manual calls or completely forgotten</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">Automated WhatsApp (98% Open Rate)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Instant UPI QR & Payment</td>
                <td className="py-3 px-4 text-rose-400">Extra 2-3% payment gateway charges</td>
                <td className="py-3 px-4 text-slate-400">Cash or manual counter QR</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">Direct 0% UPI QR Links (GPay/PhonePe)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Daily Owner Morning Report</td>
                <td className="py-3 px-4 text-slate-300">Must open heavy desktop app</td>
                <td className="py-3 px-4 text-rose-400">Count pages in register manually</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">Delivered to Owner WhatsApp at 9 AM</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Staff Complexity</td>
                <td className="py-3 px-4 text-rose-400">Hard to learn, breaks easily</td>
                <td className="py-3 px-4 text-slate-400">Messy handwriting, errors</td>
                <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/5">Dead simple 2-click interface on phone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* What's Included in the Setup Package */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-black text-white">
            What's Included in the ₹12,000–₹15,000 Turnkey Setup
          </h2>
          <p className="text-xs text-slate-400 mt-1">
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
              desc: "30 days of direct phone/WhatsApp priority support and staff walkthrough."
            }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pl-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Closing Banner & Contact Abhishek */}
      <div className="bg-gradient-to-r from-emerald-600/20 via-cyan-500/20 to-blue-600/20 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          Limited Slots: 3 Gym Onboardings This Month
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Ready to Automate Your Gym & Recover Your Lost Revenue?
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Book a 15-minute live consultation with Abhishek Singh. We will configure your gym's automated WhatsApp bot and database within 48 hours.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`https://wa.me/${directWhatsAppPhone}?text=${encodeURIComponent("Hi Abhishek! I saw the GymFlow demo and want to book the setup for my gym.")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/30 transition-all transform active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp (+91 98765 43210)</span>
          </a>

          <a
            href={`tel:+${directCallPhone}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black border border-slate-700 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-cyan-400" />
            <span>Call Directly</span>
          </a>

          <button
            onClick={onSwitchToApp}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-colors cursor-pointer"
          >
            <span>Launch Live App Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
