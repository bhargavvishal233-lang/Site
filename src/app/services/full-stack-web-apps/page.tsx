"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, Server, Database, Activity, Shield, Zap } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { motion, Variants } from "framer-motion";

export default function FullStackWebAppsPage() {
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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
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
              Full-Stack Web Apps
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-charcoal">
              Next-Generation <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-500">Web Architecture</span>
            </h1>
            <p className="text-lg text-charcoal-muted max-w-xl">
              We build high-performance, resilient, and globally scalable web applications. From Day 0 to Enterprise scale, we architect platforms that dominate in speed and reliability.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href="#consultation" className="px-8 py-4 bg-crimson hover:bg-crimson-hover shadow-lg shadow-crimson/30 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                Request Architecture Review <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-charcoal/20 border border-black/5 group"
          >
            <Image
              src="/images/services/web-app.jpg"
              alt="Modern Web App Dashboard"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Features - Black Contrast Section */}
      <section className="py-24 bg-charcoal text-white px-6 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-crimson/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Performance</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Engineered for sub-100ms latency, 99.99% uptime, and frictionless user experiences.</p>
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
                <Zap className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Turbopack & Edge Compute</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                We leverage Next.js App Router and Edge Network CDNs to deliver zero-latency dynamic rendering across the globe.
              </p>
            </motion.div>
            <motion.div variants={popUp} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-crimson/50 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-crimson/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero-Trust Security</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                Bank-grade encryption, automated threat mitigation, and compliant infrastructure scaling built-in from the start.
              </p>
            </motion.div>
            <motion.div variants={popUp} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-crimson/50 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-crimson/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Distributed State</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                Multi-region database architectures and persistent caching layers ensure your platform never drops a query.
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
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-charcoal">The Spectrum Stack</h2>
            <p className="text-charcoal-muted mb-8 text-lg">
              We don't just build apps; we engineer digital ecosystems. Our stack is carefully curated for maximum velocity and stability.
            </p>
            <motion.ul variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <motion.li variants={popUp} className="flex items-center gap-4 text-charcoal font-semibold bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center text-crimson">
                  <Code size={24} />
                </div>
                React & Next.js Ecosystem
              </motion.li>
              <motion.li variants={popUp} className="flex items-center gap-4 text-charcoal font-semibold bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center text-crimson">
                  <Server size={24} />
                </div>
                Serverless & Containerized Microservices
              </motion.li>
              <motion.li variants={popUp} className="flex items-center gap-4 text-charcoal font-semibold bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center text-crimson">
                  <Activity size={24} />
                </div>
                Real-time Telemetry & Observability
              </motion.li>
            </motion.ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5 group">
              <Image
                src="/images/services/web-app-2.jpg"
                alt="Abstract Glowing Servers"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">Hyper-Scale Infrastructure</p>
                <p className="text-sm text-gray-300">Global edge routing & dynamic streaming</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-black/5">
              <h3 className="font-bold text-xl mb-6">Live Architecture Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">System Uptime</span>
                    <span className="text-green-600 font-bold">99.999%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '99.9%' }} transition={{ duration: 1, delay: 0.2 }} className="bg-green-500 h-2 rounded-full"></motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Average Latency</span>
                    <span className="text-crimson font-bold">42ms</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 1, delay: 0.4 }} className="bg-crimson h-2 rounded-full"></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-24 bg-white px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-crimson/5 via-transparent to-transparent pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-canvas p-8 md:p-12 rounded-2xl shadow-2xl shadow-charcoal/5 border border-black/5 relative z-10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Start Your Build</h2>
            <p className="text-charcoal-muted">Connect with our Principal Engineers to scope your web architecture.</p>
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
              <label className="block text-sm font-semibold mb-2 text-charcoal">Project Details</label>
              <textarea rows={4} className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/50 transition-all shadow-sm" placeholder="Describe your web application requirements..."></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-4 bg-charcoal text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xl shadow-black/10"
            >
              Submit Request <ArrowRight size={18} />
            </motion.button>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
