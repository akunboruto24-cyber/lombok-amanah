'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { T } from '@/lib/language';

const NOTICE_KEY = 'notice_sade_closed_2026_08';

export function NoticeBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(NOTICE_KEY);
    if (!dismissed) setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(NOTICE_KEY, '1');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-start sm:items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1 text-[13px] sm:text-[14px] text-amber-900 leading-relaxed">
          <strong>
            <T en="Important Update:">Pemberitahuan Penting:</T>
          </strong>{' '}
          <T en="Sade Traditional Village is temporarily closed due to a recent fire. Sasak Cultural Tour continues with a visit to Ende Village (another authentic Sasak village nearby) as replacement. All other destinations unchanged.">
            Desa Adat Sade untuk sementara ditutup karena kebakaran beberapa hari lalu. Sasak Cultural Tour tetap berjalan dengan kunjungan ke Desa Ende (desa tradisional Sasak lainnya) sebagai pengganti. Destinasi lain tetap sama.
          </T>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-amber-100 flex items-center justify-center transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4 text-amber-700" />
        </button>
      </div>
    </div>
  );
}
