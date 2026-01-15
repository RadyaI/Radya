'use client';

import { QRCodeSVG } from 'qrcode.react';
import { QRData, QRStyle } from '@/lib/qrcode/types';
import { generateQRValue, downloadQRCode } from '@/lib/qrcode/utils';
import { Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  data: QRData;
  style: QRStyle;
}

export default function QRPreviewCard({ data, style }: Props) {
  const qrValue = generateQRValue(data);
  const isValid = data.type === 'wifi' ? (data.wifiSsid && data.wifiSsid.length > 0) : (data.value.length > 0);

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800 p-6 md:sticky md:top-6 transition-colors duration-200"
    >
      {/* Area Preview QR: Background neutral tetap untuk kontras visual, tapi di-dark mode jadi agak gelap */}
      <div className="aspect-square w-full bg-neutral-50 dark:bg-neutral-950 rounded-xl flex items-center justify-center mb-6 border border-neutral-100 dark:border-neutral-800 overflow-hidden transition-colors">
        {isValid ? (
          /* Background wrapper QR Code mengikuti input user (style.bgColor), bukan tema */
          <div className="p-4 rounded-lg shadow-sm" style={{ backgroundColor: style.bgColor }}>
            <QRCodeSVG
              id="qr-code-svg"
              value={qrValue}
              size={256}
              fgColor={style.fgColor}
              bgColor={style.bgColor}
              level="H"
              includeMargin={true}
            />
          </div>
        ) : (
          <div className="text-neutral-400 dark:text-neutral-500 text-sm text-center">
            Start typing to generate<br />your QR Code
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => isValid && downloadQRCode('png', 'radya-qrcode')}
          disabled={!isValid}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Download size={18} />
          <span>PNG</span>
        </button>
        <button
          onClick={() => isValid && downloadQRCode('svg', 'radya-qrcode')}
          disabled={!isValid}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Share2 size={18} />
          <span>SVG</span>
        </button>
      </div>
    </motion.div>
  );
}