// Initial realistic gym member dataset reflecting the reel's 96+ members scale
export const initialMembers = [
  {
    id: "mem-01",
    name: "Rahul Sharma",
    phone: "919876543210",
    email: "rahul.s@example.com",
    plan: "Quarterly (3 Months)",
    durationMonths: 3,
    amount: 4000,
    joinDate: "2026-08-15",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // expires tomorrow
    status: "expiring",
    paymentStatus: "paid",
    lastReminderSent: null,
    notes: "Prefers morning batch (6:00 AM - 7:30 AM)",
    avatarColor: "bg-amber-500"
  },
  {
    id: "mem-02",
    name: "Pooja Verma",
    phone: "919812345678",
    email: "pooja.v@example.com",
    plan: "Monthly (1 Month)",
    durationMonths: 1,
    amount: 1500,
    joinDate: "2026-10-16",
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // expires in 2 days
    status: "expiring",
    paymentStatus: "paid",
    lastReminderSent: null,
    notes: "Zumba + Strength training",
    avatarColor: "bg-emerald-500"
  },
  {
    id: "mem-03",
    name: "Amit Patel",
    phone: "919723456789",
    email: "amit.patel@example.com",
    plan: "Half-Yearly (6 Months)",
    durationMonths: 6,
    amount: 7500,
    joinDate: "2026-05-10",
    expiryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // expired 2 days ago
    status: "expired",
    paymentStatus: "unpaid",
    lastReminderSent: "2026-11-12",
    notes: "Requested UPI payment link",
    avatarColor: "bg-rose-500"
  },
  {
    id: "mem-04",
    name: "Sneha Kulkarni",
    phone: "919634567890",
    email: "sneha.k@example.com",
    plan: "Annual (1 Year)",
    durationMonths: 12,
    amount: 13500,
    joinDate: "2026-01-20",
    expiryDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "active",
    paymentStatus: "paid",
    lastReminderSent: null,
    notes: "Personal training with Coach Vikram",
    avatarColor: "bg-indigo-500"
  },
  {
    id: "mem-05",
    name: "Vikas Mehra",
    phone: "919545678901",
    email: "vikas.m@example.com",
    plan: "Monthly (1 Month)",
    durationMonths: 1,
    amount: 1500,
    joinDate: "2026-10-12",
    expiryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // expired 3 days ago
    status: "expired",
    paymentStatus: "unpaid",
    lastReminderSent: "2026-11-13",
    notes: "Cardio only",
    avatarColor: "bg-orange-500"
  },
  {
    id: "mem-06",
    name: "Ananya Roy",
    phone: "919456789012",
    email: "ananya.roy@example.com",
    plan: "Quarterly (3 Months)",
    durationMonths: 3,
    amount: 4000,
    joinDate: "2026-09-01",
    expiryDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "active",
    paymentStatus: "paid",
    lastReminderSent: null,
    notes: "Evening cardio & diet plan",
    avatarColor: "bg-purple-500"
  },
  {
    id: "mem-07",
    name: "Rohan Gupta",
    phone: "919367890123",
    email: "rohan.g@example.com",
    plan: "Monthly (1 Month)",
    durationMonths: 1,
    amount: 1500,
    joinDate: "2026-10-15",
    expiryDate: new Date(Date.now()).toISOString().split('T')[0], // expires TODAY
    status: "expiring",
    paymentStatus: "paid",
    lastReminderSent: null,
    notes: "Renewal due today",
    avatarColor: "bg-cyan-500"
  },
  {
    id: "mem-08",
    name: "Deepak Choudhary",
    phone: "919278901234",
    email: "deepak.c@example.com",
    plan: "Half-Yearly (6 Months)",
    durationMonths: 6,
    amount: 7500,
    joinDate: "2026-06-15",
    expiryDate: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "active",
    paymentStatus: "paid",
    lastReminderSent: null,
    notes: "Heavy weightlifting & protein supplement buyer",
    avatarColor: "bg-blue-600"
  },
  {
    id: "mem-09",
    name: "Kavita Nair",
    phone: "919189012345",
    email: "kavita.n@example.com",
    plan: "Monthly (1 Month)",
    durationMonths: 1,
    amount: 1500,
    joinDate: "2026-10-10",
    expiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // expired
    status: "expired",
    paymentStatus: "unpaid",
    lastReminderSent: "2026-11-10",
    notes: "Out of station, promised to pay online",
    avatarColor: "bg-pink-500"
  },
  {
    id: "mem-10",
    name: "Manish Tiwari",
    phone: "919090123456",
    email: "manish.t@example.com",
    plan: "Annual (1 Year)",
    durationMonths: 12,
    amount: 13500,
    joinDate: "2026-03-01",
    expiryDate: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "active",
    paymentStatus: "paid",
    lastReminderSent: null,
    notes: "Locker #14 allocated",
    avatarColor: "bg-teal-500"
  },
  {
    id: "mem-11",
    name: "Simran Kaur",
    phone: "919871122334",
    email: "simran.k@example.com",
    plan: "Quarterly (3 Months)",
    durationMonths: 3,
    amount: 4000,
    joinDate: "2026-08-16",
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // expires in 2 days
    status: "expiring",
    paymentStatus: "paid",
    lastReminderSent: null,
    notes: "Needs renewal QR on WhatsApp",
    avatarColor: "bg-violet-500"
  },
  {
    id: "mem-12",
    name: "Gaurav Joshi",
    phone: "919762233445",
    email: "gaurav.j@example.com",
    plan: "Monthly (1 Month)",
    durationMonths: 1,
    amount: 1500,
    joinDate: "2026-10-13",
    expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // expired yesterday
    status: "expired",
    paymentStatus: "unpaid",
    lastReminderSent: "2026-11-13",
    notes: "Student discount applied",
    avatarColor: "bg-yellow-600"
  }
];

export const membershipPlans = [
  { id: "1m", name: "Monthly (1 Month)", durationMonths: 1, amount: 1500, popular: false },
  { id: "3m", name: "Quarterly (3 Months)", durationMonths: 3, amount: 4000, popular: true },
  { id: "6m", name: "Half-Yearly (6 Months)", durationMonths: 6, amount: 7500, popular: false },
  { id: "12m", name: "Annual (1 Year)", durationMonths: 12, amount: 13500, popular: false }
];

export const defaultSettings = {
  gymName: "IronPeak Fitness Hub",
  ownerName: "Abhishek Singh",
  ownerPhone: "919876543210",
  upiId: "ironpeak@upi",
  currency: "₹",
  address: "Sector 18, Commercial Belt, Metro Hub",
  n8nWebhookUrl: "https://your-n8n-instance.com/webhook/gym-member-update",
  autoRemindDays: 3
};
