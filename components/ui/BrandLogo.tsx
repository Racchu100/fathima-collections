import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', variant = 'light' }) => {
  const isDark = variant === 'dark';

  return (
    <Link href="/" className={`group inline-flex items-center ${className}`}>
      {/* Typography: FATHIMA COLLECTION */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-heading text-base sm:text-lg font-extrabold tracking-wider ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          FATHIMA
        </span>
        <span className="font-heading text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-brand-green-500 uppercase">
          COLLECTION
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;
