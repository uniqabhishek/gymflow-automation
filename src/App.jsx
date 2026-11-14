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

  // Default to true for Pitch / Sales presentation demo, or false for operational portal
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

  // Handler: Add new member
  const handleAddMember = (newMember) => {
    setMembers(prev => [newMember, ...prev]);
  };

  // Handler: Delete member
  const handleDeleteMember = (memberId) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setMembers(prev => prev.filter(m => m.id !== memberId));
    }
  };

  // Handler: Mark member as paid via UPI
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

  // Handler: Renew member
  const handleRenewMember = (updatedMember) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  // Handler: Mark reminder sent timestamp
  const handleMarkReminderSent = (memberId) => {
    const today = new Date().toISOString().split('T')[0];
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, lastReminderSent: today } : m));
  };

  // Handler: Reset default data
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

  return (
    <div className="min-h-screen text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
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

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            GymFlow • Client Sales Demo & Smart Gym Expiry Automation System
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            Agency Turnkey Setup by Abhishek Singh • Powered by n8n & WhatsApp Cloud API
          </span>
        </div>
      </footer>

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
        isOpen={!!whatsAppModalMember}
        onClose={() => setWhatsAppModalMember(null)}
        member={whatsAppModalMember}
        settings={settings}
        onMarkReminderSent={handleMarkReminderSent}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => setSettings(newSettings)}
        onResetData={handleResetData}
      />

    </div>
  );
}
