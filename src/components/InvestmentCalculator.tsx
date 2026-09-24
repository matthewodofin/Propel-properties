import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, TrendingUp, DollarSign, Percent, Calendar, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface InvestmentCalculatorProps {
  onExploreProperties?: () => void;
  onContactAdvisor?: () => void;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({
  onExploreProperties,
  onContactAdvisor,
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(150000000); // ₦150M
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [rentalYieldPercent, setRentalYieldPercent] = useState<number>(9.5); // 9.5%
  const [holdingYears, setHoldingYears] = useState<number>(5); // 5 years
  const [annualCapitalGrowth, setAnnualCapitalGrowth] = useState<number>(14); // 14% p.a. conservative for prime Lagos/Abuja

  const presets = [
    { label: 'Ajah 3-Bed (₦85M)', price: 85000000, yield: 10, growth: 13 },
    { label: 'Lekki 4-Bed Duplex (₦150M)', price: 150000000, yield: 9.5, growth: 15 },
    { label: 'Ibeju Commercial Land (₦45M)', price: 45000000, yield: 6, growth: 22 },
    { label: 'Ikoyi Penthouse (₦450M)', price: 450000000, yield: 8.5, growth: 12 },
  ];

  const calculations = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const annualRentalIncome = propertyPrice * (rentalYieldPercent / 100);
    const monthlyRentalIncome = annualRentalIncome / 12;

    // Projected future property value after holdingYears compounding
    const futureValue = propertyPrice * Math.pow(1 + annualCapitalGrowth / 100, holdingYears);
    const totalCapitalGain = futureValue - propertyPrice;
    const totalRentalEarnings = annualRentalIncome * holdingYears;
    const totalReturn = totalCapitalGain + totalRentalEarnings;
    const returnOnInvestment = downPayment > 0 ? (totalReturn / downPayment) * 100 : 0;

    return {
      downPayment,
      loanAmount,
      annualRentalIncome,
      monthlyRentalIncome,
      futureValue,
      totalCapitalGain,
      totalRentalEarnings,
      totalReturn,
      returnOnInvestment,
    };
  }, [propertyPrice, downPaymentPercent, rentalYieldPercent, holdingYears, annualCapitalGrowth]);

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="investment-calculator" className="py-20 sm:py-24 relative overflow-hidden bg-white">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#016DAA]/5 via-sky-50 to-[#E5322E]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#016DAA]/10 text-[#016DAA] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Calculator className="w-4 h-4 text-[#016DAA]" />
            <span>Interactive Financial Simulator</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight leading-tight font-display"
          >
            Forecast Your Real Estate <span className="text-[#016DAA]">ROI &amp; Yield</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
          >
            Calculate projected annual rental income, capital growth over time, and equity appreciation across prime Nigerian real estate markets.
          </motion.p>

          {/* Quick Preset Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1">Quick Scenarios:</span>
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setPropertyPrice(preset.price);
                  setRentalYieldPercent(preset.yield);
                  setAnnualCapitalGrowth(preset.growth);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  propertyPrice === preset.price
                    ? 'bg-[#016DAA] text-white border-[#016DAA] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Slider 1: Property Price */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="input-prop-price" className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#016DAA]" />
                    <span>Purchase Price (₦)</span>
                  </label>
                  <span className="text-base sm:text-lg font-black text-[#016DAA] tabular-nums">
                    {formatNaira(propertyPrice)}
                  </span>
                </div>
                <input
                  id="input-prop-price"
                  type="range"
                  min={20000000}
                  max={800000000}
                  step={5000000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#016DAA]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>₦20M (Starter Plot)</span>
                  <span>₦150M (Lekki Duplex)</span>
                  <span>₦800M (Ikoyi Mansion)</span>
                </div>
              </div>

              {/* Slider 2: Down Payment Equity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="input-down-payment" className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-[#016DAA]" />
                    <span>Down Payment / Initial Equity ({downPaymentPercent}%)</span>
                  </label>
                  <span className="text-sm sm:text-base font-bold text-slate-700 tabular-nums">
                    {formatNaira(calculations.downPayment)}
                  </span>
                </div>
                <input
                  id="input-down-payment"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#016DAA]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>10% (Mortgage)</span>
                  <span>30% (Standard)</span>
                  <span>100% (Cash Outright)</span>
                </div>
              </div>

              {/* Slider 3: Expected Rental Yield */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="input-rental-yield" className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Expected Annual Rental Yield ({rentalYieldPercent}%)</span>
                  </label>
                  <span className="text-sm sm:text-base font-bold text-emerald-700 tabular-nums">
                    {formatNaira(calculations.annualRentalIncome)} / year
                  </span>
                </div>
                <input
                  id="input-rental-yield"
                  type="range"
                  min={5}
                  max={16}
                  step={0.5}
                  value={rentalYieldPercent}
                  onChange={(e) => setRentalYieldPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>5% (Conservative)</span>
                  <span>9.5% (Prime Serviced)</span>
                  <span>16% (Short-Let / Airbnb)</span>
                </div>
              </div>

              {/* Sliders 4 & 5: Holding Horizon & Capital Growth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="input-holding-period" className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#016DAA]" />
                      <span>Horizon ({holdingYears} Yrs)</span>
                    </label>
                    <span className="text-xs font-bold text-slate-700">{holdingYears} Years</span>
                  </div>
                  <input
                    id="input-holding-period"
                    type="range"
                    min={1}
                    max={15}
                    step={1}
                    value={holdingYears}
                    onChange={(e) => setHoldingYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#016DAA]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="input-capital-growth" className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Appreciation ({annualCapitalGrowth}% p.a.)</span>
                    </label>
                    <span className="text-xs font-bold text-amber-600">+{annualCapitalGrowth}%/yr</span>
                  </div>
                  <input
                    id="input-capital-growth"
                    type="range"
                    min={6}
                    max={25}
                    step={1}
                    value={annualCapitalGrowth}
                    onChange={(e) => setAnnualCapitalGrowth(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Calculations benchmarked against Lagos &amp; Abuja official registry averages</span>
              </span>
            </div>
          </motion.div>

          {/* Results Summary Box (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-gradient-to-br from-[#0B132B] via-[#0F1E36] to-[#015383] text-white p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient soft glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#016DAA]/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                  {holdingYears}-Year Financial Forecast
                </span>
                <h3 className="text-2xl font-bold mt-1 font-display">
                  Projected Portfolio Return
                </h3>
              </div>

              {/* Big Number: Total Return */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-xs font-semibold text-sky-200 block mb-1">
                  Estimated Total Capital + Rental Return
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
                  {formatNaira(calculations.totalReturn)}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{calculations.returnOnInvestment.toFixed(1)}% Return on Invested Capital</span>
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-slate-300">Monthly Cash Rental Income:</span>
                  <span className="font-bold text-white text-sm tabular-nums">
                    {formatNaira(calculations.monthlyRentalIncome)} / mo
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-slate-300">Cumulative {holdingYears}-Yr Rental Cash:</span>
                  <span className="font-bold text-emerald-400 text-sm tabular-nums">
                    {formatNaira(calculations.totalRentalEarnings)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-slate-300">Asset Value in Year {holdingYears}:</span>
                  <span className="font-bold text-sky-200 text-sm tabular-nums">
                    {formatNaira(calculations.futureValue)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-300">Net Capital Appreciation:</span>
                  <span className="font-bold text-amber-300 text-sm tabular-nums">
                    +{formatNaira(calculations.totalCapitalGain)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/15 space-y-3">
              {onExploreProperties && (
                <button
                  type="button"
                  onClick={onExploreProperties}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#E5322E] hover:bg-[#CC2622] text-white text-sm font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Browse Matching Investment Listings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {onContactAdvisor && (
                <button
                  type="button"
                  onClick={onContactAdvisor}
                  className="w-full py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <span>Speak with a Private Portfolio Advisor</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
