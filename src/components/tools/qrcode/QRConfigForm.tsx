'use client';

import { QRData, QRStyle, QRType } from '@/utils/qrcode/types';
import { motion } from 'framer-motion';
import { Link, Type, Mail, Phone, Wifi } from 'lucide-react';

interface Props {
  data: QRData;
  style: QRStyle;
  onDataChange: (data: QRData) => void;
  onStyleChange: (style: QRStyle) => void;
}

export default function QRConfigForm({ data, style, onDataChange, onStyleChange }: Props) {
  const tabs: { id: QRType; icon: React.ElementType; label: string }[] = [
    { id: 'url', icon: Link, label: 'URL' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'phone', icon: Phone, label: 'Phone' },
    { id: 'wifi', icon: Wifi, label: 'WiFi' },
  ];

  const handleTypeChange = (type: QRType) => {
    onDataChange({ ...data, type, value: '' });
  };

  const inputClass = "w-full p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 transition-colors";
  const labelClass = "block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-5 gap-2 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-xl transition-colors">
        {tabs.map((tab: any) => (
          <button
            key={tab.id}
            onClick={() => handleTypeChange(tab.id)}
            className={`cursor-pointer flex flex-col items-center justify-center p-3 rounded-lg text-xs font-medium transition-all ${
              data.type === tab.id
                ? 'bg-white dark:bg-neutral-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50'
            }`}
          >
            <tab.icon size={20} className="mb-1" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={data.type}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        {data.type === 'wifi' ? (
          <>
            <div>
              <label className={labelClass}>Network SSID</label>
              <input
                type="text"
                value={data.wifiSsid || ''}
                onChange={(e) => onDataChange({ ...data, wifiSsid: e.target.value })}
                className={inputClass}
                placeholder="WiFi Name"
              />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="text"
                value={data.wifiPassword || ''}
                onChange={(e) => onDataChange({ ...data, wifiPassword: e.target.value })}
                className={inputClass}
                placeholder="WiFi Password"
              />
            </div>
            <div>
              <label className={labelClass}>Encryption</label>
              <div className="relative">
                <select
                  value={data.wifiEncryption || 'WPA'}
                  onChange={(e) => onDataChange({ ...data, wifiEncryption: e.target.value as any })}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No Password</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <label className={labelClass}>
              {data.type === 'url' ? 'Website URL' : 
               data.type === 'email' ? 'Email Address' :
               data.type === 'phone' ? 'Phone Number' : 'Content'}
            </label>
            <input
              type={data.type === 'url' ? 'url' : 'text'}
              value={data.value}
              onChange={(e) => onDataChange({ ...data, value: e.target.value })}
              className={inputClass}
              placeholder={`Enter ${data.type}...`}
            />
          </div>
        )}
      </motion.div>

      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Appearance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-2">QR Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.fgColor}
                onChange={(e) => onStyleChange({ ...style, fgColor: e.target.value })}
                className="h-10 w-full cursor-pointer rounded-lg border border-neutral-200 dark:border-neutral-700 p-1 bg-white dark:bg-neutral-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-neutral-500 dark:text-neutral-400 mb-2">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.bgColor}
                onChange={(e) => onStyleChange({ ...style, bgColor: e.target.value })}
                className="h-10 w-full cursor-pointer rounded-lg border border-neutral-200 dark:border-neutral-700 p-1 bg-white dark:bg-neutral-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}