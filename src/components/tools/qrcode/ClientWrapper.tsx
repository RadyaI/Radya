'use client';

import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import QRConfigForm from './QRConfigForm';
import QRPreviewCard from './QRPreviewCard';
import ThemeToggle from './ThemeToggle';
import { QRData, QRStyle } from '@/utils/qrcode/types';

export default function ClientWrapper() {
  const [qrData, setQrData] = useState<QRData>({
    type: 'url',
    value: '',
    wifiEncryption: 'WPA'
  });

  const [qrStyle, setQrStyle] = useState<QRStyle>({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    size: 256
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="relative">
        
        <div className="absolute -top-20 right-0 hidden md:block">
           <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 transition-colors duration-200">
              <QRConfigForm 
                data={qrData} 
                style={qrStyle} 
                onDataChange={setQrData} 
                onStyleChange={setQrStyle} 
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex justify-end mb-4 md:hidden">
              <ThemeToggle />
            </div>
            <QRPreviewCard data={qrData} style={qrStyle} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}