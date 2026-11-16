import { initialMembers, defaultSettings } from '../data/initialMembers';

const STORAGE_KEY_MEMBERS = 'gymflow_members_v3';
const STORAGE_KEY_SETTINGS = 'gymflow_settings_v3';

export function calculateStatus(expiryDate) {
  if (!expiryDate) return 'active';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(expiryDate);
  exp.setHours(0, 0, 0, 0);
  
  const diffTime = exp - today;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'expired';
  if (diffDays <= 3) return 'expiring';
  return 'active';
}

export function loadMembers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MEMBERS);
    if (!raw) {
      saveMembers(initialMembers);
      return initialMembers.map(m => ({ ...m, status: calculateStatus(m.expiryDate) }));
    }
    const parsed = JSON.parse(raw);
    return parsed.map(m => ({ ...m, status: calculateStatus(m.expiryDate) }));
  } catch (err) {
    console.error('Failed to load members from localStorage', err);
    return initialMembers;
  }
}

export function saveMembers(members) {
  try {
    localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
  } catch (err) {
    console.error('Failed to save members to localStorage', err);
  }
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) {
      saveSettings(defaultSettings);
      return defaultSettings;
    }
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings', err);
  }
}

export function exportToCsv(members) {
  const headers = ['ID', 'Name', 'Phone', 'Email', 'Plan', 'Amount', 'Join Date', 'Expiry Date', 'Status', 'Payment Status', 'Notes'];
  const rows = members.map(m => [
    m.id,
    `"${m.name.replace(/"/g, '""')}"`,
    m.phone,
    m.email || '',
    `"${m.plan}"`,
    m.amount,
    m.joinDate,
    m.expiryDate,
    m.status,
    m.paymentStatus,
    `"${(m.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `gym_members_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
