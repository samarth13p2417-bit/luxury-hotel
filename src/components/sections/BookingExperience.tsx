"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ShieldAlert, Award, Calculator } from "lucide-react";

interface AddOn {
  id: string;
  name: string;
  price: number;
}

export default function BookingExperience() {
  const [suite, setSuite] = useState<"royal" | "imperial" | "penthouse">("royal");
  const [nights, setNights] = useState(7);
  const [addons, setAddons] = useState<string[]>(["yacht"]);

  const suiteRates = {
    royal: { name: "Royal Ocean Sanctuary", rate: 12500 },
    imperial: { name: "Imperial Villa Reef", rate: 15500 },
    penthouse: { name: "Golden Crest Penthouse", rate: 22000 },
  };

  const addonRates: AddOn[] = [
    { id: "yacht", name: "85ft Sovereign Yacht Transfer", price: 6200 },
    { id: "helicopter", name: "Helicopter Reef Excursion", price: 4500 },
    { id: "chef", name: "Chef's Table Wine Pairing (2 guests)", price: 900 },
    { id: "spa", name: "Signature Tibetan Spa Treatment", price: 750 },
  ];

  const toggleAddon = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((a) => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const suiteCost = suiteRates[suite].rate * nights;
  const addonCost = addons.reduce((sum, current) => {
    const rate = addonRates.find((a) => a.id === current);
    return sum + (rate ? rate.price : 0);
  }, 0);

  const subtotal = suiteCost + addonCost;
  const luxuryTax = subtotal * 0.12; // 12% luxury tax
  const total = subtotal + luxuryTax;

  return (
    <section id="booking" className="relative w-full bg-[#0A0A0A] py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold-champagne font-medium">
            R E S E R V A T I O N  S A N C T U A R Y
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-white leading-tight">
            Orchestrate Your Stay <br />
            <span className="text-gold-gradient font-normal italic">Bespoke Reservation</span>
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne/40 mx-auto mt-6" />
        </div>

        {/* Booking Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Customizer (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Suite */}
            <div className="glass-panel rounded-xl p-6 border border-white/5 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold-champagne font-semibold block">
                01. Choose Suite Residence
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(Object.keys(suiteRates) as Array<keyof typeof suiteRates>).map((key) => {
                  const active = suite === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSuite(key)}
                      className={`text-left p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                        active
                          ? "bg-gold-champagne/5 border-gold-champagne/40"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                      }`}
                    >
                      <h4 className="text-xs font-semibold text-white tracking-wide uppercase mb-1">
                        {suiteRates[key].name}
                      </h4>
                      <span className="text-[10px] text-gold-champagne font-mono block">
                        ${suiteRates[key].rate.toLocaleString()} / night
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Duration */}
            <div className="glass-panel rounded-xl p-6 border border-white/5 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold-champagne font-semibold block">
                02. Stay Duration
              </span>
              <div className="flex items-center space-x-6">
                <div className="flex-1">
                  <div className="flex justify-between items-center text-xs text-white/70 mb-2 font-light">
                    <span>Nights Reserved</span>
                    <span className="font-mono text-gold-champagne font-bold">{nights} Nights</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="21"
                    step="1"
                    value={nights}
                    onChange={(e) => setNights(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 accent-gold-champagne rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Upgrades */}
            <div className="glass-panel rounded-xl p-6 border border-white/5 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold-champagne font-semibold block">
                03. Bespoke Excursion Upgrades
              </span>
              <div className="space-y-3">
                {addonRates.map((addon) => {
                  const active = addons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        active
                          ? "bg-gold-champagne/5 border-gold-champagne/45"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-semibold text-white">{addon.name}</h4>
                      </div>
                      <span className="text-xs font-mono text-gold-champagne">
                        +${addon.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing Ledger Card (Right 5 Columns) */}
          <div className="lg:col-span-5">
            <div className="glass-gold-panel rounded-xl p-6 border border-gold-champagne/15 space-y-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 block border-b border-white/5 pb-2">
                Residency Statement of Account
              </span>

              {/* Cost Calculations */}
              <div className="space-y-4 text-xs font-light">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">
                    {suiteRates[suite].name} (x{nights} nights)
                  </span>
                  <span className="font-mono text-white">${suiteCost.toLocaleString()}</span>
                </div>

                {addons.length > 0 && (
                  <div className="flex justify-between items-start">
                    <span className="text-white/60">Bespoke Excursions</span>
                    <span className="font-mono text-white">${addonCost.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t border-white/5 my-2" />

                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-mono text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Luxury Tourism Tax (12%)</span>
                  <span className="font-mono text-white">${luxuryTax.toLocaleString()}</span>
                </div>

                <div className="border-t border-gold-champagne/20 pt-4 flex justify-between items-center">
                  <span className="text-sm font-semibold uppercase text-gold-champagne tracking-wider flex items-center">
                    <Calculator className="w-4 h-4 mr-2" />
                    Total Quote
                  </span>
                  <span className="font-mono text-lg font-bold text-gold-champagne">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* VIP Notice */}
              <div className="p-3 bg-gold-champagne/[0.03] border border-gold-champagne/20 rounded-lg flex items-start space-x-3">
                <ShieldAlert className="w-4.5 h-4.5 text-gold-champagne flex-shrink-0 mt-0.5" />
                <p className="text-[9px] text-white/50 leading-relaxed font-light">
                  A personal butler will contact you within 2 hours of reservation confirmation to finalize dietary restrictions, yacht transfer departures, and flight times.
                </p>
              </div>

              {/* Submit Reserve */}
              <button
                onClick={() => alert("Reservation request forwarded to director. Elite Butler dispatched.")}
                className="w-full py-4 bg-gold-champagne hover:bg-gold-accent text-[#0A0A0A] font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 shadow-[0_4px_25px_rgba(200,169,106,0.35)] cursor-pointer"
              >
                Orchestrate Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
