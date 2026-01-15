import { QRData } from './types';

export const generateQRValue = (data: QRData): string => {
  switch (data.type) {
    case 'wifi':
      return `WIFI:T:${data.wifiEncryption};S:${data.wifiSsid};P:${data.wifiPassword};;`;
    case 'email':
      return `mailto:${data.value}`;
    case 'phone':
      return `tel:${data.value}`;
    default:
      return data.value;
  }
};

export const downloadQRCode = (format: 'png' | 'svg', filename: string) => {
  const svg = document.getElementById('qr-code-svg');
  if (!svg) return;

  if (format === 'svg') {
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, `${filename}.svg`);
  } else {
    const canvas = document.createElement('canvas');
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      triggerDownload(pngUrl, `${filename}.png`);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }
};

const triggerDownload = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};