import QRCode from 'qrcode';

export function createUpiUri({ upiId, payeeName, amount, transactionNote }) {
  const pa = encodeURIComponent(upiId || 'ironpeak@upi');
  const pn = encodeURIComponent(payeeName || 'Gym Fitness');
  const am = amount ? encodeURIComponent(amount.toString()) : '';
  const tn = encodeURIComponent(transactionNote || 'Gym Membership Renewal');
  
  return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`;
}

export async function generateQrCodeDataUrl(text) {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
}
