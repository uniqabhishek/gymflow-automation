import React from 'react';
import { 
  Dumbbell, 
  Plus, 
  FileDown, 
  Send, 
  Settings, 
  Sparkles, 
  Download, 
  Presentation, 
  LayoutDashboard,
  Sun,
  Moon
} from 'lucide-react';
import { generateDailyOwnerReport, openWhatsApp } from '../utils/whatsapp';

export default function Navbar({ 
  settings, 
  members, 
  onOpenAddMember, 
  onOpenSettings,
  activeTab,
  setActiveTab,
  isPitchMode,
  setIsPitchMode,
  theme,
  setTheme
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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Gym Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                  GymFlow
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80">
                  Automation
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-[180px]">
                {settings.gymName}
              </p>
            </div>
          </div>

          {/* Mode Switcher (Pitch vs Live App) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setIsPitchMode(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isPitchMode
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Presentation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Pitch & ROI</span>
            </button>
            <button
              onClick={() => setIsPitchMode(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                !isPitchMode
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Gym App</span>
            </button>
          </div>

          {/* Navigation Tabs (Shown when in App Mode) */}
          {!isPitchMode && (
            <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs">
              <button
                onClick={() => setActiveTab('members')}
                className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
                  activeTab === 'members'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Members
              </button>
              <button
                onClick={() => setActiveTab('automations')}
                className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
                  activeTab === 'automations'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                WhatsApp Bot
              </button>
              <button
                onClick={() => setActiveTab('n8n')}
                className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
                  activeTab === 'n8n'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                n8n Flow
              </button>
              <button
                onClick={() => setActiveTab('dailyReport')}
                className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
                  activeTab === 'dailyReport'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Daily Report
              </button>
            </nav>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Download APK Button */}
            <a
              href="https://github.com/uniqabhishek/gymflow-automation/releases/download/v1.0.0/GymFlow-Demo-v1.0.apk"
              title="Download Android APK"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">APK</span>
            </a>

            {/* Quick Send Daily Report */}
            {!isPitchMode && (
              <button
                onClick={handleSendDailyReport}
                title="Send Daily Morning Briefing to Gym Owner's WhatsApp"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Morning Report</span>
              </button>
            )}

            {/* Add Member Button */}
            {!isPitchMode && (
              <button
                onClick={onOpenAddMember}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-all transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">New Member</span>
              </button>
            )}

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title="Gym Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Tab Bar (When in App Mode) */}
        {!isPitchMode && (
          <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-200/80 dark:border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('members')}
              className={`py-1 px-2.5 rounded-lg ${activeTab === 'members' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('automations')}
              className={`py-1 px-2.5 rounded-lg ${activeTab === 'automations' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50' : 'text-slate-500 dark:text-slate-400'}`}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('n8n')}
              className={`py-1 px-2.5 rounded-lg ${activeTab === 'n8n' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50' : 'text-slate-500 dark:text-slate-400'}`}
            >
              n8n Flow
            </button>
            <button
              onClick={() => setActiveTab('dailyReport')}
              className={`py-1 px-2.5 rounded-lg ${activeTab === 'dailyReport' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Report
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
