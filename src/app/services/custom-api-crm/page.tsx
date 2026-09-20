"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Database, Network, Key, Layers, Activity, Lock } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { motion, Variants } from "framer-motion";

export default function CustomApiCrmPage() {
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
              Custom API & CRM
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-charcoal">
              Intelligent Data <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-500">Infrastructure</span>
            </h1>
            <p className="text-lg text-charcoal-muted max-w-xl">
              We design bespoke CRM dashboards and high-throughput APIs that integrate seamlessly into your enterprise ecosystem. Real-time data synchronization with uncompromising security.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href="#consultation" className="px-8 py-4 bg-crimson hover:bg-crimson-hover shadow-lg shadow-crimson/30 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                Request API Blueprint <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-charcoal/20 border border-black/5 group"
          >
            <Image
              src="/images/services/crm-app.jpg"
              alt="Data CRM Dashboard"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* API Infrastructure - Black Contrast Section */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Interoperability</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Secure, versioned, and hyper-scalable REST & GraphQL backends.</p>
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
                <Network className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">GraphQL / REST APIs</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                Aggregated microservices with intelligent caching and rate limiting, delivering the exact data your frontends need.
              </p>
            </motion.div>
            <motion.div variants={popUp} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-crimson/50 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-crimson/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Identity & Auth</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                OAuth 2.0, JWT, and multi-tenant Role-Based Access Control (RBAC) ensuring precise data sovereignty.
              </p>
            </motion.div>
            <motion.div variants={popUp} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-crimson/50 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-crimson/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="text-crimson" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom CRM Logic</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                Bypass the limitations of off-the-shelf CRMs with bespoke schemas and automated pipeline triggers built around your exact workflow.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack & Cloud Infra Visuals */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-charcoal">Data Operations Stack</h2>
            <p className="text-charcoal-muted mb-8 text-lg">
              Our data engineering ensures structured, type-safe, and instantly retrievable information flows across your organization.
            </p>
            <motion.ul variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              <motion.li variants={popUp} className="flex items-center gap-4 text-charcoal font-semibold bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center text-crimson">
                  <Database size={24} />
                </div>
                PostgreSQL & Redis Caching
              </motion.li>
              <motion.li variants={popUp} className="flex items-center gap-4 text-charcoal font-semibold bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center text-crimson">
                  <Layers size={24} />
                </div>
                Prisma ORM & Drizzle
              </motion.li>
              <motion.li variants={popUp} className="flex items-center gap-4 text-charcoal font-semibold bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center text-crimson">
                  <Key size={24} />
                </div>
                Zero-Trust API Gateway
              </motion.li>
            </motion.ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-crimson/10 border border-black/5 group">
              <Image
                src="/images/services/crm-app-2.jpg"
                alt="Cloud Infrastructure Visualization"
                fill
                className="object-contain bg-white transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-black/5 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-crimson/5 rounded-full blur-2xl"></div>
              <h3 className="font-bold text-xl mb-6">Pipeline Activity</h3>
              <div className="space-y-6">
                <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-4">
                  <Activity className="text-green-500" size={24} />
                  <div>
                    <p className="font-bold text-sm">Real-time Webhook</p>
                    <p className="text-xs text-gray-500">Salesforce sync complete. +240 records.</p>
                  </div>
                </motion.div>
                <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-4">
                  <Activity className="text-blue-500" size={24} />
                  <div>
                    <p className="font-bold text-sm">GraphQL Subscription</p>
                    <p className="text-xs text-gray-500">Live dashboard pushed to 12 active clients.</p>
                  </div>
                </motion.div>
                <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-4">
                  <Activity className="text-crimson" size={24} />
                  <div>
                    <p className="font-bold text-sm">Identity Verified</p>
                    <p className="text-xs text-gray-500">B2B Tenant login success via SSO.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-24 bg-white px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-crimson/5 via-transparent to-transparent pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-canvas p-8 md:p-12 rounded-2xl shadow-2xl shadow-charcoal/5 border border-black/5 relative z-10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Architect Your Data</h2>
            <p className="text-charcoal-muted">Discuss your custom CRM and API requirements with our Lead Data Engineers.</p>
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
              <label className="block text-sm font-semibold mb-2 text-charcoal">Integration Systems</label>
              <textarea rows={4} className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/50 transition-all shadow-sm" placeholder="List the platforms you need to integrate with (e.g. Stripe, Salesforce, Hubspot)..."></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-4 bg-charcoal text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xl shadow-black/10"
            >
              Request Integration Plan <ArrowRight size={18} />
            </motion.button>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
