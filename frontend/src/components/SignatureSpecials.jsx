import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignatureSpecials = ({ isPreview = false }) => {
  const [activeCategory, setActiveCategory] = useState('Coffee');

  const menuItems = {
    Coffee: [
      { id: 1, name: 'Velvet Latte', price: '₹350', desc: 'Handcrafted espresso with steamed cream and caramel silk.', img: '/images/coffee_light.png' },
      { id: 2, name: 'Artisan Brew', price: '₹320', desc: 'Ethically sourced beans, slow-steeped for 18 hours.', img: '/images/artisan_brew.png' },
      { id: 3, name: 'Cloud Cappuccino', price: '₹380', desc: 'Extra-frothy milk over a double shot of smooth arabica.', img: '/images/cappuccino_froth.png' },
    ],
    Tea: [
      { id: 4, name: 'Matcha Zen', price: '₹390', desc: 'Premium grade Japanese matcha with a hint of honey.', img: '/images/matcha_latte.png' },
      { id: 5, name: 'Earl Grey Mist', price: '₹310', desc: 'Classic bergamot infusion with lavender notes.', img: '/images/earl_grey_mist.png' },
    ],
    Snacks: [
      { id: 6, name: 'Avocado Toast', price: '₹480', desc: 'Smashed avocado with sea salt and chili flakes on sourdough.', img: '/images/avocado_toast.png' },
      { id: 7, name: 'Truffle Fries', price: '₹350', desc: 'Crispy fries tossed in truffle oil and parmesan.', img: '/images/truffle_fries.png' },
    ],
    Desserts: [
      { id: 8, name: 'Golden Croissant', price: '₹300', desc: 'Flaky, butter-rich layers baked to honey-gold perfection.', img: '/images/golden_croissant.png' },
      { id: 9, name: 'Berry Tart', price: '₹420', desc: 'Fresh seasonal berries on a vanilla bean custard base.', img: '/images/berry_tart.png' },
    ]
  };

  const categories = Object.keys(menuItems);
  
  // In preview mode, we only show Coffee category and only 3 items
  const itemsToShow = isPreview ? menuItems['Coffee'].slice(0, 3) : menuItems[activeCategory];

  return (
    <section id="menu" className={`section-spacing reveal ${isPreview ? 'bg-cream' : 'bg-off-white pt-24'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-header max-w-3xl mx-auto mb-10 text-center">
          <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-4 block">
            {isPreview ? 'Handpicked Favorites' : 'Our Full Collection'}
          </span>
          <h2 className="text-3xl md:text-4xl mb-4">
            {isPreview ? 'Signature Specials' : 'Our Menu'}
          </h2>
          <div className="w-12 h-[1px] bg-caramel mx-auto mb-4"></div>
          <p className="text-mocha/60 italic font-light text-sm">
            {isPreview ? 'A glimpse into our artisanal craft.' : 'Curated delights for your sophisticated palate.'}
          </p>
        </div>

        {/* Category Tabs - Only show if NOT in preview mode */}
        {!isPreview && (
          <div className="flex justify-start md:justify-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeCategory === category 
                  ? 'bg-mocha text-cream shadow-soft' 
                  : 'bg-white text-mocha/40 hover:text-mocha border border-latte/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {itemsToShow.map((item, idx) => (
            <div key={item.id} className="premium-card group reveal active" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="relative h-72 overflow-hidden rounded-[2rem] mb-8">
                <img 
                  src={item.img} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={item.name}
                />
                <div className="absolute top-0 right-0 bg-mocha/90 backdrop-blur-md px-6 py-3 rounded-bl-3xl shadow-sm">
                  <span className="text-sm font-bold text-cream">{item.price}</span>
                </div>
              </div>
              <h3 className="text-2xl mb-3 tracking-tight font-heading">{item.name}</h3>
              <p className="text-mocha/70 text-sm leading-relaxed mb-6 font-light">{item.desc}</p>
              <Link to="/menu" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.2em] font-bold text-latte group-hover:text-mocha transition-colors flex items-center gap-2">
                Order Now <span className="w-4 h-[1px] bg-latte group-hover:bg-mocha transition-all group-hover:w-8"></span>
              </Link>
            </div>
          ))}
        </div>

        {/* View Full Menu Button for Home Page Preview */}
        {isPreview && (
          <div className="mt-20 text-center reveal">
            <Link 
              to="/menu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-premium btn-premium-outline min-w-[250px] tracking-widest uppercase text-xs"
            >
              View Full Menu
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignatureSpecials;
