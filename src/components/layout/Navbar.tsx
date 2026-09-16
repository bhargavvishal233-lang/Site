"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NavItem } from "@/types/navigation";

const navigationItems: NavItem[] = [
  {
    title: "Services",
    href: "#services",
    children: [
      { title: "Performance Marketing", description: "Scale user acquisition with high ROI", href: "#marketing" },
      { title: "UI/UX & Product Design", description: "Design high-converting digital experiences", href: "#design" },
      { title: "Branding & Identity", description: "Distinctive positioning and visual systems", href: "#branding" },
    ],
  },
  {
    title: "Software Development",
    href: "#development",
    children: [
      { title: "Full-Stack Web Apps", description: "Next.js, Node, and Cloud infrastructure", href: "#web-apps" },
      { title: "Mobile Applications", description: "iOS and Android native & hybrid apps", href: "#mobile-apps" },
      { title: "Custom API & CRM Systems", description: "Tailored business automation tooling", href: "#crm" },
    ],
  },
  { title: "Templates", href: "/templates" },
  { title: "Portfolio", href: "#portfolio" },
  { title: "About", href: "#about" },
  { title: "Client Login", href: "/login" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-header py-3.5 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-extrabold tracking-tighter text-charcoal uppercase flex items-center">
            SPECTRUM
            <span className="inline-block w-2 h-2 rounded-full bg-crimson ml-1.5 transition-transform group-hover:scale-125" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="text-sm font-medium text-charcoal/80 hover:text-crimson transition-colors flex items-center gap-1.5 py-1"
              >
                {item.title}
                {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </Link>

              {/* Dropdown Menu */}
              {item.children && activeDropdown === item.title && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-card border border-black/5 p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  {item.children.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className="block p-3 rounded-xl hover:bg-canvas transition-colors group"
                    >
                      <div className="text-sm font-semibold text-charcoal group-hover:text-crimson flex items-center justify-between">
                        {subItem.title}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {subItem.description && (
                        <p className="text-xs text-charcoal-muted mt-0.5">{subItem.description}</p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="primary" size="md">
            Get in Touch
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-charcoal hover:text-crimson"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-canvas border-b border-black/10 px-6 py-6 shadow-xl max-h-[calc(100vh-65px)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {navigationItems.map((item) => (
              <div key={item.title} className="border-b border-black/5 pb-3">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-charcoal flex items-center justify-between"
                >
                  {item.title}
                </Link>
                {item.children && (
                  <div className="mt-2 pl-3 flex flex-col gap-2">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm text-charcoal-muted hover:text-crimson py-1"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button variant="primary" size="lg" className="w-full mt-2">
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
