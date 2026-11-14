# 🏋️‍♂️ GymFlow — Smart Gym Automation & WhatsApp Expiry Management System

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Internet-emerald?style=for-the-badge&logo=vercel)](https://uniqabhishek.github.io/gymflow-automation/)
[![n8n Ready](https://img.shields.io/badge/n8n-Workflow%20Included-ea4b71?style=for-the-badge&logo=n8n)](./public/gym-automation-workflow.json)
[![WhatsApp API](https://img.shields.io/badge/WhatsApp-Cloud%20API%20%26%20Web-25D366?style=for-the-badge&logo=whatsapp)](https://whatsapp.com)

> Inspired by the viral Gym Automation Workflow on Instagram Reels (`@prachinskillscode` & `@theorvanta`).
> Eliminates manual Excel/register checking by automating member expiry tracking, sending instant WhatsApp renewal reminders with dynamic UPI payment QR codes, and delivering daily morning executive briefings to gym owners.

---

## ⚡ Core Problem Solved
Gym owners frequently lose ₹10,000–₹50,000 every month because:
1. **Manual Registers & Excel:** They forget who is valid until when and who paid.
2. **Delayed Reminders:** Awkwardness or lack of time to manually message 100+ members before their plan expires.
3. **Friction in Payments:** Members delay renewal because there is no immediate payment link or QR code ready.

---

## 🚀 Key Features

### 1. 📊 Real-Time KPI Dashboard
- **Active Members** count with healthy validity status.
- **Expiring Soon Alert** (≤ 3 days countdown) with instant action triggers.
- **Expired / Renew Pending** tracker highlighting recoverable fee dues.
- **Monthly Revenue & Collection Counter**.

### 2. 💬 1-Click & Automated WhatsApp Engine
- **Welcome & Onboarding**: Dispatches gym timings, rules & membership validity upon registration.
- **3-Day Expiry Warning**: Friendly reminder with prefilled UPI renewal link.
- **1-Day Urgent Notice**: Warns before biometric / access block.
- **Expired Re-activation Notice**: Re-engages lapsed members.
- **Payment Confirmation Receipt**: Instant receipt + next cycle expiry date with confetti celebration.

### 3. 📱 Dynamic UPI QR Code & Link Generator
- Instant QR generation (`upi://pay?pa=...&am=...`) compatible with **Google Pay, PhonePe, Paytm, BHIM, and Cred**.
- Scan & Pay directly from desktop or mobile screen.

### 4. 🌅 Daily Morning Owner Briefing
- Modeled exactly after the daily report shown in the reel.
- Compiles Active, Expiring, and Expired counts + recoverable fees.
- 1-Click "Send to Owner WhatsApp" (`https://wa.me/...`) for instant mobile briefing.

### 5. 🔄 Ready-to-Use n8n Workflow JSON
- Includes downloadable `gym-automation-workflow.json` ready to import into any n8n instance (Self-hosted or Cloud).
- Schedule Trigger (9:00 AM Daily) &rarr; Fetch Member DB &rarr; Calculate Expiry &rarr; Filter &rarr; WhatsApp API &rarr; Sheet Timestamp Update &rarr; Owner Summary.

### 6. 📁 Google Sheets & CSV Compatibility
- Export member directory to CSV.
- LocalStorage persistence (zero setup needed to test and run).

---

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas-Confetti
- **QR Engine:** QRCode (`qrcode`)
- **Automation Pipeline:** n8n Workflow (Schedule Trigger, Code Node, WhatsApp Cloud API, Google Sheets Node)
- **Deployment:** GitHub Pages / Vercel / Netlify

---

## 💻 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/uniqabhishek/gymflow-automation.git

# Enter project directory
cd gymflow-automation

# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## 📦 How to Import n8n Workflow
1. Open your n8n dashboard.
2. Go to **Workflows &rarr; Import from File**.
3. Select `gym-automation-workflow.json` located in `public/`.
4. Enter your Google Sheets Sheet ID and WhatsApp Cloud API token.
5. Click **Activate**!

---

## 📄 License
MIT License. Created by Abhishek Singh.
