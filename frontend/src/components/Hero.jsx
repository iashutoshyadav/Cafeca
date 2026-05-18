import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ isLoading }) => {
  const taglines = [
    "A minimalist sanctuary where artisanal coffee meets soulful conversations. Discover the art of the perfect brew at CAFÉCA.",
    "Experience the serenity of slow mornings and the rich aroma of hand-pressed beans. Your daily escape starts here.",
    "Where minimalist design meets maximal flavor. Every cup is a curated masterpiece crafted just for you.",
    "Join our community of coffee lovers in an atmosphere designed for deep focus and pure inspiration."
  ];
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const taglineTimer = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(taglineTimer);
  }, [taglines.length]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero_final.png" 
          className="w-full h-full object-cover animate-smooth-zoom" 
          alt="Café Interior"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/10 to-cream"></div>
      </div>
      
      <div className={`relative z-10 text-center max-w-4xl px-6 transition-all duration-1000 ${isLoading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
        <h1 className="text-6xl md:text-8xl mb-10 leading-[1.1] text-dark">
          Brewed for Comfort, <br />
          <span className="italic font-normal serif text-mocha">Crafted for Moments.</span>
        </h1>
        <p key={currentTaglineIndex} className="font-heading italic font-light text-xl md:text-2xl text-dark mb-14 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
          {taglines[currentTaglineIndex]}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link to="/menu" target="_blank" rel="noopener noreferrer" className="btn-premium btn-premium-primary min-w-[220px] tracking-widest uppercase text-xs">
            Explore Menu
          </Link>
          <a href="#contact" className="btn-premium btn-premium-outline min-w-[220px] tracking-widest uppercase text-xs">
            Visit Café
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
