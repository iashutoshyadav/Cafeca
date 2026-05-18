import React from 'react';
import { WifiHigh, Chair, Coffee, Leaf } from '@phosphor-icons/react';

const Experience = () => {
  const features = [
    { icon: <WifiHigh size={28} />, title: 'High-Speed Fiber', desc: 'The perfect companion for your digital work.' },
    { icon: <Chair size={28} />, title: 'Quiet Corners', desc: 'Designed for focus and private conversations.' },
    { icon: <Coffee size={28} />, title: 'Hand-Pressed', desc: 'Every bean is ground and pressed with precision.' },
    { icon: <Leaf size={28} />, title: 'Eco-Friendly', desc: 'Zero-waste initiatives in every cup we serve.' }
  ];

  return (
    <section className="section-spacing bg-cream reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, idx) => (
            <div key={idx} className="p-12 bg-white rounded-[3rem] border border-latte/5 hover:border-latte/20 transition-all duration-700 hover:shadow-soft reveal text-center group" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="w-20 h-20 bg-off-white rounded-full flex items-center justify-center text-mocha mx-auto mb-10 group-hover:bg-beige transition-colors">
                {item.icon}
              </div>
              <h4 className="text-lg mb-4 tracking-tight">{item.title}</h4>
              <p className="text-mocha/50 text-xs leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
