// WhatsApp Messaging Utility & Templates

export function cleanPhone(phone) {
  let cleaned = (phone || '').replace(/\D/g, '');
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
}

export function generateWhatsAppMessage(type, member, settings) {
  const gymName = settings?.gymName || "IronPeak Fitness Hub";
  const upiId = settings?.upiId || "9499268312@slc";
  const memberName = member?.name || "Valued Member";
  const plan = member?.plan || "Membership";
  const amount = member?.amount || 1500;
  const expiryDate = member?.expiryDate ? new Date(member.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';
  
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(gymName)}&am=${amount}&tn=${encodeURIComponent('Renewal_' + memberName.replace(/\s+/g, ''))}`;

  switch (type) {
    case 'welcome':
      return `🎉 *Welcome to ${gymName}!* 💪\n\n` +
        `Hi *${memberName}*,\n` +
        `We are thrilled to welcome you to the ${gymName} family! Here are your membership details:\n\n` +
        `📋 *Plan:* ${plan}\n` +
        `📅 *Valid Until:* ${expiryDate}\n` +
        `💳 *Fee Paid:* ₹${amount}\n\n` +
        `⏰ *Gym Timings:* Mon-Sat: 6:00 AM - 10:00 PM | Sun: 7:00 AM - 1:00 PM\n` +
        `📍 *Location:* ${settings?.address || 'Main Branch'}\n\n` +
        `Keep crushing your fitness goals! Reach out anytime if you need help with training or diet. 🔥`;

    case 'reminder_3days':
      return `🔔 *Membership Renewal Reminder - ${gymName}*\n\n` +
        `Hi *${memberName}*! 👋\n` +
        `This is a quick friendly reminder that your *${plan}* will expire in *3 days* on *${expiryDate}*.\n\n` +
        `Renew early to enjoy uninterrupted access to training, locker, and workout slots!\n\n` +
        `💰 *Renewal Amount:* ₹${amount}\n` +
        `📲 *Quick 1-Click UPI Payment Link:*\n${upiLink}\n\n` +
        `Or pay using UPI ID: \`${upiId}\`\n\n` +
        `After completing payment, please reply with the screenshot to instantly extend your validity. Thank you! 🏋️`;

    case 'reminder_urgent':
      return `⚠️ *URGENT: Membership Expiring Soon - ${gymName}*\n\n` +
        `Dear *${memberName}*,\n` +
        `Your gym membership expires *TOMORROW (${expiryDate})*.\n\n` +
        `To ensure your biometric / NFC gym entry remains active without interruption, kindly renew your plan today:\n\n` +
        `📋 *Plan:* ${plan}\n` +
        `💵 *Amount:* ₹${amount}\n` +
        `📲 *Pay via UPI Link:*\n${upiLink}\n\n` +
        `Let us know once transferred so we can generate your renewal receipt. Let's keep the streak going! 💪`;

    case 'expired':
      return `❌ *Membership Expired - ${gymName}*\n\n` +
        `Hello *${memberName}*,\n` +
        `Your membership for *${plan}* has EXPIRED on *${expiryDate}*.\n\n` +
        `We miss you on the gym floor! Re-activate your membership today to continue your transformation journey.\n\n` +
        `💳 *Renewal Amount:* ₹${amount}\n` +
        `📲 *Pay via UPI:*\n${upiLink}\n` +
        `UPI ID: \`${upiId}\`\n\n` +
        `Reply here if you'd like to switch to a Quarterly or Annual discount plan! 🌟`;

    case 'payment_receipt':
      return `✅ *Payment Confirmation Receipt - ${gymName}*\n\n` +
        `Dear *${memberName}*,\n` +
        `Thank you for your payment! We have received *₹${amount}* for your *${plan}*.\n\n` +
        `📅 *New Expiry Date:* ${expiryDate}\n` +
        `Status: *ACTIVE* 🟢\n\n` +
        `Receipt Reference: #REC-${Math.floor(100000 + Math.random() * 900000)}\n\n` +
        `See you in the gym! Sweat today, shine tomorrow! 🏆`;

    default:
      return `Hi *${memberName}*, greeting from ${gymName}! Your membership is valid till ${expiryDate}.`;
  }
}

export function openWhatsApp(phone, message) {
  const clean = cleanPhone(phone);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${clean}?text=${encoded}`;
  window.open(url, '_blank');
}

export function generateDailyOwnerReport(members, settings) {
  const today = new Date();
  today.setHours(0,0,0,0);
  
  let active = 0;
  let expiringSoon = 0;
  let expired = 0;
  let expiringToday = 0;
  let todayDues = 0;
  
  const expiringMembersList = [];
  const expiredMembersList = [];

  members.forEach(m => {
    const exp = new Date(m.expiryDate);
    exp.setHours(0,0,0,0);
    const diff = Math.round((exp - today) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) {
      expired++;
      todayDues += Number(m.amount) || 0;
      expiredMembersList.push(`• ${m.name} (${m.plan}) - Expired ${Math.abs(diff)}d ago`);
    } else if (diff === 0) {
      expiringToday++;
      expiringSoon++;
      todayDues += Number(m.amount) || 0;
      expiringMembersList.push(`• ${m.name} (${m.plan}) - Expiring TODAY!`);
    } else if (diff <= 3) {
      expiringSoon++;
      todayDues += Number(m.amount) || 0;
      expiringMembersList.push(`• ${m.name} (${m.plan}) - in ${diff} days`);
    } else {
      active++;
    }
  });

  const formattedDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const report = 
`📊 *DAILY MORNING GYM REPORT*
🏢 *${settings?.gymName || 'IronPeak Fitness'}*
📅 *Date:* ${formattedDate}
━━━━━━━━━━━━━━━━━━━━

📈 *MEMBERSHIP METRICS:*
🟢 *Active Members:* ${active}
⚠️ *Expiring Soon (≤3 Days):* ${expiringSoon} (Today: ${expiringToday})
❌ *Expired / Renew Pending:* ${expired}
👥 *Total Enrolled:* ${members.length}

💰 *FINANCIAL OVERVIEW:*
💵 *Pending Recoverable Dues:* ₹${todayDues.toLocaleString('en-IN')}

━━━━━━━━━━━━━━━━━━━━
🚨 *EXPIRING / DUE TODAY:*
${expiringMembersList.length > 0 ? expiringMembersList.slice(0, 5).join('\n') : 'None today 🎉'}

⚠️ *TOP EXPIRED PENDING:*
${expiredMembersList.length > 0 ? expiredMembersList.slice(0, 5).join('\n') : 'No expired members!'}

━━━━━━━━━━━━━━━━━━━━
🤖 *Automation Status:*
⚡ n8n Workflow active & WhatsApp reminders synced.
Have a high-growth day, Coach ${settings?.ownerName || 'Abhishek'}! 💪
━━━━━━━━━━━━━━━━━━━━
💡 *Setup & Support:* Abhishek (WhatsApp Only: +91 9499268312) • UPI: 9499268312@slc`;

  return report;
}
