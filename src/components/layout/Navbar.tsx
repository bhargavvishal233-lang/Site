"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NavItem } from "@/types/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";

const navigationItems: NavItem[] = [
  {
    title: "Services",
    href: "#services",
    children: [
      { title: "Performance Marketing", description: "Scale user acquisition with high ROI", href: "/services/performance-marketing" },
      { title: "UI/UX & Product Design", description: "Design high-converting digital experiences", href: "/services/ui-ux-design" },
      { title: "Branding & Identity", description: "Distinctive positioning and visual systems", href: "#branding" },
    ],
  },
  {
    title: "Software Development",
    href: "#development",
    children: [
      { title: "Full-Stack Web Apps", description: "Next.js, Node, and Cloud infrastructure", href: "/services/full-stack-web-apps" },
      { title: "Mobile Applications", description: "iOS and Android native & hybrid apps", href: "/services/mobile-applications" },
      { title: "Custom API & CRM Systems", description: "Tailored business automation tooling", href: "/services/custom-api-crm" },
    ],
  },
  { title: "Templates", href: "/templates" },
  { title: "About", href: "#about" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.startsWith('#') || href.startsWith('/#');
    if (isAnchor) {
      e.preventDefault();
      const hash = href.substring(href.indexOf('#'));
      if (pathname !== '/') {
        router.push(`/${hash}`);
      } else {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  const isDarkPage = pathname === '/services/performance-marketing' || pathname === '/services/ui-ux-design';
  const textColor = isDarkPage ? 'text-white' : 'text-charcoal';
  const textMuted = isDarkPage ? 'text-white/80' : 'text-charcoal/80';
  const bgGlass = isDarkPage ? 'bg-black/50 backdrop-blur-lg border-b border-white/10' : 'glass-header shadow-sm';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? `${bgGlass} py-3.5` : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className={`text-xl font-extrabold tracking-tighter ${textColor} uppercase flex items-center`}>
            SPECTRUM
            <span className="inline-block w-2 h-2 rounded-full bg-crimson ml-1.5 transition-transform group-hover:scale-125" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href.startsWith('#') && pathname !== '/' ? `/${item.href}` : item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium ${textMuted} hover:text-crimson transition-colors flex items-center gap-1.5 py-1`}
              >
                {item.title}
                {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </Link>

              {/* Dropdown Menu */}
              {item.children && activeDropdown === item.title && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50">
                  <div className="bg-white rounded-2xl shadow-card border border-black/5 p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href.startsWith('#') && pathname !== '/' ? `/${subItem.href}` : subItem.href}
                        onClick={(e) => handleNavClick(e, subItem.href)}
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
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {!session ? (
            <Button variant="outline" size="sm" onClick={() => signIn("google")}>
              Sign In
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              {session.user?.image ? (
                <img src={session.user.image} alt="User avatar" className="w-8 h-8 rounded-full border border-black/10" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-semibold">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          )}
          <Button variant="primary" size="md">
            Get in Touch
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 ${textColor} hover:text-crimson`}
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
                  href={item.href.startsWith('#') && pathname !== '/' ? `/${item.href}` : item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#') || item.href.startsWith('/#')) handleNavClick(e, item.href);
                    else setMobileMenuOpen(false);
                  }}
                  className="text-base font-semibold text-charcoal flex items-center justify-between"
                >
                  {item.title}
                </Link>
                {item.children && (
                  <div className="mt-2 pl-3 flex flex-col gap-2">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href.startsWith('#') && pathname !== '/' ? `/${subItem.href}` : subItem.href}
                        onClick={(e) => {
                          if (subItem.href.startsWith('#') || subItem.href.startsWith('/#')) handleNavClick(e, subItem.href);
                          else setMobileMenuOpen(false);
                        }}
                        className="text-sm text-charcoal-muted hover:text-crimson py-1"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!session ? (
              <Button variant="outline" size="lg" className="w-full mt-4" onClick={() => signIn("google")}>
                Sign In
              </Button>
            ) : (
              <Button variant="outline" size="lg" className="w-full mt-4" onClick={() => signOut()}>
                Sign Out
              </Button>
            )}
            <Button variant="primary" size="lg" className="w-full mt-2">
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
