import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsDashboard from './components/StatsDashboard';
import MembersList from './components/MembersList';
import WhatsAppAutomationCenter from './components/WhatsAppAutomationCenter';
import DailyReportView from './components/DailyReportView';
import N8nWorkflowViewer from './components/N8nWorkflowViewer';
import GymOwnerPitchDemo from './components/GymOwnerPitchDemo';

import AddMemberModal from './components/AddMemberModal';
import UpiPaymentModal from './components/UpiPaymentModal';
import RenewModal from './components/RenewModal';
import WhatsAppPreviewModal from './components/WhatsAppPreviewModal';
import SettingsModal from './components/SettingsModal';

import { 
  Presentation, 
  Users, 
  MessageSquare, 
  Workflow, 
  FileText, 
  Plus 
} from 'lucide-react';

import { 
  loadMembers, 
  saveMembers, 
  loadSettings, 
  saveSettings, 
  calculateStatus 
} from './utils/storage';
import { initialMembers, defaultSettings } from './data/initialMembers';

export default function App() {
  const [members, setMembers] = useState(() => loadMembers());
  const [settings, setSettings] = useState(() => loadSettings());

  // Theme state: 'light' by default for clean minimal SaaS look
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('gymflow_theme') || 'light';
  });

  const [isPitchMode, setIsPitchMode] = useState(true);
  const [activeTab, setActiveTab] = useState('members');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Modals state
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [upiModalMember, setUpiModalMember] = useState(null);
  const [renewModalMember, setRenewModalMember] = useState(null);
  const [whatsAppModalMember, setWhatsAppModalMember] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    saveMembers(members);
  }, [members]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('gymflow_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleAddMember = (newMember) => {
    setMembers(prev => [newMember, ...prev]);
  };

  const handleDeleteMember = (memberId) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setMembers(prev => prev.filter(m => m.id !== memberId));
    }
  };

  const handleConfirmPayment = (memberId) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const today = new Date();
        today.setHours(0,0,0,0);
        const currentExp = new Date(m.expiryDate);
        currentExp.setHours(0,0,0,0);

        const baseDate = currentExp > today ? currentExp : today;
        const newExp = new Date(baseDate);
        newExp.setMonth(newExp.getMonth() + (m.durationMonths || 1));

        return {
          ...m,
          expiryDate: newExp.toISOString().split('T')[0],
          status: 'active',
          paymentStatus: 'paid'
        };
      }
      return m;
    }));
  };

  const handleRenewMember = (updatedMember) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const handleMarkReminderSent = (memberId) => {
    const today = new Date().toISOString().split('T')[0];
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, lastReminderSent: today } : m));
  };

  const handleResetData = () => {
    const refreshed = initialMembers.map(m => ({ ...m, status: calculateStatus(m.expiryDate) }));
    setMembers(refreshed);
    setSettings(defaultSettings);
    saveMembers(refreshed);
    saveSettings(defaultSettings);
  };

  const handleFilterByStatus = (status) => {
    setSelectedStatusFilter(status);
    setActiveTab('members');
    setIsPitchMode(false);
  };

  const handleSelectBottomTab = (tab) => {
    if (tab === 'pitch') {
      setIsPitchMode(true);
    } else {
      setIsPitchMode(false);
      setActiveTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white transition-colors pb-32 sm:pb-24 md:pb-8">
      
      {/* Top Navigation */}
      <Navbar
        settings={settings}
        members={members}
        onOpenAddMember={() => setIsAddMemberOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPitchMode={isPitchMode}
        setIsPitchMode={setIsPitchMode}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
        
        {/* Mode 1: Gym Owner Sales Pitch & Client Demo */}
        {isPitchMode ? (
          <GymOwnerPitchDemo 
            onSwitchToApp={() => setIsPitchMode(false)}
            settings={settings}
          />
        ) : (
          /* Mode 2: Live Gym Management Operating Portal */
          <>
            <StatsDashboard 
              members={members} 
              settings={settings}
              onFilterByStatus={handleFilterByStatus}
            />

            {activeTab === 'members' && (
              <MembersList
                members={members}
                onOpenWhatsApp={(member) => setWhatsAppModalMember(member)}
                onOpenUpiModal={(member) => setUpiModalMember(member)}
                onOpenRenewModal={(member) => setRenewModalMember(member)}
                onDeleteMember={handleDeleteMember}
                selectedStatusFilter={selectedStatusFilter}
                setSelectedStatusFilter={setSelectedStatusFilter}
              />
            )}

            {activeTab === 'automations' && (
              <WhatsAppAutomationCenter
                members={members}
                settings={settings}
              />
            )}

            {activeTab === 'n8n' && (
              <N8nWorkflowViewer />
            )}

            {activeTab === 'dailyReport' && (
              <DailyReportView
                members={members}
                settings={settings}
              />
            )}
          </>
        )}

      </main>

      {/* Desktop Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-6 text-center text-xs text-slate-500 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            GymFlow • Client Sales Demo & Smart Gym Expiry Automation System
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            Agency Setup by <strong className="text-slate-700 dark:text-slate-200">Abhishek</strong> • WhatsApp (Only): <strong className="text-emerald-600 dark:text-emerald-400 font-mono">+91 9499268612</strong> • UPI: <strong className="font-mono text-slate-600 dark:text-slate-300">9499268312@slc</strong>
          </span>
        </div>
      </footer>

      {/* NATIVE MOBILE FLOATING ACTION BUTTON (Add Member) */}
      {!isPitchMode && (
        <button
          onClick={() => setIsAddMemberOpen(true)}
          title="Add New Member"
          className="md:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/40 flex items-center justify-center transition-all transform active:scale-95 cursor-pointer ring-4 ring-white dark:ring-slate-900"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}

      {/* NATIVE MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        
        {/* Pitch / ROI */}
        <button
          onClick={() => handleSelectBottomTab('pitch')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            isPitchMode
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Presentation className="w-5 h-5" />
          <span className="text-[10px]">Pitch</span>
        </button>

        {/* Members */}
        <button
          onClick={() => handleSelectBottomTab('members')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            !isPitchMode && activeTab === 'members'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px]">Members</span>
        </button>

        {/* WhatsApp Bot */}
        <button
          onClick={() => handleSelectBottomTab('automations')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            !isPitchMode && activeTab === 'automations'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">WhatsApp</span>
        </button>

        {/* n8n Flow */}
        <button
          onClick={() => handleSelectBottomTab('n8n')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            !isPitchMode && activeTab === 'n8n'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Workflow className="w-5 h-5" />
          <span className="text-[10px]">n8n Flow</span>
        </button>

        {/* Daily Report */}
        <button
          onClick={() => handleSelectBottomTab('dailyReport')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            !isPitchMode && activeTab === 'dailyReport'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">Report</span>
        </button>

      </nav>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
        settings={settings}
      />

      <UpiPaymentModal
        isOpen={!!upiModalMember}
        onClose={() => setUpiModalMember(null)}
        member={upiModalMember}
        settings={settings}
        onConfirmPayment={handleConfirmPayment}
      />

      <RenewModal
        isOpen={!!renewModalMember}
        onClose={() => setRenewModalMember(null)}
        member={renewModalMember}
        settings={settings}
        onRenewMember={handleRenewMember}
      />

      <WhatsAppPreviewModal
        key={whatsAppModalMember?.id}
        isOpen={!!whatsAppModalMember}
        onClose={() => setWhatsAppModalMember(null)}
        member={whatsAppModalMember}
        settings={settings}
        onMarkReminderSent={handleMarkReminderSent}
      />

      <SettingsModal
        key={isSettingsOpen ? 'open' : 'closed'}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => setSettings(newSettings)}
        onResetData={handleResetData}
      />

    </div>
  );
}
