import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="section-spacing overflow-hidden reveal bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1 reveal" style={{ transitionDelay: '200ms' }}>
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-soft-lg">
              <img src="/images/exterior_light.png" loading="lazy" alt="Café Aura" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-caramel/10 rounded-full -z-10 blur-3xl opacity-60"></div>
          </div>
          <div className="order-1 lg:order-2 reveal" style={{ transitionDelay: '400ms' }}>
            <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-6 block">The Philosophy</span>
            <h2 className="text-4xl md:text-5xl mb-8 leading-[1.2]">A Sanctuary <br />for the <span className="italic font-normal">Modern Soul.</span></h2>
            <div className="space-y-6 mb-10 text-mocha/80 font-light leading-relaxed">
              <p>
                CAFÉCA was born from a simple mission: to strip away the noise of urban life and create a sanctuary where quality coffee meets minimalist design. Our story began in 2018, with a single goal of sourcing the world's most expressive beans through direct, ethical partnerships.
              </p>
              <p>
                Every cup we serve is a testament to our dedication to the craft. We don't just brew coffee; we curate moments of peace, one slow-poured extraction at a time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 mb-10">
              <div className="border-l border-latte/20 pl-6">
                <h4 className="text-4xl font-heading text-dark mb-2">100%</h4>
                <p className="text-[10px] uppercase tracking-widest text-mocha/40 font-bold">Organic Arabica</p>
              </div>
              <div className="border-l border-latte/20 pl-6">
                <h4 className="text-4xl font-heading text-dark mb-2">Ethical</h4>
                <p className="text-[10px] uppercase tracking-widest text-mocha/40 font-bold">Direct Sourcing</p>
              </div>
            </div>
            <div>
              <Link 
                to="/about" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-premium btn-premium-outline tracking-widest uppercase text-xs"
              >
                Discover Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
