import { useState, useEffect } from "react";
import { ArrowRight, Play, ShoppingBag, Gem, Crown, Clock, Award } from "lucide-react";

const RightSection = () => {
  const [index, setIndex] = useState(0);

  const heroTexts = ["Exquisite Jewelry", "Luxury Timepieces", "Golden Treasures"];
  const luxuryWords = ["Crafted with Precision", "Timeless Elegance", "Premium Quality"];

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % heroTexts.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center p-8 lg:p-12 space-y-8 font-josefin">
      <div className="inline-flex items-center gap-2 bg-gold/15 text-gold px-4 py-2 rounded-full text-sm font-semibold w-fit border border-gold/30">
        <Award size={18} /> Premium Collection 2025
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl lg:text-6xl font-bold text-navy">Discover</h1>
        <h2 className="text-3xl lg:text-5xl font-italianno text-gold">{heroTexts[index]}</h2>
        <p className="text-lg text-navy/80">{luxuryWords[index]}</p>
      </div>

      <p className="text-navy/70 text-lg lg:text-xl max-w-lg leading-relaxed">
        Experience the finest collection of handcrafted jewelry, luxury watches, and golden masterpieces. Each piece tells a story of elegance and sophistication.
      </p>

      <div className="flex gap-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Gem size={20} className="text-gold" /> <span className="text-2xl font-bold text-navy">1000+</span>
          </div>
          <div className="text-sm text-navy/60">Jewelry Pieces</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Clock size={20} className="text-orange" /> <span className="text-2xl font-bold text-navy">500+</span>
          </div>
          <div className="text-sm text-navy/60">Luxury Watches</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Crown size={20} className="text-gold" /> <span className="text-2xl font-bold text-navy">25k+</span>
          </div>
          <div className="text-sm text-navy/60">Happy Clients</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-orange text-white rounded-full font-semibold hover:scale-105 transition">
          <ShoppingBag size={20} /> Explore Collection <ArrowRight size={20} />
        </button>
        <button className="flex items-center gap-2 px-6 py-3 border-2 border-navy text-navy rounded-full font-semibold hover:bg-navy hover:text-white transition">
          <Play size={20} /> Watch Craftsmanship
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gold/5 rounded-lg border border-gold/20">
          <div className="w-3 h-3 bg-gradient-to-r from-gold to-orange rounded-full"></div>
          <div>
            <div className="text-sm font-semibold text-navy">Certified Authentic</div>
            <div className="text-xs text-navy/60">100% Genuine</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gold/5 rounded-lg border border-gold/20">
          <div className="w-3 h-3 bg-gradient-to-r from-orange to-gold rounded-full"></div>
          <div>
            <div className="text-sm font-semibold text-navy">Free Sizing</div>
            <div className="text-xs text-navy/60">Perfect Fit</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gold/5 rounded-lg border border-gold/20">
          <div className="w-3 h-3 bg-gradient-to-r from-gold to-orange rounded-full"></div>
          <div>
            <div className="text-sm font-semibold text-navy">Lifetime Care</div>
            <div className="text-xs text-navy/60">Expert Service</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
