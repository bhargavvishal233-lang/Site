"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Layers, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    if (path === "/" && pathname === "/") return true;
    return pathname.startsWith(path);
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "/" },
    { icon: <Grid size={20} />, label: "Services", href: "/#services" },
    { icon: <Layers size={20} />, label: "Work", href: "/#work" },
  ];

  return (
    <>
      {/* Spacer to prevent content from hiding behind the bottom nav */}
      <div className="h-16 lg:hidden w-full block" />

      {/* The Bottom Nav Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors ${
                isActive(item.href) ? "text-crimson" : "text-gray-500 hover:text-charcoal hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors text-gray-500 hover:text-charcoal hover:bg-gray-50"
          >
            <Menu size={20} />
            <span className="text-[10px] font-medium mt-1">Menu</span>
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[60] bg-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="text-xl font-extrabold tracking-tighter text-charcoal uppercase flex items-center">
            SPECTRUM
            <span className="inline-block w-2 h-2 rounded-full bg-crimson ml-1.5" />
          </span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 -mr-2 text-gray-500 hover:text-charcoal bg-gray-50 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-80px)] pb-24">
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Services</h3>
            <div className="flex flex-col gap-2">
              {[
                { title: "Performance Marketing", href: "/services/performance-marketing" },
                { title: "UI/UX & Product Design", href: "/services/ui-ux-design" },
                { title: "Custom API & CRM Systems", href: "/services/custom-api-crm" },
              ].map(link => (
                <Link 
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 text-charcoal font-medium active:bg-gray-100 transition-colors"
                >
                  {link.title}
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-lg font-medium text-charcoal">About Us</Link>
              <Link href="/#why-choose-us" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-lg font-medium text-charcoal">Why Choose Us</Link>
              <Link href="/#pricing" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 text-lg font-medium text-charcoal">Pricing</Link>
            </div>
          </div>

          <div className="mt-4">
            <Button variant="primary" size="lg" className="w-full h-14 text-lg shadow-xl shadow-crimson/20" onClick={() => setIsMenuOpen(false)}>
              Get in Touch
            </Button>
          </div>

        </div>
      </div>
    </>
  );
};
