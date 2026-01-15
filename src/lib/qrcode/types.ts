export type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi';

export interface QRData {
  type: QRType;
  value: string;
  wifiSsid?: string;
  wifiPassword?: string;
  wifiEncryption?: 'WPA' | 'WEP' | 'nopass';
}

export interface QRStyle {
  fgColor: string;
  bgColor: string;
  size: number;
}