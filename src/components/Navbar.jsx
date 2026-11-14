import React from 'react';
import { Dumbbell, Plus, FileDown, Send, Settings, Sparkles, Download, Presentation, LayoutDashboard } from 'lucide-react';
import { generateDailyOwnerReport, openWhatsApp } from '../utils/whatsapp';

export default function Navbar({ 
  settings, 
  members, 
  onOpenAddMember, 
  onOpenSettings,
  activeTab,
  setActiveTab,
  isPitchMode,
  setIsPitchMode
}) {
  const handleSendDailyReport = () => {
    const report = generateDailyOwnerReport(members, settings);
    openWhatsApp(settings.ownerPhone, report);
  };

  const handleDownloadWorkflow = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}gym-automation-workflow.json`;
    link.download = 'gym-automation-workflow.json';
    link.click();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Gym Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">GymFlow</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Auto-Bot
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {settings.gymName} • WhatsApp & n8n Automation
              </p>
            </div>
          </div>

          {/* Mode Switcher (Sales Pitch vs Live App) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setIsPitchMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isPitchMode
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Sales Pitch & ROI</span>
            </button>
            <button
              onClick={() => setIsPitchMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !isPitchMode
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Live Gym App</span>
            </button>
          </div>

          {/* Navigation Tabs (Shown when in App Mode) */}
          {!isPitchMode && (
            <nav className="hidden xl:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('members')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'members'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                Members
              </button>
              <button
                onClick={() => setActiveTab('automations')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'automations'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                WhatsApp
              </button>
              <button
                onClick={() => setActiveTab('n8n')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'n8n'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                n8n Flow
              </button>
              <button
                onClick={() => setActiveTab('dailyReport')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'dailyReport'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                Daily Report
              </button>
            </nav>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Download APK Button */}
            <a
              href="https://github.com/uniqabhishek/gymflow-automation/releases"
              target="_blank"
              rel="noreferrer"
              title="Download Android APK"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Get APK</span>
            </a>

            {/* Quick Send Daily Report */}
            {!isPitchMode && (
              <button
                onClick={handleSendDailyReport}
                title="Send Daily Morning Briefing to Gym Owner's WhatsApp"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>Owner Report</span>
              </button>
            )}

            {/* Add Member Button */}
            {!isPitchMode && (
              <button
                onClick={onOpenAddMember}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 rounded-lg shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">New Member</span>
              </button>
            )}

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Gym Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Tab Bar (When in App Mode) */}
        {!isPitchMode && (
          <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/80 text-xs">
            <button
              onClick={() => setActiveTab('members')}
              className={`py-1 px-2 rounded-md ${activeTab === 'members' ? 'text-cyan-400 font-bold bg-cyan-950/60' : 'text-slate-400'}`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('automations')}
              className={`py-1 px-2 rounded-md ${activeTab === 'automations' ? 'text-cyan-400 font-bold bg-cyan-950/60' : 'text-slate-400'}`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('n8n')}
              className={`py-1 px-2 rounded-md ${activeTab === 'n8n' ? 'text-cyan-400 font-bold bg-cyan-950/60' : 'text-slate-400'}`}
            >
              n8n Flow
            </button>
            <button
              onClick={() => setActiveTab('dailyReport')}
              className={`py-1 px-2 rounded-md ${activeTab === 'dailyReport' ? 'text-cyan-400 font-bold bg-cyan-950/60' : 'text-slate-400'}`}
            >
              Daily Report
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
