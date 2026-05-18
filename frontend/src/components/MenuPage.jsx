import React, { useState, useEffect } from 'react';
import { Coffee, ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuData = {
    Coffee: [
      { id: 1, name: 'Velvet Latte', price: '₹350', desc: 'Handcrafted espresso with steamed cream and caramel silk.', img: '/images/coffee_light.png' },
      { id: 2, name: 'Artisan Brew', price: '₹320', desc: 'Ethically sourced beans, slow-steeped for 18 hours.', img: '/images/artisan_brew.png' },
      { id: 3, name: 'Cloud Cappuccino', price: '₹380', desc: 'Extra-frothy milk over a double shot of smooth arabica.', img: '/images/cappuccino_froth.png' },
      { id: 4, name: 'Mocha Mousse Latte', price: '₹450', desc: 'Rich chocolate ganache blended with velvet espresso.', img: '/images/mocha_mousse.png' },
      { id: 5, name: 'Flat White Silk', price: '₹340', desc: 'The purist choice—silky microfoam over intense ristretto.', img: '/images/flat_white.png' },
    ],
    Tea: [
      { id: 6, name: 'Matcha Zen', price: '₹390', desc: 'Premium grade Japanese matcha with a hint of honey.', img: '/images/matcha_latte.png' },
      { id: 7, name: 'Earl Grey Mist', price: '₹310', desc: 'Classic bergamot infusion with lavender notes.', img: '/images/earl_grey_mist.png' },
      { id: 8, name: 'Rose Petal Oolong', price: '₹420', desc: 'Delicate floral notes with a smooth, earthy finish.', img: '/images/rose_oolong.png' },
      { id: 9, name: 'Spiced Chai Bloom', price: '₹330', desc: 'House-made spice blend steeped in creamy oat milk.', img: '/images/spiced_chai.png' },
    ],
    Snacks: [
      { id: 10, name: 'Avocado Toast', price: '₹480', desc: 'Smashed avocado with sea salt and chili flakes on sourdough.', img: '/images/avocado_toast.png' },
      { id: 11, name: 'Truffle Fries', price: '₹350', desc: 'Crispy fries tossed in truffle oil and parmesan.', img: '/images/truffle_fries.png' },
      { id: 12, name: 'Artisan Hummus Plate', price: '₹460', desc: 'Warm pita, fresh veggies, and olive oil-infused hummus.', img: '/images/hummus_plate.png' },
    ],
    Desserts: [
      { id: 13, name: 'Golden Croissant', price: '₹300', desc: 'Flaky, butter-rich layers baked to honey-gold perfection.', img: '/images/golden_croissant.png' },
      { id: 14, name: 'Berry Tart', price: '₹420', desc: 'Fresh seasonal berries on a vanilla bean custard base.', img: '/images/berry_tart.png' },
      { id: 15, name: 'Salted Caramel Brownie', price: '₹380', desc: 'Fudgy dark chocolate with a swirl of sea salt caramel.', img: '/images/caramel_brownie.png' },
      { id: 16, name: 'Lavender Lemon Cake', price: '₹440', desc: 'Light sponge with floral notes and zesty lemon glaze.', img: '/images/lavender_cake.png' },
    ]
  };

  const categories = ['All', ...Object.keys(menuData)];

  const allItems = Object.values(menuData).flat();
  const displayedItems = activeCategory === 'All' ? allItems : menuData[activeCategory];

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-6 md:px-16 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center relative">
          <Link to="/" className="absolute left-0 top-0 hidden md:flex items-center gap-2 text-mocha/40 hover:text-mocha transition-all uppercase tracking-widest text-[10px] font-bold group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Sanctuary
          </Link>
          <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-6 block">Our Full Collection</span>
          <h1 className="text-5xl md:text-7xl font-heading mb-8">The CAFÉCA Menu</h1>
          <div className="w-16 h-[1px] bg-mocha/20 mx-auto"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-start md:justify-center gap-4 mb-20 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-500 whitespace-nowrap cursor-pointer ${
                activeCategory === cat 
                ? 'bg-mocha text-cream shadow-soft-lg scale-105' 
                : 'bg-white text-mocha/40 hover:text-mocha border border-latte/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {displayedItems.map((item, idx) => (
            <div key={item.id} className="group animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="relative h-80 overflow-hidden rounded-[3rem] mb-8 shadow-soft group-hover:shadow-soft-lg transition-all duration-700">
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
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-heading tracking-tight">{item.name}</h3>
                <div className="h-[1px] flex-1 mx-4 mt-4 bg-latte/10"></div>
              </div>
              <p className="text-mocha/60 text-sm leading-relaxed font-light mb-6">
                {item.desc}
              </p>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="w-2 h-2 rounded-full bg-caramel"></div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-latte">Add to Moment</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
