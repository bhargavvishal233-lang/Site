"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone, Compass, Cpu, Fingerprint, RefreshCcw, BellRing } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { motion, Variants } from "framer-motion";

export default function MobileApplicationsPage() {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const popUp: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <div className="bg-canvas min-h-screen font-sans text-charcoal">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 relative"
          >
            {/* Subtle glow effect behind text */}
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-crimson/10 rounded-full blur-3xl -z-10"></div>
            
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="inline-block px-3 py-1 bg-crimson/10 text-crimson font-bold tracking-widest text-sm uppercase rounded-full"
            >
              Mobile Applications
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-charcoal">
              Native Mobile <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-500">Experiences</span>
            </h1>
            <p className="text-lg text-charcoal-muted max-w-xl">
              We design and engineer fluid, native-feeling mobile applications for iOS and Android. Built for maximum engagement, retention, and performance.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href="#consultation" className="px-8 py-4 bg-crimson hover:bg-crimson-hover shadow-lg shadow-crimson/30 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                Discuss Your App <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-charcoal/20 border border-black/5 group"
          >
            <Image
              src="/images/services/mobile-app.jpg"
              alt="Premium Mobile App UI"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Engineering Features - Black Contrast Section */}
      <section className="py-24 bg-charcoal text-white px-6 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-crimson/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Uncompromising Quality</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We push the limits of mobile hardware to deliver butter-smooth 60fps experiences.</p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={popUp} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-crimson/50 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-crimson/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Cross-Platform Native</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                Using React Native and Expo, we write once and deploy natively to both the App Store and Google Play without sacrificing performance.
              </p>
            </motion.div>
            <motion.div variants={popUp} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-crimson/50 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-crimson/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fluid Micro-Interactions</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                Advanced gesture handling, haptic feedback, and custom physics-based animations that delight users on every tap and swipe.
              </p>
            </motion.div>
            <motion.div variants={popUp} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-crimson/50 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-crimson/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Offline-First Architecture</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                Local SQLite databases and intelligent sync engines ensure your app remains fully functional even on a subway ride.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack & Visuals */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 relative"
          >
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-crimson/10 border border-black/5 group">
              <Image
                src="/images/services/mobile-app-2.jpg"
                alt="Mobile Lifestyle AR Interaction"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">Next-Gen Interfaces</p>
                <p className="text-sm text-gray-200">AR & Context-Aware UI components</p>
              </div>
            </div>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-2xl border border-black/5 w-72"
            >
              <h3 className="font-bold text-sm mb-4 text-charcoal uppercase tracking-wider">Device Features</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-crimson/10 rounded-lg"><Fingerprint size={18} className="text-crimson"/></div>
                  <span className="text-sm font-semibold">Biometric Auth (FaceID)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-crimson/10 rounded-lg"><BellRing size={18} className="text-crimson"/></div>
                  <span className="text-sm font-semibold">Rich Push Notifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-crimson/10 rounded-lg"><RefreshCcw size={18} className="text-crimson"/></div>
                  <span className="text-sm font-semibold">Over-The-Air Updates</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-charcoal">The Native Advantage</h2>
            <p className="text-charcoal-muted mb-8 text-lg">
              Unlock the full potential of the device. From camera APIs to secure enclaves, we integrate deeply with iOS and Android ecosystems.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-crimson/30 transition-all">
                <h4 className="font-bold text-charcoal mb-1">React Native</h4>
                <p className="text-xs text-charcoal-muted">Shared core logic</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-crimson/30 transition-all">
                <h4 className="font-bold text-charcoal mb-1">Expo</h4>
                <p className="text-xs text-charcoal-muted">Rapid EAS deployments</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-crimson/30 transition-all">
                <h4 className="font-bold text-charcoal mb-1">Swift / Kotlin</h4>
                <p className="text-xs text-charcoal-muted">Native custom modules</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-crimson/30 transition-all">
                <h4 className="font-bold text-charcoal mb-1">Skia / Reanimated</h4>
                <p className="text-xs text-charcoal-muted">60fps complex graphics</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-24 bg-white px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-crimson/5 via-transparent to-transparent pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-canvas p-8 md:p-12 rounded-2xl shadow-2xl shadow-charcoal/5 border border-black/5 relative z-10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Build Your App</h2>
            <p className="text-charcoal-muted">Share your vision and our mobile architects will help you map out the build.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Consultation Requested!'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-charcoal">Full Name</label>
                <input type="text" className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/50 transition-all shadow-sm" placeholder="Alex Chen" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-charcoal">Work Email</label>
                <input type="email" className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/50 transition-all shadow-sm" placeholder="alex@company.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-charcoal">Target Platforms</label>
              <select className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/50 transition-all shadow-sm">
                <option>iOS & Android (React Native)</option>
                <option>iOS Native Only</option>
                <option>Android Native Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-charcoal">App Idea Details</label>
              <textarea rows={4} className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/50 transition-all shadow-sm" placeholder="Briefly describe what your app does..."></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-4 bg-charcoal text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xl shadow-black/10"
            >
              Request Mobile Strategy <ArrowRight size={18} />
            </motion.button>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
