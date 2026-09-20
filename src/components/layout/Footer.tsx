"use client";

import Link from 'next/link';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02Z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();
  const isDarkPage = pathname === '/services/performance-marketing' || pathname === '/services/ui-ux-design';

  const containerBg = isDarkPage ? 'bg-[#050505]' : 'bg-canvas';
  const footerBg = isDarkPage ? 'bg-[#050505]' : 'bg-crimson';
  const giantTextStyle = isDarkPage 
    ? 'text-white' 
    : 'text-transparent';
  return (
    <div className="w-full flex flex-col font-sans relative z-10">
      {/* Giant Outlined Text */}
      <div className={`w-full ${containerBg} flex justify-center overflow-hidden pt-12 items-end`}>
        <div 
          className={`text-[16vw] sm:text-[14vw] md:text-[12rem] lg:text-[14rem] font-bold leading-[0.75] tracking-tight select-none pb-8 ${giantTextStyle}`}
          style={!isDarkPage ? { WebkitTextStroke: '2px rgba(26,26,26,0.1)' } : undefined}
        >
          Spectrum
        </div>
      </div>

      {/* Footer Content */}
      <footer className={`${footerBg} text-white pt-20 pb-16 px-8 md:px-16 lg:px-24 w-full relative z-20`}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Info - Takes up half on large screens */}
          <div className="lg:col-span-5 flex flex-col pr-8">
            <div className="mb-10">
              {/* Logo text matching header style loosely */}
              <div className="text-2xl font-bold tracking-widest flex items-center">
                SPECTRUM
              </div>
            </div>
            
            <h2 className="text-3xl font-medium mb-12 leading-tight">
              Ship Tastefully Crafted<br />
              Digital Experiences
            </h2>
            
            <div className="mt-auto pt-8">
              <p className="text-sm font-medium mb-5">Follow Us:</p>
              <div className="flex items-center gap-6 mb-12">
                <Link href="#" className="hover:opacity-75 transition-opacity">
                  <XIcon className="w-5 h-5" />
                </Link>
                <Link href="#" className="hover:opacity-75 transition-opacity">
                  <LinkedinIcon className="w-5 h-5" />
                </Link>
                <Link href="#" className="hover:opacity-75 transition-opacity">
                  <FacebookIcon className="w-5 h-5" />
                </Link>
                <Link href="#" className="hover:opacity-75 transition-opacity">
                  <InstagramIcon className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-sm text-white/90">
                &copy; 2026 Spectrum, All rights reserved
              </p>
            </div>
          </div>
          
          {/* Services Links */}
          <div className="lg:col-span-3 flex flex-col lg:pl-12">
            <h3 className="text-xl font-medium mb-8">Services</h3>
            <ul className="flex flex-col gap-5 text-[15px] text-white/90 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Performance Marketing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shopify Dev</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">App Dev</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Software Dev</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Website Dev</Link></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-xl font-medium mb-8">Company</h3>
            <ul className="flex flex-col gap-5 text-[15px] text-white/90 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
          
          {/* Location */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-xl font-medium mb-8">Location</h3>
            <ul className="flex flex-col gap-2 text-[15px] text-white/90 font-medium">
              <li>Jaipur</li>
              <li>Rajasthan, India</li>
            </ul>
          </div>

        </div>
      </footer>
    </div>
  );
};
