"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Building2,
  Cpu,
  Users,
  BarChart3,
  Sparkles,
  Utensils,
  DollarSign,
  Package,
  Calendar,
  Lock,
  ArrowLeft,
  Settings,
  Bell,
  Thermometer,
  ShieldCheck,
  CheckCircle,
  Wifi,
  Loader,
  Plus
} from "lucide-react";

type DashboardType =
  | "guest"
  | "hotel"
  | "admin"
  | "staff"
  | "analytics"
  | "housekeeping"
  | "restaurant"
  | "finance"
  | "inventory"
  | "booking";

export default function DashboardsPortal() {
  const [activeTab, setActiveTab] = useState<DashboardType>("hotel");
  const [mounted, setMounted] = useState(false);
  const [roomTemp, setRoomTemp] = useState(21);
  const [lightsOn, setLightsOn] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader className="w-8 h-8 text-gold-champagne animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { id: "hotel", label: "Hotel Overview", icon: <Building2 className="w-4 h-4" /> },
    { id: "guest", label: "Guest Console", icon: <User className="w-4 h-4" /> },
    { id: "admin", label: "System Admin", icon: <Cpu className="w-4 h-4" /> },
    { id: "staff", label: "Staff Duty Roster", icon: <Users className="w-4 h-4" /> },
    { id: "analytics", label: "Revenue Analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "housekeeping", label: "Housekeeping Queue", icon: <Sparkles className="w-4 h-4" /> },
    { id: "restaurant", label: "Restaurant covers", icon: <Utensils className="w-4 h-4" /> },
    { id: "finance", label: "Finance Ledger", icon: <DollarSign className="w-4 h-4" /> },
    { id: "inventory", label: "Spa & Cellar Inventory", icon: <Package className="w-4 h-4" /> },
    { id: "booking", label: "Booking Registry", icon: <Calendar className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F8F7F2] flex pt-20">
      
      {/* Sidebar Panel */}
      <aside className="w-64 border-r border-white/5 bg-[#080808] flex flex-col justify-between p-4 hidden md:flex">
        <div className="space-y-6">
          <div className="px-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-champagne font-bold block mb-1">
              Aurum Portal
            </span>
            <h2 className="font-serif text-sm tracking-widest text-white uppercase">
              Management Suite
            </h2>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded text-xs tracking-wider transition-all cursor-pointer ${
                    active
                      ? "bg-gold-champagne/10 text-gold-champagne border border-gold-champagne/20 font-semibold"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/45 hover:text-gold-champagne transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Estate</span>
          </Link>
          <div className="text-[9px] font-mono text-white/20">
            SYSTEM VERSION: 2.4.0-GOLD
          </div>
        </div>
      </aside>

      {/* Mobile Top Scroll Bar for dashboards Selection */}
      <div className="md:hidden fixed top-[73px] left-0 right-0 z-30 bg-[#080808] border-b border-white/5 flex items-center space-x-3 overflow-x-auto py-3 px-4 no-scrollbar">
        {menuItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                active
                  ? "bg-gold-champagne text-[#0A0A0A] font-semibold"
                  : "bg-white/5 text-white/70"
              }`}
            >
              {item.icon}
              <span>{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 bg-black/20 overflow-y-auto min-h-[85vh] mt-12 md:mt-0">
        
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6 mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 block mb-1">
              Active Session
            </span>
            <h1 className="font-serif text-2xl md:text-3xl text-white font-medium uppercase tracking-wider">
              {menuItems.find((m) => m.id === activeTab)?.label}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* System Status Indicators */}
            <div className="glass-panel border border-white/5 px-3 py-1.5 rounded-lg flex items-center space-x-2 text-[10px] font-mono text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SECURE PROTOCOL</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 text-white/60">
              <Bell className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Dashboard Panels Router */}
        <div className="space-y-6">
          
          {/* 1. HOTEL OVERVIEW DASHBOARD */}
          {activeTab === "hotel" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Total Occupancy</span>
                <p className="font-serif text-3xl text-gold-champagne">94.8%</p>
                <span className="text-[9px] text-emerald-400 block font-mono">▲ +1.2% versus yesterday</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Active VIP List</span>
                <p className="font-serif text-3xl text-white">14 Guests</p>
                <span className="text-[9px] text-white/40 block font-mono">4 scheduled arrivals today</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Daily Room Service Rev</span>
                <p className="font-serif text-3xl text-white">$42,850</p>
                <span className="text-[9px] text-emerald-400 block font-mono">▲ +18.4% demand factor</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Global Satisfaction</span>
                <p className="font-serif text-3xl text-gold-accent">99.4%</p>
                <span className="text-[9px] text-emerald-400 block font-mono">142 reviews checked</span>
              </div>

              {/* VIP Checked-in logs */}
              <div className="md:col-span-4 glass-gold-panel p-6 rounded-xl border border-gold-champagne/10 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-champagne font-semibold block">VIP Residency Roster</span>
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-xs font-light">
                    <thead>
                      <tr className="border-b border-white/10 text-white/45 uppercase tracking-wider text-[9px]">
                        <th className="py-2.5">Guest Identity</th>
                        <th className="py-2.5">Suite sanctuary</th>
                        <th className="py-2.5">Arrival Type</th>
                        <th className="py-2.5">Butler Assignment</th>
                        <th className="py-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-3 font-semibold text-white">H.R.H. Crown Prince of Monaco</td>
                        <td className="py-3 text-gold-champagne">Imperial Villa 402</td>
                        <td className="py-3">Yacht Transfer</td>
                        <td className="py-3">Steward Marcus</td>
                        <td className="py-3 text-right text-emerald-400">RESIDING</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-white">Lady Alexandra Montgomery</td>
                        <td className="py-3 text-gold-champagne">Penthouse Suite 801</td>
                        <td className="py-3">Heli Arrival</td>
                        <td className="py-3">Stewardess Jean</td>
                        <td className="py-3 text-right text-emerald-400">RESIDING</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold text-white">Lord William Vance</td>
                        <td className="py-3 text-gold-champagne">Reef Bungalow 205</td>
                        <td className="py-3">Floatplane</td>
                        <td className="py-3">Steward Arthur</td>
                        <td className="py-3 text-right text-amber-400 font-semibold">ARRIVING (10:30 AM)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. GUEST CONSOLE DASHBOARD */}
          {activeTab === "guest" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Digital Room Service Controls */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-champagne font-semibold block border-b border-white/5 pb-2">Suite 402 Smart Intelligence Controls</span>
                
                {/* Temp */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center text-white/80"><Thermometer className="w-4 h-4 mr-2 text-gold-champagne" /> Room Temperature</span>
                    <span className="font-mono text-gold-champagne">{roomTemp}°C</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setRoomTemp(roomTemp - 1)} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-sm cursor-pointer">-</button>
                    <input
                      type="range"
                      min="16"
                      max="26"
                      value={roomTemp}
                      onChange={(e) => setRoomTemp(parseInt(e.target.value))}
                      className="flex-1 h-1 bg-white/10 accent-gold-champagne cursor-pointer"
                    />
                    <button onClick={() => setRoomTemp(roomTemp + 1)} className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-sm cursor-pointer">+</button>
                  </div>
                </div>

                {/* Lights Toggle */}
                <div className="flex justify-between items-center text-xs border-t border-white/5 pt-4">
                  <span className="text-white/80">Sheer Smart Curtains</span>
                  <button
                    onClick={() => setLightsOn(!lightsOn)}
                    className={`px-4 py-1.5 rounded text-[10px] uppercase tracking-widest font-semibold cursor-pointer ${
                      lightsOn ? "bg-gold-champagne text-[#0A0A0A]" : "bg-white/5 text-white/40"
                    }`}
                  >
                    {lightsOn ? "OPENED (80%)" : "CLOSED"}
                  </button>
                </div>

                {/* NFC Digital Room Key */}
                <div className="border-t border-white/5 pt-4 text-center">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 block mb-3">NFC Room Access Key</span>
                  <button className="px-6 py-3 rounded bg-gradient-to-tr from-[#0F3D3E] to-gold-champagne text-white font-mono text-xs tracking-widest shadow-lg animate-pulse border border-white/20 hover:scale-102 transition-transform cursor-pointer">
                    HOLD TO BEACON PASS KEY
                  </button>
                </div>
              </div>

              {/* Right Column: Scheduled Requests */}
              <div className="glass-gold-panel p-6 rounded-xl border border-gold-champagne/10 space-y-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-champagne font-semibold block border-b border-white/5 pb-2">Active Itinerary</span>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 border-l-2 border-gold-champagne/60 pl-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">10:00 AM TOMORROW</span>
                      <h4 className="text-xs font-semibold text-white">Private Yacht Transfer</h4>
                      <p className="text-[10px] text-white/60">Departure from Marina Dock B; champagne waiting on board.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 border-l-2 border-white/10 pl-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">3:00 PM TOMORROW</span>
                      <h4 className="text-xs font-semibold text-white">Signature Hot Stone Therapy</h4>
                      <p className="text-[10px] text-white/60">Spa Treatment Room Suite 2. Eucalyptus massage oils requested.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. SYSTEM ADMIN DASHBOARD */}
          {activeTab === "admin" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">API Gateway Latency</span>
                <p className="font-serif text-2xl text-emerald-400">12 ms</p>
                <span className="text-[9px] text-white/30 block font-mono">Healthy (AWS eu-west-1)</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Demand Pricing Multiplier</span>
                <p className="font-serif text-2xl text-gold-champagne">1.15x ACTIVE</p>
                <span className="text-[9px] text-emerald-400 block font-mono">Dynamic override: peak weekend</span>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Database Replication</span>
                <p className="font-serif text-2xl text-emerald-400">99.999%</p>
                <span className="text-[9px] text-white/30 block font-mono">Synchronous replication OK</span>
              </div>

              <div className="md:col-span-3 glass-panel p-6 rounded-xl border border-white/5 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block">Security Protocols (Active)</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-white/[0.01] rounded border border-white/5">
                    <span className="text-xs text-white/80">Intrusion Radar Systems</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono uppercase">ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/[0.01] rounded border border-white/5">
                    <span className="text-xs text-white/80">LIDAR Helipad Beacon Radar</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono uppercase">ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. STAFF DUTY ROSTER */}
          {activeTab === "staff" && (
            <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block border-b border-white/5 pb-2">Active Shifts (Today)</span>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gold-champagne/10 text-gold-champagne font-bold flex items-center justify-center text-xs">M</div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Marcus Vancour</h4>
                      <p className="text-[9px] text-white/40">Executive Chef de Cuisine</p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10px]">
                    <span className="text-gold-champagne">12:00 PM — 10:00 PM</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gold-champagne/10 text-gold-champagne font-bold flex items-center justify-center text-xs">J</div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Jean-Luc D'Avignon</h4>
                      <p className="text-[9px] text-white/40">Head Sommelier</p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[10px]">
                    <span className="text-gold-champagne">3:00 PM — 11:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. REVENUE ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats */}
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Monthly Gross Booking Revenue</span>
                <p className="font-serif text-3xl text-gold-champagne">$2,410,500</p>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Average Nightly Stay Rate</span>
                <p className="font-serif text-3xl text-white">$14,200</p>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Ancillary Spa/Dining Revenue</span>
                <p className="font-serif text-3xl text-white">$380,400</p>
              </div>

              {/* Custom SVG Line Chart to avoid SSR issues */}
              <div className="md:col-span-3 glass-gold-panel p-6 rounded-xl border border-gold-champagne/10 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] uppercase tracking-[0.20em] text-gold-champagne font-semibold">Annual Revenue Projection</span>
                  <span className="text-[9px] font-mono text-white/40">Millions USD</span>
                </div>
                
                {/* SVG Graph representation */}
                <div className="relative w-full h-48 bg-black/40 border border-white/5 rounded-lg flex items-end p-4">
                  {/* Graph grids */}
                  <div className="absolute inset-x-0 bottom-4 border-b border-white/5 h-0" />
                  <div className="absolute inset-x-0 bottom-16 border-b border-white/5 h-0" />
                  <div className="absolute inset-x-0 bottom-28 border-b border-white/5 h-0" />

                  {/* Chart Line and Area using custom SVG path */}
                  <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C8A96A" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#C8A96A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Fill */}
                    <path
                      d="M0,80 Q20,60 40,70 T80,30 T100,10 L100,100 L0,100 Z"
                      fill="url(#chartGradient)"
                      className="transition-all duration-1000"
                    />
                    {/* Stroke */}
                    <path
                      d="M0,80 Q20,60 40,70 T80,30 T100,10"
                      fill="none"
                      stroke="#C8A96A"
                      strokeWidth="1.5"
                      className="transition-all duration-1000"
                    />
                  </svg>

                  {/* Axis indicators */}
                  <div className="relative w-full flex justify-between text-[8px] uppercase tracking-wider text-white/30 font-mono pt-4 select-none">
                    <span>Q1 (Start)</span>
                    <span>Q2</span>
                    <span>Q3 (Peak Season)</span>
                    <span>Q4 (Holiday)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. HOUSEKEEPING QUEUE */}
          {activeTab === "housekeeping" && (
            <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block border-b border-white/5 pb-2">Suite Cleaning Status</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">Suite 102</h4>
                    <span className="text-[9px] text-white/40 block font-mono">Last service: 2h ago</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono uppercase">CLEAN</span>
                </div>
                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">Suite 204</h4>
                    <span className="text-[9px] text-white/40 block font-mono">Assigned: Stewardess Clara</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono uppercase">CLEANING IN PROGRESS</span>
                </div>
                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">Suite 402</h4>
                    <span className="text-[9px] text-white/40 block font-mono">Awaiting VIP check-in</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-mono uppercase">DIRTY (QUEUED)</span>
                </div>
              </div>
            </div>
          )}

          {/* 7. RESTAURANT COVERS */}
          {activeTab === "restaurant" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold block">Dinner Table Cover Log</span>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-xs text-white">Table No. 9 (Oceanfront)</span>
                  <span className="text-xs text-gold-champagne font-semibold font-mono">8:00 PM RESERVED (Prince of Monaco)</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-xs text-white">Table No. 4 (Garden Alcove)</span>
                  <span className="text-xs text-gold-champagne font-semibold font-mono">7:30 PM RESERVED (Lady Montgomery)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white">Table No. 12 (Reef Overlook)</span>
                  <span className="text-xs text-emerald-400 font-semibold font-mono">VACANT / STANDBY</span>
                </div>
              </div>
              <div className="glass-gold-panel p-5 rounded-xl border border-gold-champagne/10 space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-gold-champagne font-semibold block border-b border-white/5 pb-2">Chef Specialties Active Prep</span>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-white/80">
                    <span>A5 Miyazaki Wagyu</span>
                    <span className="font-semibold text-white">12 servings remain</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Truffle Blue Lobster</span>
                    <span className="font-semibold text-white">8 servings remain</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. FINANCE LEDGER */}
          {activeTab === "finance" && (
            <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block">Operating Accounts Ledger</span>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">PROFIT CYCLE POSITIVE</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-semibold text-white">Suite Reservation (H.R.H. Prince)</h4>
                    <p className="text-[9px] text-white/40">Invoice #INV-2026-081</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-semibold">+$87,500</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-semibold text-white">Spa inventory replenishment</h4>
                    <p className="text-[9px] text-white/40">Payment #PAY-2026-904</p>
                  </div>
                  <span className="font-mono text-red-400 font-semibold">-$4,200</span>
                </div>
              </div>
            </div>
          )}

          {/* 9. SPA & CELLAR INVENTORY */}
          {activeTab === "inventory" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block border-b border-white/5 pb-2">Wine Cellar Reserves</span>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Château Margaux 2015</span>
                    <span className="font-serif text-gold-champagne font-semibold">14 bottles in stock</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Dom Pérignon P2 2002</span>
                    <span className="font-serif text-gold-champagne font-semibold">22 bottles in stock</span>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block border-b border-white/5 pb-2">Spa Consumables</span>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Tibetan Jasmine Massage Oils</span>
                    <span className="font-serif text-white/50">4.5 Liters (Replenish target: 2.0L)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Volcanic Mineral Face Clays</span>
                    <span className="font-serif text-red-400">1.2 Kg (LOW STOCK - ORDERING QUEUED)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 10. BOOKING REGISTRY */}
          {activeTab === "booking" && (
            <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block border-b border-white/5 pb-2">Reservations Log Directory</span>
              <div className="space-y-4">
                <div className="p-4 bg-white/[0.01] rounded-lg border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-white">Booking #BKG-99201</h4>
                    <p className="text-[10px] text-white/50">Suite: Imperial Sanctuary | Duration: 7 Nights</p>
                  </div>
                  <span className="font-mono text-gold-champagne font-semibold">$87,500</span>
                </div>
                <div className="p-4 bg-white/[0.01] rounded-lg border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-white">Booking #BKG-99202</h4>
                    <p className="text-[10px] text-white/50">Suite: Golden Crest Penthouse | Duration: 4 Nights</p>
                  </div>
                  <span className="font-mono text-gold-champagne font-semibold">$88,000</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
